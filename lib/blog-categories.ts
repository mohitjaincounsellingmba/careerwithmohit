export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  keywords?: string[];
  content?: string;
  faqs?: { question: string; answer: string }[];
  category?: string;
  image?: string;
}

export const BLOG_CATEGORIES = [
  'All Posts',
  'MBA & PGDM',
  'Online Degrees',
  'Jobs & Careers',
  'B.Tech & Engineering',
  'BBA & BMS',
  'Exams & Admissions',
  'Medical & MBBS',
  'General & Career Guide',
  'BCA & MCA',
  'Business & Finance',
  'College Reviews',
  'Law',
] as const;

export type BlogCategoryType = typeof BLOG_CATEGORIES[number];

export function inferCategory(data: any, slug: string): string {
  if (data.category && data.category.trim() !== '') {
    const rawCategory = data.category.toLowerCase();
    if (rawCategory.includes('bca') || rawCategory.includes('mca')) return 'BCA & MCA';
    if (rawCategory.includes('law') || rawCategory.includes('llb') || rawCategory.includes('clat')) return 'Law';
    if (rawCategory.includes('medical') || rawCategory.includes('mbbs') || rawCategory.includes('neet')) return 'Medical & MBBS';
    if (rawCategory.includes('online')) return 'Online Degrees';
    if (rawCategory.includes('mba') || rawCategory.includes('pgdm')) return 'MBA & PGDM';
    if (rawCategory.includes('bba') || rawCategory.includes('bms')) return 'BBA & BMS';
    if (rawCategory.includes('btech') || rawCategory.includes('b.tech') || rawCategory.includes('mtech') || rawCategory.includes('m.tech') || rawCategory.includes('engineering')) return 'B.Tech & Engineering';
    if (rawCategory.includes('exam') || rawCategory.includes('cuet') || rawCategory.includes('admission')) return 'Exams & Admissions';
    if (rawCategory.includes('job') || rawCategory.includes('career') || rawCategory.includes('hiring') || rawCategory.includes('salary')) return 'Jobs & Careers';
    if (rawCategory.includes('saas') || rawCategory.includes('business') || rawCategory.includes('finance')) return 'Business & Finance';
    if (rawCategory.includes('college') || rawCategory.includes('review') || rawCategory.includes('comparison') || rawCategory.includes('campus')) return 'College Reviews';
    return 'General & Career Guide';
  }

  const textToSearch = `${slug} ${data.title} ${(data.keywords || []).join(' ')}`.toLowerCase();
  
  if (textToSearch.includes('online mba') || textToSearch.includes('online bba') || textToSearch.includes('online degree') || textToSearch.includes('distance mba')) return 'Online Degrees';
  if (textToSearch.includes('bca') || textToSearch.includes('mca')) return 'BCA & MCA';
  if (textToSearch.includes('hiring') || textToSearch.includes('job') || textToSearch.includes('salary') || textToSearch.includes('recruit') || textToSearch.includes('placement')) return 'Jobs & Careers';
  if (textToSearch.includes('mba') || textToSearch.includes('pgdm') || textToSearch.includes('iim')) return 'MBA & PGDM';
  if (textToSearch.includes('bba') || textToSearch.includes('bms')) return 'BBA & BMS';
  if (textToSearch.includes('btech') || textToSearch.includes('b.tech') || textToSearch.includes('mtech') || textToSearch.includes('m.tech') || textToSearch.includes('engineering') || textToSearch.includes('jee')) return 'B.Tech & Engineering';
  if (textToSearch.includes('law') || textToSearch.includes('llb') || textToSearch.includes('clat') || textToSearch.includes('ailet')) return 'Law';
  if (textToSearch.includes('medical') || textToSearch.includes('mbbs') || textToSearch.includes('neet')) return 'Medical & MBBS';
  if (textToSearch.includes('exam') || textToSearch.includes('mock test') || textToSearch.includes('cet') || textToSearch.includes('cuet') || textToSearch.includes('result') || textToSearch.includes('cutoff')) return 'Exams & Admissions';
  if (textToSearch.includes('review') || textToSearch.includes('comparison') || textToSearch.includes('vs')) return 'College Reviews';
  
  return 'General & Career Guide';
}
