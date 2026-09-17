import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');
const COMPONENTS_DIR = path.join(process.cwd(), 'components');
const LIB_DIR = path.join(process.cwd(), 'lib');
const DATA_DIR = path.join(process.cwd(), 'data');
const SCRIPTS_DIR = path.join(process.cwd(), 'scripts');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(tsx|ts|js|mjs|json)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = [
  ...walk(APP_DIR),
  ...walk(COMPONENTS_DIR),
  ...walk(LIB_DIR),
  ...walk(DATA_DIR),
  ...walk(SCRIPTS_DIR)
];

console.log(`Scanning ${allFiles.length} files for domain & canonical normalization...`);

let domainFixCount = 0;
let canonicalFixCount = 0;

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace www.careerwithmohit.online -> careerwithmohit.online
  if (content.includes('www.careerwithmohit.online')) {
    content = content.replace(/https:\/\/www\.careerwithmohit\.online/g, 'https://careerwithmohit.online');
    content = content.replace(/http:\/\/www\.careerwithmohit\.online/g, 'https://careerwithmohit.online');
    domainFixCount++;
  }

  // 2. Normalize canonical declarations to have trailing slashes
  // Matches canonical: '/some-path/' or canonical: "https://careerwithmohit.online/some-path/"
  content = content.replace(/canonical:\s*(['"`])(https:\/\/careerwithmohit\.online(\/[^'"`]*?)?)\1/g, (match, quote, url) => {
    if (url === 'https://careerwithmohit.online') {
      return `canonical: ${quote}https://careerwithmohit.online/${quote}`;
    }
    if (!url.endsWith('/') && !/\.[a-zA-Z0-9]+$/.test(url)) {
      return `canonical: ${quote}${url}/${quote}`;
    }
    return match;
  });

  content = content.replace(/canonical:\s*(['"`])(\/[^'"`]*?)\1/g, (match, quote, pathUrl) => {
    if (pathUrl === '/') {
      return `canonical: ${quote}/${quote}`;
    }
    if (!pathUrl.endsWith('/') && !/\.[a-zA-Z0-9]+$/.test(pathUrl)) {
      return `canonical: ${quote}${pathUrl}/${quote}`;
    }
    return match;
  });

  // Handle PAGE_URL or template literals like `https://careerwithmohit.online${hub.route}`
  content = content.replace(/canonical:\s*`https:\/\/careerwithmohit\.online\${hub\.route}`/g, 'canonical: `https://careerwithmohit.online${hub.route}/`');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    canonicalFixCount++;
    console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
  }
});

console.log(`\n✅ Normalization Complete!`);
console.log(`   Files fixed for domain / canonicals: ${canonicalFixCount}`);
