const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const items = require(path.join(root, "data", "items.json"));
const today = "2026-05-29";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

const unique = new Map();
for (const item of items) {
  const current = unique.get(item.name);
  const nextValue = item.sortValue || item.value || 0;
  const currentValue = current ? current.sortValue || current.value || 0 : -1;
  if (!current || nextValue > currentValue) unique.set(item.name, item);
}

const featured = Array.from(unique.values())
  .sort((a, b) => (b.sortValue || b.value || 0) - (a.sortValue || a.value || 0))
  .slice(0, 30);

const outDir = path.join(root, "items");
fs.mkdirSync(outDir, { recursive: true });

function pageFor(item) {
  const name = cleanText(item.name);
  const type = cleanText(item.type || "Item");
  const rarity = cleanText(item.rarity || "Unknown rarity");
  const value = cleanText(item.valueLabel || item.value || item.sortValue || "Community estimate");
  const demand = cleanText(item.demand || "Community estimate");
  const trend = cleanText(item.trend || "Stable");
  const slug = `${slugify(item.name)}-value.html`;
  const url = `https://tradepulsevalues.com/items/${slug}`;
  const isCrop = type.toLowerCase() === "crop";
  const relatedTool = isCrop
    ? '<a href="/mutations.html">Mutation calculator</a>'
    : '<a href="/trade-calculator.html">W/F/L trade calculator</a>';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(name)} Value - Grow a Garden ${escapeHtml(type)} Worth | TradePulse</title>
  <meta name="description" content="Check ${escapeHtml(name)} value in Grow a Garden. See estimated worth, rarity, demand, trend and use TradePulse to compare this ${escapeHtml(type)} in W/F/L trades." />
  <meta name="keywords" content="${escapeHtml(name)} value, ${escapeHtml(name)} worth, Grow a Garden ${escapeHtml(name)}, ${escapeHtml(name)} trade value, Grow a Garden ${escapeHtml(type)} values" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${escapeHtml(name)} Value - TradePulse" />
  <meta property="og:description" content="Grow a Garden ${escapeHtml(name)} value, demand, trend and trade calculator links." />
  <meta property="og:url" content="${url}" />
  <style>
    body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;color:#111827;line-height:1.55}.wrap{width:min(100% - 32px,860px);margin:auto}.top{border-bottom:1px solid #d8dee4;background:#fff}.top .wrap{display:flex;justify-content:space-between;align-items:center;min-height:64px}a{color:#d92d20;text-decoration:none;font-weight:800}.brand{font-size:24px;color:#111827}.hero{padding:42px 0 18px}.hero h1{font-size:clamp(32px,6vw,54px);line-height:1.04;margin:0 0 14px}.lead{font-size:18px;color:#667085;max-width:720px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.card{background:#fff;border:1px solid #d8dee4;border-radius:8px;padding:18px;margin:16px 0}.stat{display:flex;justify-content:space-between;gap:12px;border-top:1px solid #eef1f4;padding-top:10px;margin-top:10px}.btn{display:inline-block;background:#d92d20;color:#fff;border-radius:8px;padding:12px 16px;margin:10px 8px 0 0}.pill{display:inline-block;border:1px solid #d8dee4;border-radius:999px;padding:7px 10px;margin:4px;background:#fff;color:#344054}.footer{border-top:1px solid #d8dee4;padding:24px 0;margin-top:32px;color:#667085}@media(max-width:700px){.grid{grid-template-columns:1fr}.hero{padding-top:28px}}
  </style>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-1W9TBD5TVF"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-1W9TBD5TVF");
  </script>
</head>
<body>
  <header class="top"><div class="wrap"><a class="brand" href="/">TradePulse</a><a href="/values.html">All Values</a></div></header>
  <main class="wrap">
    <section class="hero">
      <h1>${escapeHtml(name)} Value in Grow a Garden</h1>
      <p class="lead">Check the current TradePulse estimate for ${escapeHtml(name)}, then compare it in a Grow a Garden W/F/L trade before accepting a deal.</p>
      <a class="btn" href="/#calculator">Use trade calculator</a><a class="btn" href="/#market">Post for community votes</a>
    </section>
    <section class="grid">
      <article class="card">
        <h2>${escapeHtml(name)} worth</h2>
        <div class="stat"><strong>Type</strong><span>${escapeHtml(type)}</span></div>
        <div class="stat"><strong>Rarity</strong><span>${escapeHtml(rarity)}</span></div>
        <div class="stat"><strong>Estimated value</strong><span>${escapeHtml(value)}</span></div>
        <div class="stat"><strong>Demand</strong><span>${escapeHtml(demand)}</span></div>
        <div class="stat"><strong>Trend</strong><span>${escapeHtml(trend)}</span></div>
      </article>
      <article class="card">
        <h2>How to trade ${escapeHtml(name)}</h2>
        <p>Use this page as a quick value reference, then check recent community votes. A high value item can still be hard to trade if demand is weak, while a popular item may trade above list value during updates.</p>
        <p>${relatedTool} | <a href="/values.html">Grow a Garden values</a> | <a href="/codes.html">Codes</a></p>
      </article>
    </section>
    <section class="card">
      <h2>${escapeHtml(name)} value FAQ</h2>
      <p><strong>Is ${escapeHtml(name)} value official?</strong> No. TradePulse is a fan-made value tracker, so treat this as a community estimate.</p>
      <p><strong>Why can ${escapeHtml(name)} worth change?</strong> Values can move because of game updates, demand, event supply, rarity changes and player trading trends.</p>
      <p><strong>How should I check a ${escapeHtml(name)} trade?</strong> Add both sides to the TradePulse calculator and share the trade to collect W/F/L votes.</p>
      <p><span class="pill">${escapeHtml(name)} value</span><span class="pill">${escapeHtml(name)} worth</span><span class="pill">Grow a Garden ${escapeHtml(name)}</span><span class="pill">${escapeHtml(name)} WFL</span></p>
    </section>
  </main>
  <footer class="footer"><div class="wrap">TradePulse is an unofficial fan-made Roblox tool and is not affiliated with Roblox or Grow a Garden.</div></footer>
</body>
</html>
`;
}

for (const item of featured) {
  fs.writeFileSync(path.join(outDir, `${slugify(item.name)}-value.html`), pageFor(item));
}

const itemUrls = featured.map(item => `  <url>
    <loc>https://tradepulsevalues.com/items/${slugify(item.name)}-value.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n");

const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
sitemap = sitemap.replace(/\n  <url>\n    <loc>https:\/\/tradepulsevalues\.com\/items\/[\s\S]*?<\/urlset>/, "\n</urlset>");
sitemap = sitemap.replace("\n</urlset>", `\n${itemUrls}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Generated ${featured.length} item pages.`);
