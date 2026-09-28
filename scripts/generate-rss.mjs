import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BASE_URL = 'https://careerwithmohit.online';

function generateRss() {
  if (!fs.existsSync(POSTS_DIR)) return;

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = [];

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data } = matter(content);
      const slug = file.replace(/\.md$/, '');
      if (data.title) {
        posts.push({
          title: data.title,
          description: data.description || '',
          slug,
          date: data.date ? new Date(data.date) : new Date(),
        });
      }
    } catch (e) {}
  });

  // Sort by date descending
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  const recentPosts = posts.slice(0, 50);

  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  };

  const itemsXml = recentPosts.map(p => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}/</link>
      <guid>${BASE_URL}/blog/${p.slug}/</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CareerWithMohit - MBA Admissions &amp; Career Guidance</title>
    <link>${BASE_URL}/</link>
    <description>Expert career guidance, MBA/PGDM admissions consulting, college reviews and test prep by Mohit Jain.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rssXml, 'utf8');
  console.log(`✅ Generated RSS feed with ${recentPosts.length} items at public/feed.xml`);
}

generateRss();
