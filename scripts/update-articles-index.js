const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const guidesDir = path.join(root, "guides");
const articlesPath = path.join(root, "articles.html");
const sitemapPath = path.join(root, "sitemap.xml");
const site = "https://tradepulsevalues.com";
const today = "2026-06-01";

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content);
}

function stripTags(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function match(html, pattern, fallback = "") {
  const result = html.match(pattern);
  return stripTags(result ? result[1] : fallback);
}

function titleCaseFromSlug(slug) {
  return slug
    .replace(/\.html$/, "")
    .split("-")
    .map(word => word ? word[0].toUpperCase() + word.slice(1) : "")
    .join(" ");
}

function articleMeta(fileName) {
  const file = path.join(guidesDir, fileName);
  const html = read(file);
  const title = match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i, match(html, /<title[^>]*>([\s\S]*?)<\/title>/i, titleCaseFromSlug(fileName)));
  const description = match(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i, "Read this Grow a Garden trading guide from TradePulse.");
  const firstParagraph = match(html, /<p[^>]*>([\s\S]*?)<\/p>/i, description);
  const dateMatch = fileName.match(/(20\d{2})-(\d{2})-(\d{2})/) || html.match(/Updated\s+([A-Z][a-z]+\s+\d{1,2},\s+20\d{2})/);
  const displayDate = dateMatch
    ? (dateMatch.length === 4 ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : dateMatch[1])
    : "Latest update";
  const tags = [
    title.toLowerCase().includes("pet") ? "pet values" : null,
    title.toLowerCase().includes("mutation") ? "mutations" : null,
    title.toLowerCase().includes("code") ? "codes" : null,
    title.toLowerCase().includes("trade") ? "trading" : null,
    "Grow a Garden"
  ].filter(Boolean);

  return {
    fileName,
    urlPath: `/guides/${fileName}`,
    title,
    description: firstParagraph || description,
    displayDate,
    tags
  };
}

function renderArticlesPage(articles) {
  const cards = articles.map(article => `
    <section class="card">
      <h2><a href="${article.urlPath}">${article.title}</a></h2>
      <p class="meta">Updated ${article.displayDate}</p>
      <p>${article.description}</p>
      <p>${article.tags.map(tag => `<span class="pill">${tag}</span>`).join("")}</p>
    </section>`).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Grow a Garden Trading Articles and Weekly Updates | TradePulse</title>
  <meta name="description" content="Read TradePulse Grow a Garden trading articles, weekly value updates, pet guides, mutation notes and W/F/L market observations." />
  <meta name="keywords" content="Grow a Garden articles, Grow a Garden trading guide, Grow a Garden weekly update, Grow a Garden value update, TradePulse guides" />
  <link rel="canonical" href="${site}/articles.html" />
  <meta property="og:title" content="Grow a Garden Trading Articles - TradePulse" />
  <meta property="og:description" content="Weekly Grow a Garden trading notes, value updates and pet guides from TradePulse." />
  <meta property="og:url" content="${site}/articles.html" />
  <style>
    body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;color:#111827;line-height:1.55}.wrap{width:min(100% - 32px,900px);margin:auto}.top{border-bottom:1px solid #d8dee4;background:#fff}.top .wrap{display:flex;justify-content:space-between;align-items:center;gap:14px;min-height:64px}a{color:#d92d20;text-decoration:none;font-weight:800}.brand{font-size:24px;color:#111827}.nav{display:flex;gap:14px;flex-wrap:wrap}.hero{padding:42px 0 18px}.hero h1{font-size:clamp(32px,6vw,54px);line-height:1.04;margin:0 0 14px}.lead{font-size:18px;color:#667085;max-width:720px}.card{background:#fff;border:1px solid #d8dee4;border-radius:8px;padding:18px;margin:16px 0}.card h2{margin:0 0 8px}.meta{color:#667085}.pill{display:inline-block;border:1px solid #d8dee4;border-radius:999px;padding:7px 10px;margin:4px;background:#fff;color:#344054;font-size:14px;font-weight:800}.footer{border-top:1px solid #d8dee4;padding:24px 0;margin-top:32px;color:#667085}@media(max-width:700px){.top .wrap{align-items:flex-start;flex-direction:column;padding:12px 0}.hero{padding-top:28px}}
  </style>
</head>
<body>
  <header class="top">
    <div class="wrap">
      <a class="brand" href="/">TradePulse</a>
      <nav class="nav" aria-label="TradePulse pages">
        <a href="/values.html">Values</a>
        <a href="/trade-calculator.html">Calculator</a>
        <a href="/mutations.html">Mutations</a>
        <a href="/codes.html">Codes</a>
      </nav>
    </div>
  </header>
  <main class="wrap">
    <section class="hero">
      <h1>Grow a Garden Trading Articles</h1>
      <p class="lead">Weekly TradePulse notes for gardeners: value movement, pet trading ideas, mutation price changes and community W/F/L observations.</p>
    </section>
${cards}
    <section class="card">
      <h2>How weekly articles should work</h2>
      <p>New articles should be added to the <strong>guides</strong> folder. Each article should link back to the value list, W/F/L calculator, mutation calculator or codes page so readers can continue using the tools after reading.</p>
    </section>
  </main>
  <footer class="footer"><div class="wrap">TradePulse is an unofficial fan-made Roblox tool and is not affiliated with Roblox or Grow a Garden.</div></footer>
</body>
</html>
`;
}

function upsertSitemap(articles) {
  let sitemap = read(sitemapPath);
  const articleUrls = [`${site}/articles.html`, ...articles.map(article => `${site}${article.urlPath}`)];
  for (const url of articleUrls) {
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const block = `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith("/articles.html") ? "0.7" : "0.7"}</priority>
  </url>`;
    if (new RegExp(`<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>`, "m").test(sitemap)) {
      sitemap = sitemap.replace(new RegExp(`  <url>\\s*\\n\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?\\n\\s*<\\/url>`, "m"), block);
    } else {
      sitemap = sitemap.replace("\n</urlset>", `\n${block}\n</urlset>`);
    }
  }
  write(sitemapPath, sitemap);
}

const articles = fs.existsSync(guidesDir)
  ? fs.readdirSync(guidesDir)
      .filter(file => file.endsWith(".html"))
      .sort()
      .map(articleMeta)
  : [];

write(articlesPath, renderArticlesPage(articles));
upsertSitemap(articles);

console.log(`Updated articles.html with ${articles.length} article(s).`);
