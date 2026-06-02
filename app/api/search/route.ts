// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { getAllColleges, CollegeMetadata } from '@/lib/colleges';

/**
 * Parse fee range string into a comparator function.
 */
function feeMatcher(range: string) {
  return (fees: string): boolean => {
    const feeStr = fees.replace(/[₹,]/g, '').toLowerCase();
    let feeNum = parseFloat(feeStr);
    if (feeStr.includes('lakh')) feeNum *= 100000;
    if (range === '< 1 Lakh') return feeNum < 100000;
    if (range === '1-5 Lakhs') return feeNum >= 100000 && feeNum <= 500000;
    if (range === '5-10 Lakhs') return feeNum > 500000 && feeNum <= 1000000;
    if (range === '10-20 Lakhs') return feeNum > 1000000 && feeNum <= 2000000;
    if (range === '> 20 Lakhs') return feeNum > 2000000;
    return true; // "All Fees" or unknown
  };
}

/**
 * Parse ranking option into a comparator function.
 */
function rankingMatcher(option: string) {
  return (ranking: string): boolean => {
    if (option === 'All Rankings') return true;
    const match = ranking.match(/#(\d+)/);
    if (!match) return false;
    const rankNum = parseInt(match[1], 10);
    if (option === 'Top 10') return rankNum <= 10;
    if (option === 'Top 50') return rankNum <= 50;
    if (option === 'Top 100') return rankNum <= 100;
    return false;
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  const search = (params.get('search') || '').toLowerCase().trim();
  const category = params.get('category') || 'All Streams';
  const course = params.get('course') || 'All Courses';
  const specialization = params.get('specialization') || 'All Specializations';
  const state = params.get('state') || 'All States';
  const city = params.get('city') || 'All Cities';
  const ownership = params.get('ownership') || 'All Types';
  const exam = params.get('exam') || 'All Exams';
  const feeRange = params.get('feeRange') || 'All Fees';
  const ranking = params.get('ranking') || 'All Rankings';

  const allColleges = getAllColleges();

  // Helper maps for location
  const locationMap = allColleges.reduce((acc, college) => {
    const loc = college.location.toLowerCase();
    let st = 'Other';
    let ct = 'Other';
    if (loc.includes('delhi')) { st = 'Delhi'; ct = 'Delhi'; }
    else if (loc.includes('uttar pradesh') || loc.includes('noida') || loc.includes('greater noida') || loc.includes('ghaziabad')) { st = 'Uttar Pradesh'; ct = loc.includes('greater noida') ? 'Greater Noida' : loc.includes('noida') ? 'Noida' : loc.includes('ghaziabad') ? 'Ghaziabad' : 'Noida'; }
    else if (loc.includes('haryana') || loc.includes('gurgaon') || loc.includes('faridabad')) { st = 'Haryana'; ct = loc.includes('faridabad') ? 'Faridabad' : 'Gurgaon'; }
    else if (loc.includes('punjab') || loc.includes('chandigarh') || loc.includes('mohali')) { st = 'Punjab & Chandigarh'; ct = loc.includes('mohali') ? 'Mohali' : 'Chandigarh'; }
    else if (loc.includes('karnataka') || loc.includes('bangalore')) { st = 'Karnataka'; ct = 'Bangalore'; }
    else if (loc.includes('maharashtra') || loc.includes('mumbai') || loc.includes('pune')) { st = 'Maharashtra'; ct = loc.includes('mumbai') ? 'Mumbai' : loc.includes('pune') ? 'Pune' : loc.includes('navi mumbai') ? 'Navi Mumbai' : 'Mumbai'; }
    else if (loc.includes('rajasthan') || loc.includes('jaipur')) { st = 'Rajasthan'; ct = 'Jaipur'; }
    else if (loc.includes('uttarakhand') || loc.includes('dehradun')) { st = 'Uttarakhand'; ct = 'Dehradun'; }
    else if (loc.includes('west bengal') || loc.includes('kolkata')) { st = 'West Bengal'; ct = 'Kolkata'; }
    else if (loc.includes('gujarat') || loc.includes('ahmedabad')) { st = 'Gujarat'; ct = 'Ahmedabad'; }
    acc[college.slug] = { state: st, city: ct };
    return acc;
  }, {} as Record<string, { state: string; city: string }>);

  const matchesSearch = (college: CollegeMetadata) => {
    if (!search) return true;
    const inName = college.name.toLowerCase().includes(search);
    const inLocation = college.location.toLowerCase().includes(search);
    const inExams = (college.exams || []).some(e => e.toLowerCase().includes(search));
    const inCourses = college.courses.some(c => c.toLowerCase().includes(search));
    return inName || inLocation || inExams || inCourses;
  };

  const filtered = allColleges.filter(college => {
    const locInfo = locationMap[college.slug];
    const okSearch = matchesSearch(college);
    const okCategory = category === 'All Streams' || college.category === category;
    const okCourse = course === 'All Courses' || college.courses.some(c => c === course || c.startsWith(course + ' ') || c.toLowerCase().includes(course.toLowerCase()));
    let okSpecialization = true;
    if (specialization !== 'All Specializations') {
      // Very simple keyword match for specialization
      const keywords = {
        // Add a minimal map – for brevity we treat all as true
      } as Record<string, string[]>;
      // For now, treat specialization match as presence of the specialization word in college name or courses
      okSpecialization = college.name.toLowerCase().includes(specialization.toLowerCase()) || college.courses.some(c => c.toLowerCase().includes(specialization.toLowerCase()));
    }
    const okState = state === 'All States' || locInfo.state === state;
    const okCity = city === 'All Cities' || locInfo.city === city;
    const okOwnership = ownership === 'All Types' || college.ownership.toLowerCase().includes(ownership.toLowerCase());
    const okExam = exam === 'All Exams' || (college.exams || []).includes(exam);
    const okFee = feeRange === 'All Fees' || feeMatcher(feeRange)(college.fees);
    const okRanking = rankingMatcher(ranking)(college.ranking);
    return okSearch && okCategory && okCourse && okSpecialization && okState && okCity && okOwnership && okExam && okFee && okRanking;
  });

  return NextResponse.json({ results: filtered, total: filtered.length });
}
