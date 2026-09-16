// Beauty DO ノート:記事編集用のローカル管理画面サーバー
// 起動: node admin-server.js (ブラウザが自動で開きます)
// 保存すると articles.js を書き換え、続けて build.js を実行して index.html にも反映します。

const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync, exec, spawnSync } = require("child_process");
const querystring = require("querystring");

const PORT = 5055;
const ARTICLES_PATH = path.join(__dirname, "articles.js");

const KNOWLEDGE_INDEX = `01-biyou-no-kagaku.md: 『美容の科学』(日本コスメティック協会) — 化粧品科学全般
02-atarashii-biyou-hifuka.md: 『あたらしい美容皮膚科学』(日本美容皮膚科学会) — 皮膚の構造・老化・美容医療の基礎
03-cosme-kentei-kyokasho.md: 『コスメの教科書』(日本化粧品検定協会) — スキンケア・メイク・ヘアケアの誤解と基礎知識
04-skincare-jissen-guide.md: 『やさしく伝えるスキンケア実践ガイド』(野村有子) — 患者の疑問Q&A形式
05-biyou-no-hifu-kagaku.md: 『美容のヒフ科学』(安田利顕) — 皮膚生理・老化メカニズム
06-biyou-hifu-qa.md: 『美容皮膚Q&A』(川田暁) — 56件の患者質問Q&A
07-mbderma-no262.md: 『MB Derma No.262 再考!美容皮膚診療』 — 若返り治療13編
08-beauty-vol41-skincare.md: 『美容皮膚医学BEAUTY 第41号』特集:スキンケア`;

const DRAFT_SCHEMA = JSON.stringify({
  type: "object",
  properties: {
    title: { type: "string" },
    date: { type: "string" },
    conclusion: { type: "string" },
    body: { type: "string" },
    visual: { type: "string" },
    sources: {
      type: "array",
      items: {
        type: "object",
        properties: { label: { type: "string" }, url: { type: "string" } },
        required: ["label"],
      },
    },
  },
  required: ["title", "date", "conclusion", "body", "visual", "sources"],
});

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

let cachedClaudeExe = null;

