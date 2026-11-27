import fs from "fs";
import path from "path";

console.log("Starting comprehensive URL inventory generation...");

const protectedPath = path.join(process.cwd(), "seo-recovery", "PROTECTED_URLS.json");
const protectedData = JSON.parse(fs.readFileSync(protectedPath, "utf8"));
const protectedPostUrls = new Set(protectedData.post_urls || []);
const protectedCollegeUrls = new Set(protectedData.college_urls || []);
const protectedStaticUrls = new Set(protectedData.static_urls || []);

const postsDir = path.join(process.cwd(), "posts");
const collegesDir = path.join(process.cwd(), "colleges");
const archivedDir = path.join(process.cwd(), "posts_archived_duplicates");

const activePosts = new Set(fs.readdirSync(postsDir).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, "")));
const activeColleges = new Set(fs.readdirSync(collegesDir).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, "")));
const archivedPosts = fs.existsSync(archivedDir) ? new Set(fs.readdirSync(archivedDir).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""))) : new Set();

// Find all static pages in app/
const staticAppRoutes = new Set();
function findAppStatic(dir, cur = '') {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  if (items.includes('page.tsx') || items.includes('page.jsx') || items.includes('page.js')) {
    if (!cur.includes('[')) {
      let r = cur || '/';
      if (!r.startsWith('/')) r = '/' + r;
      if (!r.endsWith('/')) r = r + '/';
      staticAppRoutes.add(r.toLowerCase());
    }
  }
  items.forEach(i => {
    if (i.startsWith('_') || i.startsWith('.') || i === 'api') return;
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) findAppStatic(f, cur + '/' + i);
  });
}
findAppStatic(path.join(process.cwd(), 'app'));

// Load redirect map from functions/_middleware.ts
const middlewarePath = path.join(process.cwd(), "functions", "_middleware.ts");
const middlewareContent = fs.readFileSync(middlewarePath, "utf8");
const match = middlewareContent.match(/const REDIRECT_MAP: Record<string, string> = (\{[\s\S]*?\});/);
const redirectMap = JSON.parse(match[1]);

