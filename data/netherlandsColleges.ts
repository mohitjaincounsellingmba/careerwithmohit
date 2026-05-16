export const NETHERLANDS_COLLEGES = [
  { name: 'Erasmus University Rotterdam', location: 'Rotterdam', programs: ['M.Sc. Business Administration', 'M.Sc. Economics', 'M.Sc. Finance'], country: 'Netherlands', fee: '₹14,00,000 / yr', feeNum: 1400000 },
  { name: 'University of Twente', location: 'Drienerlolaan Campus', programs: ['M.Sc. Computer Science', 'M.Sc. Engineering', 'M.Sc. Business Information Technology'], country: 'Netherlands', fee: '₹15,00,000 / yr', feeNum: 1500000 },
  { name: 'Radboud University', location: 'Nijmegen', programs: ['M.Sc. Artificial Intelligence', 'M.Sc. Computing Science', 'M.Sc. Biomedical Sciences'], country: 'Netherlands', fee: '₹13,50,000 / yr', feeNum: 1350000 },
  { name: 'Wittenborg University of Applied Sciences', location: 'Amsterdam & Apeldoorn', programs: ['MBA', 'M.Sc. International Hospitality Management', 'M.Sc. Business Management'], country: 'Netherlands', fee: '₹12,00,000 / yr', feeNum: 1200000 },
  { name: 'Tio Business School', location: 'Utrecht', programs: ['BBA', 'M.Sc. Business Management', 'M.Sc. Hospitality Management'], country: 'Netherlands', fee: '₹18,00,000 / yr', feeNum: 1800000 },
  { name: 'The Hague University of Applied Sciences', location: 'The Hague (UG Pathway)', programs: ['B.Sc. International Business', 'B.Sc. European Studies', 'B.Sc. UX Design'], country: 'Netherlands', fee: '₹9,50,000 / yr', feeNum: 950000 },
  { name: 'University of Applied Sciences Europe', location: 'Amsterdam', programs: ['M.Sc. Data Science', 'M.Sc. Software Engineering', 'M.A. Visual & Experience Design'], country: 'Netherlands', fee: '₹11,00,000 / yr', feeNum: 1100000 },
  { name: 'SRH Haarlem University of Applied Sciences', location: 'Haarlem Campus', programs: ['M.Sc. Applied Sustainability Management', 'M.Sc. Digital Transformation', 'B.Sc. Business Psychology'], country: 'Netherlands', fee: '₹10,50,000 / yr', feeNum: 1050000 },
  { name: 'Webster University', location: 'Leiden Campus', programs: ['MBA', 'M.A. International Relations', 'M.A. Psychology'], country: 'Netherlands', fee: '₹16,00,000 / yr', feeNum: 1600000 }
].map(u => ({
  ...u,
  accreditation: 'NVAO Accredited',
  badge: 'Netherlands Focus',
  grade: 'A',
  gradeColor: 'from-orange-500 to-red-500',
  about: `Renowned institution in ${u.location}, Netherlands. Explore highly ranked programs including ${u.programs.join(', ')}. The Netherlands offers English-taught degrees, an innovative economy, and a strong international community.`,
  highlights: ['Orientation Year (Zoekjaar) Visa for Jobs', 'Strong Global Corporate Network', 'English-Taught Programs', 'High Quality of Life & Innovation'],
  duration: '1–2 years (PG) / 3-4 years (UG)',
  mode: 'On-Campus',
  approvals: 'NVAO (Accreditation Organisation of the Netherlands and Flanders)',
  whatsapp: '919560020771',
}));
