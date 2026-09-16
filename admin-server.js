// Beauty DO ノート:記事編集用のローカル管理画面サーバー
// 起動: node admin-server.js (ブラウザが自動で開きます)
// 保存すると articles.js を書き換え、続けて build.js を実行して index.html にも反映します。

const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync, exec } = require("child_process");
const querystring = require("querystring");

const PORT = 5055;
const ARTICLES_PATH = path.join(__dirname, "articles.js");

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
  const rows = articles
    .map(
      (a, i) => `      <div class="list-item">
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
      <a class="button" href="/edit/new">+ 新規記事</a>
    </div>
${rows}`
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

server.listen(PORT, "127.0.0.1", () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Beauty DO ノート 記事編集画面を起動しました: ${url}`);
  console.log("このウィンドウを閉じると管理画面は終了します。");
  const openCmd = process.platform === "win32" ? `start "" "${url}"` : `open "${url}"`;
  exec(openCmd);
});
