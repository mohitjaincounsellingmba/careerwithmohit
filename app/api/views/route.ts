import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getSortedPostsData } from '@/lib/markdown';

const VIEWS_FILE = path.join(process.cwd(), 'data', 'views.json');

// Helper to hash slug for stable variance
function getSlugHash(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Get realistic initial views based on post date
function calculateInitialViews(slug: string, dateStr: string): number {
  const publishedDate = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  
  const hash = getSlugHash(slug);
  const variance = (hash % 11) - 5; // -5 to +5 variance
  const dailyAverage = Math.max(8, 15 + variance); // 8 to 20 views per day
  
  const baseViews = diffDays * dailyAverage;
  const randomFactor = hash % 89; // deterministic offset
  
  return Math.floor(baseViews + randomFactor);
}

// Read views from storage (Upstash Redis or local JSON file)
async function getViewsMap(): Promise<Record<string, number>> {
  let views: Record<string, number> = {};

  const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  
  if (hasRedis) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/blog_views`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          // Upstash REST returns json string or object
          views = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
      }
    } catch (e) {
      console.error('Redis view fetch error, falling back to local file:', e);
      views = await readLocalViews();
    }
  } else {
    views = await readLocalViews();
  }

  // Auto-initialize missing posts
  const posts = getSortedPostsData();
  let updated = false;

  for (const post of posts) {
    if (views[post.slug] === undefined) {
      views[post.slug] = calculateInitialViews(post.slug, post.date);
      updated = true;
    }
  }

  if (updated) {
    await saveViewsMap(views);
  }

  return views;
}

// Helper to read from local file
async function readLocalViews(): Promise<Record<string, number>> {
  try {
    const data = await fs.readFile(VIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

// Save views to storage (Upstash Redis or local JSON file)
async function saveViewsMap(views: Record<string, number>) {
  const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  
  if (hasRedis) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/blog_views`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        body: JSON.stringify(views)
      });
    } catch (e) {
      console.error('Redis save error, falling back to local file:', e);
      await saveLocalViews(views);
    }
  } else {
    await saveLocalViews(views);
  }
}

// Helper to save to local file
async function saveLocalViews(views: Record<string, number>) {
  try {
    await fs.mkdir(path.dirname(VIEWS_FILE), { recursive: true });
    await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2));
  } catch (e) {
    console.error('File save error:', e);
  }
}

export async function GET() {
  try {
    const views = await getViewsMap();
    return NextResponse.json(views);
  } catch (error: any) {
    console.error('GET views error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const views = await getViewsMap();
    views[slug] = (views[slug] || 0) + 1;
    await saveViewsMap(views);

    return NextResponse.json({ success: true, views: views[slug] });
  } catch (error: any) {
    console.error('POST views error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
