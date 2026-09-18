import { CollegeMetadata } from "./colleges";

// 1. Comprehensive alias & acronym mapping for colleges across India
export const COLLEGE_ALIASES: Record<string, string[]> = {
  // IIMs
  "iim-ahmedabad": ["iima", "iim a", "iim ahmedabad", "iim-a", "indian institute of management ahmedabad"],
  "iim-bangalore": ["iimb", "iim b", "iim bangalore", "iim-b", "indian institute of management bangalore", "iim bengaluru"],
  "iim-calcutta": ["iimc", "iim c", "iim calcutta", "iim-c", "indian institute of management calcutta", "iim kolkata"],
  "iim-lucknow": ["iiml", "iim l", "iim lucknow", "iim-l", "indian institute of management lucknow"],
  "iim-kozhikode": ["iimk", "iim k", "iim kozhikode", "iim-k", "indian institute of management kozhikode", "iim calicut"],
  "iim-indore": ["iimi", "iim i", "iim indore", "iim-i", "indian institute of management indore"],
  "iim-mumbai": ["nitie", "nitie mumbai", "iim mumbai", "iimm", "indian institute of management mumbai"],
  "iim-shillong": ["iims", "iim shillong", "rgsiim"],
  "iim-rohtak": ["iim rohtak"],
  "iim-ranchi": ["iim ranchi"],
  "iim-raipur": ["iim raipur"],
  "iim-trichy": ["iim trichy", "iim tiruchirappalli"],
  "iim-kashipur": ["iim kashipur"],
  "iim-udaipur": ["iimu", "iim udaipur"],
  "iim-nagpur": ["iim nagpur"],
  "iim-visakhapatnam": ["iim vizag", "iim visakhapatnam"],
  "iim-bodh-gaya": ["iim bodh gaya", "iim bg"],
  "iim-amritsar": ["iim amritsar"],
  "iim-sambalpur": ["iim sambalpur"],
  "iim-sirmaur": ["iim sirmaur"],
  "iim-jammu": ["iim jammu"],

  // Top Business Schools
  "fms-delhi": ["fms", "fms delhi", "faculty of management studies", "delhi university mba"],
  "xlri-jamshedpur": ["xlri", "xlri jamshedpur", "xavier school of management"],
  "spjimr-mumbai": ["spjimr", "sp jain", "sp jain mumbai", "spjimr mumbai", "s.p. jain"],
  "mdi-gurgaon": ["mdi", "mdi gurgaon", "mdi gurugram", "management development institute"],
  "iift-delhi": ["iift", "iift delhi", "indian institute of foreign trade"],
  "jbims-mumbai": ["jbims", "jbims mumbai", "jamnalal bajaj", "bajaj mumbai", "ceo factory"],
  "sibm-pune": ["sibm", "sibm pune", "symbiosis institute of business management", "symbiosis pune"],
  "scmhrd-pune": ["scmhrd", "scmhrd pune", "symbiosis centre for management and human resource development"],
  "nmims-mumbai": ["nmims", "nmims mumbai", "narsee monjee", "svkm nmims"],
  "tapmi-bangalore": ["tapmi", "tapmi bangalore", "tapmi manipal", "t a pai"],
  "gim-goa": ["gim", "gim goa", "goa institute of management"],
  "great-lakes-chennai": ["great lakes", "glim", "great lakes chennai", "glim chennai"],
  "great-lakes-gurgaon": ["great lakes gurgaon", "glim gurgaon", "great lakes gurugram"],
  "fore-school-delhi": ["fore", "fore school", "fore delhi", "fore school of management"],
  "bimtech-greater-noida": ["bimtech", "bimtech noida", "bimtech greater noida", "birla institute of management technology"],
  "lbsim-delhi": ["lbsim", "lbsim delhi", "lal bahadur shastri institute of management", "lal bahadur shastri"],
  "ndim-delhi": ["ndim", "ndim delhi", "new delhi institute of management", "ndim tuglakabad"],
  "jims-rohini": ["jims", "jims rohini", "jagan institute of management studies"],
  "jims-kalkaji": ["jims kalkaji", "jims delhi"],
  "fiib-delhi": ["fiib", "fiib delhi", "fortune institute of international business"],
  "imi-delhi": ["imi", "imi delhi", "international management institute"],
  "imt-ghaziabad": ["imt", "imt ghaziabad", "institute of management technology"],
  "weschool-mumbai": ["welingkar", "weschool", "welingkar mumbai", "prin ln welingkar"],
  "welingkar-bangalore": ["welingkar bangalore", "weschool bangalore"],
  "kj-somaiya-mumbai": ["kj somaiya", "simsr", "somaiya mumbai", "k j somaiya"],
  "xime-bangalore": ["xime", "xime bangalore", "xavier institute of management and entrepreneurship"],
  "jagsom-bangalore": ["jagsom", "ifim", "jagsom bangalore", "jagdish sheth school of management"],
  "isbr-bangalore": ["isbr", "isbr bangalore", "isbr business school"],
  "iba-bangalore": ["iba", "iba bangalore", "indus business academy"],
  "alliance-school-of-business-alliance-university": ["alliance", "alliance university", "alliance bangalore"],
  "christ-university-bangalore": ["christ", "christ university", "christ bangalore"],
  "bennett-greater-noida": ["bennett", "bennett university", "times group university"],
  "amity-university-noida": ["amity", "amity noida", "amity university"],
  "galgotias-university": ["galgotias", "galgotias university", "galgotias greater noida"],
  "gl-bajaj-greater-noida": ["gl bajaj", "gl bajaj greater noida", "g.l. bajaj", "glbitm"],
  "gniot-greater-noida": ["gniot", "gniot greater noida", "gims greater noida"],
  "iilm-gurgaon": ["iilm", "iilm gurgaon", "iilm university", "iilm gurugram"],
  "iilm-delhi": ["iilm delhi", "iilm lodhi road"],
  "lloyd-business-school-greater-noida": ["lloyd", "lloyd business school", "lloyd greater noida"],
  "jaipuria-noida": ["jaipuria", "jaipuria noida", "jaipuria institute of management"],
  "jaipuria-institute-of-management-lucknow": ["jaipuria lucknow"],
  "jaipuria-jaipur": ["jaipuria jaipur"],
  "jaipuria-institute-of-management-indore": ["jaipuria indore"],
  "ibs-hyderabad": ["ibs", "ibs hyderabad", "icfai hyderabad", "icfai business school"],
  "ipe-hyderabad": ["ipe", "ipe hyderabad", "institute of public enterprise"],
  "woxsen-school-of-business": ["woxsen", "woxsen hyderabad", "woxsen university"],
  "vjim-hyderabad": ["vjim", "vjim hyderabad", "vignana jyothi"],
  "mica-ahmedabad": ["mica", "mica ahmedabad", "mudra institute of communications"],
  "irma-anand": ["irma", "irma anand", "institute of rural management anand"],
  "nirma-university": ["nirma", "nirma university", "nirma ahmedabad"],
  "upes-dehradun": ["upes", "upes dehradun", "university of petroleum and energy studies"],
  "doon-business-school": ["dbs", "dbs dehradun", "doon business school"],

  // Premier Engineering Colleges
  "iit-bombay": ["iitb", "iit bombay", "iit mumbai", "indian institute of technology bombay"],
  "iit-delhi": ["iitd", "iit delhi", "indian institute of technology delhi"],
  "iit-madras": ["iitm", "iit madras", "iit chennai", "indian institute of technology madras"],
  "iit-kharagpur": ["iitkgp", "iit kharagpur", "indian institute of technology kharagpur"],
  "iit-kanpur": ["iitk", "iit kanpur", "indian institute of technology kanpur"],
  "iit-roorkee": ["iitr", "iit roorkee", "indian institute of technology roorkee"],
  "iit-guwahati": ["iitg", "iit guwahati", "indian institute of technology guwahati"],
  "iit-hyderabad": ["iith", "iit hyderabad", "indian institute of technology hyderabad"],
  "iit-bhu-varanasi": ["iit bhu", "iit varanasi", "it bhu"],
  "iit-indore": ["iiti", "iit indore"],
  "iit-patna": ["iit patna"],
  "iit-gandhinagar": ["iit gandhinagar"],
  "iit-jodhpur": ["iit jodhpur"],
  "iit-tirupati": ["iit tirupati"],
  "iit-bhilai": ["iit bhilai"],
  "iit-goa": ["iit goa"],
  "iit-jammu": ["iit jammu"],
  "iit-dharwad": ["iit dharwad"],
  "iit-palakkad": ["iit palakkad"],
  "iisc-bangalore": ["iisc", "iisc bangalore", "indian institute of science"],
  "dtu-delhi": ["dtu", "dtu delhi", "delhi technological university", "dce delhi"],
  "nsut-delhi": ["nsut", "nsut delhi", "netaji subhas university of technology", "nsit"],
  "iiit-delhi": ["iiitd", "iiit delhi", "indraprastha institute of information technology"],
  "iiit-hyderabad": ["iiith", "iiit hyderabad", "iiit-h"],
  "iiitb-bangalore": ["iiitb", "iiit bangalore", "iiit-b"],
  "bits-pilani": ["bits", "bits pilani", "birla institute of technology and science"],
  "bits-pilani-goa": ["bits goa", "bits pilani goa"],
  "bits-pilani-hyderabad": ["bits hyderabad", "bits pilani hyderabad"],
  "coep-pune": ["coep", "coep pune", "college of engineering pune"],
  "vjti-mumbai": ["vjti", "vjti mumbai", "veermata jijabai technological institute"],
  "spit-mumbai": ["spit", "spit mumbai", "sardar patel institute of technology"],
  "rvce-bangalore": ["rvce", "rvce bangalore", "rv college of engineering"],
  "bmsce-bangalore": ["bmsce", "bmsce bangalore", "bms college of engineering"],
  "msrit-bangalore": ["msrit", "ramaiah institute of technology", "ms ramaiah", "rit bangalore"],
  "vit-vellore": ["vit", "vit vellore", "vellore institute of technology"],
  "vit-pune": ["vit pune", "vishwakarma institute of technology"],
  "mit-wpu-pune": ["mit wpu", "mit pune", "maharashtra institute of technology"],
  "pccoe-pune": ["pccoe", "pccoe pune", "pimpri chinchwad college of engineering"],
  "pict-pune": ["pict", "pict pune", "pune institute of computer technology"],
  "pec-chandigarh": ["pec", "pec chandigarh", "punjab engineering college"],
  "thapar-institute": ["thapar", "thapar university", "thapar patiala", "tiet patiala"],
};

