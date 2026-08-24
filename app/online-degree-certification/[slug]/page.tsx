import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BadgeCheck, Phone, ChevronDown, BookOpen, MapPin, IndianRupee, Star, Award, ShieldCheck, GraduationCap } from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import OnlineDegreeLeadForm from '@/components/OnlineDegreeLeadForm';
import { COLLEGES } from '@/data/onlineColleges';

const BASE_URL = 'https://www.careerwithmohit.online';
const PARENT_PATH = '/online-degree-certification';

// ── Course SEO & Copy Configurations ──────────────────────────────────────────
interface CourseConfig {
  name: string;
  searchToken: string;
  title: string;
  desc: string;
  h1: string;
  aboutText: string;
  faqs: { q: string; a: string }[];
}

const COURSE_MAP: Record<string, CourseConfig> = {
  'online-mba': {
    name: 'Online MBA',
    searchToken: 'MBA',
    title: 'Top Online MBA Colleges in India 2027 | UGC Approved Fees',
    desc: 'Compare 15+ UGC-DEB approved online MBA universities in India. Find fees, specializations, NAAC grades, placements & get FREE admission guidance.',
    h1: 'Online MBA Colleges in India 2027',
    aboutText: 'An Online MBA (Master of Business Administration) is one of India\'s most sought-after postgraduate degrees for working professionals. Modern UGC-DEB regulations render online MBAs 100% equivalent to regular classroom degrees, making them ideal for government job eligibility, corporate promotions, and global migration. Program fees range from ₹62,200 to ₹2.2 Lakhs.',
    faqs: [
      { q: 'Is an online MBA valid for government jobs?', a: 'Yes. As per UGC Regulations 2020, online MBA degrees from UGC-DEB recognized universities are fully equivalent to regular classroom degrees and valid for government/PSU jobs.' },
      { q: 'What is the average fee for an online MBA in India?', a: 'The fees range from ₹62,200 (Andhra University) to ₹2,00,000+ (NMIMS, Amity, SASTRA) for the complete 2-year program.' },
      { q: 'Which online MBA has WES approval?', a: 'Amity Online, LPU Online, Jain Online, and Manipal Jaipur Online have WES approval, which is crucial for jobs and higher education in Canada and the US.' }
    ]
  },
  'online-bba': {
    name: 'Online BBA',
    searchToken: 'BBA',
    title: 'Best Online BBA Colleges in India 2027 | UGC Recognized Fees',
    desc: 'Find the best UGC approved online BBA universities in India for 2027. Compare syllabus, NAAC ratings, starting fees, and get free expert support.',
    h1: 'Online BBA Colleges in India 2027',
    aboutText: 'An Online BBA (Bachelor of Business Administration) is a 3-year undergraduate degree designed to build strong foundations in management, marketing, finance, and human resources. It is highly flexible and cost-effective, allowing fresh 12th pass-outs and working professionals to upgrade their credentials without physical classes.',
    faqs: [
      { q: 'Is there a difference in value between online BBA and regular BBA?', a: 'No, as long as the university holds UGC-DEB recognition. The degrees hold equal legal status for job recruitments and higher education.' },
      { q: 'What are the career prospects after an online BBA?', a: 'Graduates can apply for corporate management traineeships, sales executive roles, or proceed directly to pursue an online or regular MBA.' }
    ]
  },
  'online-mca': {
    name: 'Online MCA',
    searchToken: 'MCA',
    title: 'Top Online MCA Colleges in India 2027 | Fees & UGC Approved',
    desc: 'Compare leading UGC-DEB approved online MCA universities in India. Find tuition fees, NAAC grades, placement assistance, and specialization details.',
    h1: 'Online MCA Colleges in India 2027',
    aboutText: 'The Online MCA (Master of Computer Applications) is a 2-year postgraduate program targeting IT aspirants. Taught by top computer science faculty, these degrees feature advanced specializations in AI, Data Science, Cyber Security, and Software Engineering, coupled with virtual labs and placement drives.',
    faqs: [
      { q: 'Can non-CS students apply for an online MCA?', a: 'Yes, most universities accept graduates from B.Sc, B.Com, and B.A streams. However, some may require you to take bridge courses in mathematics or programming.' },
      { q: 'What is the average starting salary for an online MCA graduate?', a: 'Depending on coding skills, graduates can expect packages from ₹4 LPA to ₹10 LPA, comparable to physical MCA graduates.' }
    ]
  },
  'online-bca': {
    name: 'Online BCA',
    searchToken: 'BCA',
    title: 'Best Online BCA Colleges in India 2027 | UGC Approved Fees',
    desc: 'Discover the top online BCA colleges in India for 2027. Get fee structures, syllabus specializations (AI, Cloud, Full Stack), and free guidance.',
    h1: 'Online BCA Colleges in India 2027',
    aboutText: 'An Online BCA (Bachelor of Computer Applications) is a 3-year IT degree ideal for students aiming to enter the tech sector. Learn programming languages (Java, Python, C++), database systems, and web development in a fully virtual format, with fees starting as low as ₹10,000 per semester.',
    faqs: [
      { q: 'Is online BCA equal to regular BCA for MCA admissions?', a: 'Yes, online BCA degrees are fully accepted for admission to physical or online MCA programs at all Indian universities.' },
      { q: 'Do online BCA programs provide placements?', a: 'Many premium universities like LPU Online, Jain, and Amity have placement cells offering virtual job fairs, resume-building sessions, and mock interviews.' }
    ]
  },
  'online-bcom': {
    name: 'Online B.Com',
    searchToken: 'B.Com',
    title: 'Top Online B.Com Universities in India 2027 | UGC Fees',
    desc: 'Compare fees and accreditations of top UGC approved online B.Com colleges. Check accounting, banking, and commerce courses starting from ₹20K.',
    h1: 'Online B.Com Colleges in India 2027',
    aboutText: 'An Online B.Com (Bachelor of Commerce) is a flexible undergraduate degree focusing on accounting, statistics, banking, audit, and finance. It is particularly popular among students preparing for CA, CS, or CMA exams, as it offers the flexibility to study at their own pace.',
    faqs: [
      { q: 'What is the fee structure for an online B.Com in India?', a: 'Fees are highly affordable, generally ranging from ₹30,000 to ₹90,000 for the entire 3-year course duration.' },
      { q: 'Can I do CA prep alongside an online B.Com?', a: 'Yes, this is the main advantage. Since online lectures are recorded, you can devote maximum time to CA/CS coaching classes.' }
    ]
  },
  'online-mcom': {
    name: 'Online M.Com',
    searchToken: 'M.Com',
    title: 'Best Online M.Com Colleges in India 2027 | Fees & Accreditations',
    desc: 'Find the best online M.Com universities in India. Compare NAAC A++ grades, UGC recognition, specialization tracks, and admission dates.',
    h1: 'Online M.Com Colleges in India 2027',
    aboutText: 'An Online M.Com (Master of Commerce) is a 2-year postgraduate program designed to build advanced proficiency in financial analysis, taxation, corporate accounting, and economics. Ideal for careers in banking, financial services, or academic research.',
    faqs: [
      { q: 'Who should pursue an online M.Com?', a: 'Working professionals in corporate finance, school teachers wanting a PG degree, and B.Com graduates aiming for higher roles in banking and accounting.' }
    ]
  },
  'online-bsc': {
    name: 'Online B.Sc',
    searchToken: 'B.Sc',
    title: 'Top Online B.Sc Universities in India 2027 | UGC Approved',
    desc: 'Compare the best UGC-DEB approved online B.Sc programs. Find tuition fees, NAAC grades, and specialty details.',
    h1: 'Online B.Sc Colleges in India 2027',
    aboutText: 'An Online B.Sc (Bachelor of Science) provides a foundational 3-year education in scientific principles, data science, IT, or aviation. Ideal for candidates looking for computer science or analytical degrees with online flexibility.',
    faqs: [
      { q: 'What specializations are available in online B.Sc?', a: 'Most universities offer Computer Science, Data Science, Mathematics, or Hospitality/Hotel Management.' }
    ]
  },
  'online-ma': {
    name: 'Online MA',
    searchToken: 'MA',
    title: 'Best Online MA Colleges in India 2027 | UGC Approved Fees & Specializations',
    desc: 'Compare top UGC-DEB approved Online MA universities in India for 2027. Explore fees, eligibility, and specializations like English, Journalism, Economics, and Sociology.',
    h1: 'Online MA Colleges in India 2027',
    aboutText: 'An Online MA (Master of Arts) is a 2-year postgraduate humanities degree recognized by UGC-DEB. Offering 100% equivalence to regular classroom programs under UGC Regulations 2020, it is ideal for working professionals, civil services (UPSC) aspirants, and educators. Popular specializations include English Literature, Journalism & Mass Communication, Economics, Political Science, History, Sociology, Hindi, and Public Administration.',
    faqs: [
      {
        q: 'Is an online MA degree valid for UGC NET, PhD, and lectureship?',
        a: 'Yes. As per UGC (ODL & Online Programmes) Regulations 2020, an Online MA from a UGC-DEB approved university is legally equivalent to a regular MA degree. Graduates are 100% eligible to appear for UGC NET/JRF, SET exams, pursue PhD admissions, and apply for assistant professor roles.',
      },
      {
        q: 'What is the fee structure for an Online MA in India in 2027?',
        a: 'Online MA fees in India start from ₹20,000 for entire 2-year programs at central universities like Jamia Millia Islamia (JMI), Aligarh Muslim University (AMU), and DU SOL. Private universities like LPU Online, Chandigarh University Online, and Amity Online charge between ₹60,000 to ₹1,20,000 with flexible semester EMIs.',
      },
      {
        q: 'Which universities offer the best Online MA in English?',
        a: 'Top universities for Online MA in English include LPU Online (NAAC A++), Chandigarh University Online (QS Ranked), Vivekananda Global University Online, Shoolini University Online, Parul University Online, Sikkim Manipal University Online, Amity University Online (WES Approved), and IGNOU Online.',
      },
      {
        q: 'Can I prepare for UPSC Civil Services while pursuing an Online MA?',
        a: 'Absolutely. Many UPSC aspirants choose an Online MA in subjects like Political Science, History, Sociology, Public Administration, or English Literature. It provides a formal postgraduate degree without mandatory classroom attendance, leaving ample time for exam preparation.',
      },
      {
        q: 'Are Online MA degrees WES approved for jobs and immigration abroad?',
        a: 'Yes, select universities like Amity University Online, LPU Online, and Jain University Online hold World Education Services (WES) approval, making your degree valid for higher education and immigration to Canada and the USA.',
      },
    ],
  },
  'online-ma-english': {
    name: 'Online MA in English',
    searchToken: 'MA',
    title: 'Top Online MA in English Colleges in India 2027 | UGC Approved Fees',
    desc: 'Find the best UGC-DEB approved universities for Online MA in English in India. Compare tuition fees, syllabus, NAAC ratings, and career scopes.',
    h1: 'Online MA in English Colleges in India 2027',
    aboutText: 'An Online MA in English is a 2-year postgraduate program designed to build deep expertise in British, American, Indian, and World literature, literary criticism, linguistics, and creative writing. Offered by top universities like LPU Online, Chandigarh University Online, Vivekananda Global University Online, and Amity Online, it is 100% equivalent to regular degrees under UGC Regulations 2020. Graduates are fully eligible for UGC NET, PhD, school/college teaching, journalism, publishing, and civil services.',
    faqs: [
      {
        q: 'Which are the best universities for Online MA in English in India?',
        a: 'Leading UGC-DEB approved universities offering Online MA in English include LPU Online (NAAC A++), Chandigarh University Online (QS Ranked), Vivekananda Global University Online, Shoolini University Online, Parul University Online, Sikkim Manipal University Online, Amity University Online, Jamia Millia Islamia Online, and IGNOU.',
      },
      {
        q: 'What is the eligibility criteria for an Online MA in English?',
        a: 'Candidates must hold a Bachelor’s degree (BA, B.Com, B.Sc, B.Tech, or equivalent) from any recognized university with a minimum of 45-50% aggregate marks. Most universities do not require an entrance exam for online MA admissions.',
      },
      {
        q: 'Is an Online MA in English valid for government teaching jobs and UGC NET?',
        a: 'Yes. As per UGC Notification 2020, Online MA in English degrees from UGC-DEB approved universities hold identical status to conventional degrees. You are eligible for UGC NET/JRF, PGT/TGT school teaching exams, and PhD admissions.',
      },
      {
        q: 'What are the career opportunities after completing an Online MA in English?',
        a: 'Graduates can pursue careers as Content Strategists, Technical Writers, Journalists, Copywriters, Editors, Public Relations Specialists, Academic Researchers, and Educators, or appear for civil services (UPSC) and state administrative exams.',
      },
      {
        q: 'What is the total fee for an Online MA in English?',
        a: 'Total tuition fees for a 2-year Online MA in English range from ₹20,000 (Central Universities like JMI/AMU/DU SOL) to ₹80,000–₹1,20,000 for top-ranked private universities like LPU, Chandigarh University, and Amity Online.',
      },
    ],
  },
  'online-ba': {
    name: 'Online BA',
    searchToken: 'BA',
    title: 'Top UGC Approved Online BA Universities 2027 | Fees & Details',
    desc: 'Compare fees, specializations, and approvals of top online BA universities in India for 2027. Admission open.',
    h1: 'Online BA Colleges in India 2027',
    aboutText: 'An Online BA (Bachelor of Arts) is the most flexible and affordable undergraduate program. With fees starting below ₹10,000 per year, it allows students to earn a degree in fields like field studies, English, Political Science, History, and Sociology.',
    faqs: [
      { q: 'Which is the cheapest university for an online BA?', a: 'State universities like Andhra University offer highly affordable online BA degrees, with complete 3-year fees around ₹40,000.' }
    ]
  },
  'online-pgdm': {
    name: 'Online PGDM',
    searchToken: 'PGDM',
    title: 'Top Online PGDM Colleges in India 2027 | AICTE Approved Fees',
    desc: 'Compare leading AICTE approved online PGDM universities in India. Find tuition fees, NAAC grades, placement assistance, and specialization details.',
    h1: 'Online PGDM Colleges in India 2027',
    aboutText: 'An Online PGDM (Post Graduate Diploma in Management) is a 2-year postgraduate program equivalent to an MBA, regulated by AICTE. It focuses heavily on industry-ready practical curriculum, dynamic case studies, and corporate applications.',
    faqs: [
      { q: 'Is PGDM equal to MBA?', a: 'Yes. AICTE-approved PGDM programs from recognized institutions are treated as equivalent to an MBA degree for jobs and higher education.' },
      { q: 'Which universities offer online PGDM?', a: 'Top-tier institutions like Jaipuria Institute of Management and NMIMS offer highly recognized online PGDM programs.' }
    ]
  },
  'online-msc': {
    name: 'Online M.Sc',
    searchToken: 'M.Sc',
    title: 'Best Online M.Sc Colleges in India 2027 | UGC Approved Fees',
    desc: 'Compare the best UGC-DEB approved online M.Sc programs. Find tuition fees, NAAC grades, and specialty details.',
    h1: 'Online M.Sc Colleges in India 2027',
    aboutText: 'An Online M.Sc (Master of Science) is a 2-year post-graduate degree focusing on technical and scientific specializations like Information Technology, Data Science, and Mathematics. Ideal for upgrading technical skills.',
    faqs: [
      { q: 'What is the eligibility for online M.Sc?', a: 'Candidates must hold a Bachelor\'s degree (B.Sc, BCA, or equivalent) from a recognized university.' }
    ]
  }
};

