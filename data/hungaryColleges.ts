export const HUNGARY_COLLEGES = [
  { name: 'University of Debrecen', location: 'Debrecen, Hungary', programs: ['Medicine', 'Engineering', 'Business Administration', 'IT', 'Agriculture'], country: 'Hungary', fee: '₹6,50,000 / yr', feeNum: 650000 },
  { name: 'Budapest Business University', location: 'Budapest, Hungary', programs: ['Business Administration', 'Finance', 'Tourism', 'Marketing', 'Logistics'], country: 'Hungary', fee: '₹4,50,000 / yr', feeNum: 450000 },
  { name: 'University of Pécs', location: 'Pécs, Hungary', programs: ['Medicine', 'Engineering', 'Architecture', 'Business', 'Humanities'], country: 'Hungary', fee: '₹7,00,000 / yr', feeNum: 700000 },
  { name: 'International Business School (IBS)', location: 'Budapest, Hungary', programs: ['Business & Management', 'Finance', 'Marketing', 'Data Analytics', 'MBA'], country: 'Hungary', fee: '₹6,00,000 / yr', feeNum: 600000 },
  { name: 'Budapest Metropolitan University (METU)', location: 'Budapest, Hungary', programs: ['Business', 'Art & Design', 'Communication', 'Tourism', 'Media Studies'], country: 'Hungary', fee: '₹5,00,000 / yr', feeNum: 500000 },
  { name: 'Wekerle Business School', location: 'Budapest, Hungary', programs: ['Business Administration', 'Finance', 'Human Resources', 'IT Management'], country: 'Hungary', fee: '₹4,20,000 / yr', feeNum: 420000 },
  { name: 'Hungarian University of Sports Science', location: 'Budapest, Hungary', programs: ['Sports Science', 'Coaching', 'Physiotherapy', 'Physical Education'], country: 'Hungary', fee: '₹5,50,000 / yr', feeNum: 550000 },
  { name: 'John Von Neumann University', location: 'Kecskemét, Hungary', programs: ['Engineering', 'Business Administration', 'Agriculture', 'IT'], country: 'Hungary', fee: '₹4,50,000 / yr', feeNum: 450000 }
].map(u => ({
  ...u,
  accreditation: 'HAC Accredited',
  badge: 'Hungary Focus',
  grade: 'A',
  gradeColor: 'from-green-600 to-red-600',
  about: `Prominent institution in ${u.location}. Explore top programs including ${u.programs.join(', ')}. Hungary provides high-quality European education, rich culture, and very affordable living costs.`,
  highlights: ['Schengen Area Member', 'Very Affordable Tuition & Living', 'Stipendium Hungaricum Scholarships', 'English-Taught Degrees'],
  duration: '1.5–2 years (PG) / 3-4 years (UG)',
  mode: 'On-Campus',
  approvals: 'Hungarian Accreditation Committee (HAC)',
  whatsapp: '919560020771',
}));
