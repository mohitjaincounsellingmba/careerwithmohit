export const POLAND_COLLEGES = [
  { name: 'Warsaw University of Business and Psychology (Moderna)', location: 'Warsaw, Poland', programs: ['International Economics', 'Business Management', 'IT Management', 'MBA'], country: 'Poland', fee: '₹3,50,000 / yr', feeNum: 350000 },
  { name: 'University of Ecology and Management', location: 'Warsaw, Poland', programs: ['Architecture', 'Computer Engineering', 'Interior Design', 'Management'], country: 'Poland', fee: '₹3,80,000 / yr', feeNum: 380000 },
  { name: 'Coventry University, Wrocław Campus', location: 'Wrocław, Poland', programs: ['Aviation Management', 'Cyber Security', 'Cloud Computing', 'Business Management'], country: 'Poland', fee: '₹8,50,000 / yr', feeNum: 850000 }
].map(u => ({
  ...u,
  accreditation: 'Polish Ministry of Science and Higher Education',
  badge: 'Poland Focus',
  grade: 'A',
  gradeColor: 'from-red-600 to-gray-400',
  about: `Top-rated institution in ${u.location}. Explore modern, globally recognized programs including ${u.programs.join(', ')}. Poland is rapidly becoming a top study destination in Europe for its high-quality education, affordability, and booming tech scene.`,
  highlights: ['Extremely Affordable Tuition & Living', 'Schengen Area Member', 'English-Taught Degrees', 'Fast-Growing IT & Business Hub'],
  duration: '1–2 years (PG) / 3-4 years (UG)',
  mode: 'On-Campus',
  approvals: 'Polish Ministry of Science and Higher Education, ENQA',
  whatsapp: '919560020771',
}));