// ── Geo-Location SEO Configurations (GEO) ───────────────────────────────────
interface GeoConfig {
  name: string;
  locationFilter: (location: string, name: string) => boolean;
  title: string;
  desc: string;
  h1: string;
  cities: string;
  aboutText: string;
  faqs: { q: string; a: string }[];
}

const GEO_MAP: Record<string, GeoConfig> = {
  'online-degree-delhi-ncr': {
    name: 'Delhi NCR Hub',
    locationFilter: (loc, name) => loc.includes('UP') || loc.includes('Noida') || loc.includes('Delhi') || loc.includes('Faridabad') || loc.includes('Haryana') || name.includes('Amity') || name.includes('Galgotias') || name.includes('Sharda') || name.includes('Jamia') || name.includes('Delhi'),
    title: 'Top Online Degrees in Delhi NCR 2027 | UGC Approved Fees',
    desc: 'Compare UGC-DEB approved online universities in Delhi NCR (Noida, Gurgaon, Delhi, Faridabad). Fees from ₹20,000. NAAC A++ grades & free counselling.',
    h1: 'UGC Approved Online Universities in Delhi NCR (2027)',
    cities: 'Delhi · Noida · Greater Noida · Gurgaon · Faridabad · Sonipat',
    aboutText: 'Delhi NCR is India\'s premier economic corridor housing corporate headquarters, tech hubs, and top central universities. Online degrees from institutions like Amity University Online, Jamia Millia Islamia Online, DU SOL, Galgotias Online, and Jamia Hamdard Online offer maximum corporate recognition.',
    faqs: [
      { q: 'Which are the top UGC-DEB approved online universities in Delhi NCR?', a: 'Leading universities in Delhi NCR include Amity University Online (Noida), Jamia Millia Islamia Online (Delhi), DU SOL, Galgotias University Online (Greater Noida), Sharda University Online, and Jamia Hamdard Online.' },
      { q: 'What is the starting fee for an online degree in Delhi NCR?', a: 'Central universities like Jamia Millia Islamia and DU SOL offer online degrees starting from ₹20,000 total fees. Top private NAAC A+ universities range between ₹90,000 to ₹1,99,000 for 2-year programs with EMI options.' }
    ]
  },
  'online-degree-bangalore': {
    name: 'Bangalore Hub',
    locationFilter: (loc, name) => loc.includes('Karnataka') || loc.includes('Bangalore') || loc.includes('Mysore') || name.includes('Jain') || name.includes('Mysore'),
    title: 'Best Online Degree Colleges in Bangalore 2027 | UGC Fees',
    desc: 'Explore NAAC A++ UGC-DEB approved online universities in Bangalore & Karnataka for 2027. Compare Online MBA, MCA, BBA, BCA fees & placements.',
    h1: 'UGC Approved Online Universities in Bangalore & Karnataka (2027)',
    cities: 'Bangalore · Mysore · Mangalore · Hubli',
    aboutText: 'Bangalore, the Silicon Valley of India, is home to leading tech and management institutions. Online programs from Bangalore institutions like Jain University Online and Mysore University Online offer direct connection to India\'s largest startup and IT ecosystem.',
    faqs: [
      { q: 'Why choose an online degree from a Bangalore university?', a: 'Bangalore universities like Jain University Online (NAAC A++) offer industry-curated curriculums in AI, Data Science, FinTech, and Digital Marketing, backed by Bangalore tech placement networks.' }
    ]
  },
  'online-degree-mumbai-pune': {
    name: 'Mumbai & Pune Hub',
    locationFilter: (loc, name) => loc.includes('Maharashtra') || loc.includes('Mumbai') || loc.includes('Pune') || name.includes('NMIMS') || name.includes('Patil') || name.includes('SCDL'),
    title: 'Top Online Degrees in Mumbai & Pune Maharashtra 2027',
    desc: 'Compare UGC-DEB approved online universities in Mumbai, Pune & Maharashtra. NMIMS Online, D.Y. Patil Online, SCDL Symbiosis fees & admissions.',
    h1: 'UGC Approved Online Degrees in Mumbai & Pune (2027)',
    cities: 'Mumbai · Pune · Navi Mumbai · Thane · Vadodara',
    aboutText: 'Maharashtra is India\'s premier commercial and financial powerhouse. Institutions like NMIMS Online (Mumbai), D.Y. Patil University Online (Pune & Navi Mumbai), and SCDL Symbiosis offer top-tier online MBA, BBA, MCA, and Finance degrees tailored for corporate professionals.',
    faqs: [
      { q: 'Which are the best online MBA colleges in Mumbai and Pune?', a: 'NMIMS Online (NAAC A+), D.Y. Patil University Online Pune (NAAC A++), D.Y. Patil Navi Mumbai, and SCDL Symbiosis are top choices with strong finance and management industry repute.' }
    ]
  },
  'online-degree-hyderabad': {
    name: 'Hyderabad & AP Hub',
    locationFilter: (loc, name) => loc.includes('AP') || loc.includes('Andhra') || loc.includes('Vijayawada') || loc.includes('Guntur') || name.includes('Andhra') || name.includes('KL') || name.includes('Vignan'),
    title: 'Top Online Degrees in Hyderabad & Andhra Pradesh 2027',
    desc: 'Explore UGC approved online universities in Hyderabad & Andhra Pradesh. Andhra University, KL University, Vignan University fees starting ₹62,200.',
    h1: 'Online Degrees in Hyderabad & Andhra Pradesh (2027)',
    cities: 'Hyderabad · Visakhapatnam · Vijayawada · Guntur',
    aboutText: 'Hyderabad and the Andhra Pradesh corridor represent a rapidly expanding tech and pharmaceutical hub. Institutions like Andhra University Online (lowest fee king at ₹62,200), KL University Online (NAAC A++), and Vignan University Online offer accredited higher education for working adults.',
    faqs: [
      { q: 'Which is the cheapest UGC approved online MBA in South India?', a: 'Andhra University Online offers the most affordable UGC-DEB approved Online MBA in India with total fees of just ₹62,200.' }
    ]
  },
  'online-degree-jaipur-rajasthan': {
    name: 'Jaipur & Rajasthan Hub',
    locationFilter: (loc, name) => loc.includes('Rajasthan') || loc.includes('Jaipur') || name.includes('Manipal') || name.includes('Vivekananda') || name.includes('Mody') || name.includes('SGVU'),
    title: 'Top Online Degrees in Jaipur & Rajasthan 2027 | Fees & Review',
    desc: 'Compare UGC approved online universities in Jaipur & Rajasthan. Manipal Jaipur Online, VGU, SGVU & Mody University fees from ₹48,000.',
    h1: 'UGC Approved Online Degrees in Jaipur & Rajasthan (2027)',
    cities: 'Jaipur · Lakshmangarh · Kota · Udaipur',
    aboutText: 'Rajasthan has emerged as a major education hub in North-West India. Premier universities like Manipal University Jaipur (NAAC A+), Vivekananda Global University (VGU Online), Suresh Gyan Vihar University (SGVU), and Mody University Online provide high ROI online degree courses.',
    faqs: [
      { q: 'Are online degrees from Rajasthan universities recognized by WES?', a: 'Yes. Manipal University Jaipur Online holds World Education Services (WES) approval for Canada PR and US higher studies.' }
    ]
  },
  'online-degree-chandigarh-punjab': {
    name: 'Chandigarh & Punjab Hub',
    locationFilter: (loc, name) => loc.includes('Punjab') || loc.includes('Chandigarh') || name.includes('Chandigarh') || name.includes('LPU') || name.includes('Guru Kashi') || name.includes('Chitkara'),
    title: 'Best Online Degrees in Chandigarh & Punjab 2027 | NAAC A++',
    desc: 'Compare NAAC A++ UGC approved online universities in Punjab & Chandigarh. LPU Online, Chandigarh University, Chitkara & Guru Kashi fees & guidance.',
    h1: 'UGC Approved Online Degrees in Chandigarh & Punjab (2027)',
    cities: 'Chandigarh · Mohali · Phagwara · Bathinda · Rajpura',
    aboutText: 'The Punjab and Chandigarh education corridor features some of India\'s largest and highest-accredited private universities. Institutions like LPU Online (NAAC A++), Chandigarh University Online (QS Ranked), Guru Kashi University (NAAC A++), and Chitkara University deliver world-class virtual learning.',
    faqs: [
      { q: 'Which online universities in Punjab have NAAC A++ accreditation?', a: 'Lovely Professional University (LPU Online) and Guru Kashi University hold NAAC A++ accreditation, while Chandigarh University is QS World Ranked and NAAC A+ rated.' }
    ]
  },
  'online-degree-south-india': {
    name: 'South India Hub',
    locationFilter: (loc, name) => loc.includes('TN') || loc.includes('Tamil') || loc.includes('Chennai') || loc.includes('Coimbatore') || loc.includes('Thanjavur') || name.includes('SRM') || name.includes('SASTRA') || name.includes('Amrita') || name.includes('Annamalai'),
    title: 'Top Online Degrees in South India 2027 | NAAC A++ & WES Fees',
    desc: 'Compare NAAC A++ online degree universities in Tamil Nadu & South India. SRM Online, SASTRA, Amrita Vishwa Vidyapeetham & Annamalai fees.',
    h1: 'UGC Approved Online Degrees in South India (2027)',
    cities: 'Chennai · Coimbatore · Thanjavur · Chidambaram',
    aboutText: 'South India holds an exceptional reputation for academic rigor and technical university standards. Premier institutions like Amrita Vishwa Vidyapeetham (NIRF Top 10), SASTRA University (NAAC A++), SRM University Online (NAAC A++), and Annamalai University offer accredited online degrees across management, computer science, and arts.',
    faqs: [
      { q: 'Which South Indian universities offer online degrees?', a: 'Amrita Vishwa Vidyapeetham, SASTRA University, SRM University Online, Annamalai University, Andhra University, and KL University offer UGC-DEB recognized online degrees.' }
    ]
  },
  'online-degree-kolkata-east-india': {
    name: 'East & Central India Hub',
    locationFilter: (loc, name) => loc.includes('Sikkim') || loc.includes('Chhattisgarh') || loc.includes('East') || name.includes('Sikkim') || name.includes('Kalinga'),
    title: 'Top Online Degrees in East & Central India 2027 | UGC Fees',
    desc: 'Explore UGC-DEB approved online universities in Eastern & Central India. Sikkim Manipal University & Kalinga University fees starting ₹80,000.',
    h1: 'UGC Approved Online Degrees in East & Central India (2027)',
    cities: 'Gangtok · Raipur · Kolkata · Central India',
    aboutText: 'East and Central India offer highly budget-friendly, accredited online higher education options. Sikkim Manipal University (SMU Online) and Kalinga University (Raipur) deliver recognized Online MBA, MCA, BBA, and BCA programs with flexible learning models.',
    faqs: [
      { q: 'Which is the best online university in Eastern India?', a: 'Sikkim Manipal University Online (SMU) is a pioneer with 20+ years of distance/online education experience and NAAC A+ accreditation.' }
    ]
  }
};

