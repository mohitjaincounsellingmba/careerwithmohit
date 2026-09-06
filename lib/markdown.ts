import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

import { inferCategory, type PostData } from './blog-categories';
export * from './blog-categories';

let postsCache: PostData[] | null = null;

const publicDirectory = path.join(process.cwd(), 'public');

function getValidImage(img: any): string {
  if (!img || typeof img !== 'string') return '';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  const cleanPath = img.startsWith('/') ? img.slice(1) : img;
  const fullPublicPath = path.join(publicDirectory, cleanPath);
  if (fs.existsSync(fullPublicPath)) return img.startsWith('/') ? img : `/${img}`;
  return '/og-image.webp';
}

export const getSortedPostsData = cache(() => {
  if (process.env.NODE_ENV === 'production' && postsCache) {
    return postsCache;
  }

  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Ensure title and date are strings
      const title = matterResult.data.title ? String(matterResult.data.title) : 'Untitled Post';
      const date = matterResult.data.date ? (matterResult.data.date instanceof Date ? matterResult.data.date.toISOString().split('T')[0] : String(matterResult.data.date)) : new Date().toISOString().split('T')[0];

      // Combine the data with the id
      return {
        slug,
        title,
        date,
        description: matterResult.data.description || '',
        keywords: matterResult.data.keywords || [],
        category: inferCategory(matterResult.data, slug),
        image: getValidImage(matterResult.data.image),
        ab_test: matterResult.data.ab_test || undefined,
      };
    })
    .filter(post => post.title !== 'Untitled Post'); // Filter out potentially broken files

  // Sort posts by date
  const sorted = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  postsCache = sorted;
  return sorted;
});

export function getPostData(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      keywords: matterResult.data.keywords || [],
      content: matterResult.content,
      faqs: matterResult.data.faqs || [],
      category: inferCategory(matterResult.data, slug),
      image: getValidImage(matterResult.data.image),
      ab_test: matterResult.data.ab_test || undefined,
    };
  } catch (e) {
    return null;
  }
}
