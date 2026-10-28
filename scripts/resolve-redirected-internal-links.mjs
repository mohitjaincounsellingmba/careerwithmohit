import fs from 'fs';
import path from 'path';

console.log('Resolving all internal links pointing to 301 redirects...');

const redirectsCsv = fs.readFileSync(path.join(process.cwd(), 'REDIRECT_MAP.csv'), 'utf8');
const redirectMap = new Map();

redirectsCsv.split('\n').forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 2) {
    try {
      const fromUrl = new URL(parts[0].trim());
      const toUrl = new URL(parts[1].trim());
      const fromPath = fromUrl.pathname.toLowerCase().replace(/\/$/, '');
      const toPath = toUrl.pathname.endsWith('/') ? toUrl.pathname : toUrl.pathname + '/';
      redirectMap.set(fromPath, toPath);
    } catch {}
  }
});

console.log(`Loaded ${redirectMap.size} redirect rules for link resolution.`);

let filesUpdated = 0;
let totalLinksReplaced = 0;

function resolveInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [from, to] of redirectMap.entries()) {
    // Check if content contains from
    if (content.toLowerCase().includes(from)) {
      // Replace markdown links: ](/blog/old-slug) or ](/blog/old-slug/)
      const regex1 = new RegExp(`(\\]\\()(${from})\\/?([\\)\\?#])`, 'gi');
      content = content.replace(regex1, (m, p1, p2, p3) => {
        totalLinksReplaced++;
        return `${p1}${to}${p3 === ')' ? ')' : p3}`;
      });

      // Replace href="/blog/old-slug" or href="/blog/old-slug/"
      const regex2 = new RegExp(`(href=["'\`])(${from})\\/?(["'\`])`, 'gi');
      content = content.replace(regex2, (m, p1, p2, p3) => {
        totalLinksReplaced++;
        return `${p1}${to}${p3}`;
      });

      // Replace full domain links
      const regex3 = new RegExp(`(https:\\/\\/careerwithmohit\\.online)(${from})\\/?([\\s"'\\)\\?#])`, 'gi');
      content = content.replace(regex3, (m, p1, p2, p3) => {
        totalLinksReplaced++;
        return `https://careerwithmohit.online${to}${p3}`;
      });
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesUpdated++;
  }
}

// 1. Walk posts/
const postsDir = path.join(process.cwd(), 'posts');
fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).forEach(f => resolveInFile(path.join(postsDir, f)));

// 2. Walk colleges/
const collegesDir = path.join(process.cwd(), 'colleges');
if (fs.existsSync(collegesDir)) {
  fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')).forEach(f => resolveInFile(path.join(collegesDir, f)));
}

// 3. Walk app/ and components/
function walkDir(dir) {
  fs.readdirSync(dir).forEach(item => {
    if (item === 'node_modules' || item === '.next' || item === '.git' || item === 'out') return;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) walkDir(full);
    else if (/\.(tsx|ts|jsx|js|mjs)$/.test(item)) resolveInFile(full);
  });
}
walkDir(path.join(process.cwd(), 'app'));
walkDir(path.join(process.cwd(), 'components'));

console.log(`✅ Fixed redirected links in ${filesUpdated} files. Total links flattened: ${totalLinksReplaced}`);
