import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'posts');

if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  let modifiedCount = 0;

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;

    content = content.replace(/\r?\n\r?\nSource:\s*Shiksha\.com.*$/gim, '');
    content = content.replace(/\r?\nSource:\s*Shiksha\.com.*$/gim, '');
    content = content.replace(/^Source:\s*Shiksha.*$/gim, '');
    content = content.replace(/^Source:\s*.*Shiksha\.com.*$/gim, '');
    content = content.replace(/^\*Source:\s*.*Shiksha.*\*$/gim, '');
    content = content.replace(/For more insights on online universities and courses, explore \[Online Shiksha\]\(https:\/\/onlineshiksha\.online\/\)\.?/gim, '');

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      modifiedCount++;
    }
  }

  console.log(`Successfully cleaned Shiksha credits from ${modifiedCount} markdown files.`);
}
