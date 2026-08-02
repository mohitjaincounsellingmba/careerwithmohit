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
  if (data.category && typeof data.category === 'string') {
    const trimmed = data.category.trim();
    if ((BLOG_CATEGORIES as readonly string[]).includes(trimmed) && trimmed !== 'All Posts') {
      return trimmed;
    }
  }

  const combinedText = [
    data.category || '',
    slug || '',
    data.title || '',
    (data.keywords || []).join(' ')
  ].join(' ').toLowerCase();

  // 1. Online Degrees
  if (
    combinedText.includes('online mba') ||
    combinedText.includes('online bba') ||
    combinedText.includes('online bca') ||
    combinedText.includes('online mca') ||
    combinedText.includes('online degree') ||
    combinedText.includes('online degrees') ||
    combinedText.includes('distance mba') ||
    combinedText.includes('distance education') ||
    combinedText.includes('distance learning') ||
    (combinedText.includes('online') && (
      combinedText.includes('mba') ||
      combinedText.includes('bba') ||
      combinedText.includes('bca') ||
      combinedText.includes('mca') ||
      combinedText.includes('degree') ||
      combinedText.includes('pgdm') ||
      combinedText.includes('executive')
    ))
  ) {
    return 'Online Degrees';
  }

  // 2. BCA & MCA
  if (
    combinedText.includes('bca') ||
    combinedText.includes('mca') ||
    combinedText.includes('nimcet')
  ) {
    return 'BCA & MCA';
  }

  // 3. Law
  if (
    combinedText.includes('law') ||
    combinedText.includes('llb') ||
    combinedText.includes('llm') ||
    combinedText.includes('clat') ||
    combinedText.includes('ailet') ||
    combinedText.includes('judiciary') ||
    combinedText.includes('advocate') ||
    combinedText.includes('lsat') ||
    combinedText.includes('law school')
  ) {
    return 'Law';
  }

  // 4. Medical & MBBS
  if (
    combinedText.includes('medical') ||
    combinedText.includes('mbbs') ||
    combinedText.includes('neet') ||
    combinedText.includes('bds') ||
    combinedText.includes('aiims') ||
    combinedText.includes('nursing') ||
    combinedText.includes('bams') ||
    combinedText.includes('bhms') ||
    combinedText.includes('doctor') ||
    combinedText.includes('medical college')
  ) {
    return 'Medical & MBBS';
  }

  // 5. MBA & PGDM
  if (
    combinedText.includes('mba') ||
    combinedText.includes('pgdm') ||
    combinedText.includes('iim') ||
    combinedText.includes('iims') ||
    combinedText.includes('cat') ||
    combinedText.includes('xat') ||
    combinedText.includes('nmat') ||
    combinedText.includes('snap') ||
    combinedText.includes('cmat') ||
    combinedText.includes('gmat') ||
    combinedText.includes('gre') ||
    combinedText.includes('ibsat') ||
    combinedText.includes('micat') ||
    combinedText.includes('tissnet') ||
    combinedText.includes('mah cet') ||
    combinedText.includes('mhcet') ||
    combinedText.includes('b-school') ||
    combinedText.includes('bschool') ||
    combinedText.includes('business school') ||
    combinedText.includes('business schools') ||
    combinedText.includes('school of management') ||
    combinedText.includes('school of business') ||
    combinedText.includes('institute of management') ||
    combinedText.includes('executive mba') ||
    combinedText.includes('pgp') ||
    combinedText.includes('pgpx') ||
    combinedText.includes('epgdm') ||
    combinedText.includes('mat 20') ||
    combinedText.includes('mat exam')
  ) {
    return 'MBA & PGDM';
  }

  // 6. BBA & BMS
  if (
    combinedText.includes('bba') ||
    combinedText.includes('bms') ||
    combinedText.includes('ipm') ||
    combinedText.includes('ipmat') ||
    combinedText.includes('jipmat') ||
    combinedText.includes('bbm') ||
    combinedText.includes('b.com') ||
    combinedText.includes('bcom') ||
    combinedText.includes('bachelor of business administration') ||
    combinedText.includes('bachelor of management studies')
  ) {
    return 'BBA & BMS';
  }

  // 7. B.Tech & Engineering
  if (
    combinedText.includes('btech') ||
    combinedText.includes('b.tech') ||
    combinedText.includes('mtech') ||
    combinedText.includes('m.tech') ||
    combinedText.includes('engineering') ||
    combinedText.includes('jee') ||
    combinedText.includes('bitsat') ||
    combinedText.includes('gate') ||
    combinedText.includes('iit') ||
    combinedText.includes('iits') ||
    combinedText.includes('nit') ||
    combinedText.includes('nits') ||
    combinedText.includes('iiit') ||
    combinedText.includes('iiits') ||
    combinedText.includes('b.e.') ||
    combinedText.includes('m.e.') ||
    combinedText.includes('wbjee') ||
    combinedText.includes('comedk') ||
    combinedText.includes('viteee') ||
    combinedText.includes('srmjeee') ||
    combinedText.includes('institute of technology') ||
    combinedText.includes('college of engineering')
  ) {
    return 'B.Tech & Engineering';
  }

  // 8. Mock Tests / Practice Exams -> Exams & Admissions
  if (
    combinedText.includes('mock test') ||
    combinedText.includes('mock tests') ||
    combinedText.includes('practice paper') ||
    combinedText.includes('entrance exam')
  ) {
    return 'Exams & Admissions';
  }

  // 9. Genuine Jobs & Careers (excluding placement terms)
  if (
    combinedText.includes('fresher hiring') ||
    combinedText.includes('off-campus') ||
    combinedText.includes('off campus') ||
    combinedText.includes('campus drive') ||
    combinedText.includes('job recruitment') ||
    combinedText.includes('hiring drive') ||
    combinedText.includes('recruitment 20') ||
    combinedText.includes('vacancy') ||
    combinedText.includes('vacancies') ||
    combinedText.includes('bank po') ||
    combinedText.includes('sbi po') ||
    combinedText.includes('ibps') ||
    combinedText.includes('ssc cgl') ||
    combinedText.includes('ssc chsl') ||
    combinedText.includes('ssc mts') ||
    combinedText.includes('upsc') ||
    combinedText.includes('rbi assistant') ||
    combinedText.includes('rbi grade b') ||
    combinedText.includes('government job') ||
    combinedText.includes('govt job') ||
    combinedText.includes('salary negotiation') ||
    combinedText.includes('resume') ||
    combinedText.includes('interview tips') ||
    combinedText.includes('career opportunities') ||
    combinedText.includes('career options') ||
    combinedText.includes('career path') ||
    combinedText.includes('working professionals') ||
    combinedText.includes('certifications for working professionals') ||
    combinedText.includes('hiring trends') ||
    combinedText.includes('job opportunity') ||
    combinedText.includes('job opportunities') ||
    (combinedText.includes('hiring') && !combinedText.includes('college') && !combinedText.includes('university'))
  ) {
    return 'Jobs & Careers';
  }

  // 10. General Exams, Admissions & Placements (not specific to a degree above)
  if (
    combinedText.includes('admission') ||
    combinedText.includes('admissions') ||
    combinedText.includes('exam') ||
    combinedText.includes('exams') ||
    combinedText.includes('entrance') ||
    combinedText.includes('cuet') ||
    combinedText.includes('cet') ||
    combinedText.includes('cutoff') ||
    combinedText.includes('cutoffs') ||
    combinedText.includes('cut-off') ||
    combinedText.includes('result') ||
    combinedText.includes('counselling') ||
    combinedText.includes('counseling') ||
    combinedText.includes('merit list') ||
    combinedText.includes('eligibility') ||
    combinedText.includes('application') ||
    combinedText.includes('registration') ||
    combinedText.includes('scorecard') ||
    combinedText.includes('syllabus') ||
    combinedText.includes('placement') ||
    combinedText.includes('placements') ||
    combinedText.includes('average package') ||
    combinedText.includes('highest package') ||
    combinedText.includes('salary package')
  ) {
    return 'Exams & Admissions';
  }

  // 11. College Reviews & Comparisons
  if (
    combinedText.includes('review') ||
    combinedText.includes('reviews') ||
    combinedText.includes('comparison') ||
    combinedText.includes('vs') ||
    combinedText.includes('campus') ||
    combinedText.includes('college') ||
    combinedText.includes('colleges') ||
    combinedText.includes('university') ||
    combinedText.includes('universities') ||
    combinedText.includes('institute')
  ) {
    return 'College Reviews';
  }

  // 12. Business & Finance
  if (
    combinedText.includes('saas') ||
    combinedText.includes('business') ||
    combinedText.includes('finance') ||
    combinedText.includes('fintech') ||
    combinedText.includes('marketing') ||
    combinedText.includes('crypto') ||
    combinedText.includes('tax') ||
    combinedText.includes('taxation') ||
    combinedText.includes('startup')
  ) {
    return 'Business & Finance';
  }

  // 13. General Job / Career terms fallback
  if (
    combinedText.includes('job') ||
    combinedText.includes('jobs') ||
    combinedText.includes('career') ||
    combinedText.includes('careers') ||
    combinedText.includes('salary') ||
    combinedText.includes('salaries') ||
    combinedText.includes('recruit') ||
    combinedText.includes('recruitment') ||
    combinedText.includes('internship') ||
    combinedText.includes('internships')
  ) {
    return 'Jobs & Careers';
  }

  return 'General & Career Guide';
}

