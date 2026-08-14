import { CollegeMetadata } from './colleges';

const COLLEGE_BLOG_SLUG_MAP: Record<string, string> = {
  'ndim-delhi': 'all-about-ndim-delhi',
  'fostiima-delhi': 'all-about-fostiima-delhi',
  'fiib-delhi': 'all-about-fiib-delhi',
  'iilm-lodhi-road-delhi': 'all-about-iilm-lodhi-road-delhi',
  'jims-kalkaji': 'all-about-jims-kalkaji',
  'meri-delhi': 'all-about-meri-delhi',
  'dsb-delhi': 'all-about-dsb-delhi',
  'delhi-school-of-business': 'all-about-dsb-delhi',
  'empi-delhi': 'all-about-empi-delhi',
  'imm-delhi': 'all-about-imm-delhi',
  'asm-apeejay-delhi': 'all-about-asm-apeejay-delhi',
  'jaipuria-school-of-business-ghaziabad': 'all-about-jaipuria-school-of-business-ghaziabad',
  'its-ghaziabad': 'all-about-its-ghaziabad',
  'jaipuria-noida': 'all-about-jaipuria-noida',
  'hierank-noida': 'all-about-hierank-noida',
  'gniot-greater-noida': 'all-about-gniot-greater-noida',
  'gl-bajaj-greater-noida': 'all-about-gl-bajaj-greater-noida',
  'accurate-greater-noida': 'all-about-accurate-greater-noida',
  'niet-greater-noida': 'all-about-niet-greater-noida',
  'ibi-greater-noida': 'all-about-ibi-greater-noida',
  'lloyd-business-school-greater-noida': 'all-about-lloyd-business-school-greater-noida',
  'iilm-greater-noida': 'all-about-iilm-greater-noida',
  'bennett-university': 'all-about-bennett-university',
  'mangalmay-greater-noida': 'all-about-mangalmay-greater-noida',
  'sparsh-global-greater-noida': 'all-about-sparsh-global-greater-noida',
  'jk-business-school-gurugram': 'all-about-jk-business-school-gurugram',
  'ibmr-gurgaon': 'all-about-ibmr-gurgaon',
  'isbs-gurgaon': 'all-about-isbs-gurgaon',
  'bml-munjal-university': 'all-about-bml-munjal-university',
  'soil-gurgaon': 'all-about-soil-gurgaon',
  'iilm-gurgaon': 'all-about-iilm-gurgaon',
  'saitm-gurgaon': 'all-about-st-andrews-gurgaon',
  'pibm-pune': 'all-about-pibm-pune',
  'lexicon-mile-pune': 'all-about-lexicon-management-institute-of-leadership-excellence',
  'riim-pune': 'all-about-riim-pune',
  'asm-ibmr': 'all-about-asm-ibmr',
  'dy-patil-b-school': 'all-about-dy-patil-b-school',
  'iiebm-pune': 'all-about-iiebm-pune',
  'akemi-business-school': 'all-about-akemi-business-school',
  'isms-pune': 'all-about-isms-pune',
  'atlas-skilltech-mumbai': 'all-about-atlas-skilltech-mumbai',
  'universal-ai-mumbai': 'all-about-universal-ai-mumbai',
  'itm-mumbai': 'all-about-itm-mumbai',
  'js-kothari-mumbai': 'all-about-js-kothari-mumbai',
  'amity-mumbai': 'all-about-amity-mumbai',
  'jagsom-mumbai': 'all-about-jagsom-mumbai',
  'isbr-bangalore': 'all-about-isbr-bangalore',
  'iibs-bangalore': 'all-about-iibs-bangalore',
  'gibs-bangalore': 'all-about-gibs-bangalore',
  'alliance-university-bangalore': 'all-about-alliance-university-bangalore',
  'isme-bangalore': 'all-about-isme-bangalore',
  'indus-business-academy': 'all-about-indus-business-academy',
  'jagsom-bangalore': 'all-about-jagsom-bangalore',
};

/**
 * Returns the best detail/blog URL for a given college.
 * Prioritizes dedicated in-depth blog reviews if available, otherwise falls back to /colleges/[slug].
 */
export function getCollegeDetailUrl(college: { name?: string; slug?: string }): string {
  if (!college) return '/colleges';

  const slug = college.slug || '';
  if (slug && COLLEGE_BLOG_SLUG_MAP[slug]) {
    return `/blog/${COLLEGE_BLOG_SLUG_MAP[slug]}`;
  }

  const name = (college.name || '').toLowerCase();
  for (const [key, blogSlug] of Object.entries(COLLEGE_BLOG_SLUG_MAP)) {
    const cleanKey = key.replace(/-/g, ' ');
    if (name.includes(cleanKey)) {
      return `/blog/${blogSlug}`;
    }
  }

  // Fallback to /colleges/[slug]
  return slug ? `/colleges/${slug}` : '/colleges';
}
