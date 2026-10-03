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
  ab_test?: {
    id: string;
    variants: Record<string, {
      title?: string;
      description?: string;
      cta_title?: string;
      cta_description?: string;
      [key: string]: any;
    }>;
  };
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
  const rawCat = (data?.category && typeof data.category === 'string') ? data.category.trim().toLowerCase() : '';
  const title = (data?.title && typeof data.title === 'string') ? data.title.toLowerCase() : '';
  const slugLower = (slug || '').toLowerCase();

  // --------------------------------------------------------------------------
  // 1. MOCK TESTS, CBT SIMULATIONS & SCORE CALCULATORS -> Always 'Exams & Admissions'
  // (e.g. Free CAT Mock Test, Free MAT Mock Test, CBT Practice, Score Predictor)
  // --------------------------------------------------------------------------
  const isMockTest = 
    title.includes('mock test') ||
    title.includes('mock series') ||
    title.includes('cbt mock') ||
    title.includes('practice paper') ||
    title.includes('practice test') ||
    title.includes('test series') ||
    title.includes('score calculator') ||
    title.includes('score vs percentile') ||
    title.includes('marks vs percentile') ||
    title.includes('answer key') ||
    title.includes('response sheet') ||
    title.includes('call predictor') ||
    title.includes('percentile predictor') ||
    slugLower.includes('mock-test') ||
    slugLower.includes('cbt-practice') ||
    slugLower.includes('score-calculator') ||
    slugLower.includes('score-vs-percentile') ||
    slugLower.includes('response-sheet') ||
    slugLower.includes('answer-key') ||
    slugLower.includes('mock-tests');

  if (isMockTest) {
    return 'Exams & Admissions';
  }

  // --------------------------------------------------------------------------
  // 2. GENUINE ONLINE & DISTANCE DEGREES
  // (Strictly for Online MBA, Online BBA, UGC-DEB, Distance Learning)
  // --------------------------------------------------------------------------
  const isOnlineDegree =
    title.includes('online mba') ||
    title.includes('online bba') ||
    title.includes('online bca') ||
    title.includes('online mca') ||
    title.includes('online degree') ||
    title.includes('online degrees') ||
    title.includes('online pgdm') ||
    title.includes('distance mba') ||
    title.includes('distance education') ||
    title.includes('distance learning') ||
    title.includes('online fee structure') ||
    title.includes('online university') ||
    title.includes('online shiksha') ||
    slugLower.includes('online-mba') ||
    slugLower.includes('online-bba') ||
    slugLower.includes('online-bca') ||
    slugLower.includes('online-mca') ||
    slugLower.includes('online-degree') ||
    slugLower.includes('distance-mba') ||
    slugLower.includes('distance-education') ||
    slugLower.includes('amity-university-online') ||
    slugLower.includes('chandigarh-university-online') ||
    slugLower.includes('manipal-university-online') ||
    slugLower.includes('dy-patil-university-online') ||
    slugLower.includes('andhra-university-online') ||
    slugLower.includes('chitkara-university-online') ||
    slugLower.includes('amrita-university-online') ||
    slugLower.includes('bimtech-online') ||
    slugLower.includes('vmou-kota-distance-mba') ||
    slugLower.includes('online-shiksha');

  if (isOnlineDegree) {
    return 'Online Degrees';
  }

  // --------------------------------------------------------------------------
  // 3. ENTRANCE EXAMS, DATES, ADMIT CARDS, STRATEGY, RESULTS -> 'Exams & Admissions'
  // (e.g. December MAT Exam 2026, CAT 2026 Registration, CUET UG Result, Board Results)
  // --------------------------------------------------------------------------
  const isNationalExam =
    slugLower.includes('all-about-cat-exam') ||
    slugLower.includes('all-about-mat-exam') ||
    slugLower.includes('all-about-xat-exam') ||
    slugLower.includes('all-about-nmat-exam') ||
    slugLower.includes('all-about-snap-exam') ||
    slugLower.includes('all-about-cmat-exam') ||
    slugLower.includes('all-about-atma-exam') ||
    slugLower.includes('all-about-clat-exam') ||
    slugLower.includes('all-about-gate-exam') ||
    slugLower.includes('all-about-jee-exam') ||
    slugLower.includes('all-about-neet-exam') ||
    slugLower.includes('all-about-mah-mba-cet-exam') ||
    slugLower.includes('all-about-srcc-gbo-exam') ||
    slugLower.includes('all-about-ipmat-exam') ||
    slugLower.includes('all-about-ipceta-exam') ||
    slugLower.includes('all-about-sat-ielts') ||
    slugLower.includes('all-about-omets') ||
    slugLower.includes('all-about-ielts') ||
    slugLower.startsWith('cat-2026-') ||
    slugLower.startsWith('mat-2026-') ||
    slugLower.startsWith('xat-2026-') ||
    slugLower.startsWith('xat-2027-') ||
    slugLower.startsWith('cuet-ug-2026-') ||
    slugLower.startsWith('cuet-pg-2026-') ||
    slugLower.startsWith('clat-2026-') ||
    slugLower.startsWith('clat-2027-') ||
    slugLower.includes('-result-2026') ||
    slugLower.includes('-result-declared') ||
    slugLower.includes('result-expected-date') ||
    slugLower.includes('december-mat-exam') ||
    slugLower.includes('september-mat-exam') ||
    slugLower.includes('check-may-mat-') ||
    slugLower.includes('profile-evaluation-for-iim-calls') ||
    slugLower.includes('top-mba-entrance-exams') ||
    slugLower.includes('omets-mba-entrance-exams') ||
    slugLower.includes('mba-entrance-exam') ||
    slugLower.includes('mba-entrance-exams') ||
    slugLower.includes('cat-dilr-important-questions') ||
    slugLower.includes('cat-quant-important-questions') ||
    slugLower.includes('cat-varc-important-questions') ||
    slugLower.includes('cat-exam-2026') ||
    slugLower.includes('10-tips-to-crack-cat-exam') ||
    slugLower.includes('how-to-crack-cat-exam') ||
    slugLower.includes('download-cat-jee-neet-previous-year-papers') ||
    slugLower.includes('atma-july-2026-exam') ||
    slugLower.includes('ipu-cet-2026-ug-exam') ||
    slugLower.includes('mah-mca-cet-2026') ||
    slugLower.includes('neet-2026-exam') ||
    slugLower.includes('neet-ug-2026-exam') ||
    slugLower.includes('nimcet-2026-exam') ||
    slugLower.includes('snap-exam-updated-syllabus') ||
    slugLower.includes('snap-vs-nmat') ||
    slugLower.includes('upcoming-mba-entrance-exams') ||
    slugLower.includes('how-many-students-take-mba-entrance-exams') ||
    slugLower.includes('engineering-cutoffs-2026') ||
    // Title patterns
    title.includes('mat exam') ||
    title.includes('december mat') ||
    title.includes('september mat') ||
    title.includes('may mat') ||
    title.includes('cat exam') ||
    title.includes('cat 2026') ||
    title.includes('xat exam') ||
    title.includes('xat 202') ||
    title.includes('nmat exam') ||
    title.includes('nmat 202') ||
    title.includes('snap exam') ||
    title.includes('snap 202') ||
    title.includes('cmat exam') ||
    title.includes('cmat 202') ||
    title.includes('atma exam') ||
    title.includes('atma 202') ||
    title.includes('cuet exam') ||
    title.includes('cuet ug') ||
    title.includes('cuet pg') ||
    title.includes('jee exam') ||
    title.includes('jee main') ||
    title.includes('neet exam') ||
    title.includes('neet ug') ||
    title.includes('gate exam') ||
    title.includes('clat exam') ||
    title.includes('ailet exam') ||
    title.includes('mah mba cet') ||
    title.includes('mah cet') ||
    title.includes('mhcet') ||
    title.includes('mah mca cet') ||
    title.includes('nimcet') ||
    title.includes('omets') ||
    title.includes('ielts exam') ||
    title.includes('admit card') ||
    title.includes('application form live') ||
    title.includes('registration schedule') ||
    title.includes('registration date') ||
    title.includes('registration open') ||
    title.includes('registration process') ||
    title.includes('correction window') ||
    title.includes('syllabus pdf') ||
    title.includes('how to crack') ||
    title.includes('tips to crack') ||
    title.includes('result declared') ||
    title.includes('results declared') ||
    title.includes('scorecard download') ||
    title.includes('board result') ||
    title.includes('entrance exam') ||
    title.includes('entrance exams') ||
    title.includes('entrance test') ||
    title.includes('top mba entrance') ||
    title.includes('mba entrance exam') ||
    title.includes('engineering entrance exam') ||
    title.includes('re-exam date') ||
    title.includes('re-test') ||
    ((rawCat === 'exams' || rawCat === 'exam' || rawCat === 'exams & admissions') && (title.includes('exam') || title.includes('cut off') || title.includes('cutoff') || title.includes('test')));

  if (isNationalExam) {
    return 'Exams & Admissions';
  }

  // --------------------------------------------------------------------------
  // 4. MEDICAL & MBBS
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('mbbs') ||
    slugLower.includes('medical-college') ||
    title.includes('mbbs') ||
    title.includes('medical college') ||
    title.includes('neet counselling') ||
    title.includes('bds') ||
    title.includes('aiims')
  ) {
    return 'Medical & MBBS';
  }

  // --------------------------------------------------------------------------
  // 5. LAW
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('llb') ||
    slugLower.includes('llm') ||
    slugLower.includes('law-school') ||
    slugLower.includes('corporate-law') ||
    title.includes('llb') ||
    title.includes('llm') ||
    title.includes('law school') ||
    title.includes('law college') ||
    title.includes('legal career') ||
    title.includes('law without maths')
  ) {
    return 'Law';
  }

  // --------------------------------------------------------------------------
  // 6. BCA & MCA
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('bca') ||
    slugLower.includes('mca') ||
    slugLower.includes('nimcet') ||
    title.includes('bca') ||
    title.includes('mca')
  ) {
    return 'BCA & MCA';
  }

  // --------------------------------------------------------------------------
  // 7. B.TECH & ENGINEERING
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('btech') ||
    slugLower.includes('b-tech') ||
    slugLower.includes('mtech') ||
    slugLower.includes('m-tech') ||
    slugLower.includes('engineering') ||
    title.includes('btech') ||
    title.includes('b.tech') ||
    title.includes('m.tech') ||
    title.includes('mtech') ||
    title.includes('engineering')
  ) {
    return 'B.Tech & Engineering';
  }

  // --------------------------------------------------------------------------
  // 8. BBA & BMS
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('bba') ||
    slugLower.includes('bms') ||
    slugLower.includes('ipm') ||
    title.includes('bba') ||
    title.includes('bms') ||
    title.includes('ipm')
  ) {
    return 'BBA & BMS';
  }

  // --------------------------------------------------------------------------
  // 9. BUSINESS & FINANCE
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('tax') ||
    slugLower.includes('crypto') ||
    slugLower.includes('fintech') ||
    slugLower.includes('cfa') ||
    slugLower.includes('acca') ||
    slugLower.includes('saas') ||
    title.includes('fintech') ||
    title.includes('taxation') ||
    title.includes('crypto') ||
    title.includes('cfa') ||
    title.includes('acca') ||
    title.includes('investment banking') ||
    title.includes('corporate finance')
  ) {
    return 'Business & Finance';
  }

  // --------------------------------------------------------------------------
  // 10. JOBS & CAREERS
  // --------------------------------------------------------------------------
  if (
    slugLower.includes('hiring') ||
    slugLower.includes('recruitment') ||
    slugLower.includes('fresher-') ||
    slugLower.includes('career-options') ||
    slugLower.includes('career-roadmaps') ||
    title.includes('hiring') ||
    title.includes('recruitment') ||
    title.includes('fresher') ||
    title.includes('internship') ||
    title.includes('career options after 12th') ||
    title.includes('career roadmaps') ||
    title.includes('salary negotiation') ||
    title.includes('freelancing websites')
  ) {
    return 'Jobs & Careers';
  }

  // --------------------------------------------------------------------------
  // 11. COLLEGE REVIEWS & HEAD-TO-HEAD COMPARISONS
  // --------------------------------------------------------------------------
  const isCollegeReview =
    rawCat === 'college reviews' ||
    slugLower.includes('-vs-') ||
    slugLower.includes('-review') ||
    slugLower.includes('placement-review') ||
    slugLower.includes('honest-review') ||
    title.includes('review (202') ||
    title.includes('review 202') ||
    title.includes('honest review') ||
    title.includes('vs ') ||
    title.includes('campus life') ||
    title.includes('placements & infrastructure') ||
    title.includes('fake university list') ||
    (slugLower.startsWith('all-about-') && !slugLower.includes('exam') && !slugLower.includes('test') && !slugLower.includes('ielts'));

  if (isCollegeReview) {
    return 'College Reviews';
  }

  // --------------------------------------------------------------------------
  // 12. MBA & PGDM (Default for B-schools, MBA programs, admissions, etc.)
  // --------------------------------------------------------------------------
  if (
    rawCat.includes('mba') ||
    rawCat.includes('pgdm') ||
    slugLower.includes('mba') ||
    slugLower.includes('pgdm') ||
    slugLower.includes('iim') ||
    slugLower.includes('b-school') ||
    slugLower.includes('executive-mba') ||
    slugLower.includes('bschool') ||
    title.includes('mba') ||
    title.includes('pgdm') ||
    title.includes('iim') ||
    title.includes('b-school') ||
    title.includes('business school') ||
    title.includes('executive mba') ||
    title.includes('pgp') ||
    title.includes('epgdm') ||
    title.includes('management institute')
  ) {
    return 'MBA & PGDM';
  }

  return 'General & Career Guide';
}

