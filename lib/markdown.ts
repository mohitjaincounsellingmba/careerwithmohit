import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  keywords?: string[];
  content?: string;
  faqs?: { question: string; answer: string }[];
  category?: string;
}

function inferCategory(data: any, slug: string): string {
  if (data.category && data.category.trim() !== '') {
    // If it's a broad category we already map, keep it, otherwise maybe normalize.
    const rawCategory = data.category.toLowerCase();
    if (rawCategory.includes('mba') || rawCategory.includes('pgdm')) return 'MBA';
    if (rawCategory.includes('bba')) return 'BBA';
    if (rawCategory.includes('btech') || rawCategory.includes('b.tech')) return 'B.Tech';
    if (rawCategory.includes('job') || rawCategory.includes('career')) return 'Jobs & Careers';
    if (rawCategory.includes('exam')) return 'Exams';
    if (rawCategory.includes('online')) return 'Online Degrees';
    return data.category;
  }

  const textToSearch = `${slug} ${data.title} ${(data.keywords || []).join(' ')}`.toLowerCase();
  
  if (textToSearch.includes('hiring') || textToSearch.includes('job') || textToSearch.includes('salary') || textToSearch.includes('recruit')) return 'Jobs & Careers';
  if (textToSearch.includes('mba') || textToSearch.includes('pgdm') || textToSearch.includes('iim')) return 'MBA';
  if (textToSearch.includes('bba') || textToSearch.includes('bms')) return 'BBA';
  if (textToSearch.includes('btech') || textToSearch.includes('b.tech') || textToSearch.includes('engineering') || textToSearch.includes('jee')) return 'B.Tech';
  if (textToSearch.includes('law') || textToSearch.includes('llb') || textToSearch.includes('clat')) return 'Law';
  if (textToSearch.includes('exam') || textToSearch.includes('mock test') || textToSearch.includes('cet') || textToSearch.includes('cuet') || textToSearch.includes('result')) return 'Exams';
  if (textToSearch.includes('bca') || textToSearch.includes('mca')) return 'BCA/MCA';
  
  return 'General';
}

export const getSortedPostsData = cache(() => {
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

      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        keywords: matterResult.data.keywords || [],
        category: inferCategory(matterResult.data, slug),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
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
    };
  } catch (e) {
    return null;
  }
}
