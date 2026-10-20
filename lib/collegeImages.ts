// Comprehensive campus image resolution system for all 471+ colleges across India

const SPECIFIC_COLLEGE_IMAGES: Record<string, string> = {
  // Top IIMs
  'iim-ahmedabad': '/images/colleges/iim-ahmedabad-campus.webp',
  'iima': '/images/colleges/iim-ahmedabad-campus.webp',
  'iim-bangalore': '/images/colleges/iim-bangalore-campus.webp',
  'iimb': '/images/colleges/iim-bangalore-campus.webp',
  'iim-calcutta': '/images/colleges/iim-ahmedabad-campus.webp',
  'iimc': '/images/colleges/iim-ahmedabad-campus.webp',
  'iim-lucknow': '/images/colleges/xlri-jamshedpur-campus.webp',
  'iiml': '/images/colleges/xlri-jamshedpur-campus.webp',
  'iim-kozhikode': '/images/colleges/tapmi-manipal-campus.webp',
  'iimk': '/images/colleges/tapmi-manipal-campus.webp',
  'iim-indore': '/images/colleges/iim-ahmedabad-campus.webp',
  'iimi': '/images/colleges/iim-ahmedabad-campus.webp',
  'iim-mumbai': '/images/colleges/spjimr-mumbai-campus.webp',
  'iim-shillong': '/images/colleges/dehradun-valley-campus.webp',
  'iim-rohtak': '/images/colleges/mdi-gurgaon-campus.webp',
  'iim-ranchi': '/images/colleges/xlri-jamshedpur-campus.webp',
  'iim-raipur': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iim-trichy': '/images/colleges/great-lakes-chennai-campus.webp',
  'iim-udaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'iim-kashipur': '/images/colleges/dehradun-valley-campus.webp',
  'iim-nagpur': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iim-visakhapatnam': '/images/colleges/great-lakes-chennai-campus.webp',
  'iim-amritsar': '/images/colleges/fms-delhi-campus.webp',
  'iim-bodh-gaya': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iim-sambalpur': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iim-sirmaur': '/images/colleges/dehradun-valley-campus.webp',
  'iim-jammu': '/images/colleges/dehradun-valley-campus.webp',

  // Elite Tier B-Schools
  'xlri-jamshedpur': '/images/colleges/xlri-jamshedpur-campus.webp',
  'xlri-delhi-ncr': '/images/colleges/xlri-jamshedpur-campus.webp',
  'fms-delhi': '/images/colleges/fms-delhi-campus.webp',
  'spjimr-mumbai': '/images/colleges/spjimr-mumbai-campus.webp',
  'spjimr': '/images/colleges/spjimr-mumbai-campus.webp',
  'mdi-gurgaon': '/images/colleges/mdi-gurgaon-campus.webp',
  'mdi-murshidabad': '/images/colleges/mdi-gurgaon-campus.webp',
  'nmims-mumbai': '/images/colleges/nmims-mumbai-campus.webp',
  'sibm-pune': '/images/colleges/sibm-pune-campus.webp',
  'scmhrd-pune': '/images/colleges/sibm-pune-campus.webp',
  'siib-pune': '/images/colleges/sibm-pune-campus.webp',
  'sibm-bengaluru': '/images/colleges/bangalore-tech-campus.webp',
  'sibm-hyderabad': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'imt-ghaziabad': '/images/colleges/imt-ghaziabad-campus.webp',
  'imt-nagpur': '/images/colleges/imt-ghaziabad-campus.webp',
  'imt-hyderabad': '/images/colleges/imt-ghaziabad-campus.webp',
  'fore-school-delhi': '/images/colleges/fore-school-delhi-campus.webp',
  'fore-school-of-management': '/images/colleges/fore-school-delhi-campus.webp',
  'tapmi-manipal': '/images/colleges/tapmi-manipal-campus.webp',
  'tapmi-bengaluru': '/images/colleges/tapmi-manipal-campus.webp',
  'gim-goa': '/images/colleges/gim-goa-campus.webp',
  'great-lakes-chennai': '/images/colleges/great-lakes-chennai-campus.webp',
  'great-lakes-gurgaon': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'amity-university-online': '/images/colleges/amity-university-campus.webp',
  'amity-university-noida': '/images/colleges/amity-university-campus.webp',
  'iit-bombay': '/images/colleges/iit-bombay-campus.webp',
  'iit-delhi': '/images/colleges/iit-bombay-campus.webp',
  'iit-madras': '/images/colleges/great-lakes-chennai-campus.webp',
  'iit-kharagpur': '/images/colleges/iit-bombay-campus.webp',
  'iit-roorkee': '/images/colleges/dehradun-valley-campus.webp',
  'iit-kanpur': '/images/colleges/iit-bombay-campus.webp',
  'bits-pilani': '/images/colleges/jaipur-rajasthan-campus.webp',

  // Top Delhi NCR Hubs
  'bimtech-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'lbsim-delhi': '/images/colleges/fms-delhi-campus.webp',
  'ndim-delhi': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'soil-gurgaon': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'fostiima-delhi': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'jims-rohini': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'jims-kalkaji': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iilm-gurugram': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'iilm-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'jaipuria-noida': '/images/colleges/imt-ghaziabad-campus.webp',
  'jaipuria-lucknow': '/images/colleges/imt-ghaziabad-campus.webp',
  'jaipuria-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'jaipuria-indore': '/images/colleges/imt-ghaziabad-campus.webp',
  'gl-bajaj-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'galgotias-university': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'sharda-university': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'bennett-university': '/images/colleges/delhi-ncr-bschool-campus.webp',
  'bml-munjal-university': '/images/colleges/delhi-ncr-bschool-campus.webp',

  // Top Bangalore / Karnataka Hubs
  'christ-university-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'jagsom-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'alliance-university-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'xime-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'welingkar-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'pes-university-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'rv-university-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'isbr-business-school-bangalore': '/images/colleges/bangalore-tech-campus.webp',
  'ramaiah-institute-of-management': '/images/colleges/bangalore-tech-campus.webp',

  // Top Pune / Mumbai Hubs
  'pumba-pune': '/images/colleges/sibm-pune-campus.webp',
  'jbims-mumbai': '/images/colleges/spjimr-mumbai-campus.webp',
  'welingkar-mumbai': '/images/colleges/nmims-mumbai-campus.webp',
  'kj-somaiya-mumbai': '/images/colleges/spjimr-mumbai-campus.webp',
  'sies-mumbai': '/images/colleges/nmims-mumbai-campus.webp',
  'nibm-pune': '/images/colleges/sibm-pune-campus.webp',
  'pibm-pune': '/images/colleges/sibm-pune-campus.webp',
  'balaji-university-pune': '/images/colleges/sibm-pune-campus.webp',
  'indira-institute-of-management-pune': '/images/colleges/sibm-pune-campus.webp',
  'lexicon-mile-pune': '/images/colleges/sibm-pune-campus.webp',
  'riim-pune': '/images/colleges/sibm-pune-campus.webp',
  'mit-wpu-pune': '/images/colleges/sibm-pune-campus.webp',
  'flame-university-pune': '/images/colleges/sibm-pune-campus.webp',
  'dy-patil-pune': '/images/colleges/sibm-pune-campus.webp',

  // Top Dehradun / Uttarakhand Hubs
  'upes-dehradun': '/images/colleges/dehradun-valley-campus.webp',
  'graphic-era-dehradun': '/images/colleges/dehradun-valley-campus.webp',
  'doon-business-school': '/images/colleges/dehradun-valley-campus.webp',
  'dit-university-dehradun': '/images/colleges/dehradun-valley-campus.webp',
  'uttaranchal-university': '/images/colleges/dehradun-valley-campus.webp',

  // Top Jaipur / Rajasthan Hubs
  'jecrc-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'poornima-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'nims-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'manipal-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'vgu-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
  'apex-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.webp',
};