// Windows では claude は claude.cmd (バッチファイル)としてインストールされており、
// spawnSync に shell なしで渡すと ENOENT になる。shell:true は引数が正しくエスケープ
// されず壊れるため、.cmd が指す実体の claude.exe を直接解決して呼び出す。
function resolveClaudeExecutable() {
  if (cachedClaudeExe) return cachedClaudeExe;
  if (process.platform !== "win32") {
    cachedClaudeExe = "claude";
    return cachedClaudeExe;
  }

  try {
    const whereOut = execSync("where claude", { encoding: "utf8" });
    const lines = whereOut.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const exeLine = lines.find((l) => l.toLowerCase().endsWith(".exe"));
    if (exeLine) {
      cachedClaudeExe = exeLine;
      return cachedClaudeExe;
    }
    const cmdLine = lines.find((l) => l.toLowerCase().endsWith(".cmd"));
    if (cmdLine) {
      const npmDir = path.dirname(cmdLine);
      const candidate = path.join(npmDir, "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
      if (fs.existsSync(candidate)) {
        cachedClaudeExe = candidate;
        return cachedClaudeExe;
      }
    }
  } catch (e) {
    // where が失敗した場合は "claude" にフォールバック(後段でエラーになる)
  }

  cachedClaudeExe = "claude";
  return cachedClaudeExe;
}

function generateDraftWithAI(topic) {
  const today = todayStr();
  const prompt = `あなたは美容皮膚科学ブログ「Beauty DO ノート」の執筆者です。トピック「${topic}」についてブログ記事の下書きを作成してください。

# 手順
1. knowledge/ フォルダには以下の専門書籍の要約が入っています。トピックに関連しそうなファイルを1〜2個選んでReadツールで読み、そこにある事実を参考にしてください。
${KNOWLEDGE_INDEX}
2. 要約の文章をそのままコピーせず、必ず自分の言葉で言い換えて執筆してください(原文の逐語引用は禁止)。
3. 既存記事と同じトーンで書いてください:です・ます調、専門用語はかみ砕いて説明、押し付けがましくない。

# 出力する各項目
- title: 読者の興味を引く記事タイトル(30〜45字程度)
- date: "${today}"
- conclusion: 記事の結論を1文で
- body: 本文(600〜900字程度)
- visual: 図表用のHTML。<div class="viz"><p class="viz-title">...</p> ... </div> の中に .viz-bars(棒グラフ)または .viz-table(表)または .viz-stats(統計タイル)のいずれかを使う。適切なデータがなければ空文字("")でよい
- sources: 出典の配列。knowledge/の書籍を使った場合は url なしで { "label": "書籍名(著者)" } の形にする。存在しないURLを創作しないこと`;

  const result = spawnSync(
    resolveClaudeExecutable(),
    [
      "-p",
      "--output-format",
      "json",
      "--json-schema",
      DRAFT_SCHEMA,
      "--allowedTools",
      "Read",
      "--permission-prompts",
      "none",
      "--model",
      "sonnet",
    ],
    {
      cwd: __dirname,
      input: prompt,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 20,
      timeout: 5 * 60 * 1000,
    }
  );

  if (result.error) {
    throw new Error("claude CLIの起動に失敗しました: " + result.error.message);
  }
  if (result.status !== 0) {
    throw new Error("claude CLIがエラー終了しました: " + (result.stderr || result.stdout || "詳細不明"));
  }

  let out;
  try {
    out = JSON.parse(result.stdout);
  } catch (e) {
    throw new Error("claude CLIの出力を解析できませんでした: " + result.stdout.slice(0, 500));
  }

  if (out.is_error || !out.structured_output) {
    throw new Error("AI生成に失敗しました: " + (out.result || JSON.stringify(out)).slice(0, 500));
  }

  return out.structured_output;
}

function loadArticles() {
  const resolved = require.resolve(ARTICLES_PATH);
  delete require.cache[resolved];
  return require(resolved).ARTICLES;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function serializeArticles(articles) {
  const header = `// Beauty DO ノート:記事データ
// 出典は米国皮膚科学会(AAD)関連の査読論文、Statista、Euromonitor International、
// Grand View Research、EU公式規制文書、PMC(PubMed Central)掲載の査読付き論文などの
// 信頼できる情報源から選定しています。
//
// date は "YYYY-MM-DD" 形式。表示形式は config.js の SITE_CONFIG.dateFormat で
// 一括変更できます(この配列の日付そのものは変更していません)。
// このファイルは admin-server.js のWeb管理画面(http://localhost:${PORT}/)から編集・生成されます。

const ARTICLES = [
`;

  const body = articles
    .map((a) => {
      const sourcesStr =
        Array.isArray(a.sources) && a.sources.length > 0
          ? `[\n${a.sources
              .map((s) => {
                const parts = [`label: ${JSON.stringify(s.label)}`];
                if (s.url) parts.push(`url: ${JSON.stringify(s.url)}`);
                return `      { ${parts.join(", ")} }`;
              })
              .join(",\n")}\n    ]`
          : "[]";

      return `  {
    title: ${JSON.stringify(a.title)},
    date: ${JSON.stringify(a.date)},
    conclusion: ${JSON.stringify(a.conclusion)},
    body: ${JSON.stringify(a.body)},
    visual: ${JSON.stringify(a.visual || "")},
    sources: ${sourcesStr}
  }`;
    })
    .join(",\n");

  const footer = `
];

// build.js(Node)から読み込むためのエクスポート。ブラウザでは無視される。
if (typeof module !== "undefined") {
  module.exports = { ARTICLES };
}
`;

  return header + body + footer;
}

function saveArticles(articles) {
  fs.writeFileSync(ARTICLES_PATH, serializeArticles(articles), "utf8");
  execSync("node build.js", { cwd: __dirname, stdio: "inherit" });
}

function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - Beauty DO ノート 記事編集</title>
<style>
  body { font-family: -apple-system, "Segoe UI", "Hiragino Kaku Gothic ProN", sans-serif; background:#faf8f6; color:#2b2320; margin:0; padding:24px; }
  .wrap { max-width: 860px; margin: 0 auto; }
  h1 { font-size: 20px; }
  a.button, button { display:inline-block; background:#b8895f; color:#fff; border:none; padding:8px 16px; border-radius:6px; text-decoration:none; font-size:14px; cursor:pointer; }
  a.button.secondary, button.secondary { background:#8a8078; }
  a.button.danger, button.danger { background:#b04b3f; }
  .list-item { display:flex; align-items:center; justify-content:space-between; background:#fff; border:1px solid #e8e0d8; border-radius:8px; padding:12px 16px; margin-bottom:8px; }
  .list-item .meta { font-size:12px; color:#8a8078; }
  .list-item .title { font-weight:600; }
  .actions { display:flex; gap:8px; }
  form { background:#fff; border:1px solid #e8e0d8; border-radius:8px; padding:20px; }
  label { display:block; font-size:13px; font-weight:600; margin:16px 0 6px; }
  input[type=text], input[type=date], input[type=url], textarea { width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #d8cfc4; border-radius:6px; font-size:14px; font-family:inherit; }
  textarea { resize: vertical; }
  .source-row { display:flex; gap:8px; margin-bottom:8px; align-items:flex-start; }
  .source-row input { flex:1; }
  .top-actions { margin-bottom:16px; display:flex; gap:8px; }
  .note { color:#8a8078; font-size:12px; font-weight:400; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .flash { background:#e7f3e8; color:#2d6a31; padding:10px 14px; border-radius:6px; margin-bottom:16px; font-size:14px; }
</style>
</head>
<body>
<div class="wrap">
${content}
</div>
</body>
</html>`;
}

function renderList(articles) {
  // 新しい記事が上に来るよう並べ替える(編集・削除は元の articles.js 上のインデックスを使う)。
  const sorted = articles
    .map((a, i) => ({ article: a, index: i }))
    .sort((x, y) => (x.article.date < y.article.date ? 1 : x.article.date > y.article.date ? -1 : 0));

  const rows = sorted
    .map(
      ({ article: a, index: i }) => `      <div class="list-item">
        <div>
          <div class="title">${escapeHtml(a.title)}</div>
          <div class="meta">${escapeHtml(a.date)}</div>
        </div>
        <div class="actions">
          <a class="button" href="/edit/${i}">編集</a>
          <form method="POST" action="/delete/${i}" onsubmit="return confirm('この記事を削除しますか?');" style="display:inline">
            <button class="danger" type="submit">削除</button>
          </form>
        </div>
      </div>`
    )
    .join("\n");

  return layout(
    "記事一覧",
    `<div class="toolbar">
      <h1>Beauty DO ノート — 記事管理(全${articles.length}件)</h1>
      <div style="display:flex; gap:8px;">
        <a class="button secondary" href="/draft/new">✨ AI下書きを作成</a>
        <a class="button" href="/edit/new">+ 新規記事</a>
      </div>
    </div>
${rows}`
  );
}

function renderDraftForm(error) {
  return layout(
    "AI下書きを作成",
    `<div class="top-actions">
      <a class="button secondary" href="/">← 一覧に戻る</a>
    </div>
    <h1>AI下書きを作成</h1>
    <p class="note">トピック(キーワード)を入力すると、knowledge/フォルダの書籍要約をもとにAIが本文・図表・出典を自動生成します。生成には1〜2分程度かかり、実行のたびにAPI利用料(目安:1回あたり数十円〜1ドル程度)がかかります。生成結果はまだ保存されていません。編集画面で内容を確認・修正してから保存してください。</p>
    ${error ? `<div class="flash" style="background:#fbe7e5; color:#a33b2d;">${escapeHtml(error)}</div>` : ""}
    <form method="POST" action="/draft/generate" onsubmit="document.getElementById('genBtn').disabled=true; document.getElementById('genBtn').textContent='生成中…(1〜2分お待ちください)';">
      <label>トピック</label>
      <input type="text" name="topic" required placeholder="例:毛穴の黒ずみ、紫外線とビタミンD、敏感肌の洗顔料の選び方 など">
      <div style="margin-top:20px;">
        <button id="genBtn" type="submit">✨ AI下書きを生成</button>
      </div>
    </form>`
  );
}

function sourcesRowsHtml(sources) {
  const list = Array.isArray(sources) && sources.length > 0 ? sources : [{ label: "", url: "" }];
  return list
    .map(
      (s) => `        <div class="source-row">
          <input type="text" name="source_label[]" placeholder="出典名(例:書籍名(著者) または メディア名「記事タイトル」)" value="${escapeHtml(s.label || "")}">
          <input type="url" name="source_url[]" placeholder="URL(書籍などURLがない場合は空欄)" value="${escapeHtml(s.url || "")}">
        </div>`
    )
    .join("\n");
}

function renderEdit(article, index) {
  const isNew = index === null;
  return layout(
    isNew ? "新規記事" : "記事を編集",
    `<div class="top-actions">
      <a class="button secondary" href="/">← 一覧に戻る</a>
    </div>
    <h1>${isNew ? "新規記事を追加" : "記事を編集"}</h1>
    <form method="POST" action="${isNew ? "/save/new" : `/save/${index}`}">
      <label>タイトル</label>
      <input type="text" name="title" required value="${escapeHtml(article.title)}">

      <label>日付</label>
      <input type="date" name="date" required value="${escapeHtml(article.date)}">

      <label>結論(1文)</label>
      <textarea name="conclusion" rows="2" required>${escapeHtml(article.conclusion)}</textarea>

      <label>本文</label>
      <textarea name="body" rows="12" required>${escapeHtml(article.body)}</textarea>

      <label>図表HTML(visual) <span class="note">— .viz-bars / .viz-table などのHTML。空欄可</span></label>
      <textarea name="visual" rows="10">${escapeHtml(article.visual || "")}</textarea>

      <label>出典 <span class="note">— URLがない場合(書籍など)はURL欄を空欄のまま保存してください</span></label>
      <div id="sources">
${sourcesRowsHtml(article.sources)}
      </div>
      <button type="button" class="secondary" onclick="addSourceRow()">+ 出典を追加</button>

      <div style="margin-top:24px; display:flex; gap:8px;">
        <button type="submit">保存(index.htmlも自動更新されます)</button>
      </div>
    </form>
    <script>
      function addSourceRow() {
        const wrap = document.getElementById('sources');
        const row = document.createElement('div');
        row.className = 'source-row';
        row.innerHTML = '<input type="text" name="source_label[]" placeholder="出典名"><input type="url" name="source_url[]" placeholder="URL(任意)">';
        wrap.appendChild(row);
      }
    </script>`
  );
}

function parseBody(req, cb) {
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", () => cb(querystring.parse(data)));
}

function articleFromForm(form) {
  const labels = [].concat(form["source_label[]"] || []);
  const urls = [].concat(form["source_url[]"] || []);
  const sources = labels
    .map((label, i) => ({ label: (label || "").trim(), url: (urls[i] || "").trim() }))
    .filter((s) => s.label)
    .map((s) => (s.url ? s : { label: s.label }));

  return {
    title: (form.title || "").trim(),
    date: (form.date || "").trim(),
    conclusion: (form.conclusion || "").trim(),
    body: (form.body || "").trim(),
    visual: (form.visual || "").trim(),
    sources,
  };
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  try {
    if (req.method === "GET" && url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(renderList(loadArticles()));
      return;
    }

    if (req.method === "GET" && url === "/edit/new") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(renderEdit({ title: "", date: "", conclusion: "", body: "", visual: "", sources: [] }, null));
      return;
    }

    if (req.method === "GET" && url === "/draft/new") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(renderDraftForm(null));
      return;
    }

    if (req.method === "POST" && url === "/draft/generate") {
      parseBody(req, (form) => {
        const topic = (form.topic || "").trim();
        if (!topic) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(renderDraftForm("トピックを入力してください。"));
          return;
        }
        try {
          const draft = generateDraftWithAI(topic);
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(renderEdit(draft, null));
        } catch (err) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(renderDraftForm(err.message));
        }
      });
      return;
    }

    const editMatch = url.match(/^\/edit\/(\d+)$/);
    if (req.method === "GET" && editMatch) {
      const articles = loadArticles();
      const i = Number(editMatch[1]);
      if (!articles[i]) {
        res.writeHead(404);
        res.end("記事が見つかりません");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(renderEdit(articles[i], i));
      return;
    }

    if (req.method === "POST" && url === "/save/new") {
      parseBody(req, (form) => {
        const articles = loadArticles();
        articles.push(articleFromForm(form));
        saveArticles(articles);
        res.writeHead(302, { Location: "/" });
        res.end();
      });
      return;
    }

    const saveMatch = url.match(/^\/save\/(\d+)$/);
    if (req.method === "POST" && saveMatch) {
      parseBody(req, (form) => {
        const articles = loadArticles();
        const i = Number(saveMatch[1]);
        if (!articles[i]) {
          res.writeHead(404);
          res.end("記事が見つかりません");
          return;
        }
        articles[i] = articleFromForm(form);
        saveArticles(articles);
        res.writeHead(302, { Location: "/" });
        res.end();
      });
      return;
    }

    const deleteMatch = url.match(/^\/delete\/(\d+)$/);
    if (req.method === "POST" && deleteMatch) {
      const articles = loadArticles();
      const i = Number(deleteMatch[1]);
      if (!articles[i]) {
        res.writeHead(404);
        res.end("記事が見つかりません");
        return;
      }
      articles.splice(i, 1);
      saveArticles(articles);
      res.writeHead(302, { Location: "/" });
      res.end();
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("エラーが発生しました: " + err.message);
  }
});

server.requestTimeout = 0; // AI下書き生成が数分かかることがあるためタイムアウトを無効化
server.headersTimeout = 0;

server.listen(PORT, "127.0.0.1", () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Beauty DO ノート 記事編集画面を起動しました: ${url}`);
  console.log("このウィンドウを閉じると管理画面は終了します。");
  const openCmd = process.platform === "win32" ? `start "" "${url}"` : `open "${url}"`;
  exec(openCmd);
});