// 2. City & Region aliases for smart intent detection
export const REGIONAL_ALIASES: Record<string, string[]> = {
  "Delhi NCR": ["delhi", "noida", "greater noida", "gurgaon", "gurugram", "ghaziabad", "faridabad", "ncr"],
  "Maharashtra": ["mumbai", "pune", "nagpur", "nashik", "navi mumbai", "thane", "aurangabad", "kolhapur", "solapur"],
  "Karnataka": ["bangalore", "bengaluru", "manipal", "mangalore", "mysore", "hubli", "belgaum"],
  "Tamil Nadu": ["chennai", "coimbatore", "trichy", "tiruchirappalli", "madurai", "salem", "vellore"],
  "Telangana": ["hyderabad", "secunderabad", "warangal", "telangana"],
  "Gujarat": ["ahmedabad", "gandhinagar", "anand", "vadodara", "surat", "rajkot"],
  "West Bengal": ["kolkata", "calcutta", "kharagpur", "durgapur", "siliguri"],
  "Rajasthan": ["jaipur", "udaipur", "jodhpur", "kota", "pilani", "bikaner"],
  "Madhya Pradesh": ["indore", "bhopal", "gwalior", "jabalpur", "ujjain"],
  "Uttar Pradesh": ["lucknow", "kanpur", "varanasi", "prayagraj", "agra", "meerut", "aligarh"],
  "Punjab & Chandigarh": ["chandigarh", "mohali", "ludhiana", "amritsar", "jalandhar", "patiala"],
  "Kerala": ["kochi", "ernakulam", "kozhikode", "calicut", "trivandrum", "thiruvananthapuram", "thrissur"],
  "Uttarakhand": ["dehradun", "roorkee", "haridwar", "kashipur"],
  "Jharkhand": ["ranchi", "jamshedpur", "dhanbad", "bokaro"],
  "Odisha": ["bhubaneswar", "cuttack", "rourkela", "sambalpur"],
  "Goa": ["goa", "panaji", "sanquelim"]
};