// Count internal links in posts and colleges
const internalInboundCounts = new Map();
function countLinksInFiles(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    const matches = text.matchAll(/\[([^\]]+)\]\((\/(?:blog|colleges)\/[^)\s#?]+)\)/g);
    for (const m of matches) {
      let target = m[2];
      if (!target.endsWith("/")) target += "/";
      const fullUrl = `https://careerwithmohit.online${target}`;
      internalInboundCounts.set(fullUrl, (internalInboundCounts.get(fullUrl) || 0) + 1);
    }
  }
}
countLinksInFiles(postsDir, "/blog/");
countLinksInFiles(collegesDir, "/colleges/");

// Gather all unique URLs
const allUrlEntries = new Map();

// Helper to simulate status and hops
function evaluateUrl(urlStr) {
  let u = urlStr;
  let hops = 0;
  let current = u.replace("https://careerwithmohit.online", "").toLowerCase();
  if (!current.startsWith("/")) current = "/" + current;
  const maxHops = 5;

  while (hops < maxHops) {
    const norm = current.length > 1 && current.endsWith("/") ? current.slice(0, -1) : current;
    let target = redirectMap[norm] || redirectMap[current] || null;
    if (target) {
      hops++;
      let finalTarget = target.toLowerCase();
      if (!finalTarget.endsWith("/") && !finalTarget.includes("?") && !finalTarget.includes("#")) {
        finalTarget += "/";
      }
      current = finalTarget;
    } else {
      break;
    }
  }

  const finalUrl = `https://careerwithmohit.online${current}`;
  let status = 200;
  if (hops > 0) {
    status = 301;
  }

  // Check if final URL exists
  let exists = false;
  const cleanFinalPath = current.endsWith('/') ? current : current + '/';

  if (staticAppRoutes.has(cleanFinalPath) || cleanFinalPath === '/' || cleanFinalPath === '/colleges/' || cleanFinalPath === '/blog/') {
    exists = true;
  } else if (cleanFinalPath.startsWith('/blog/')) {
    const slug = cleanFinalPath.replace('/blog/', '').replace(/\/$/, '');
    exists = activePosts.has(slug);
  } else if (cleanFinalPath.startsWith('/colleges/')) {
    const slug = cleanFinalPath.replace('/colleges/', '').replace(/\/$/, '');
    exists = activeColleges.has(slug) || staticAppRoutes.has(cleanFinalPath);
  } else if (cleanFinalPath.startsWith('/resources/') || cleanFinalPath.startsWith('/tools/') || cleanFinalPath.startsWith('/calculator/') || cleanFinalPath.startsWith('/abroad-education/') || cleanFinalPath.startsWith('/online-degree-certification/')) {
    exists = true;
  }

  if (hops === 0 && !exists) {
    status = 404;
  }

  return { status, finalUrl, hops };
}

// 1. Add all protected URLs (Category A)
for (const u of protectedPostUrls) allUrlEntries.set(u, { source: "Protected Post Baseline", had_impressions_pre_14sept: "yes", category: "A" });
for (const u of protectedCollegeUrls) allUrlEntries.set(u, { source: "Protected College Baseline", had_impressions_pre_14sept: "yes", category: "A" });
for (const u of protectedStaticUrls) allUrlEntries.set(u, { source: "Protected Static Hub", had_impressions_pre_14sept: "yes", category: "A" });

// 2. Add all current posts
for (const p of activePosts) {
  const u = `https://careerwithmohit.online/blog/${p}/`;
  if (!allUrlEntries.has(u)) {
    allUrlEntries.set(u, { source: "Current Live Post", had_impressions_pre_14sept: "no", category: "B" });
  }
}

// 3. Add all current colleges
for (const c of activeColleges) {
  const u = `https://careerwithmohit.online/colleges/${c}/`;
  if (!allUrlEntries.has(u)) {
    allUrlEntries.set(u, { source: "Current Live College", had_impressions_pre_14sept: "no", category: "B" });
  }
}

// 4. Add all redirect sources from REDIRECT_MAP
for (const [fromPath, toPath] of Object.entries(redirectMap)) {
  const normFrom = fromPath.startsWith("/") ? fromPath : "/" + fromPath;
  const u = `https://careerwithmohit.online${normFrom}${normFrom.endsWith("/") ? "" : "/"}`;
  if (!allUrlEntries.has(u)) {
    allUrlEntries.set(u, { source: "Edge Redirect Rule", had_impressions_pre_14sept: "no", category: "C" });
  }
}

// 5. Add archived duplicates
for (const a of archivedPosts) {
  const u = `https://careerwithmohit.online/blog/${a}/`;
  if (!allUrlEntries.has(u)) {
    allUrlEntries.set(u, { source: "Archived Duplicate", had_impressions_pre_14sept: "no", category: "C" });
  }
}

// Process and classify all URLs
const csvRows = ["url,source,http_status,final_url,redirect_hops,canonical,meta_robots,in_sitemap,internal_links_in,had_impressions_pre_14sept,category"];
const categoryCounts = { A: 0, B: 0, C: 0, D: 0 };
const statusCounts = { 200: 0, 301: 0, 404: 0, 410: 0 };

for (const [url, info] of allUrlEntries.entries()) {
  const { status, finalUrl, hops } = evaluateUrl(url);
  const inSitemap = status === 200 && (url.startsWith("https://careerwithmohit.online/blog/") || url.startsWith("https://careerwithmohit.online/colleges/") || protectedStaticUrls.has(url)) ? "yes" : "no";
  const internalIn = internalInboundCounts.get(url) || 0;
  const canonical = status === 200 ? url : finalUrl;
  const metaRobots = status === 200 ? "index, follow" : "noindex";

  categoryCounts[info.category] = (categoryCounts[info.category] || 0) + 1;
  statusCounts[status] = (statusCounts[status] || 0) + 1;

  csvRows.push(`"${url}","${info.source}",${status},"${finalUrl}",${hops},"${canonical}","${metaRobots}","${inSitemap}",${internalIn},"${info.had_impressions_pre_14sept}","${info.category}"`);
}

const csvOutput = csvRows.join("\n");
const outCsvPath = path.join(process.cwd(), "seo-recovery", "url-inventory.csv");
fs.writeFileSync(outCsvPath, csvOutput, "utf8");

console.log("✅ Successfully generated seo-recovery/url-inventory.csv with", csvRows.length - 1, "URLs.");
console.log("\nSummary by Category:");
console.table(categoryCounts);
console.log("\nSummary by Status Code:");
console.table(statusCounts);
