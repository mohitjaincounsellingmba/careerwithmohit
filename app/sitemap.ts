import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.careerwithmohit.online';

  // Static routes
  const routes = [
    '',
    '/news',
    '/blog',
    '/search',
    '/about',
    '/privacy',
    '/terms',
    '/colleges',
    '/certifications',
    '/internships',
    '/inquiry',
    '/online-degree-certification',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : (route === '/colleges' || route === '/online-degree-certification' ? 0.9 : 0.8),
  }));

  // Dynamic blog routes
  const posts = getSortedPostsData();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic college routes
  const collegesDir = path.join(process.cwd(), 'colleges');
  let collegeRoutes: MetadataRoute.Sitemap = [];
  try {
    const collegeFiles = fs.readdirSync(collegesDir);
    collegeRoutes = collegeFiles
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({
        url: `${baseUrl}/colleges/${file.replace('.md', '')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
  } catch {
    // colleges directory not found, skip
  }

  return [...routes, ...blogRoutes, ...collegeRoutes];
}