// ── Comparison Helper mapping ────────────────────────────────────────────────
const findCollegeBySlugPart = (part: string) => {
  const normalized = part.toLowerCase().trim();
  if (normalized === 'amity') return COLLEGES.find(c => c.name.toLowerCase().includes('amity'));
  if (normalized === 'jain') return COLLEGES.find(c => c.name.toLowerCase().includes('jain'));
  if (normalized === 'lpu' || normalized === 'lovely') return COLLEGES.find(c => c.name.toLowerCase().includes('lovely') || c.name.toLowerCase().includes('lpu'));
  if (normalized === 'chandigarh') return COLLEGES.find(c => c.name.toLowerCase().includes('chandigarh'));
  if (normalized === 'manipal') return COLLEGES.find(c => c.name.toLowerCase().includes('manipal'));
  if (normalized === 'jaipuria') return COLLEGES.find(c => c.name.toLowerCase().includes('jaipuria'));
  if (normalized === 'sikkim' || normalized === 'sikkim-manipal') return COLLEGES.find(c => c.name.toLowerCase().includes('sikkim'));
  if (normalized === 'nmims') return COLLEGES.find(c => c.name.toLowerCase().includes('nmims'));
  if (normalized === 'uttaranchal') return COLLEGES.find(c => c.name.toLowerCase().includes('uttaranchal'));
  if (normalized === 'vgu' || normalized === 'vivekananda') return COLLEGES.find(c => c.name.toLowerCase().includes('vivekananda') || c.name.toLowerCase().includes('vgu'));
  if (normalized === 'parul') return COLLEGES.find(c => c.name.toLowerCase().includes('parul'));
  if (normalized === 'andhra') return COLLEGES.find(c => c.name.toLowerCase().includes('andhra'));
  if (normalized === 'shoolini') return COLLEGES.find(c => c.name.toLowerCase().includes('shoolini'));
  if (normalized === 'srm') return COLLEGES.find(c => c.name.toLowerCase().includes('srm'));
  if (normalized === 'galgotias') return COLLEGES.find(c => c.name.toLowerCase().includes('galgotias'));
  if (normalized === 'vignan') return COLLEGES.find(c => c.name.toLowerCase().includes('vignan'));
  if (normalized === 'kalinga') return COLLEGES.find(c => c.name.toLowerCase().includes('kalinga'));
  if (normalized === 'chitkara') return COLLEGES.find(c => c.name.toLowerCase().includes('chitkara'));
  if (normalized === 'op-jindal' || normalized === 'jindal') return COLLEGES.find(c => c.name.toLowerCase().includes('jindal'));
  if (normalized === 'jamia' || normalized === 'jamia-hamdard') return COLLEGES.find(c => c.name.toLowerCase().includes('jamia'));
  if (normalized === 'manav' || normalized === 'manav-rachna') return COLLEGES.find(c => c.name.toLowerCase().includes('manav'));
  if (normalized === 'mody') return COLLEGES.find(c => c.name.toLowerCase().includes('mody'));
  if (normalized === 'guru-kashi' || normalized === 'kashi') return COLLEGES.find(c => c.name.toLowerCase().includes('kashi') || c.name.toLowerCase().includes('guru kashi'));
  if (normalized === 'sastra') return COLLEGES.find(c => c.name.toLowerCase().includes('sastra'));
  if (normalized === 'kurukshetra') return COLLEGES.find(c => c.name.toLowerCase().includes('kurukshetra'));
  if (normalized === 'upes') return COLLEGES.find(c => c.name.toLowerCase().includes('upes'));
  if (normalized === 'symbiosis' || normalized === 'scdl') return COLLEGES.find(c => c.name.toLowerCase().includes('symbiosis') || c.name.toLowerCase().includes('scdl'));
  if (normalized === 'amrita') return COLLEGES.find(c => c.name.toLowerCase().includes('amrita'));
  if (normalized === 'kl' || normalized === 'kl-university') return COLLEGES.find(c => c.name.toLowerCase().includes('kl '));
  if (normalized === 'dy-patil' || normalized === 'd-y-patil') return COLLEGES.find(c => c.name.toLowerCase().includes('d.y') && c.name.toLowerCase().includes('pune'));
  if (normalized === 'dy-patil-mumbai') return COLLEGES.find(c => c.name.toLowerCase().includes('d.y') && c.name.toLowerCase().includes('mumbai'));
  if (normalized === 'ggu') return COLLEGES.find(c => c.name.toLowerCase().includes('golden'));
  if (normalized === 'ljmu') return COLLEGES.find(c => c.name.toLowerCase().includes('liverpool'));
  if (normalized === 'birchwood') return COLLEGES.find(c => c.name.toLowerCase().includes('birchwood'));
  return COLLEGES.find(c => c.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized.replace(/[^a-z0-9]/g, '')));
};

