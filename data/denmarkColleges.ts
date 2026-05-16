export const DENMARK_COLLEGES = [
  { name: 'University of Southern Denmark (SDU)', location: 'Odense & Sønderborg, Denmark', programs: ['Engineering', 'IT', 'Business', 'Health Sciences', 'Design'], country: 'Denmark', fee: '₹12,00,000 / yr', feeNum: 1200000 },
  { name: 'International Business Academy (IBA)', location: 'Kolding, Denmark', programs: ['International Business', 'Marketing', 'Finance', 'Logistics'], country: 'Denmark', fee: '₹9,50,000 / yr', feeNum: 950000 },
  { name: 'VIA University College', location: 'Horsens & Herning, Denmark', programs: ['Engineering', 'Business', 'Health Sciences', 'Education', 'IT'], country: 'Denmark', fee: '₹11,00,000 / yr', feeNum: 1100000 }
].map(u => ({
  ...u,
  accreditation: 'Danish Ministry of Higher Education and Science',
  badge: 'Denmark Focus',
  grade: 'A',
  gradeColor: 'from-red-600 to-red-800',
  about: `Top-tier institution in ${u.location}. Explore world-class programs including ${u.programs.join(', ')}. Denmark offers highly innovative teaching, a focus on sustainability, and an excellent quality of life.`,
  highlights: ['World-Class Education System', 'High Quality of Living', 'English-Taught Degrees', 'Strong Focus on Innovation & Green Tech'],
  duration: '2 years (PG) / 3-4 years (UG)',
  mode: 'On-Campus',
  approvals: 'Danish Accreditation Institution',
  whatsapp: '919560020771',
}));
