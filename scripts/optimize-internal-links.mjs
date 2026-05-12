import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const COLLEGES_DIR = path.join(process.cwd(), 'colleges');
const POSTS_DIR = path.join(process.cwd(), 'posts');

function getColleges() {
  const files = fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md'));
  const colleges = [];
  files.forEach(file => {
    const content = fs.readFileSync(path.join(COLLEGES_DIR, file), 'utf8');
    const { data } = matter(content);
    if (data.name) {
      colleges.push({
        name: data.name,
        slug: file.replace('.md', '')
      });
    }
  });
  return colleges;
}

function optimize() {
  const colleges = getColleges();
  console.log(`Found ${colleges.length} colleges.`);

  const posts = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  let totalLinksAdded = 0;

  posts.forEach(postFile => {
    const postPath = path.join(POSTS_DIR, postFile);
    let content = fs.readFileSync(postPath, 'utf8');
    let originalContent = content;

    // Sort colleges by name length descending to avoid partial matches (e.g., "IMS" vs "IMS Noida")
    colleges.sort((a, b) => b.name.length - a.name.length);

    colleges.forEach(college => {
      // Avoid linking if already linked or in a heading
      // This is a simple regex, could be improved
      // We look for the name not preceded by [ and not followed by ]
      // and also not part of another word
      const escapedName = college.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Look for the name specifically when it's NOT inside a markdown link [text](url)
      // and NOT inside a markdown heading #, ##, etc.
      // Negative lookbehind for [ and negative lookahead for ]( are hard in JS regex without more complex logic
      
      // Simple approach: replace first occurrence that isn't already a link
      const regex = new RegExp(`(?<!\\[)${escapedName}(?!\\])`, 'g');
      
      if (content.match(regex)) {
        // Only link the first occurrence
        let count = 0;
        content = content.replace(regex, (match) => {
          if (count === 0) {
            count++;
            totalLinksAdded++;
            return `[${match}](/colleges/${college.slug})`;
          }
          return match;
        });
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(postPath, content);
      console.log(`✅ Optimized: ${postFile}`);
    }
  });

  console.log(`Total links added: ${totalLinksAdded}`);
}

optimize();
