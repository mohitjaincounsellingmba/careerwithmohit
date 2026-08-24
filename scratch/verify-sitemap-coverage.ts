import sitemap from '../app/sitemap';
import { getSortedPostsData } from '../lib/markdown';
import fs from 'fs';
import path from 'path';
import { ABROAD_COLLEGES } from '../data/abroadColleges';
import { generateCollegeSlug } from '../lib/slugify';
import { COLLEGES } from '../data/onlineColleges';
import { EXAM_CONFIGS } from '../lib/mock-test-data';

const urls = new Set(sitemap().map((u: any) => u.url));
const baseUrl = 'https://www.careerwithmohit.online';

console.log('=== VERIFYING DYNAMIC ROUTES COVERAGE IN SITEMAP ===');

// 1. Blog posts
const posts = getSortedPostsData();
let missingBlog = 0;
posts.forEach((p: any) => {
  const url = `${baseUrl}/blog/${p.slug}`;
  if (!urls.has(url)) missingBlog++;
});
console.log(`Blog posts: Total ${posts.length}, Missing from sitemap: ${missingBlog}`);

// 2. Colleges (.md files)
const collegesDir = path.join(process.cwd(), 'colleges');
let collegeFiles: string[] = [];
if (fs.existsSync(collegesDir)) {
  collegeFiles = fs.readdirSync(collegesDir).filter((f: string) => f.endsWith('.md'));
}
let missingCollege = 0;
collegeFiles.forEach((f: string) => {
  const url = `${baseUrl}/colleges/${f.replace('.md', '')}`;
  if (!urls.has(url)) missingCollege++;
});
console.log(`Colleges: Total ${collegeFiles.length}, Missing from sitemap: ${missingCollege}`);

// 3. Abroad Education
let missingAbroad = 0;
ABROAD_COLLEGES.forEach((c: any) => {
  const url = `${baseUrl}/abroad-education/${generateCollegeSlug(c.name, c.location)}`;
  if (!urls.has(url)) missingAbroad++;
});
console.log(`Abroad Education: Total ${ABROAD_COLLEGES.length}, Missing from sitemap: ${missingAbroad}`);

// 4. Online Degree Certification
let missingOnline = 0;
COLLEGES.forEach((c: any) => {
  const url = `${baseUrl}/online-degree-certification/${c.universitySlug}`;
  if (!urls.has(url)) missingOnline++;
});
console.log(`Online Degree Certification: Total ${COLLEGES.length}, Missing from sitemap: ${missingOnline}`);

// 5. Dynamic Mock Tests
const customStaticSlugs = ['cat', 'nmat', 'bitsat', 'jee-main', 'jee-advanced', 'atma', 'mhcet'];
const examConfigsFiltered = EXAM_CONFIGS.filter((config: any) => !customStaticSlugs.includes(config.slug));
let missingExamConfig = 0;
examConfigsFiltered.forEach((c: any) => {
  const url = `${baseUrl}/tools/mock-test/${c.slug}`;
  if (!urls.has(url)) missingExamConfig++;
});
console.log(`Dynamic Mock Tests: Total ${examConfigsFiltered.length}, Missing from sitemap: ${missingExamConfig}`);

// 6. Resource pages
const examSlugs = ['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'];
let missingResource = 0;
examSlugs.forEach((s: string) => {
  const url = `${baseUrl}/resources/${s}`;
  if (!urls.has(url)) missingResource++;
});
console.log(`Resource pages: Total ${examSlugs.length}, Missing from sitemap: ${missingResource}`);
