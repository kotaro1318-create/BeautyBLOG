// 静的サイトのビルドスクリプト。
// articles.js のデータから記事一覧(HTML)と構造化データ(JSON-LD)を生成し、
// index.html の <!-- ARTICLES:START/END --> と <!-- JSONLD:START/END --> の
// 間に書き込みます。記事を追加・編集したら articles.js を直し、
//   node build.js
// を実行してから index.html をデプロイしてください(index.html 自体は
// 手編集しないでください。ブラウザは JS を実行しなくても記事本文を読めるように、
// この静的HTMLがそのまま検索エンジンやAIクローラー向けの内容になります)。

const fs = require("fs");
const path = require("path");

const { ARTICLES } = require("./articles.js");
const { formatDate } = require("./config.js");

function escapeJs(str) {
  return String(str).replace(/</g, "\\u003c");
}

function renderArticleLi(article, index) {
  const hasSources = Array.isArray(article.sources) && article.sources.length > 0;
  const sourcesBlock = hasSources
    ? `<div class="sources">
              <div class="sources-label">出典</div>
              <ol>${article.sources
                .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a></li>`)
                .join("")}</ol>
            </div>`
    : "";

  return `      <li class="article-item" data-open="false">
        <button class="article-toggle" aria-expanded="false">
          <span class="num">${String(index + 1).padStart(2, "0")}</span>
          <span class="article-title-group">
            <span class="article-title">${article.title}</span>
            <span class="article-date">${formatDate(article.date)}</span>
          </span>
          <svg class="chev" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="article-panel">
          <div class="article-panel-inner">
            <div class="article-lead">
              <span class="lead-tag">結論</span>
              <p>${article.conclusion}</p>
            </div>
            <p>${article.body}</p>
            ${article.visual || ""}
            ${sourcesBlock}
          </div>
        </div>
      </li>`;
}

function renderJsonLd() {
  const items = ARTICLES.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Article",
      headline: a.title,
      description: a.conclusion,
      datePublished: a.date,
      inLanguage: "ja",
      ...(Array.isArray(a.sources) && a.sources.length > 0
        ? {
            citation: a.sources.map((s) => ({
              "@type": "CreativeWork",
              name: s.label,
              url: s.url,
            })),
          }
        : {}),
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Beauty DO ノート",
    description: "スキンケア成分の科学から世界の美容トレンド(K-beauty・J-beauty)、化粧品市場の統計まで、世界の学会・論文・調査機関の情報をもとに紹介する美容ブログ",
    inLanguage: "ja",
    blogPost: items.map((i) => i.item),
  };

  return `<script type="application/ld+json">\n${escapeJs(JSON.stringify(jsonLd, null, 2))}\n</script>`;
}

function replaceBetween(html, startMarker, endMarker, content) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Markers not found or out of order: ${startMarker} / ${endMarker}`);
  }
  const before = html.slice(0, start + startMarker.length);
  const after = html.slice(end);
  return `${before}\n${content}\n    ${after}`;
}

// ブロック要素ではなくテキストの一部を差し替えるための版(余計な改行を入れない)。
function replaceInline(html, startMarker, endMarker, content) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Markers not found or out of order: ${startMarker} / ${endMarker}`);
  }
  const before = html.slice(0, start + startMarker.length);
  const after = html.slice(end);
  return `${before}${content}${after}`;
}

function build() {
  const indexPath = path.join(__dirname, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  const articlesHtml = ARTICLES.map(renderArticleLi).join("\n");
  html = replaceBetween(
    html,
    "<!-- ARTICLES:START (このブロックは build.js が articles.js から自動生成します。手編集しないでください) -->",
    "<!-- ARTICLES:END -->",
    articlesHtml
  );

  html = replaceBetween(
    html,
    "<!-- JSONLD:START (build.js が articles.js から自動生成する構造化データ。手編集しないでください) -->",
    "<!-- JSONLD:END -->",
    renderJsonLd()
  );

  html = replaceInline(html, "<!-- COUNT:START -->", "<!-- COUNT:END -->", `${ARTICLES.length} ARTICLES`);

  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`Built index.html with ${ARTICLES.length} articles.`);
}

build();
