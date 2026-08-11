import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules" && file !== ".next" && file !== "out") {
        results = results.concat(walk(filePath));
      }
    } else {
      if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".js")) {
        results.push(filePath);
      }
    }
  });
  return results;
}

console.log("=== COMPREHENSIVE TECHNICAL SEO AUDIT ===");

const pageFiles = walk(path.join(process.cwd(), "app")).filter(f => 
  f.endsWith("/page.tsx") || f.endsWith("/page.ts") || f.endsWith("/page.jsx") || f.endsWith("/page.js")
);

const issues = {
  missingMetadata: [],
  missingCanonical: [],
  missingOpenGraph: [],
  missingJsonLd: [],
  missingH1: [],
  multipleH1: [],
  missingImageAlt: [],
  sitemapMissingPages: [],
  brokenSitemapLinks: []
};

// Check Sitemap routes
const sitemapFile = path.join(process.cwd(), 'app', 'sitemap.ts');
let sitemapContent = fs.readFileSync(sitemapFile, 'utf8');

// Parse sitemap static routes
const staticRouteMatches = sitemapContent.match(/routes\s*=\s*\[([\s\S]*?)\]\.map/);
let sitemapStaticRoutes = [];
if (staticRouteMatches) {
  const routesBlock = staticRouteMatches[1];
  sitemapStaticRoutes = [...routesBlock.matchAll(/'([^']*)'/g)].map(m => m[1]);
}

console.log(`Found ${sitemapStaticRoutes.length} static routes in sitemap.ts`);

// Analyze each page file
pageFiles.forEach(file => {
  const relPath = path.relative(process.cwd(), file);
  const routePath = "/" + relPath
    .replace(/^app\//, '')
    .replace(/\/page\.(tsx|ts|jsx|js)$/, '')
    .replace(/^page\.(tsx|ts|jsx|js)$/, '');

  const content = fs.readFileSync(file, 'utf8');

  // Check if admin or private
  if (routePath.startsWith('/admin') || routePath.startsWith('/api')) {
    return;
  }

  // 1. Metadata check
  const hasMetadata = content.includes('export const metadata') || 
                      content.includes('export async function generateMetadata') ||
                      content.includes('originalMetadata');
  if (!hasMetadata) {
    issues.missingMetadata.push({ route: routePath, file: relPath });
  }

  // 2. Canonical check
  const hasCanonical = content.includes('canonical') || content.includes('alternates');
  if (!hasCanonical) {
    issues.missingCanonical.push({ route: routePath, file: relPath });
  }

  // 3. OpenGraph check
  const hasOg = content.includes('openGraph') || content.includes('og:');
  if (!hasOg) {
    issues.missingOpenGraph.push({ route: routePath, file: relPath });
  }

  // 4. JSON-LD check
  const hasJsonLd = content.includes('JsonLd') || content.includes('@context') || content.includes('application/ld+json');
  if (!hasJsonLd) {
    issues.missingJsonLd.push({ route: routePath, file: relPath });
  }

  // 5. Check H1 tags in JSX/TSX
  const h1Matches = content.match(/<h1[\s>]/g);
  if (!h1Matches && !content.includes('ReactMarkdown') && !content.includes('Client')) {
    issues.missingH1.push({ route: routePath, file: relPath });
  } else if (h1Matches && h1Matches.length > 1) {
    issues.multipleH1.push({ route: routePath, file: relPath, count: h1Matches.length });
  }

  // 6. Check images without alt
  const imgMatches = content.match(/<img[^>]*>|<Image[^>]*>/g) || [];
  imgMatches.forEach(img => {
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      issues.missingImageAlt.push({ route: routePath, file: relPath, imgSnippet: img.slice(0, 80) });
    }
  });

  // 7. Check if page is in sitemap
  // Exclude dynamic parameters like [slug], [exam], [university]
  if (!routePath.includes('[')) {
    const isPresentInSitemap = sitemapStaticRoutes.includes(routePath) || sitemapStaticRoutes.includes(routePath.replace(/^\//, ''));
    if (!isPresentInSitemap) {
      issues.sitemapMissingPages.push(routePath);
    }
  }
});

console.log("\n--- AUDIT SUMMARY ---");
console.log(`Missing Metadata (${issues.missingMetadata.length} pages):`, issues.missingMetadata.map(i => i.route));
console.log(`Missing Canonical (${issues.missingCanonical.length} pages):`, issues.missingCanonical.map(i => i.route));
console.log(`Missing OpenGraph (${issues.missingOpenGraph.length} pages):`, issues.missingOpenGraph.map(i => i.route));
console.log(`Missing JSON-LD Schema (${issues.missingJsonLd.length} pages):`, issues.missingJsonLd.map(i => i.route));
console.log(`Multiple H1s (${issues.multipleH1.length} pages):`, issues.multipleH1);
console.log(`Missing from Sitemap.ts (${issues.sitemapMissingPages.length} static pages):`, issues.sitemapMissingPages);
