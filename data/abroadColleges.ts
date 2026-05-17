import { USA_COLLEGES } from '@/data/usaColleges';
import { CANADA_COLLEGES } from '@/data/canadaColleges';
import { UK_COLLEGES } from '@/data/ukColleges';
import { IRELAND_COLLEGES } from '@/data/irelandColleges';
import { AUSTRALIA_COLLEGES } from '@/data/australiaColleges';
import { NEW_ZEALAND_COLLEGES } from '@/data/newZealandColleges';
import { GERMANY_COLLEGES } from '@/data/germanyColleges';
import { SWEDEN_COLLEGES } from '@/data/swedenColleges';
import { NETHERLANDS_COLLEGES } from '@/data/netherlandsColleges';
import { FRANCE_COLLEGES } from '@/data/franceColleges';
import { FINLAND_COLLEGES } from '@/data/finlandColleges';
import { MALTA_COLLEGES } from '@/data/maltaColleges';
import { HUNGARY_COLLEGES } from '@/data/hungaryColleges';
import { SPAIN_COLLEGES } from '@/data/spainColleges';
import { POLAND_COLLEGES } from '@/data/polandColleges';
import { MALAYSIA_COLLEGES } from '@/data/malaysiaColleges';
import { DENMARK_COLLEGES } from '@/data/denmarkColleges';

export const ABROAD_COLLEGES = [
  {
    name: 'Liverpool John Moores University (LJMU)',
    location: 'Liverpool, United Kingdom',
    fee: '₹4,85,000',
    feeNum: 485000,
    accreditation: 'WES | AACSB | Privy Council (UK)',
    programs: ['Global MBA', 'M.Sc Data Science', 'M.Sc AI'],
    badge: 'UK Degree',
    grade: 'A+',
    gradeColor: 'from-blue-600 to-indigo-800',
    about: 'Liverpool John Moores University (LJMU) is a highly ranked public research university in the UK. Its online international programs provide access to a prestigious British degree recognized by the UK Privy Council and WES globally.',
    highlights: ['Top-tier UK public research university', 'WES recognized British degree', 'Triple Crown accredited curriculum', 'Global alumni network of 200,000+', 'Comprehensive career support'],
    duration: '12-24 Months',
    mode: 'Online (International)',
    approvals: 'Privy Council, QAA, AACSB, WES',
    whatsapp: '919560020771',
    country: 'UK',
  },
  {
    name: 'Golden Gate University (GGU)',
    location: 'San Francisco, USA',
    fee: '₹4,30,000',
    feeNum: 430000,
    accreditation: 'AACSB | WSCUC | WES | AIU',
    programs: ['Global MBA', 'MS Business Analytics', 'DBA'],
    badge: 'International',
    grade: 'A+',
    gradeColor: 'from-amber-600 to-orange-800',
    about: 'Located in the heart of San Francisco, GGU has been a leader in professional education for over 100 years. Its online international programs offer Silicon Valley insights and global exposure for ambitious professionals.',
    highlights: ['AACSB Accredited business school', 'Taught by Silicon Valley professionals', 'WES approved for global recognition', 'AIU Equivalence for Indian learners', 'Heritage of 100+ years in education'],
    duration: '12-15 Months',
    mode: 'Online (Global)',
    approvals: 'AACSB, WSCUC, WES, AIU',
    whatsapp: '919560020771',
    country: 'USA',
  },
  {
    name: 'Edgewood University',
    location: 'Madison, Wisconsin, USA',
    fee: '₹10,00,000',
    feeNum: 1000000,
    accreditation: 'WES | ACBSP | HLC',
    programs: ['Global MBA'],
    badge: 'USA Focus',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Edgewood University is accredited by WES, ACBSP, and HLC — well-recognized across the USA and globally. A strong option for professionals targeting North American markets.',
    highlights: ['Licensed by HLC & ACBSP', 'WES recognized US degree', '100% online flexible structure', 'Strong for North American careers', 'Modern leadership curriculum'],
    duration: '18-24 Months',
    mode: 'Fully Online',
    approvals: 'WES, ACBSP, HLC',
    whatsapp: '919560020771',
    country: 'USA',
  },
  {
    name: 'Birchwood University',
    location: 'Florida, USA',
    fee: '₹4,03,000',
    feeNum: 403000,
    accreditation: 'Florida CIE | CECU | QAHE',
    programs: ['Global MBA', 'DBA', 'M.Sc Data Science'],
    badge: 'Affordable US',
    grade: 'A',
    gradeColor: 'from-emerald-600 to-emerald-800',
    about: 'Birchwood University is an innovative Florida-based institution committed to affordable and industry-aligned higher education. Programs are tailored to modern market demands.',
    highlights: ['Licensed by Florida CIE', 'Most affordable US Online degree', '100% online flexible structure', 'Industry-centric curriculum', 'Modern technological integration'],
    duration: '18 Months',
    mode: '100% Online',
    approvals: 'Florida CIE, CECU, QAHE',
    whatsapp: '919560020771',
    country: 'USA',
  },
  ...USA_COLLEGES,
  ...CANADA_COLLEGES,
  ...UK_COLLEGES,
  ...IRELAND_COLLEGES,
  ...AUSTRALIA_COLLEGES,
  ...NEW_ZEALAND_COLLEGES,
  ...GERMANY_COLLEGES,
  ...SWEDEN_COLLEGES,
  ...NETHERLANDS_COLLEGES,
  ...FRANCE_COLLEGES,
  ...FINLAND_COLLEGES,
  ...MALTA_COLLEGES,
  ...HUNGARY_COLLEGES,
  ...SPAIN_COLLEGES,
  ...POLAND_COLLEGES,
  ...MALAYSIA_COLLEGES,
  ...DENMARK_COLLEGES,
];
