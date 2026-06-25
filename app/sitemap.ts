import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';
import { generateCollegeSlug } from '@/lib/slugify';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.careerwithmohit.online';

  // Static routes
  const routes = [
    '',
    '/news',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
    '/colleges',
    '/certifications',
    '/internships',
    '/inquiry',
    '/online-degree-certification',
    '/mock-tests',
    '/scholarships-2026',
    '/tools/cat-mock-test',
    '/tools/nmat-mock-test',
    '/tools/mhcet-mock-test',
    '/tools/btech-college-predictor',
    '/tools/cuet-pg-mba-predictor',
    '/tools/college-comparison',
    '/tools/accreditation-checker',
    '/tools/ai-skills',
    '/tools/hashtag-generator',
    '/tools/govt-exams-mock-test',
    '/tools',
    '/tools/file-converter',
    '/tools/cat-score-calculator',
    '/tools/resume-analyzer',
    '/tools/xat-score-calculator-2027',
    '/services',
    '/sell-your-coaching-online',
    '/partner-with-us',
    '/abroad-education',
    '/calculator/career-roadmap',
    '/calculator/certification',
    '/calculator/cuet-pg-2026',
    '/calculator/cuet-ug-2026',
    '/calculator/jee-main-2026',
    '/calculator/mhcet-mba-2026',
    '/colleges/compare',
    '/colleges/top-engineering-colleges-in-delhi',
    '/jobs',
    '/mhcet-mba-colleges-list',
    '/previous-year-papers',
    '/tools/academic-calculators',
    '/tools/atma-mock-test',
    '/tools/bitsat-mock-test',
    '/tools/case-study-generator',
    '/tools/jee-advanced-mock-test',
    '/tools/jee-main-mock-test',
    '/tools/mat-college-predictor',
    '/tools/mat-score-calculator',
    '/tools/offer-letter-generator',
    '/tools/salary-slip-generator',
    '/top-tier-mba-colleges',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : (route.includes('/tools/') || route.includes('/calculator/') ? 0.9 : 0.7),
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

  // Dynamic generic mock tests
  // Utilizing the mocked config array to scale dynamic routes correctly
  const { EXAM_CONFIGS } = require('@/lib/mock-test-data');
  const examRoutes = EXAM_CONFIGS.map((config: any) => ({
    url: `${baseUrl}/tools/mock-test/${config.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic exam resources routes
  const examSlugs = ['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'];
  const resourceRoutes = examSlugs.map((exam) => ({
    url: `${baseUrl}/resources/${exam}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic abroad education college routes
  const abroadRoutes = ABROAD_COLLEGES.map((college) => ({
    url: `${baseUrl}/abroad-education/${generateCollegeSlug(college.name, college.location)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...blogRoutes, ...collegeRoutes, ...examRoutes, ...resourceRoutes, ...abroadRoutes];
}
