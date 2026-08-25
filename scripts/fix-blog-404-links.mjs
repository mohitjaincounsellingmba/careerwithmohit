import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(process.cwd(), 'posts');

function fixLinks() {
  console.log('🔍 Scanning posts directory for invalid /posts/ links and .md link extensions...');

  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // 1. Replace (/posts/slug.md) -> (/blog/slug)
    content = content.replace(/\(\/posts\/([^)]+)\.md\)/g, '(/blog/$1)');
    
    // 2. Replace (/posts/slug) -> (/blog/slug)
    content = content.replace(/\(\/posts\/([^)]+)\)/g, '(/blog/$1)');

    // 3. Replace (/blog/slug.md) -> (/blog/slug)
    content = content.replace(/\(\/blog\/([^)]+)\.md\)/g, '(/blog/$1)');

    // 4. Replace (/colleges/slug.md) -> (/colleges/$1)
    content = content.replace(/\(\/colleges\/([^)]+)\.md\)/g, '(/colleges/$1)');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`✅ Fixed links in: ${file}`);
    }
  });

  console.log(`\n--- SUMMARY ---`);
  console.log(`Total Files Scanned: ${files.length}`);
  console.log(`Files Fixed: ${updatedCount}`);
}

fixLinks();