// ── Next.js Dynamic Configuration ─────────────────────────────────────────────

export async function generateStaticParams() {
  const courseSlugs = Object.keys(COURSE_MAP);
  const geoSlugs = Object.keys(GEO_MAP);
  const universitySlugs = COLLEGES.map((c) => c.universitySlug).filter(Boolean);
  
  // Popular comparisons that are high-traffic
  const comparisonSlugs = [
    'amity-vs-jain',
    'lpu-vs-chandigarh',
    'amity-vs-lpu',
    'jain-vs-lpu',
    'nmims-vs-amity',
    'manipal-vs-amity',
    'chandigarh-vs-lpu',
    'dy-patil-vs-jain',
    'sastra-vs-amrita',
    'scdl-vs-nmims'
  ];

  const allSlugs = [...courseSlugs, ...geoSlugs, ...universitySlugs, ...comparisonSlugs];

  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const PAGE_URL = `${BASE_URL}${PARENT_PATH}/${slug}`;

  // 1. Course Metadata
  if (COURSE_MAP[slug]) {
    const config = COURSE_MAP[slug];
    return {
      title: config.title,
      description: config.desc,
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: config.title,
        description: config.desc,
        url: PAGE_URL,
        siteName: 'CareerWithMohit',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.desc,
      }
    };
  }

  // 2. Geo Metadata
  if (GEO_MAP[slug]) {
    const config = GEO_MAP[slug];
    return {
      title: config.title,
      description: config.desc,
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: config.title,
        description: config.desc,
        url: PAGE_URL,
        siteName: 'CareerWithMohit',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.desc,
      }
    };
  }

  // 2. Comparison Metadata
  if (slug.includes('-vs-')) {
    const [partA, partB] = slug.split('-vs-');
    const collegeA = findCollegeBySlugPart(partA);
    const collegeB = findCollegeBySlugPart(partB);

    if (collegeA && collegeB) {
      const title = `${collegeA.name} vs ${collegeB.name}: Compare Fees 2027`.slice(0, 60);
      const desc = `Detailed side-by-side comparison of ${collegeA.name} and ${collegeB.name}. Compare tuition fees, NAAC grades, accreditations, and placement support. Get free counseling.`;

      return {
        title,
        description: desc,
        alternates: { canonical: PAGE_URL },
        openGraph: {
          title,
          description: desc,
          url: PAGE_URL,
          siteName: 'CareerWithMohit',
          type: 'website',
          images: [{ url: 'https://www.careerwithmohit.online/og-image.webp', width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: desc,
          images: ['https://www.careerwithmohit.online/og-image.webp'],
        }
      };
    }
  }

  // 3. University Metadata (Case C)
  const college = COLLEGES.find((c) => c.universitySlug === slug);
  if (college) {
    const title = `${college.name} Online Admission & Fees 2027`.slice(0, 60);
    const desc = `Explore online programs at ${college.name}. Check detailed fee structures, NAAC grade (${college.grade}), UGC approvals, and admission criteria for 2027.`;

    return {
      title,
      description: desc,
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title,
        description: desc,
        url: PAGE_URL,
        siteName: 'CareerWithMohit',
        type: 'website',
        images: [{ url: 'https://www.careerwithmohit.online/og-image.webp', width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        images: ['https://www.careerwithmohit.online/og-image.webp'],
      }
    };
  }

  return {
    title: 'Top UGC Approved Online Universities 2027',
  };
}

export default async function OnlineDegreeSubpage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const PAGE_URL = `${BASE_URL}${PARENT_PATH}/${slug}`;

  // ── Render Case A: Course Specific Hub ──
  if (COURSE_MAP[slug]) {
    const config = COURSE_MAP[slug];
    
    // Filter colleges for this specific program (case insensitive match)
    const matchingColleges = COLLEGES.filter(c => 
      c.programs.some(p => p.toLowerCase().includes(config.searchToken.toLowerCase()))
    );

    // Dynamic JSON-LD for Course Page
    const courseJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': PAGE_URL,
          url: PAGE_URL,
          name: config.title,
          description: config.desc,
          isPartOf: { '@id': `${BASE_URL}/#website` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Online Degrees', item: `${BASE_URL}${PARENT_PATH}` },
              { '@type': 'ListItem', position: 3, name: config.name, item: PAGE_URL },
            ],
          },
        },
        {
          '@type': 'ItemList',
          name: `Top UGC Approved ${config.name} Universities India 2027`,
          description: `List of top UGC-DEB approved online universities offering ${config.name} programs in India.`,
          url: PAGE_URL,
          numberOfItems: matchingColleges.length,
          itemListElement: matchingColleges.map((c, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: c.name,
            url: c.slug ? `${BASE_URL}/blog/${c.slug}` : PAGE_URL,
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: config.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a
            }
          }))
        }
      ]
    };

    return (
      <div className="bg-[#f8f7f4] min-h-screen">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
          .page-font { font-family: 'DM Sans', sans-serif; }
          .display-font { font-family: 'Playfair Display', serif; }
          .hero-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
            position: relative;
            overflow: hidden;
          }
          .hero-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
          }
          .hero-grid {
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 48px 48px;
            position: absolute;
            inset: 0;
          }
          .stat-card {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
          }
          .cta-strip {
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
          }
        `}</style>

        <div className="page-font">
          {/* Hero */}
          <section className="hero-bg py-20 relative">
            <div className="hero-grid" />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <BadgeCheck size={14} className="text-indigo-400" />
                UGC-DEB Approved Universities · 2027 Edition
              </span>
              <h1 className="display-font text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Best {config.h1}
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                {config.aboutText}
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">{matchingColleges.length}+</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Colleges</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">
                    {matchingColleges.length > 0 ? matchingColleges.reduce((min, c) => c.feeNum < min ? c.feeNum : min, Infinity).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).replace('INR', '₹') : '₹62K'}
                  </p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Starting Fee</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Strip */}
          <div className="cta-strip py-4 text-center text-white">
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
            >
              <Phone size={15} />
              Talk to a free counsellor · Call +91 95600 20771
            </a>
          </div>

          {/* Lead capture form */}
          <section className="px-6 py-6 bg-[#f8f7f4]">
            <OnlineDegreeLeadForm />
          </section>

          {/* Course filter Client component */}
          <OnlineDegreeClient initialCourse={config.searchToken} />

          {/* Static Comparison Table for SEO */}
          <section className="bg-white py-16 md:py-20 border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-4 text-center">
                Top UGC-Approved {config.name} Universities Comparison (2027)
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto text-sm md:text-base font-medium">
                Comprehensive fee structures, NAAC accreditations, and approvals for universities offering {config.name} in India.
              </p>
              <div className="overflow-x-auto border-[4px] border-[#0f172a] rounded-2xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#0f172a] text-white font-bold text-xs uppercase tracking-widest border-b-[4px] border-[#0f172a]">
                      <th className="px-6 py-4">University Name</th>
                      <th className="px-6 py-4 text-center">NAAC Grade</th>
                      <th className="px-6 py-4">Approx. Fees (2-3 Years)</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4 text-center">Recognition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100 font-medium text-gray-700 text-sm">
                    {matchingColleges.slice(0, 10).map((univ, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#0f172a]">{univ.name}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                            {univ.grade} Rated
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-green-700">{univ.fee}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-gray-500">{univ.duration}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                            UGC-DEB Approved
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQs section */}
          <section className="bg-[#f8f7f4] py-16 md:py-20 border-t border-b border-gray-200">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center">
                {config.name} Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-center mb-10">
                Key questions about eligibility, accreditations, and career values for Online {config.searchToken}.
              </p>
              <div className="space-y-3">
                {config.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA Banner */}
          <section className="bg-[#0f172a] py-16 text-center">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="display-font text-3xl font-black text-white mb-4">
                Confused about online {config.name} admissions?
              </h2>
              <p className="text-white/50 mb-8 text-base">
                Get a free customized evaluation of fees, exams, and matching universities with expert guide Mohit Jain.
              </p>
              <a
                href={`https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(config.name)}%20options`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-indigo-900/40"
              >
                Get Free Counseling →
              </a>
            </div>
          </section>
        </div>

        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      </div>
    );
  }

  // ── Render Case A2: Geo-Location Hub ──
  if (GEO_MAP[slug]) {
    const config = GEO_MAP[slug];
    const matchingColleges = COLLEGES.filter(c => config.locationFilter(c.location, c.name));

    const geoJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': PAGE_URL,
          url: PAGE_URL,
          name: config.title,
          description: config.desc,
          isPartOf: { '@id': `${BASE_URL}/#website` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Online Degrees', item: `${BASE_URL}${PARENT_PATH}` },
              { '@type': 'ListItem', position: 3, name: config.name, item: PAGE_URL },
            ],
          },
        },
        {
          '@type': 'ItemList',
          name: config.h1,
          description: config.desc,
          url: PAGE_URL,
          numberOfItems: matchingColleges.length,
          itemListElement: matchingColleges.map((c, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: c.name,
            url: c.slug ? `${BASE_URL}/blog/${c.slug}` : PAGE_URL,
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: config.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a
            }
          }))
        }
      ]
    };

    return (
      <div className="bg-[#f8f7f4] min-h-screen">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
          .page-font { font-family: 'DM Sans', sans-serif; }
          .display-font { font-family: 'Playfair Display', serif; }
          .hero-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
            position: relative;
            overflow: hidden;
          }
          .hero-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
          }
          .hero-grid {
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 48px 48px;
            position: absolute;
            inset: 0;
          }
          .stat-card {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
          }
          .cta-strip {
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
          }
        `}</style>

        <div className="page-font">
          {/* Hero */}
          <section className="hero-bg py-20 relative">
            <div className="hero-grid" />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <MapPin size={14} className="text-indigo-400" />
                Regional Education Hub · {config.name}
              </span>
              <h1 className="display-font text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                {config.h1}
              </h1>
              <p className="text-indigo-300 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
                {config.cities}
              </p>
              <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                {config.aboutText}
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">{matchingColleges.length}+</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Universities</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">
                    {matchingColleges.length > 0 ? matchingColleges.reduce((min, c) => c.feeNum < min ? c.feeNum : min, Infinity).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).replace('INR', '₹') : '₹20K'}
                  </p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Starting Fee</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">100%</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">UGC Equivalence</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-2xl font-black text-white">NAAC A+</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Accreditation</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Strip */}
          <div className="cta-strip py-4 text-center text-white">
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
            >
              <Phone size={15} />
              Talk to a free counsellor for {config.name} · Call +91 95600 20771
            </a>
          </div>

          {/* Lead capture form */}
          <section className="px-6 py-6 bg-[#f8f7f4]">
            <OnlineDegreeLeadForm />
          </section>

          {/* Regional Colleges Grid */}
          <section className="bg-white py-16 md:py-20 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-4 text-center">
                UGC Approved Online Universities in {config.name}
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto text-sm md:text-base font-medium">
                Verified fee schedules, NAAC grades, and course details for online universities serving learners in {config.cities}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingColleges.map((univ) => (
                  <div key={univ.name} className="bg-[#f8f7f4] rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                          {univ.grade} Rated
                        </span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <MapPin size={13} className="text-indigo-500" /> {univ.location}
                        </span>
                      </div>
                      <h3 className="display-font text-xl font-black text-[#0f172a] mb-2">
                        {univ.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 font-medium">
                        {univ.about}
                      </p>
                      <div className="space-y-1.5 text-xs font-bold text-gray-700 mb-6">
                        <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> Approvals: {univ.approvals}</p>
                        <p className="flex items-center gap-2"><GraduationCap size={14} className="text-indigo-600" /> Programs: {univ.programs.join(', ')}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Fees</span>
                        <span className="text-sm font-black text-emerald-700">{univ.fee}</span>
                      </div>
                      <Link
                        href={`/online-degree-certification/${univ.universitySlug}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs section */}
          <section className="bg-[#f8f7f4] py-16 md:py-20 border-t border-b border-gray-200">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="display-font text-3xl md:text-4xl font-black text-[#0f172a] mb-3 text-center">
                {config.name} Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-center mb-10">
                Key questions about online degree admissions and recognition in {config.name}.
              </p>
              <div className="space-y-3">
                {config.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(geoJsonLd) }}
        />
      </div>
    );
  }

  // ── Render Case B: University Comparison Hub ──
  if (slug.includes('-vs-')) {
    const [partA, partB] = slug.split('-vs-');
    const collegeA = findCollegeBySlugPart(partA);
    const collegeB = findCollegeBySlugPart(partB);

    if (collegeA && collegeB) {
      // Comparison FAQs
      const compFaqs = [
        {
          q: `Is the degree from ${collegeA.name} better or ${collegeB.name}?`,
          a: `Both universities are fully recognized by UGC-DEB, making their online degrees legally equivalent and accepted for jobs. ${collegeA.name} is accredited with NAAC ${collegeA.grade}, whereas ${collegeB.name} is accredited with NAAC ${collegeB.grade}. The choice depends on your program preferences, specializations, and budget.`
        },
        {
          q: `How do fees compare between ${collegeA.name} and ${collegeB.name}?`,
          a: `The approximate total fee for ${collegeA.name} is ${collegeA.fee}, and for ${collegeB.name} it is ${collegeB.fee}. The budget winner depends on your target program.`
        },
        {
          q: `Are programs at both universities approved by AICTE?`,
          a: `Yes, management and technical programs at both ${collegeA.name} (${collegeA.approvals}) and ${collegeB.name} (${collegeB.approvals}) carry AICTE and UGC approvals.`
        }
      ];

      // Comparison JSON-LD schema
      const comparisonJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': PAGE_URL,
            url: PAGE_URL,
            name: `${collegeA.name} vs ${collegeB.name} Comparison 2027`,
            description: `Detailed comparison matrix between ${collegeA.name} and ${collegeB.name} fees, NAAC grades, WES status, and programs.`,
            isPartOf: { '@id': `${BASE_URL}/#website` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Online Degrees', item: `${BASE_URL}${PARENT_PATH}` },
                { '@type': 'ListItem', position: 3, name: `${collegeA.name} vs ${collegeB.name}`, item: PAGE_URL },
              ],
            },
          },
          {
            '@type': 'FAQPage',
            mainEntity: compFaqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a
              }
            }))
          }
        ]
      };

      // Simple winner logic
      const isFeeCheaperA = collegeA.feeNum < collegeB.feeNum;
      const isFeeCheaperB = collegeB.feeNum < collegeA.feeNum;
      
      const isRatingBetterA = (collegeA.grade === 'A++' && collegeB.grade !== 'A++') || (collegeA.grade === 'A+' && ['A', 'B+'].includes(collegeB.grade)) || (collegeA.grade === 'A' && collegeB.grade === 'B+');
      const isRatingBetterB = (collegeB.grade === 'A++' && collegeA.grade !== 'A++') || (collegeB.grade === 'A+' && ['A', 'B+'].includes(collegeA.grade)) || (collegeB.grade === 'A' && collegeA.grade === 'B+');

      return (
        <div className="bg-[#f8f7f4] min-h-screen">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
            .page-font { font-family: 'DM Sans', sans-serif; }
            .display-font { font-family: 'Playfair Display', serif; }
            .vs-bg {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
              position: relative;
              overflow: hidden;
            }
            .vs-badge {
              background: linear-gradient(135deg, #4f46e5, #7c3aed);
            }
          `}</style>

          <div className="page-font">
            {/* Header / VS Hero */}
            <section className="vs-bg py-16 md:py-24 relative text-center text-white px-6">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <ShieldCheck size={14} className="text-indigo-400" />
                UGC-DEB Comparison Engine
              </span>

              <h1 className="display-font text-3xl md:text-5xl font-black mb-8 text-center max-w-4xl mx-auto">
                {collegeA.name} <span className="text-indigo-400 italic">vs</span> {collegeB.name}
              </h1>

              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                {/* College A Hero Column */}
                <div className="flex-1">
                  <div className={`inline-block bg-gradient-to-br ${collegeA.gradeColor} rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider mb-3`}>
                    NAAC {collegeA.grade}
                  </div>
                  <h2 className="display-font text-2xl md:text-3xl font-black">{collegeA.name}</h2>
                  <p className="text-white/60 text-xs mt-1 font-semibold tracking-wide uppercase"><MapPin size={12} className="inline mr-1" />{collegeA.location}</p>
                </div>

                {/* VS Badge */}
                <div className="vs-badge w-14 h-14 rounded-full flex items-center justify-center font-black italic shadow-lg text-lg text-white border-2 border-white/10 shrink-0 select-none">
                  VS
                </div>

                {/* College B Hero Column */}
                <div className="flex-1">
                  <div className={`inline-block bg-gradient-to-br ${collegeB.gradeColor} rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider mb-3`}>
                    NAAC {collegeB.grade}
                  </div>
                  <h2 className="display-font text-2xl md:text-3xl font-black">{collegeB.name}</h2>
                  <p className="text-white/60 text-xs mt-1 font-semibold tracking-wide uppercase"><MapPin size={12} className="inline mr-1" />{collegeB.location}</p>
                </div>
              </div>
            </section>

            {/* Quick action strip */}
            <div className="bg-indigo-600 py-3 text-center text-white text-xs font-bold uppercase tracking-wider">
              <span>Need help deciding? Call +91 95600 20771 for free counseling comparison.</span>
            </div>

            {/* Comparison Matrix Table Section */}
            <section className="py-12 md:py-16 px-6">
              <div className="max-w-5xl mx-auto">
                <h3 className="display-font text-2xl md:text-3xl font-black text-[#0f172a] text-center mb-10">
                  Side-By-Side Comparison Matrix
                </h3>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {/* NAAC Rating Row */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Award size={16} className="text-indigo-500 shrink-0" />
                        NAAC Rating
                      </div>
                      <div className={`p-4 rounded-2xl mx-2 font-black ${isRatingBetterA ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-gray-50 text-gray-700'}`}>
                        {collegeA.grade} Rating
                        {isRatingBetterA && <span className="block text-[8px] uppercase tracking-wider text-emerald-600 mt-1">Winner</span>}
                      </div>
                      <div className={`p-4 rounded-2xl mx-2 font-black ${isRatingBetterB ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-gray-50 text-gray-700'}`}>
                        {collegeB.grade} Rating
                        {isRatingBetterB && <span className="block text-[8px] uppercase tracking-wider text-emerald-600 mt-1">Winner</span>}
                      </div>
                    </div>

                    {/* Fees Row */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <IndianRupee size={16} className="text-indigo-500 shrink-0" />
                        Total Fee Structure
                      </div>
                      <div className={`p-4 rounded-2xl mx-2 font-black ${isFeeCheaperA ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-gray-50 text-gray-700'}`}>
                        {collegeA.fee}
                        {isFeeCheaperA && <span className="block text-[8px] uppercase tracking-wider text-emerald-600 mt-1">Cheaper Option</span>}
                      </div>
                      <div className={`p-4 rounded-2xl mx-2 font-black ${isFeeCheaperB ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-gray-50 text-gray-700'}`}>
                        {collegeB.fee}
                        {isFeeCheaperB && <span className="block text-[8px] uppercase tracking-wider text-emerald-600 mt-1">Cheaper Option</span>}
                      </div>
                    </div>

                    {/* Accreditations Row */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <ShieldCheck size={16} className="text-indigo-500 shrink-0" />
                        Accreditations &amp; Approvals
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-gray-700 font-bold text-xs leading-relaxed">
                        {collegeA.approvals}
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-gray-700 font-bold text-xs leading-relaxed">
                        {collegeB.approvals}
                      </div>
                    </div>

                    {/* Programs Row */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <GraduationCap size={16} className="text-indigo-500 shrink-0" />
                        Programs Available
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-gray-700 font-bold text-xs leading-relaxed">
                        {collegeA.programs.join(', ')}
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-gray-700 font-bold text-xs leading-relaxed">
                        {collegeB.programs.join(', ')}
                      </div>
                    </div>

                    {/* Key Highlights Row */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Star size={16} className="text-indigo-500 shrink-0" />
                        Highlights
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-left text-xs font-semibold text-gray-600 space-y-2">
                        {collegeA.highlights.map((h, i) => (
                          <div key={i} className="flex gap-1.5 items-start">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✔</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-2xl mx-2 bg-gray-50 text-left text-xs font-semibold text-gray-600 space-y-2">
                        {collegeB.highlights.map((h, i) => (
                          <div key={i} className="flex gap-1.5 items-start">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✔</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Review Links */}
                    <div className="grid grid-cols-3 p-6 md:p-8 items-center text-center">
                      <div className="text-left font-black text-xs md:text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen size={16} className="text-indigo-500 shrink-0" />
                        Read Review
                      </div>
                      <div className="mx-2">
                        {collegeA.slug ? (
                          <a href={`/blog/${collegeA.slug}`} className="inline-flex items-center gap-1 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors">
                            <BookOpen size={12} /> Read review
                          </a>
                        ) : '—'}
                      </div>
                      <div className="mx-2">
                        {collegeB.slug ? (
                          <a href={`/blog/${collegeB.slug}`} className="inline-flex items-center gap-1 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors">
                            <BookOpen size={12} /> Read review
                          </a>
                        ) : '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom Lead capture section for comparing */}
            <section className="bg-white border-t border-b border-gray-100 py-12 px-6">
              <div className="max-w-4xl mx-auto">
                <div className="bg-[#f8f7f4] border-[4px] border-[#0f172a] rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                  <div className="text-center mb-8">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-200">
                      Comparison evaluation request
                    </span>
                    <h3 className="display-font text-3xl font-black text-[#0f172a] mt-4 mb-2">
                      Request comparison report
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">
                      Fill out your details to receive customized fee comparisons, specializations breakdown, and discount booklets for <strong>{collegeA.name}</strong> &amp; <strong>{collegeB.name}</strong>.
                    </p>
                  </div>
                  <OnlineDegreeLeadForm />
                </div>
              </div>
            </section>

            {/* FAQ section comparing A and B */}
            <section className="py-16 px-6">
              <div className="max-w-3xl mx-auto">
                <h4 className="display-font text-3xl font-black text-[#0f172a] text-center mb-2">
                  Frequently Asked Questions (FAQ)
                </h4>
                <p className="text-gray-500 text-center mb-10">
                  Quick answers to help you decide between {collegeA.name} and {collegeB.name}.
                </p>

                <div className="space-y-3">
                  {compFaqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                        <span>{faq.q}</span>
                        <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* WhatsApp direct links */}
            <section className="bg-[#0f172a] py-16 text-center text-white px-6">
              <h4 className="display-font text-2xl font-black mb-4">
                Still undecided?
              </h4>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Reach out directly on WhatsApp and ask expert Mohit Jain for a detailed profile consultation between {collegeA.name} and {collegeB.name}.
              </p>
              <a
                href={`https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20compare%20${encodeURIComponent(collegeA.name)}%20vs%20${encodeURIComponent(collegeB.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-colors"
              >
                <Phone size={16} /> Chat comparison on WhatsApp
              </a>
            </section>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
          />
        </div>
      );
    }
  }

  // ── Render Case C: University Hub Page ──
  const college = COLLEGES.find((c) => c.universitySlug === slug);
  if (college) {
    // Find popular comparisons involving this college
    const matchingComparisons = [
      'amity-vs-jain',
      'lpu-vs-chandigarh',
      'amity-vs-lpu',
      'jain-vs-lpu',
      'nmims-vs-amity',
      'manipal-vs-amity',
      'chandigarh-vs-lpu',
      'dy-patil-vs-jain',
      'sastra-vs-amrita',
      'scdl-vs-nmims'
    ].filter(comp => {
      const parts = comp.split('-vs-');
      const namePart = college.name.toLowerCase();
      return parts.some(part => namePart.includes(part));
    });

    const univJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          '@id': `${PAGE_URL}#organization`,
          "url": PAGE_URL,
          "name": college.name,
          "description": college.about,
          "logo": `${BASE_URL}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": college.location
          }
        },
        {
          '@type': 'FAQPage',
          "mainEntity": [
            {
              '@type': 'Question',
              "name": `Is an online degree from ${college.name} valid?`,
              "acceptedAnswer": {
                '@type': 'Answer',
                "text": `Yes. Online degrees from ${college.name} are fully approved by the UGC-DEB and recognized by employers, government departments, and higher study evaluations like WES.`
              }
            },
            {
              '@type': 'Question',
              "name": `What are the approvals held by ${college.name} Online?`,
              "acceptedAnswer": {
                '@type': 'Answer',
                "text": `${college.name} holds approvals from ${college.approvals}.`
              }
            }
          ]
        }
      ]
    };

    return (
      <div className="bg-[#f8f7f4] min-h-screen">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
          .page-font { font-family: 'DM Sans', sans-serif; }
          .display-font { font-family: 'Playfair Display', serif; }
          .hero-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
            position: relative;
            overflow: hidden;
          }
          .hero-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
          }
          .hero-grid {
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 48px 48px;
            position: absolute;
            inset: 0;
          }
          .stat-card {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
          }
          .cta-strip {
            background: linear-gradient(90deg, #4f46e5, #7c3aed);
          }
        `}</style>

        <div className="page-font">
          {/* Hero */}
          <section className="hero-bg py-20 relative">
            <div className="hero-grid" />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <BadgeCheck size={14} className="text-indigo-400" />
                UGC-DEB Recognized · 2027 Admission Profile
              </span>
              <h1 className="display-font text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                {college.name}
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                {college.about}
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto">
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-xl md:text-2xl font-black text-white">{college.grade}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">NAAC Grade</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-xl md:text-2xl font-black text-white">{college.fee}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Total Fee Est.</p>
                </div>
                <div className="stat-card px-4 py-4">
                  <p className="display-font text-[10px] md:text-xs font-black text-white uppercase break-all leading-tight pt-1.5">{college.location}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Campus Location</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Strip */}
          <div className="cta-strip py-4 text-center text-white">
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20admissions%20at%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
            >
              <Phone size={15} />
              Speak with a Counselor for {college.name} on WhatsApp
            </a>
          </div>

          {/* Lead Capture */}
          <section className="px-6 py-6 bg-[#f8f7f4]">
            <div className="max-w-4xl mx-auto">
              <OnlineDegreeLeadForm />
            </div>
          </section>

          {/* Detailed Info Grid */}
          <section className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="display-font text-3xl font-black text-[#0f172a] mb-6 text-center">
                Accreditations &amp; Global Recognitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-[#f8f7f4] p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-black text-[#0f172a] text-lg mb-3 flex items-center gap-2">
                    <Award size={18} className="text-indigo-500" /> Government Approvals
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The degree is fully approved by all national higher education councils in India.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {college.approvals.split(',').map((app, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-lg">
                        {app.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8f7f4] p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-black text-[#0f172a] text-lg mb-3 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-indigo-500" /> Key Highlights &amp; Benefits
                  </h3>
                  <ul className="space-y-2.5">
                    {college.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-600">
                        <span className="text-emerald-500 mt-0.5">✔</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Course-Specific Detailed Blocks */}
              <h2 className="display-font text-3xl font-black text-[#0f172a] mb-8 text-center pt-8 border-t border-gray-100">
                Online Programs &amp; Tuition Fees Breakdown
              </h2>
              <div className="space-y-6">
                {college.programs.map((prog, idx) => (
                  <div key={idx} className="bg-[#f8f7f4] border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <h3 className="font-black text-xl text-[#0f172a] flex items-center gap-2">
                        <GraduationCap size={22} className="text-indigo-500" /> Online {prog}
                      </h3>
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold px-3 py-1.5 rounded-full">
                        {college.duration}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      Pursue {prog} from {college.name} Online. It features weekend live mentoring, self-paced LMS structures, and dynamic exams.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-white p-3.5 rounded-xl border border-gray-200/50">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Fee</p>
                        <p className="text-base font-black text-green-700 mt-0.5">{college.fee}</p>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-gray-200/50">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Eligibility</p>
                        <p className="text-xs font-semibold text-gray-700 mt-1">{prog === 'MBA' || prog === 'MCA' || prog === 'M.Com' || prog === 'MA' ? 'Graduation (50%)' : '10+2 (45%)+'}</p>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-gray-200/50 col-span-2 sm:col-span-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Accreditation</p>
                        <p className="text-xs font-semibold text-indigo-600 mt-1">NAAC {college.grade} Rated</p>
                      </div>
                    </div>
                    {college.specializations && college.specializations[prog] && (
                      <div className="mt-5 pt-5 border-t border-gray-200/70">
                        <p className="text-[10px] text-indigo-500 font-black uppercase tracking-wider mb-2.5">Available Specializations</p>
                        <div className="flex flex-wrap gap-1.5">
                          {college.specializations[prog].map((spec) => (
                            <span key={spec} className="bg-indigo-50/70 text-indigo-800 border border-indigo-100 text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors hover:bg-indigo-100">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Side-by-Side Comparison Suggestions */}
              {matchingComparisons.length > 0 && (
                <div className="mt-16 pt-12 border-t border-gray-100">
                  <h3 className="display-font text-2xl font-black text-[#0f172a] text-center mb-6">
                    Compare {college.name} Side-By-Side
                  </h3>
                  <p className="text-gray-500 text-center mb-8 text-sm">
                    How does {college.name} compare with other top-rated UGC-approved universities? Check out these deep comparisons:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchingComparisons.map((comp) => {
                      const parts = comp.split('-vs-');
                      const peerSlug = parts.find(p => !college.name.toLowerCase().includes(p));
                      const peerName = peerSlug ? peerSlug.toUpperCase() : 'Peer';
                      return (
                        <a
                          key={comp}
                          href={`/online-degree-certification/${comp}`}
                          className="bg-[#f8f7f4] border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/20 text-slate-800 font-bold text-sm px-6 py-4 rounded-xl flex items-center justify-between transition-all"
                        >
                          <span>{college.name} vs {peerName} Online</span>
                          <span className="text-indigo-600">Compare →</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Quick FAQ Section */}
          <section className="bg-[#f8f7f4] py-16 border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-6">
              <h3 className="display-font text-3xl font-black text-[#0f172a] mb-8 text-center">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                    <span>Is the online degree from {college.name} equivalent to a regular degree?</span>
                    <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    Yes. As per UGC Regulations 2020, degrees earned through online mode from UGC-DEB approved universities like {college.name} are fully valid and equivalent to regular campus degrees for recruitments and promotions.
                  </div>
                </details>
                <details className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-black text-[#0f172a] text-sm md:text-base">
                    <span>What is the total fee structure for {college.name} Online courses?</span>
                    <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    The total fee averages around {college.fee}. You can pay semester-wise or avail of interest-free EMI facilities to pay in monthly chunks of around ₹3,000–₹8,000.
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* Call to Action Direct Chat */}
          <section className="bg-[#0f172a] py-16 text-center text-white px-6">
            <h4 className="display-font text-2xl font-black mb-4">
              Need detailed scholarship booklets?
            </h4>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Get in touch directly with our admission guide Mohit Jain to check active discount structures, fee waivers, and apply directly.
            </p>
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20apply%20for%20admissions%20at%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-colors"
            >
              <Phone size={16} /> Contact Advisor on WhatsApp
            </a>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(univJsonLd) }}
        />
      </div>
    );
  }

  // Slugs that don't match any config or valid colleges trigger 404
  return notFound();
}
