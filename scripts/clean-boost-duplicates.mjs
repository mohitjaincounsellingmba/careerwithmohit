import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');

function cleanDuplicates() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  console.log(`🧹 Cleaning duplicate preparation sections from ${files.length} blogs...`);

  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    // Regex to match "Boost Your Preparation" sections non-greedily up to a horizontal rule or end of file
    const regex = /(?:---\s*\n)?###\s*(?:🚀\s*)?Boost Your Preparation\n+Looking for more resources\?[\s\S]*?(?:\n\s*---|\n\s*$|$)/gi;

    content = content.replace(regex, '');

    // Replace consecutive horizontal rules (2 or more) with a single one
    content = content.replace(/(?:\n\s*---){2,}/g, '\n\n---');

    // Clean up trailing horizontal rules or spaces at the end of the file
    content = content.trim();
    while (content.endsWith('---')) {
      content = content.slice(0, -3).trim();
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
    }
  });

  console.log(`🧹 Done! Cleaned up ${updatedCount} files.`);
}

cleanDuplicates();
