// サイト設定
// 日付の表示形式はここを書き換えるだけで、サイト全体に反映されます。
// 選べる値: "ja-long" (2026年9月4日) / "ja-short" (2026/09/04)
//           "dot" (2026.09.04) / "iso" (2026-09-04)
const SITE_CONFIG = {
  dateFormat: "ja-long",
};

// ISO形式("YYYY-MM-DD")の日付文字列を、SITE_CONFIG.dateFormat に従って整形する。
function formatDate(isoDateStr, format = SITE_CONFIG.dateFormat) {
  const [y, m, d] = isoDateStr.split("-").map(Number);

  switch (format) {
    case "ja-short":
      return `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`;
    case "dot":
      return `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
    case "iso":
      return isoDateStr;
    case "ja-long":
    default:
      return `${y}年${m}月${d}日`;
  }
}

// build.js（Node）から読み込むためのエクスポート。ブラウザでは無視される。
if (typeof module !== "undefined") {
  module.exports = { SITE_CONFIG, formatDate };
}
