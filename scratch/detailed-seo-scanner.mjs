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

const pageFiles = walk(path.join(process.cwd(), "app")).filter(f => 
  (f.endsWith("/page.tsx") || f.endsWith("/page.ts") || f.endsWith("/page.jsx") || f.endsWith("/page.js")) &&
  !f.includes('/admin/') && !f.includes('/api/')
);

console.log(`Auditing ${pageFiles.length} page files...`);

const report = [];

pageFiles.forEach(file => {
  const relPath = path.relative(process.cwd(), file);
  const route = "/" + relPath
    .replace(/^app\//, '')
    .replace(/\/page\.(tsx|ts|jsx|js)$/, '')
    .replace(/^page\.(tsx|ts|jsx|js)$/, '');

  const content = fs.readFileSync(file, 'utf8');

  const isClient = content.startsWith('"use client"') || content.startsWith("'use client'");
  const hasMetadata = content.includes('export const metadata') || content.includes('export async function generateMetadata');
  const hasCanonical = content.includes('canonical');
  const hasOg = content.includes('openGraph');
  const hasTwitter = content.includes('twitter');
  const hasJsonLd = content.includes('JsonLd') || content.includes('application/ld+json');
  
  // H1 tag analysis
  const h1s = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  report.push({
    route,
    file: relPath,
    isClient,
    hasMetadata,
    hasCanonical,
    hasOg,
    hasTwitter,
    hasJsonLd,
    h1Count: h1s.length,
    h1s: h1s.slice(0, 3)
  });
});

console.log("\n================ DETAILED FINDINGS ================");
console.log("\n1. CLIENT COMPONENT PAGES WITH NO SERVER METADATA:");
report.filter(r => r.isClient && !r.hasMetadata).forEach(r => console.log(`  - ${r.route} (${r.file})`));

console.log("\n2. PAGES MISSING CANONICAL TAGS:");
report.filter(r => !r.hasCanonical).forEach(r => console.log(`  - ${r.route}`));

console.log("\n3. PAGES MISSING OPEN GRAPH METADATA:");
report.filter(r => !r.hasOg).forEach(r => console.log(`  - ${r.route}`));

console.log("\n4. PAGES MISSING JSON-LD STRUCTURED DATA:");
report.filter(r => !r.hasJsonLd).forEach(r => console.log(`  - ${r.route}`));

console.log("\n5. PAGES WITH MULTIPLE OR ZERO H1 TAGS (excluding dynamic renderers):");
report.filter(r => (r.h1Count !== 1) && !r.route.includes('[')).forEach(r => {
  console.log(`  - ${r.route}: ${r.h1Count} H1s found -> [${r.h1s.join(' | ')}]`);
});