export interface CollegeSearchScore {
  college: CollegeMetadata;
  score: number;
  matchedTokens: string[];
  matchReason?: string;
}

/**
 * Normalizes string: lowercases, removes special characters, and trims extra spaces.
 */
export function normalizeQuery(query: string): string {
  return (query || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Intelligent Multi-Token Search & Score Matcher
 */
export function searchColleges(
  colleges: CollegeMetadata[],
  rawQuery: string,
  locationMap: Record<string, { state: string; city: string }> = {}
): CollegeSearchScore[] {
  const clean = normalizeQuery(rawQuery);
  if (!clean) {
    return colleges.map((c) => ({ college: c, score: 0, matchedTokens: [] }));
  }

  const queryTokens = clean.split(" ").filter((t) => t.length > 0);
  const results: CollegeSearchScore[] = [];

  for (const college of colleges) {
    const slug = college.slug.toLowerCase();
    const name = normalizeQuery(college.name);
    const location = normalizeQuery(college.location);
    const category = normalizeQuery(college.category);
    const ownership = normalizeQuery(college.ownership);
    const courses = (college.courses || []).map((c) => normalizeQuery(c));
    const exams = (college.exams || []).map((e) => normalizeQuery(e));
    const locInfo = locationMap[college.slug] || { state: "", city: "" };
    const stateName = normalizeQuery(locInfo.state);
    const cityName = normalizeQuery(locInfo.city);

    const aliases = (COLLEGE_ALIASES[college.slug] || []).map((a) => normalizeQuery(a));

    let score = 0;
    const matchedTokens: string[] = [];

    // 1. Exact query match in name or slug (Highest priority)
    if (name === clean || slug === clean) {
      score += 1000;
      matchedTokens.push(clean);
    } else if (name.startsWith(clean)) {
      score += 600;
      matchedTokens.push(clean);
    } else if (name.includes(clean)) {
      score += 400;
      matchedTokens.push(clean);
    }

    // 2. Exact alias match
    for (const alias of aliases) {
      if (alias === clean) {
        score += 800;
        matchedTokens.push(clean);
        break;
      } else if (alias.includes(clean)) {
        score += 350;
        matchedTokens.push(clean);
        break;
      }
    }

    // 3. Multi-token evaluation across all attributes
    let allTokensMatched = true;

    for (const token of queryTokens) {
      let tokenMatched = false;

      // Check in college name
      if (name.includes(token)) {
        score += 80;
        tokenMatched = true;
      }

      // Check in slug
      if (slug.includes(token)) {
        score += 60;
        tokenMatched = true;
      }

      // Check in aliases
      for (const alias of aliases) {
        if (alias.includes(token)) {
          score += 75;
          tokenMatched = true;
          break;
        }
      }

      // Check in city / location / state
      if (cityName.includes(token) || location.includes(token)) {
        score += 50;
        tokenMatched = true;
      } else if (stateName.includes(token)) {
        score += 40;
        tokenMatched = true;
      }

      // Check regional aliases (e.g. "delhi" matches Delhi NCR colleges)
      for (const [state, cityList] of Object.entries(REGIONAL_ALIASES)) {
        if (cityList.includes(token)) {
          if (stateName.toLowerCase() === state.toLowerCase() || cityName.toLowerCase().includes(token) || location.includes(token)) {
            score += 45;
            tokenMatched = true;
          }
        }
      }

      // Check in courses (e.g. "mba", "pgdm", "btech", "bba")
      for (const course of courses) {
        if (course.includes(token)) {
          score += 30;
          tokenMatched = true;
          break;
        }
      }

      // Check in exams (e.g. "cat", "xat", "jee", "cmat", "mat")
      for (const exam of exams) {
        if (exam.includes(token) || exam === token) {
          score += 35;
          tokenMatched = true;
          break;
        }
      }

      // Check in category (e.g. "management", "engineering")
      if (category.includes(token)) {
        score += 25;
        tokenMatched = true;
      }

      // Check in ownership (e.g. "private", "government", "public")
      if (ownership.includes(token)) {
        score += 20;
        tokenMatched = true;
      }

      if (tokenMatched) {
        matchedTokens.push(token);
      } else {
        allTokensMatched = false;
      }
    }

    // Boost score if ALL tokens in multi-word query matched (e.g. "mba pune")
    if (allTokensMatched && queryTokens.length > 1) {
      score += 200 * queryTokens.length;
    }

    if (score > 0) {
      results.push({ college, score, matchedTokens });
    }
  }

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Generates instant predictive suggestions based on user keystrokes
 */
export function getSearchSuggestions(
  query: string,
  colleges: CollegeMetadata[],
  locationMap: Record<string, { state: string; city: string }> = {},
  limit: number = 6
): {
  colleges: CollegeMetadata[];
  popularSearches: string[];
} {
  const clean = normalizeQuery(query);
  if (!clean || clean.length < 1) {
    return {
      colleges: [],
      popularSearches: [
        "Top MBA Colleges in Delhi NCR",
        "Best B.Tech in Bangalore",
        "Pune PGDM Colleges with High ROI",
        "Top IIMs in India 2027",
        "MBA Colleges under ₹10 Lakhs Fees",
        "Colleges accepting CAT 80-90 percentile"
      ]
    };
  }

  const scored = searchColleges(colleges, clean, locationMap);
  const matchedColleges = scored.slice(0, limit).map((s) => s.college);

  const popularSearches: string[] = [];
  if (clean.includes("mba") || clean.includes("pgdm")) {
    popularSearches.push("Top MBA in Delhi NCR", "Best MBA in Mumbai & Pune", "MBA with High Placement ROI");
  } else if (clean.includes("btech") || clean.includes("engg") || clean.includes("engineering")) {
    popularSearches.push("Top B.Tech in Karnataka", "Top Engineering Colleges in Maharashtra", "B.Tech CSE Placements");
  } else if (clean.includes("delhi") || clean.includes("noida") || clean.includes("gurgaon")) {
    popularSearches.push("Top MBA Colleges in Delhi NCR", "B.Tech Colleges in Delhi NCR", "Direct MBA Admission Delhi");
  } else if (clean.includes("pune") || clean.includes("mumbai")) {
    popularSearches.push("Best MBA Colleges in Pune", "Top B-Schools in Mumbai", "MAH CET MBA Colleges");
  } else if (clean.includes("bangalore") || clean.includes("bengaluru")) {
    popularSearches.push("Top MBA Colleges in Bangalore", "Best Engineering Colleges in Bangalore", "BBA Colleges Bangalore");
  } else {
    popularSearches.push(
      `Top MBA Colleges matching "${query}"`,
      `Verified Fees & Cutoffs for "${query}"`,
      `Admission Process 2027 for "${query}"`
    );
  }

  return {
    colleges: matchedColleges,
    popularSearches: popularSearches.slice(0, 4)
  };
}
