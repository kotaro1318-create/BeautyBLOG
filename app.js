// 記事一覧のHTMLは build.js が articles.js から静的に生成し、index.html に
// 書き出し済み。ここではその上にアコーディオンの開閉と、一覧の高さ制御だけを足す
// (JSが動かない環境でも本文自体は読める状態を保つため)。

function enhanceArticles() {
  document.querySelectorAll(".article-item").forEach((li) => {
    const btn = li.querySelector(".article-toggle");
    const panel = li.querySelector(".article-panel");

    btn.addEventListener("click", () => {
      const isOpen = li.dataset.open === "true";

      document.querySelectorAll('.article-item[data-open="true"]').forEach((openItem) => {
        if (openItem !== li) {
          openItem.dataset.open = "false";
          openItem.querySelector(".article-toggle").setAttribute("aria-expanded", "false");
          openItem.querySelector(".article-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        li.dataset.open = "false";
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        li.dataset.open = "true";
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

// 一覧は折りたたみ状態の記事5件分の高さで区切り、残りは内部スクロールで見せる。
// 実際の行の高さ(フォント読み込み後の値)から計算するので、文言や画面幅が変わっても崩れない。
const VISIBLE_ARTICLE_COUNT = 5;

function capArticleListHeight() {
  const list = document.getElementById("article-list");
  const toggles = list.querySelectorAll(".article-toggle");
  const count = Math.min(VISIBLE_ARTICLE_COUNT, toggles.length);
  if (count === 0) return;

  let total = 0;
  for (let i = 0; i < count; i++) {
    total += toggles[i].getBoundingClientRect().height + 1; // +1px は行の下線(border-bottom)分
  }
  list.style.maxHeight = total + "px";
}

// ヒーローのビジュアル: 左側はくすみ・乾燥した肌テクスチャの揺らぎ、右側はつやと
// うるおいのある滑らかな曲線へと変わっていくイメージを1本の線で表現する。
function drawGlow() {
  const canvas = document.getElementById("glow");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height, midY = h / 2;

  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, "#6b5a63");
  grad.addColorStop(0.55, "#c98fa0");
  grad.addColorStop(1, "#f3c9d6");

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = grad;
  ctx.beginPath();

  const splitX = w * 0.5;
  let x = 0;
  let started = false;

  while (x <= w) {
    let y;
    if (x < splitX) {
      // くすみ・乾燥ゾーン: 細かく不規則な揺らぎ
      const jitter = Math.sin(x * 0.13) * 6 + Math.sin(x * 0.31) * 4;
      y = midY - Math.sin(x * 0.03) * 22 + jitter;
    } else {
      // うるおい・つやゾーン: なめらかで大きな波
      const t = x - splitX;
      y = midY - Math.sin(t * 0.028) * 34;
    }
    if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
    x += 4;
  }
  ctx.stroke();

  ctx.setLineDash([2, 6]);
  ctx.strokeStyle = "rgba(243,201,214,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(splitX, 20);
  ctx.lineTo(splitX, h - 20);
  ctx.stroke();
  ctx.setLineDash([]);

  // つやゾーンにきらめきを散らす
  const sparkles = [[splitX + 40, midY - 50], [splitX + 140, midY + 40], [splitX + 240, midY - 30], [splitX + 320, midY + 20]];
  ctx.fillStyle = "#f3c9d6";
  sparkles.forEach(([sx, sy]) => {
    if (sx > w) return;
    ctx.beginPath();
    ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#f3c9d6";
  ctx.font = "12px 'Zen Kaku Gothic New', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("CARE", splitX, 18);
}

function initGlowCanvas() {
  const canvas = document.getElementById("glow");
  const resize = () => {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    drawGlow();
  };
  window.addEventListener("resize", resize);
  resize();
}

document.addEventListener("DOMContentLoaded", () => {
  enhanceArticles();
  initGlowCanvas();
  capArticleListHeight();

  // Web フォント(Zen Old Mincho / Zen Kaku Gothic New)の読み込みで行の高さが
  // 変わることがあるため、読み込み完了後に一度計算し直す。
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(capArticleListHeight);
  }
  window.addEventListener("resize", capArticleListHeight);
});
