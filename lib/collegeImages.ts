// Comprehensive campus image resolution system for all 471+ colleges across India

const SPECIFIC_COLLEGE_IMAGES: Record<string, string> = {
  // Top IIMs
  'iim-ahmedabad': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iima': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iim-bangalore': '/images/colleges/iim-bangalore-campus.jpg',
  'iimb': '/images/colleges/iim-bangalore-campus.jpg',
  'iim-calcutta': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iimc': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iim-lucknow': '/images/colleges/xlri-jamshedpur-campus.jpg',
  'iiml': '/images/colleges/xlri-jamshedpur-campus.jpg',
  'iim-kozhikode': '/images/colleges/tapmi-manipal-campus.jpg',
  'iimk': '/images/colleges/tapmi-manipal-campus.jpg',
  'iim-indore': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iimi': '/images/colleges/iim-ahmedabad-campus.jpg',
  'iim-mumbai': '/images/colleges/spjimr-mumbai-campus.jpg',
  'iim-shillong': '/images/colleges/dehradun-valley-campus.jpg',
  'iim-rohtak': '/images/colleges/mdi-gurgaon-campus.jpg',
  'iim-ranchi': '/images/colleges/xlri-jamshedpur-campus.jpg',
  'iim-raipur': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iim-trichy': '/images/colleges/great-lakes-chennai-campus.jpg',
  'iim-udaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'iim-kashipur': '/images/colleges/dehradun-valley-campus.jpg',
  'iim-nagpur': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iim-visakhapatnam': '/images/colleges/great-lakes-chennai-campus.jpg',
  'iim-amritsar': '/images/colleges/fms-delhi-campus.jpg',
  'iim-bodh-gaya': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iim-sambalpur': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iim-sirmaur': '/images/colleges/dehradun-valley-campus.jpg',
  'iim-jammu': '/images/colleges/dehradun-valley-campus.jpg',

  // Elite Tier B-Schools
  'xlri-jamshedpur': '/images/colleges/xlri-jamshedpur-campus.jpg',
  'xlri-delhi-ncr': '/images/colleges/xlri-jamshedpur-campus.jpg',
  'fms-delhi': '/images/colleges/fms-delhi-campus.jpg',
  'spjimr-mumbai': '/images/colleges/spjimr-mumbai-campus.jpg',
  'spjimr': '/images/colleges/spjimr-mumbai-campus.jpg',
  'mdi-gurgaon': '/images/colleges/mdi-gurgaon-campus.jpg',
  'mdi-murshidabad': '/images/colleges/mdi-gurgaon-campus.jpg',
  'nmims-mumbai': '/images/colleges/nmims-mumbai-campus.jpg',
  'sibm-pune': '/images/colleges/sibm-pune-campus.jpg',
  'scmhrd-pune': '/images/colleges/sibm-pune-campus.jpg',
  'siib-pune': '/images/colleges/sibm-pune-campus.jpg',
  'sibm-bengaluru': '/images/colleges/bangalore-tech-campus.jpg',
  'sibm-hyderabad': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'imt-ghaziabad': '/images/colleges/imt-ghaziabad-campus.jpg',
  'imt-nagpur': '/images/colleges/imt-ghaziabad-campus.jpg',
  'imt-hyderabad': '/images/colleges/imt-ghaziabad-campus.jpg',
  'fore-school-delhi': '/images/colleges/fore-school-delhi-campus.jpg',
  'fore-school-of-management': '/images/colleges/fore-school-delhi-campus.jpg',
  'tapmi-manipal': '/images/colleges/tapmi-manipal-campus.jpg',
  'tapmi-bengaluru': '/images/colleges/tapmi-manipal-campus.jpg',
  'gim-goa': '/images/colleges/gim-goa-campus.jpg',
  'great-lakes-chennai': '/images/colleges/great-lakes-chennai-campus.jpg',
  'great-lakes-gurgaon': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'amity-university-online': '/images/colleges/amity-university-campus.jpg',
  'amity-university-noida': '/images/colleges/amity-university-campus.jpg',
  'iit-bombay': '/images/colleges/iit-bombay-campus.jpg',
  'iit-delhi': '/images/colleges/iit-bombay-campus.jpg',
  'iit-madras': '/images/colleges/great-lakes-chennai-campus.jpg',
  'iit-kharagpur': '/images/colleges/iit-bombay-campus.jpg',
  'iit-roorkee': '/images/colleges/dehradun-valley-campus.jpg',
  'iit-kanpur': '/images/colleges/iit-bombay-campus.jpg',
  'bits-pilani': '/images/colleges/jaipur-rajasthan-campus.jpg',

  // Top Delhi NCR Hubs
  'bimtech-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'lbsim-delhi': '/images/colleges/fms-delhi-campus.jpg',
  'ndim-delhi': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'soil-gurgaon': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'fostiima-delhi': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'jims-rohini': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'jims-kalkaji': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iilm-gurugram': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'iilm-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'jaipuria-noida': '/images/colleges/imt-ghaziabad-campus.jpg',
  'jaipuria-lucknow': '/images/colleges/imt-ghaziabad-campus.jpg',
  'jaipuria-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'jaipuria-indore': '/images/colleges/imt-ghaziabad-campus.jpg',
  'gl-bajaj-greater-noida': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'galgotias-university': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'sharda-university': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'bennett-university': '/images/colleges/delhi-ncr-bschool-campus.jpg',
  'bml-munjal-university': '/images/colleges/delhi-ncr-bschool-campus.jpg',

  // Top Bangalore / Karnataka Hubs
  'christ-university-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'jagsom-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'alliance-university-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'xime-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'welingkar-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'pes-university-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'rv-university-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'isbr-business-school-bangalore': '/images/colleges/bangalore-tech-campus.jpg',
  'ramaiah-institute-of-management': '/images/colleges/bangalore-tech-campus.jpg',

  // Top Pune / Mumbai Hubs
  'pumba-pune': '/images/colleges/sibm-pune-campus.jpg',
  'jbims-mumbai': '/images/colleges/spjimr-mumbai-campus.jpg',
  'welingkar-mumbai': '/images/colleges/nmims-mumbai-campus.jpg',
  'kj-somaiya-mumbai': '/images/colleges/spjimr-mumbai-campus.jpg',
  'sies-mumbai': '/images/colleges/nmims-mumbai-campus.jpg',
  'nibm-pune': '/images/colleges/sibm-pune-campus.jpg',
  'pibm-pune': '/images/colleges/sibm-pune-campus.jpg',
  'balaji-university-pune': '/images/colleges/sibm-pune-campus.jpg',
  'indira-institute-of-management-pune': '/images/colleges/sibm-pune-campus.jpg',
  'lexicon-mile-pune': '/images/colleges/sibm-pune-campus.jpg',
  'riim-pune': '/images/colleges/sibm-pune-campus.jpg',
  'mit-wpu-pune': '/images/colleges/sibm-pune-campus.jpg',
  'flame-university-pune': '/images/colleges/sibm-pune-campus.jpg',
  'dy-patil-pune': '/images/colleges/sibm-pune-campus.jpg',

  // Top Dehradun / Uttarakhand Hubs
  'upes-dehradun': '/images/colleges/dehradun-valley-campus.jpg',
  'graphic-era-dehradun': '/images/colleges/dehradun-valley-campus.jpg',
  'doon-business-school': '/images/colleges/dehradun-valley-campus.jpg',
  'dit-university-dehradun': '/images/colleges/dehradun-valley-campus.jpg',
  'uttaranchal-university': '/images/colleges/dehradun-valley-campus.jpg',

  // Top Jaipur / Rajasthan Hubs
  'jecrc-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'poornima-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'nims-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'manipal-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'vgu-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
  'apex-university-jaipur': '/images/colleges/jaipur-rajasthan-campus.jpg',
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
  if (!college) return '/images/colleges/delhi-ncr-bschool-campus.jpg';

  const slug = (college.slug || '').toLowerCase().replace(/^\/colleges\//, '').replace(/\/$/, '').trim();
  const name = (college.name || '').toLowerCase();
  const location = (college.location || college.state || '').toLowerCase();

  // 1. Direct slug exact match
  if (slug && SPECIFIC_COLLEGE_IMAGES[slug]) {
    return SPECIFIC_COLLEGE_IMAGES[slug];
  }

  // 2. Exact keyword / brand match in college name
  if (name.includes('ahmedabad') && name.includes('iim')) return '/images/colleges/iim-ahmedabad-campus.jpg';
  if (name.includes('bangalore') && (name.includes('iim') || name.includes('iimb'))) return '/images/colleges/iim-bangalore-campus.jpg';
  if (name.includes('calcutta') && name.includes('iim')) return '/images/colleges/iim-ahmedabad-campus.jpg';
  if (name.includes('lucknow') && name.includes('iim')) return '/images/colleges/xlri-jamshedpur-campus.jpg';
  if (name.includes('xlri')) return '/images/colleges/xlri-jamshedpur-campus.jpg';
  if (name.includes('fms') && (name.includes('delhi') || name.includes('faculty of management'))) return '/images/colleges/fms-delhi-campus.jpg';
  if (name.includes('spjimr') || name.includes('s.p. jain') || name.includes('sp jain')) return '/images/colleges/spjimr-mumbai-campus.jpg';
  if (name.includes('mdi') && (name.includes('gurgaon') || name.includes('gurugram'))) return '/images/colleges/mdi-gurgaon-campus.jpg';
  if (name.includes('nmims')) return '/images/colleges/nmims-mumbai-campus.jpg';
  if (name.includes('sibm') || name.includes('scmhrd') || name.includes('symbiosis')) return '/images/colleges/sibm-pune-campus.jpg';
  if (name.includes('fore school') || name.includes('fore delhi')) return '/images/colleges/fore-school-delhi-campus.jpg';
  if (name.includes('imt ') || name.includes('imt ghaziabad')) return '/images/colleges/imt-ghaziabad-campus.jpg';
  if (name.includes('tapmi')) return '/images/colleges/tapmi-manipal-campus.jpg';
  if (name.includes('gim') || name.includes('goa institute')) return '/images/colleges/gim-goa-campus.jpg';
  if (name.includes('great lakes') || name.includes('glim')) return '/images/colleges/great-lakes-chennai-campus.jpg';
  if (name.includes('amity')) return '/images/colleges/amity-university-campus.jpg';
  if (name.includes('iit ') || name.includes('indian institute of technology')) return '/images/colleges/iit-bombay-campus.jpg';
  if (name.includes('upes') || name.includes('graphic era') || name.includes('doon business')) return '/images/colleges/dehradun-valley-campus.jpg';
  if (name.includes('jecrc') || name.includes('poornima') || name.includes('jaipuria jaipur')) return '/images/colleges/jaipur-rajasthan-campus.jpg';

  // 3. Location / Regional Hub Match
  if (location.includes('dehradun') || location.includes('uttarakhand') || location.includes('roorkee') || location.includes('himachal')) {
    return '/images/colleges/dehradun-valley-campus.jpg';
  }
  if (location.includes('jaipur') || location.includes('rajasthan') || location.includes('udaipur') || location.includes('kota') || location.includes('jodhpur')) {
    return '/images/colleges/jaipur-rajasthan-campus.jpg';
  }
  if (location.includes('pune')) {
    return '/images/colleges/sibm-pune-campus.jpg';
  }
  if (location.includes('mumbai') || location.includes('navi mumbai') || location.includes('thane')) {
    return '/images/colleges/nmims-mumbai-campus.jpg';
  }
  if (location.includes('bangalore') || location.includes('bengaluru') || location.includes('karnataka') || location.includes('manipal')) {
    return '/images/colleges/bangalore-tech-campus.jpg';
  }
  if (location.includes('chennai') || location.includes('tamil nadu') || location.includes('hyderabad') || location.includes('telangana') || location.includes('kerala')) {
    return '/images/colleges/great-lakes-chennai-campus.jpg';
  }
  if (location.includes('delhi') || location.includes('noida') || location.includes('gurgaon') || location.includes('gurugram') || location.includes('ghaziabad') || location.includes('faridabad')) {
    return '/images/colleges/delhi-ncr-bschool-campus.jpg';
  }

  // 4. Category / Stream Fallback
  if (college.category === 'Engineering' || (college.stream && college.stream.includes('btech'))) {
    return '/images/colleges/iit-bombay-campus.jpg';
  }
  if (college.category === 'UG Courses') {
    return '/images/colleges/bangalore-tech-campus.jpg';
  }

  // 5. Default Premier Business School Campus
  return '/images/colleges/delhi-ncr-bschool-campus.jpg';
}
