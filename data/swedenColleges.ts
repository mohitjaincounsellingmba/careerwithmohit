export const SWEDEN_COLLEGES = [
  { name: 'Linnaeus University', location: 'Kalmar and Växjö', programs: ['M.Sc. Business Administration', 'M.Sc. Software Technology', 'M.Sc. Data Science'], country: 'Sweden', fee: '₹12,00,000 / yr', feeNum: 1200000 },
  { name: 'University of Skövde', location: 'Skövde', programs: ['M.Sc. Data Science', 'M.Sc. Bioinformatics', 'M.Sc. Engineering'], country: 'Sweden', fee: '₹10,50,000 / yr', feeNum: 1050000 },
  { name: 'Halmstad University', location: 'Halmstad', programs: ['M.Sc. Information Technology', 'M.Sc. Embedded & Intelligent Systems', 'M.Sc. Industrial Management'], country: 'Sweden', fee: '₹11,00,000 / yr', feeNum: 1100000 },
  { name: 'University West', location: 'Trollhättan', programs: ['M.Sc. Manufacturing Engineering', 'M.Sc. Robotics', 'M.Sc. IT & Management'], country: 'Sweden', fee: '₹10,80,000 / yr', feeNum: 1080000 },
  { name: 'Jönköping University', location: 'Jönköping', programs: ['M.Sc. International Business', 'M.Sc. Engineering Management', 'M.Sc. Digital Business'], country: 'Sweden', fee: '₹13,00,000 / yr', feeNum: 1300000 },
  { name: 'Dalarna University', location: 'Falun', programs: ['M.Sc. Data Science', 'M.Sc. Business Intelligence', 'M.Sc. Solar Energy Engineering'], country: 'Sweden', fee: '₹11,50,000 / yr', feeNum: 1150000 },
  { name: 'Kristianstad University', location: 'Kristianstad', programs: ['M.Sc. Computer Science', 'M.Sc. Business Administration', 'M.Sc. Embedded Systems'], country: 'Sweden', fee: '₹10,00,000 / yr', feeNum: 1000000 },
  { name: 'Karlstad University', location: 'Karlstad', programs: ['M.Sc. Computer Science', 'M.Sc. Service Management', 'M.Sc. Industrial Engineering'], country: 'Sweden', fee: '₹11,80,000 / yr', feeNum: 1180000 },
  { name: 'Hyper Island University', location: 'Stockholm', programs: ['M.A. Digital Management', 'M.A. Digital Experience Design', 'M.A. Business Transformation'], country: 'Sweden', fee: '₹15,00,000 / yr', feeNum: 1500000 }
].map(u => ({
  ...u,
  accreditation: 'Swedish Higher Education Authority',
  badge: 'Sweden Focus',
  grade: 'A',
  gradeColor: 'from-blue-600 to-cyan-600',
  about: `Top-ranked institution in ${u.location}, Sweden. Explore world-class master's programs including ${u.programs.join(', ')}. Sweden is renowned for innovation, sustainability, and post-study work opportunities.`,
  highlights: ['High Standard of Living & Innovation', 'English-taught programs', 'Post-Study Work Visa (6 months+)', 'Strong Tech & Startup Ecosystem'],
  duration: '1–2 years (PG)',
  mode: 'On-Campus',
  approvals: 'Swedish Higher Education Authority (UKÄ)',
  whatsapp: '919560020771',
}));