/**
 * Intelligently resolves the most accurate, photorealistic campus image for any of the 471+ colleges
 */
export function getCollegeCampusImage(college: {
  slug?: string;
  name?: string;
  location?: string;
  category?: string;
  stream?: string;
  state?: string;
}): string {
  if (!college) return '/images/colleges/delhi-ncr-bschool-campus.webp';

  const slug = (college.slug || '').toLowerCase().replace(/^\/colleges\//, '').replace(/\/$/, '').trim();
  const name = (college.name || '').toLowerCase();
  const location = (college.location || college.state || '').toLowerCase();

  // 1. Direct slug exact match
  if (slug && SPECIFIC_COLLEGE_IMAGES[slug]) {
    return SPECIFIC_COLLEGE_IMAGES[slug];
  }

  // 2. Exact keyword / brand match in college name
  if (name.includes('ahmedabad') && name.includes('iim')) return '/images/colleges/iim-ahmedabad-campus.webp';
  if (name.includes('bangalore') && (name.includes('iim') || name.includes('iimb'))) return '/images/colleges/iim-bangalore-campus.webp';
  if (name.includes('calcutta') && name.includes('iim')) return '/images/colleges/iim-ahmedabad-campus.webp';
  if (name.includes('lucknow') && name.includes('iim')) return '/images/colleges/xlri-jamshedpur-campus.webp';
  if (name.includes('xlri')) return '/images/colleges/xlri-jamshedpur-campus.webp';
  if (name.includes('fms') && (name.includes('delhi') || name.includes('faculty of management'))) return '/images/colleges/fms-delhi-campus.webp';
  if (name.includes('spjimr') || name.includes('s.p. jain') || name.includes('sp jain')) return '/images/colleges/spjimr-mumbai-campus.webp';
  if (name.includes('mdi') && (name.includes('gurgaon') || name.includes('gurugram'))) return '/images/colleges/mdi-gurgaon-campus.webp';
  if (name.includes('nmims')) return '/images/colleges/nmims-mumbai-campus.webp';
  if (name.includes('sibm') || name.includes('scmhrd') || name.includes('symbiosis')) return '/images/colleges/sibm-pune-campus.webp';
  if (name.includes('fore school') || name.includes('fore delhi')) return '/images/colleges/fore-school-delhi-campus.webp';
  if (name.includes('imt ') || name.includes('imt ghaziabad')) return '/images/colleges/imt-ghaziabad-campus.webp';
  if (name.includes('tapmi')) return '/images/colleges/tapmi-manipal-campus.webp';
  if (name.includes('gim') || name.includes('goa institute')) return '/images/colleges/gim-goa-campus.webp';
  if (name.includes('great lakes') || name.includes('glim')) return '/images/colleges/great-lakes-chennai-campus.webp';
  if (name.includes('amity')) return '/images/colleges/amity-university-campus.webp';
  if (name.includes('iit ') || name.includes('indian institute of technology')) return '/images/colleges/iit-bombay-campus.webp';
  if (name.includes('upes') || name.includes('graphic era') || name.includes('doon business')) return '/images/colleges/dehradun-valley-campus.webp';
  if (name.includes('jecrc') || name.includes('poornima') || name.includes('jaipuria jaipur')) return '/images/colleges/jaipur-rajasthan-campus.webp';

  // 3. Location / Regional Hub Match
  if (location.includes('dehradun') || location.includes('uttarakhand') || location.includes('roorkee') || location.includes('himachal')) {
    return '/images/colleges/dehradun-valley-campus.webp';
  }
  if (location.includes('jaipur') || location.includes('rajasthan') || location.includes('udaipur') || location.includes('kota') || location.includes('jodhpur')) {
    return '/images/colleges/jaipur-rajasthan-campus.webp';
  }
  if (location.includes('pune')) {
    return '/images/colleges/sibm-pune-campus.webp';
  }
  if (location.includes('mumbai') || location.includes('navi mumbai') || location.includes('thane')) {
    return '/images/colleges/nmims-mumbai-campus.webp';
  }
  if (location.includes('bangalore') || location.includes('bengaluru') || location.includes('karnataka') || location.includes('manipal')) {
    return '/images/colleges/bangalore-tech-campus.webp';
  }
  if (location.includes('chennai') || location.includes('tamil nadu') || location.includes('hyderabad') || location.includes('telangana') || location.includes('kerala')) {
    return '/images/colleges/great-lakes-chennai-campus.webp';
  }
  if (location.includes('delhi') || location.includes('noida') || location.includes('gurgaon') || location.includes('gurugram') || location.includes('ghaziabad') || location.includes('faridabad')) {
    return '/images/colleges/delhi-ncr-bschool-campus.webp';
  }

  // 4. Category / Stream Fallback
  if (college.category === 'Engineering' || (college.stream && college.stream.includes('btech'))) {
    return '/images/colleges/iit-bombay-campus.webp';
  }
  if (college.category === 'UG Courses') {
    return '/images/colleges/bangalore-tech-campus.webp';
  }

  // 5. Default Premier Business School Campus
  return '/images/colleges/delhi-ncr-bschool-campus.webp';
}
