import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  BadgeCheck, Phone, ChevronDown, BookOpen, MapPin, IndianRupee, 
  Star, Award, ShieldCheck, GraduationCap, Building2, ArrowRight, 
  MessageCircle, Sparkles, CheckCircle2, Video 
} from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import OnlineDegreeLeadForm from '@/components/OnlineDegreeLeadForm';
import { College4SureScrollProgress } from '@/components/College4SureScrollProgress';
import { College4SureTicker } from '@/components/College4SureTicker';
import { College4SureSeoLinks } from '@/components/College4SureSeoLinks';
import { COLLEGES } from '@/data/onlineColleges';

const BASE_URL = 'https://careerwithmohit.online';
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
    aboutText: 'An Online B.Sc (Bachelor of Science) is a 3-year program with specializations in fields like Computer Science, Data Analytics, and Mathematics. Ideal for students seeking scientific analytical skills with digital flexibility.',
    faqs: [
      { q: 'Are online B.Sc degrees recognized for government jobs?', a: 'Yes. As per UGC Regulations 2020, online B.Sc degrees from UGC-DEB recognized universities are fully equivalent to regular classroom degrees.' }
    ]
  },
  'online-ma': {
    name: 'Online MA',
    searchToken: 'MA',
    title: 'Top Online MA Universities in India 2027 | UGC Fees',
    desc: 'Compare the best UGC-DEB approved online MA programs. Find fees, specializations (English, Economics, Psychology, Political Science), and NAAC ratings.',
    h1: 'Online MA Colleges in India 2027',
    aboutText: 'An Online MA (Master of Arts) provides rigorous postgraduate education across English, Economics, Sociology, History, and Public Policy. Highly popular among civil services (UPSC/PSC) aspirants and educators.',
    faqs: [
      { q: 'Can I appear for UGC NET after an online MA?', a: 'Yes. Degrees from UGC-DEB approved online universities are eligible for UGC NET and Assistant Professorship across India.' }
    ]
  },
  'online-ma-english': {
    name: 'Online MA in English',
    searchToken: 'MA in English',
    title: 'Top Online MA in English Colleges in India 2027 | UGC Approved Fees',
    desc: 'Compare 12+ UGC-DEB approved Online MA in English universities in India. Fees from ₹20,000 to ₹1.2 Lakhs. Check syllabus, NAAC grades, UGC-NET eligibility & career scope.',
    h1: 'Online MA in English Colleges in India 2027',
    aboutText: 'An Online MA in English Literature is one of the most flexible postgraduate humanities degrees in India. Covering British literature, American poetry, postcolonial theory, linguistics, and cultural studies, it is tailored for educators, content creators, UPSC aspirants, and communication specialists.',
    faqs: [
      { q: 'Is an Online MA in English valid for UGC-NET & Assistant Professor exams?', a: 'Yes, 100%. Under UGC Regulations 2020, online MA degrees from UGC-DEB recognized institutions are identical to regular classroom degrees and valid for UGC NET, SET, and PhD admissions.' },
      { q: 'What is the fee structure for an Online MA in English in India?', a: 'Fees range from ₹20,000 (Jamia Millia Islamia Online) up to ₹1,00,000–₹1,20,000 (Amity Online, Jain Online, LPU Online) for the complete 2-year course.' }
    ]
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
  },
  'online-executive-mba': {
    name: 'Executive Online MBA',
    searchToken: 'MBA',
    title: 'Top Executive Online MBA in India 2027 | Working Professionals',
    desc: 'Compare top Executive Online MBA programs in India for working professionals with 2+ years experience. Check UGC approvals, flexible weekend schedules, fees & placements.',
    h1: 'Executive Online MBA in India 2027 (Working Professionals)',
    aboutText: 'An Executive Online MBA is designed specifically for working professionals, project managers, and aspiring leaders seeking rapid career advancement without taking a career break. Featuring flexible weekend masterclasses, practical business case studies, and global alumni networking, these UGC-entitled programs offer maximum corporate ROI and salary progression.',
    faqs: [
      { q: 'What is the eligibility for an Executive Online MBA?', a: 'Candidates typically need a Bachelor\'s degree with 50% aggregate marks and 1 to 3 years of full-time work experience.' },
      { q: 'How is Executive Online MBA different from regular Online MBA?', a: 'Executive Online MBAs emphasize strategic leadership, high-level business analytics, executive peer networking, and flexible pacing tailored to working managers.' }
    ]
  },
  'online-data-science': {
    name: 'Online Data Science Degrees',
    searchToken: 'Data Science',
    title: 'Top Online Data Science & AI Degrees in India 2027 | UGC Approved',
    desc: 'Explore UGC approved Online MCA, M.Sc & BCA in Data Science & Artificial Intelligence. Compare fees, practical cloud labs (Python, SQL, PowerBI), and placement packages.',
    h1: 'Online Data Science & AI Degrees in India 2027',
    aboutText: 'Online Data Science, Artificial Intelligence, and Big Data Analytics degrees blend rigorous academic foundations with hands-on virtual laboratory training in Python, R, SQL, Tableau, TensorFlow, and Cloud computing. Offered by NAAC A++ universities like Amity Online, Jain Online, LPU Online, and Chandigarh University, these degrees prepare learners for high-growth tech careers.',
    faqs: [
      { q: 'Can non-engineers pursue an Online Data Science degree?', a: 'Yes. Most universities accept candidates from B.Com, B.Sc, BBA, and BCA backgrounds, offering foundational bridge modules in statistics and basic programming.' },
      { q: 'What tools are taught in Online Data Science degrees?', a: 'Curriculums cover Python, R, SQL, PowerBI, Tableau, Hadoop, Spark, Scikit-Learn, Deep Learning, and Cloud AI deployment.' }
    ]
  },
  'cheapest-online-mba': {
    name: 'Cheapest Online MBA (Under ₹1 Lakh)',
    searchToken: 'CHEAP',
    title: 'Cheapest Online MBA in India Under ₹1 Lakh 2027 | UGC Approved',
    desc: 'Find the most affordable UGC-DEB approved online MBA programs in India under ₹1 Lakh. Compare Andhra University (₹62K), Galgotias (₹90K), Uttaranchal (₹98K) & zero-cost EMIs.',
    h1: 'Cheapest Online MBA Colleges in India (Under ₹1 Lakh, 2027)',
    aboutText: 'Pursuing a high-quality, UGC-DEB approved Online MBA does not need to cost ₹2 Lakhs or more. Top state universities and NAAC A+/A accredited private institutions offer complete 2-year MBA programs between ₹62,200 to ₹98,000, fully equipped with digital LMS, live weekend masterclasses, proctored exams, and 100% legal equivalence for government jobs.',
    faqs: [
      { q: 'Which is the cheapest UGC-approved Online MBA in India?', a: 'Andhra University Online offers the most affordable UGC-DEB approved Online MBA in India at ₹62,200 total tuition fees for 2 years, followed by Kalinga University (₹80,000), Galgotias University (₹90,000), and Uttaranchal University (₹98,000).' }
    ]
  },
  '1-year-online-mba': {
    name: '1-Year Fast Track Online MBA',
    searchToken: 'MBA',
    title: '1-Year Online MBA Programs in India 2027 | Fast-Track Management',
    desc: 'Compare top 1-Year Fast Track Online MBA & Executive Management programs for working professionals. Check global accreditations, fast completion, fees & eligibility.',
    h1: '1-Year Fast Track Online MBA in India (2027)',
    aboutText: '1-Year Fast Track Online MBA and Executive Post Graduate Diploma programs are engineered for experienced professionals seeking rapid credential upgrades. Designed with accelerated coursework in corporate strategy, digital leadership, financial modeling, and global marketing, these programs minimize study duration while maximizing career growth.',
    faqs: [
      { q: 'Who is eligible for a 1-Year Online MBA?', a: 'Candidates with a Bachelor\'s degree and a minimum of 2 to 3 years of verifiable corporate work experience are typically eligible.' }
    ]
  },
  'wes-approved-online-degrees': {
    name: 'WES Approved Online Degrees',
    searchToken: 'WES',
    title: 'WES Approved Online Degrees in India 2027 | Canada PR & USA Valid',
    desc: 'Complete list of WES recognized UGC approved online universities in India. Degrees evaluated for Canada Express Entry PR points and US higher education equivalency.',
    h1: 'WES Approved Online Degrees in India (2027)',
    aboutText: 'World Education Services (WES) credential evaluation is mandatory for individuals pursuing Canada Permanent Residency (Express Entry CRS points), US H1-B processing, or North American university admissions. Select Indian online universities hold recognized status where their Online MBA, MCA, and Master\'s degrees are evaluated as equivalent to 2-year Canadian and US post-graduate degrees.',
    faqs: [
      { q: 'Which online universities in India are approved by WES?', a: 'Amity University Online, Jain University Online, Lovely Professional University (LPU Online), Manipal University Jaipur Online, and D.Y. Patil University hold recognized credential equivalence with World Education Services (WES).' }
    ]
  },
  'ugc-deb-approved-universities': {
    name: 'UGC-DEB Approved Universities List',
    searchToken: 'ALL',
    title: 'UGC-DEB Approved Online Universities List 2027 | Fees & NAAC Grades',
    desc: 'Official directory of 40+ UGC-DEB entitled online universities in India for 2027. Compare NAAC A++ grades, fee structures, program validity, and admission deadlines.',
    h1: 'UGC-DEB Approved Online Universities List 2027',
    aboutText: 'The University Grants Commission - Distance Education Bureau (UGC-DEB) is the statutory regulatory body governing online and distance higher education in India. Under UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020, degrees awarded by entitled universities hold 100% parity with regular physical classroom degrees across India and internationally.',
    faqs: [
      { q: 'How can I verify if a university has UGC-DEB approval?', a: 'Visit the official UGC-DEB portal (deb.ugc.ac.in) and check the "Entitled Higher Educational Institutions (HEIs) for Online Programmes" list for the current academic session.' }
    ]
  },
  'distance-vs-online-degree': {
    name: 'Online vs Distance Education Guide',
    searchToken: 'ALL',
    title: 'Online Degree vs Distance Education: Which is Better in 2027?',
    desc: 'Detailed comparison of Online Degrees vs Distance Education (ODL) in India. Learn differences in LMS classes, exam modes, corporate value, and fee structures.',
    h1: 'Online Degree vs Distance Education (ODL) in India (2027)',
    aboutText: 'While both Online Degrees (OL) and Open & Distance Learning (ODL) hold equal legal recognition from UGC-DEB, their learning delivery is fundamentally different. Online degrees are 100% digital with live interactive classes, virtual case studies, and AI-proctored home exams. Distance education relies primarily on self-study with printed books and physical exam centers.',
    faqs: [
      { q: 'Which is better: Online Degree or Distance Degree?', a: 'Online Degrees are widely preferred today because of interactive live lectures, LMS recordings, placement support cells, and AI-proctored home examinations without traveling to test centers.' }
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

export async function generateStaticParams() {
  const courseSlugs = Object.keys(COURSE_MAP);
  const geoSlugs = Object.keys(GEO_MAP);
  const universitySlugs = COLLEGES.map((c) => c.universitySlug).filter(Boolean);
  
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
    'scdl-vs-nmims',
    'nmims-vs-jain',
    'manipal-vs-jain',
    'dy-patil-vs-nmims',
    'chandigarh-vs-amity',
    'upes-vs-amity',
    'jain-vs-manipal',
    'scdl-vs-amity',
    'andhra-vs-ignou',
    'amrita-vs-srm'
  ];

  const allSlugs = [...courseSlugs, ...geoSlugs, ...universitySlugs, ...comparisonSlugs];

  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const PAGE_URL = `${BASE_URL}${PARENT_PATH}/${slug}/`;

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

  if (slug.includes('-vs-')) {
    const [partA, partB] = slug.split('-vs-');
    const collegeA = findCollegeBySlugPart(partA);
    const collegeB = findCollegeBySlugPart(partB);

    if (collegeA && collegeB) {
      const title = `${collegeA.name} vs ${collegeB.name}: Compare Fees 2027`;
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
          images: [{ url: 'https://careerwithmohit.online/og-image.webp', width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: desc,
          images: ['https://careerwithmohit.online/og-image.webp'],
        }
      };
    }
  }

  const college = COLLEGES.find((c) => c.universitySlug === slug);
  if (college) {
    const title = `${college.name} Online Admission & Fees 2027`;
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
        images: [{ url: 'https://careerwithmohit.online/og-image.webp', width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        images: ['https://careerwithmohit.online/og-image.webp'],
      }
    };
  }

  return {
    title: 'Top UGC Approved Online Universities 2027',
  };
}

export default async function OnlineDegreeSubpage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const PAGE_URL = `${BASE_URL}${PARENT_PATH}/${slug}/`;

  // ── Render Case A: Course Specific Hub ──
  if (COURSE_MAP[slug]) {
    const config = COURSE_MAP[slug];
    
    const matchingColleges = COLLEGES.filter(c => {
      if (!config.searchToken || config.searchToken === 'ALL') return true;
      if (config.searchToken === 'WES') return c.accreditation.includes('WES') || c.approvals.includes('WES');
      if (config.searchToken === 'CHEAP') return c.feeNum <= 100000;
      const progMatch = c.programs.some(p => p.toLowerCase().includes(config.searchToken.toLowerCase()));
      const specMatch = Object.values(c.specializations || {}).some(specs => specs.some(s => s.toLowerCase().includes(config.searchToken.toLowerCase())));
      return progMatch || specMatch;
    });

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
      <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
        <College4SureScrollProgress />
        <College4SureTicker />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/90 text-[#061124] pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#061124]/10 shadow-[0_4px_20px_rgba(6,17,36,0.06)] font-mono text-xs font-extrabold uppercase tracking-wider mb-6 text-[#10B981] backdrop-blur-md">
              <span className="dotlive" />
              <span>UGC-DEB Approved Universities · 2027 Directory</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[60px] font-black text-[#061124] leading-[1.08] tracking-tight mb-6">
              Best {config.h1}
            </h1>

            <p className="text-[#475569] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal mb-8">
              {config.aboutText}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto">
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] text-center">
                <b className="font-display font-black text-2xl sm:text-3xl text-[#2563EB] block">{matchingColleges.length}+</b>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-[#061124] mt-1 block">Colleges</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] text-center">
                <b className="font-display font-black text-2xl sm:text-3xl text-[#10B981] block">
                  {matchingColleges.length > 0 ? matchingColleges.reduce((min, c) => c.feeNum < min ? c.feeNum : min, Infinity).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).replace('INR', '₹') : '₹62K'}
                </b>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-[#061124] mt-1 block">Starting Fee</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] text-center">
                <b className="font-display font-black text-2xl sm:text-3xl text-[#FF007A] block">100%</b>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-[#061124] mt-1 block">Legal Equivalence</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] text-center">
                <b className="font-display font-black text-2xl sm:text-3xl text-[#F59E0B] block">NAAC A+</b>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-[#061124] mt-1 block">Top Grades</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call Strip */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50 py-3.5 text-center border-b border-[#061124]/10">
          <div className="max-w-[1220px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <a href="tel:+919560020771" className="font-mono font-extrabold text-xs sm:text-sm text-[#061124] hover:text-[#2563EB] flex items-center gap-1.5">
              <Phone size={14} className="text-[#2563EB]" /> Admissions Helpline: +91 95600 20771
            </a>
            <span className="hidden sm:inline text-[#061124]/20">•</span>
            <a
              href={`https://wa.me/919560020771?text=Hi%2C%20I%20need%20free%20guidance%20for%20${encodeURIComponent(config.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-1 rounded-full font-display font-extrabold text-xs uppercase tracking-wider"
            >
              WhatsApp Advisor →
            </a>
          </div>
        </div>

        {/* Lead Form */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
          <OnlineDegreeLeadForm />
        </section>

        {/* Interactive Explorer */}
        <OnlineDegreeClient initialCourse={config.searchToken} />

        {/* Static Matrix Table */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#061124]/10">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
                <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
                Fee &amp; Accreditation Matrix
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] tracking-tight">
                Top UGC-Approved {config.name} Universities Comparison (2027)
              </h2>
            </div>

            <div className="overflow-hidden border-[1.5px] border-[#061124]/10 rounded-[28px] shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#061124] font-mono text-xs uppercase tracking-wider font-extrabold border-b border-[#061124]/10">
                      <th className="px-6 py-4">University Name</th>
                      <th className="px-6 py-4 text-center">NAAC Grade</th>
                      <th className="px-6 py-4">Approx. Fees</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4 text-center">Recognition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#061124]/8 font-medium text-[#061124] text-sm">
                    {matchingColleges.slice(0, 12).map((univ, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-display font-extrabold text-[#061124]">{univ.name}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-mono bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold border border-blue-200/60">
                            {univ.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-display font-black text-[#10B981]">{univ.fee}</td>
                        <td className="px-6 py-4 font-mono text-xs text-[#475569]">{univ.duration}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-mono bg-emerald-50 text-[#059669] px-3 py-1 rounded-full text-xs font-bold border border-emerald-200/60">
                            UGC-DEB
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-t border-[#061124]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] text-center mb-10 tracking-tight">
              {config.name} Frequently Asked Questions
            </h2>
            <div className="space-y-3.5">
              {config.faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-[0_10px_30px_-15px_rgba(6,17,36,0.06)] overflow-hidden transition-all hover:border-[#2563EB]/40">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 text-center text-white overflow-hidden shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)] bg-gradient-to-br from-[#061124] via-[#1E40AF] to-[#0D9488]">
              <h2 className="font-display text-3xl sm:text-4xl font-black mb-4">
                Confused about {config.name} admissions?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base font-normal">
                Get a free customized profile evaluation of fees, exams, and matching universities directly with Mohit Jain.
              </p>
              <a
                href={`https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(config.name)}%20options`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>Get Free Counselling on WhatsApp</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <College4SureSeoLinks />

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
      <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
        <College4SureScrollProgress />
        <College4SureTicker />

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/90 text-[#061124] pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
          <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#061124]/10 shadow-[0_4px_20px_rgba(6,17,36,0.06)] font-mono text-xs font-extrabold uppercase tracking-wider mb-6 text-[#2563EB] backdrop-blur-md">
              <MapPin size={14} />
              <span>Regional Education Hub · {config.name}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-[#061124] leading-[1.08] tracking-tight mb-4">
              {config.h1}
            </h1>

            <p className="font-mono text-xs sm:text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-5">
              {config.cities}
            </p>

            <p className="text-[#475569] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal mb-8">
              {config.aboutText}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto">
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#2563EB] block">{matchingColleges.length}+</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">Universities</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#10B981] block">
                  {matchingColleges.length > 0 ? matchingColleges.reduce((min, c) => c.feeNum < min ? c.feeNum : min, Infinity).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).replace('INR', '₹') : '₹20K'}
                </b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">Starting Fee</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#FF007A] block">100%</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">UGC Validity</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#F59E0B] block">NAAC A+</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">Accredited</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-8 px-4 bg-[#F8FAFC]">
          <OnlineDegreeLeadForm />
        </section>

        {/* Regional Colleges Grid */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#061124]/10">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] mb-3 text-center tracking-tight">
              UGC Approved Online Universities in {config.name}
            </h2>
            <p className="text-[#475569] text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Verified fee schedules, NAAC grades, and course details for online universities serving learners in {config.cities}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {matchingColleges.map((univ) => (
                <div key={univ.name} className="group rounded-[28px] bg-[#F8FAFC] p-6 sm:p-7 border-[1.5px] border-[#061124]/10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] flex flex-col justify-between hover:bg-white hover:border-[#2563EB]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full border border-blue-200/60">
                        {univ.grade} Rated
                      </span>
                      <span className="font-mono text-[11px] text-[#475569] font-medium flex items-center gap-1">
                        <MapPin size={12} className="text-[#2563EB]" /> {univ.location}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-[#061124] mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {univ.name}
                    </h3>
                    <p className="text-[#475569] text-xs leading-relaxed mb-4 line-clamp-3 font-normal">
                      {univ.about}
                    </p>
                    <div className="space-y-1.5 font-mono text-xs font-semibold text-[#061124] mb-6">
                      <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#10B981]" /> Approvals: {univ.approvals}</p>
                      <p className="flex items-center gap-2 truncate"><GraduationCap size={14} className="text-[#2563EB]" /> Programs: {univ.programs.join(', ')}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#061124]/8 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase font-bold text-[#475569] block">Total Fees</span>
                      <span className="font-display font-black text-sm text-[#10B981]">{univ.fee}</span>
                    </div>
                    <Link
                      href={`/online-degree-certification/${univ.universitySlug}`}
                      className="px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold text-xs transition-all shadow-xs"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-t border-[#061124]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] text-center mb-10 tracking-tight">
              {config.name} Frequently Asked Questions
            </h2>
            <div className="space-y-3.5">
              {config.faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-sm overflow-hidden transition-all hover:border-[#2563EB]/40">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <College4SureSeoLinks />

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

      const isFeeCheaperA = collegeA.feeNum < collegeB.feeNum;
      const isFeeCheaperB = collegeB.feeNum < collegeA.feeNum;
      
      const isRatingBetterA = (collegeA.grade === 'A++' && collegeB.grade !== 'A++') || (collegeA.grade === 'A+' && ['A', 'B+'].includes(collegeB.grade)) || (collegeA.grade === 'A' && collegeB.grade === 'B+');
      const isRatingBetterB = (collegeB.grade === 'A++' && collegeA.grade !== 'A++') || (collegeB.grade === 'A+' && ['A', 'B+'].includes(collegeA.grade)) || (collegeB.grade === 'A' && collegeA.grade === 'B+');

      return (
        <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
          <College4SureScrollProgress />
          <College4SureTicker />

          {/* VS Hero Header */}
          <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/90 text-[#061124] pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10 text-center">
            <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#061124]/10 text-[#2563EB] font-mono text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 shadow-sm">
                <ShieldCheck size={14} />
                UGC-DEB Comparison Engine
              </span>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#061124] mb-8 leading-tight tracking-tight max-w-4xl mx-auto">
                {collegeA.name} <span className="text-[#2563EB] italic">vs</span> {collegeB.name}
              </h1>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                {/* College A */}
                <div className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 p-6 shadow-md">
                  <span className={`inline-block bg-gradient-to-br ${collegeA.gradeColor} text-white font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3`}>
                    NAAC {collegeA.grade}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-black text-[#061124]">{collegeA.name}</h2>
                  <p className="font-mono text-xs text-[#475569] mt-1 font-semibold">{collegeA.location}</p>
                </div>

                {/* VS Badge */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#FF007A] text-white flex items-center justify-center font-display font-black text-lg mx-auto shadow-lg">
                  VS
                </div>

                {/* College B */}
                <div className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 p-6 shadow-md">
                  <span className={`inline-block bg-gradient-to-br ${collegeB.gradeColor} text-white font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3`}>
                    NAAC {collegeB.grade}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-black text-[#061124]">{collegeB.name}</h2>
                  <p className="font-mono text-xs text-[#475569] mt-1 font-semibold">{collegeB.location}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Matrix Table */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#061124] text-center mb-10 tracking-tight">
                Side-By-Side Comparison Matrix
              </h3>

              <div className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] overflow-hidden">
                <div className="divide-y divide-[#061124]/8">
                  {/* NAAC Rating Row */}
                  <div className="grid grid-cols-3 p-5 sm:p-7 items-center text-center">
                    <div className="text-left font-mono font-bold text-xs uppercase text-[#061124] flex items-center gap-1.5">
                      <Award size={15} className="text-[#2563EB]" /> NAAC Grade
                    </div>
                    <div className={`p-3.5 rounded-2xl mx-1.5 font-display font-extrabold text-sm ${isRatingBetterA ? 'bg-emerald-50 text-[#059669] border border-emerald-200' : 'bg-[#F8FAFC] text-[#061124]'}`}>
                      {collegeA.grade}
                      {isRatingBetterA && <span className="block font-mono text-[9px] uppercase tracking-wider text-[#059669] mt-0.5">Winner</span>}
                    </div>
                    <div className={`p-3.5 rounded-2xl mx-1.5 font-display font-extrabold text-sm ${isRatingBetterB ? 'bg-emerald-50 text-[#059669] border border-emerald-200' : 'bg-[#F8FAFC] text-[#061124]'}`}>
                      {collegeB.grade}
                      {isRatingBetterB && <span className="block font-mono text-[9px] uppercase tracking-wider text-[#059669] mt-0.5">Winner</span>}
                    </div>
                  </div>

                  {/* Fees Row */}
                  <div className="grid grid-cols-3 p-5 sm:p-7 items-center text-center">
                    <div className="text-left font-mono font-bold text-xs uppercase text-[#061124] flex items-center gap-1.5">
                      <IndianRupee size={15} className="text-[#10B981]" /> Total Fee
                    </div>
                    <div className={`p-3.5 rounded-2xl mx-1.5 font-display font-black text-sm ${isFeeCheaperA ? 'bg-emerald-50 text-[#059669] border border-emerald-200' : 'bg-[#F8FAFC] text-[#061124]'}`}>
                      {collegeA.fee}
                      {isFeeCheaperA && <span className="block font-mono text-[9px] uppercase tracking-wider text-[#059669] mt-0.5">Affordable Pick</span>}
                    </div>
                    <div className={`p-3.5 rounded-2xl mx-1.5 font-display font-black text-sm ${isFeeCheaperB ? 'bg-emerald-50 text-[#059669] border border-emerald-200' : 'bg-[#F8FAFC] text-[#061124]'}`}>
                      {collegeB.fee}
                      {isFeeCheaperB && <span className="block font-mono text-[9px] uppercase tracking-wider text-[#059669] mt-0.5">Affordable Pick</span>}
                    </div>
                  </div>

                  {/* Approvals */}
                  <div className="grid grid-cols-3 p-5 sm:p-7 items-center text-center">
                    <div className="text-left font-mono font-bold text-xs uppercase text-[#061124] flex items-center gap-1.5">
                      <ShieldCheck size={15} className="text-[#2563EB]" /> Approvals
                    </div>
                    <div className="p-3.5 rounded-2xl mx-1.5 bg-[#F8FAFC] font-mono text-xs font-bold text-[#061124]">
                      {collegeA.approvals}
                    </div>
                    <div className="p-3.5 rounded-2xl mx-1.5 bg-[#F8FAFC] font-mono text-xs font-bold text-[#061124]">
                      {collegeB.approvals}
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="grid grid-cols-3 p-5 sm:p-7 items-center text-center">
                    <div className="text-left font-mono font-bold text-xs uppercase text-[#061124] flex items-center gap-1.5">
                      <GraduationCap size={15} className="text-[#2563EB]" /> Programs
                    </div>
                    <div className="p-3.5 rounded-2xl mx-1.5 bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]">
                      {collegeA.programs.join(', ')}
                    </div>
                    <div className="p-3.5 rounded-2xl mx-1.5 bg-[#F8FAFC] font-mono text-xs font-semibold text-[#475569]">
                      {collegeB.programs.join(', ')}
                    </div>
                  </div>

                  {/* Review Links */}
                  <div className="grid grid-cols-3 p-5 sm:p-7 items-center text-center">
                    <div className="text-left font-mono font-bold text-xs uppercase text-[#061124] flex items-center gap-1.5">
                      <BookOpen size={15} className="text-[#2563EB]" /> Full Review
                    </div>
                    <div className="mx-1.5">
                      {collegeA.slug ? (
                        <a href={`/blog/${collegeA.slug}`} className="inline-flex items-center gap-1 font-display font-extrabold text-xs text-[#2563EB] bg-blue-50 px-4 py-2 rounded-full border border-blue-200/60 hover:bg-[#2563EB] hover:text-white transition-colors">
                          <BookOpen size={12} /> {collegeA.name.split(' ')[0]} Review
                        </a>
                      ) : '—'}
                    </div>
                    <div className="mx-1.5">
                      {collegeB.slug ? (
                        <a href={`/blog/${collegeB.slug}`} className="inline-flex items-center gap-1 font-display font-extrabold text-xs text-[#2563EB] bg-blue-50 px-4 py-2 rounded-full border border-blue-200/60 hover:bg-[#2563EB] hover:text-white transition-colors">
                          <BookOpen size={12} /> {collegeB.name.split(' ')[0]} Review
                        </a>
                      ) : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Lead Form */}
          <section className="py-8 px-4 bg-[#F8FAFC]">
            <OnlineDegreeLeadForm />
          </section>

          {/* FAQs */}
          <section className="py-16 sm:py-24 bg-white border-t border-[#061124]/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h4 className="font-display text-3xl font-extrabold text-[#061124] text-center mb-10 tracking-tight">
                Frequently Asked Questions (FAQ)
              </h4>
              <div className="space-y-3.5">
                {compFaqs.map((faq, idx) => (
                  <details key={idx} className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-sm overflow-hidden transition-all hover:border-[#2563EB]/40">
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <College4SureSeoLinks />

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
      const namePart = college.name.toLowerCase();
      return comp.split('-vs-').some(part => namePart.includes(part));
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
          "logo": `${BASE_URL}/logo.webp`,
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
      <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
        <College4SureScrollProgress />
        <College4SureTicker />

        {/* University Profile Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/90 text-[#061124] pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
          <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#061124]/10 shadow-[0_4px_20px_rgba(6,17,36,0.06)] font-mono text-xs font-extrabold uppercase tracking-wider mb-6 text-[#10B981] backdrop-blur-md">
              <BadgeCheck size={14} />
              <span>UGC-DEB Recognized · 2027 Admission Profile</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-[#061124] leading-[1.08] tracking-tight mb-6">
              {college.name}
            </h1>

            <p className="text-[#475569] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal mb-8">
              {college.about}
            </p>

            <div className="grid grid-cols-3 gap-3.5 max-w-xl mx-auto">
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#2563EB] block">{college.grade}</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">NAAC Grade</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-2xl text-[#10B981] block">{college.fee}</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">Total Fee Est.</span>
              </div>
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 shadow-sm text-center">
                <b className="font-display font-black text-xs sm:text-sm text-[#061124] block truncate mt-1">{college.location}</b>
                <span className="font-mono text-[10px] uppercase font-bold text-[#061124] mt-1 block">Campus Hub</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-8 px-4 bg-[#F8FAFC]">
          <OnlineDegreeLeadForm />
        </section>

        {/* Detailed Info Grid */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#061124]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] mb-8 text-center tracking-tight">
              Accreditations &amp; Global Recognitions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="rounded-[24px] bg-[#F8FAFC] p-6 border border-[#061124]/10">
                <h3 className="font-display font-bold text-[#061124] text-lg mb-3 flex items-center gap-2">
                  <Award size={18} className="text-[#2563EB]" /> Government Approvals
                </h3>
                <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-4">
                  The degree is fully approved by all national higher education councils in India.
                </p>
                <div className="flex flex-wrap gap-2">
                  {college.approvals.split(',').map((app, idx) => (
                    <span key={idx} className="bg-white text-[#059669] border border-emerald-200 font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs">
                      {app.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-[#F8FAFC] p-6 border border-[#061124]/10">
                <h3 className="font-display font-bold text-[#061124] text-lg mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#10B981]" /> Key Highlights &amp; Benefits
                </h3>
                <ul className="space-y-2.5">
                  {college.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-[#475569]">
                      <span className="text-[#10B981] mt-0.5">✔</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Programs Breakdown */}
            <h2 className="font-display text-3xl font-extrabold text-[#061124] mb-8 text-center pt-8 border-t border-[#061124]/10 tracking-tight">
              Online Programs &amp; Tuition Fees Breakdown
            </h2>
            <div className="space-y-6">
              {college.programs.map((prog, idx) => (
                <div key={idx} className="rounded-[28px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-sm hover:bg-white hover:border-[#2563EB]/40 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h3 className="font-display font-extrabold text-xl text-[#061124] flex items-center gap-2">
                      <GraduationCap size={22} className="text-[#2563EB]" /> Online {prog}
                    </h3>
                    <span className="font-mono bg-blue-50 text-[#2563EB] border border-blue-200/60 text-xs font-bold px-3 py-1.5 rounded-full">
                      {college.duration}
                    </span>
                  </div>
                  <p className="text-[#475569] text-sm leading-relaxed mb-4 font-normal">
                    Pursue {prog} from {college.name} Online with live interactive webinars, self-paced digital LMS content, and flexible online exams.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="bg-white p-3.5 rounded-2xl border border-[#061124]/10">
                      <p className="font-mono text-[10px] text-[#475569] font-bold uppercase tracking-wider">Estimated Fee</p>
                      <p className="font-display text-base font-black text-[#10B981] mt-0.5">{college.fee}</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-[#061124]/10">
                      <p className="font-mono text-[10px] text-[#475569] font-bold uppercase tracking-wider">Eligibility</p>
                      <p className="font-mono text-xs font-bold text-[#061124] mt-1">{prog === 'MBA' || prog === 'MCA' || prog === 'M.Com' || prog === 'MA' ? 'Graduation (50%)' : '10+2 (45%)+'}</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-[#061124]/10 col-span-2 sm:col-span-1">
                      <p className="font-mono text-[10px] text-[#475569] font-bold uppercase tracking-wider">Accreditation</p>
                      <p className="font-mono text-xs font-bold text-[#2563EB] mt-1">NAAC {college.grade} Rated</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparisons Suggestions */}
            {matchingComparisons.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#061124]/10">
                <h3 className="font-display text-2xl font-extrabold text-[#061124] text-center mb-6">
                  Compare {college.name} Side-By-Side
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingComparisons.map((comp) => {
                    const parts = comp.split('-vs-');
                    const peerSlug = parts.find(p => !college.name.toLowerCase().includes(p));
                    const peerName = peerSlug ? peerSlug.toUpperCase() : 'Peer';
                    return (
                      <a
                        key={comp}
                        href={`/online-degree-certification/${comp}`}
                        className="rounded-[22px] bg-[#F8FAFC] border border-[#061124]/10 hover:border-[#2563EB] hover:bg-white text-[#061124] font-display font-extrabold text-sm px-6 py-4 flex items-center justify-between transition-all shadow-xs"
                      >
                        <span>{college.name.split(' ')[0]} vs {peerName} Online</span>
                        <span className="text-[#2563EB]">Compare →</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-t border-[#061124]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-3xl font-extrabold text-[#061124] mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3.5">
              <details className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-sm overflow-hidden transition-all hover:border-[#2563EB]/40">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                  <span>Is the online degree from {college.name} equivalent to a regular degree?</span>
                  <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                  Yes. Under UGC Regulations 2020, degrees earned through online mode from UGC-DEB approved universities like {college.name} are fully valid and equivalent to regular campus degrees for government recruitments and corporate jobs.
                </div>
              </details>
              <details className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-sm overflow-hidden transition-all hover:border-[#2563EB]/40">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                  <span>What is the fee structure for {college.name} Online courses?</span>
                  <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                  The total fee averages around {college.fee}. You can pay semester-wise or avail of interest-free EMI facilities starting from ₹3,000 to ₹7,000 per month.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Direct */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 text-center text-white overflow-hidden shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)] bg-gradient-to-br from-[#061124] via-[#1E40AF] to-[#0D9488]">
              <h4 className="font-display text-3xl font-black mb-4">
                Need detailed scholarship booklets for {college.name}?
              </h4>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm sm:text-base">
                Get in touch directly with our admission guide Mohit Jain to check active discount structures, fee waivers, and eligibility.
              </p>
              <a
                href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20apply%20for%20admissions%20at%20${encodeURIComponent(college.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-lg inline-flex items-center gap-2"
              >
                <Phone size={16} />
                <span>Contact Advisor on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        <College4SureSeoLinks />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(univJsonLd) }}
        />
      </div>
    );
  }

  return notFound();
}
