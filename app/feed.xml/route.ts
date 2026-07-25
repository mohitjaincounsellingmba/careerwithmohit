import { getSortedPostsData } from '@/lib/markdown';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getSortedPostsData().slice(0, 50);
  const siteUrl = 'https://www.careerwithmohit.online';

  const feedItems = posts.map((post) => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description || ''}]]></description>
      </item>
    `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Career with Mohit Blog</title>
      <link>${siteUrl}</link>
      <description>Latest insights and guides from Career with Mohit.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${feedItems}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
