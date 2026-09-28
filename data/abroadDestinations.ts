import { USA_COLLEGES } from '@/data/usaColleges';
import { UK_COLLEGES } from '@/data/ukColleges';
import { CANADA_COLLEGES } from '@/data/canadaColleges';
import { GERMANY_COLLEGES } from '@/data/germanyColleges';
import { AUSTRALIA_COLLEGES } from '@/data/australiaColleges';
import { IRELAND_COLLEGES } from '@/data/irelandColleges';
import { FRANCE_COLLEGES } from '@/data/franceColleges';
import { NETHERLANDS_COLLEGES } from '@/data/netherlandsColleges';
import { NEW_ZEALAND_COLLEGES } from '@/data/newZealandColleges';
import { SWEDEN_COLLEGES } from '@/data/swedenColleges';
import { FINLAND_COLLEGES } from '@/data/finlandColleges';
import { SPAIN_COLLEGES } from '@/data/spainColleges';
import { MALAYSIA_COLLEGES } from '@/data/malaysiaColleges';
import { MALTA_COLLEGES } from '@/data/maltaColleges';
import { HUNGARY_COLLEGES } from '@/data/hungaryColleges';
import { POLAND_COLLEGES } from '@/data/polandColleges';
import { DENMARK_COLLEGES } from '@/data/denmarkColleges';

export interface CountryDestination {
  slug: string;
  country: string;
  flag: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  h1: string;
  subheading: string;
  optDuration: string;
  avgTuition: string;
  avgSalary: string;
  livingCost: string;
  visaType: string;
  intakes: string;
  examRequirements: string[];
  popularDegrees: string[];
  highlights: string[];
  faqs: { q: string; a: string }[];
  colleges: any[];
}

export const ABROAD_DESTINATIONS: Record<string, CountryDestination> = {
  'study-in-usa': {
    slug: 'study-in-usa',
    country: 'United States',
    flag: '🇺🇸',
    badge: '3-Year STEM OPT',
    badgeColor: 'bg-blue-500 text-white',
    title: 'Study in USA 2027: Top Universities, Fees in INR, STEM OPT & Visa | CareerWithMohit',
    description: 'Complete guide for Indian students to study in USA 2027. Explore 100+ top US universities, MS in Computer Science, MBA fees in INR, F1 visa rules, 3-Year STEM OPT work rights, and scholarships.',
    h1: 'Study in USA 2027: Universities, Fees & STEM OPT Guide',
    subheading: 'Home to Silicon Valley, Ivy League universities, and world-leading research hubs with up to 3 years of post-study work authorization (STEM OPT).',
    optDuration: '3 Years (STEM OPT) / 1 Year (Non-STEM)',
    avgTuition: '₹18L – ₹48L / year ($22,000 – $55,000)',
    avgSalary: '$85,000 – $125,000 / year (₹70L – ₹1 Cr+)',
    livingCost: '$12,000 – $18,000 / year (₹10L – ₹15L)',
    visaType: 'F-1 Student Visa',
    intakes: 'Fall (August/Sept) & Spring (January)',
    examRequirements: ['GRE / GMAT (Waived at many univs)', 'IELTS (6.5+) / TOEFL (85+) / Duolingo (115+)', 'SAT / ACT (Undergraduate)'],
    popularDegrees: ['MS in Computer Science & AI', 'MBA & STEM Management', 'MS Data Science & Business Analytics', 'Biomedical & Mechanical Engineering', 'BS in Computing & Finance'],
    highlights: [
      '3-Year STEM OPT allows graduates to work in USA corporate & tech firms without immediate H-1B sponsorship.',
      'Highest post-graduation median starting salaries globally ($90k+ average for STEM MS & MBA graduates).',
      'Extensive on-campus TA/RA assistantships, CPT internships, and merit scholarships up to $30,000.',
      'World-renowned faculty and state-of-the-art research laboratories backed by Fortune 500 industry partnerships.'
    ],
    faqs: [
      {
        q: 'What is the 3-Year STEM OPT extension in the USA?',
        a: 'STEM OPT allows F-1 student visa holders who graduate with designated STEM (Science, Technology, Engineering, Math) degrees to work in the US for up to 36 months (3 years) following graduation, giving multiple attempts at the H-1B visa lottery.'
      },
      {
        q: 'What is the average total cost of doing an MS or MBA in USA for Indian students?',
        a: 'The total cost averages ₹25 Lakhs to ₹45 Lakhs per year including tuition and living expenses. However, public state universities (like SUNY, USF, UTA) offer affordable programs starting around ₹15–20 Lakhs/year.'
      },
      {
        q: 'Can I study in USA without GRE or IELTS?',
        a: 'Yes! Over 150+ US universities now waive the GRE for engineering and computer science programs. Duolingo English Test (DET) and PTE are also widely accepted as alternatives to IELTS/TOEFL.'
      },
      {
        q: 'What is the process to get an F-1 Student Visa for USA?',
        a: 'After securing an admission offer and I-20 form from an accredited US institution, you pay the SEVIS I-901 fee ($350), fill out the DS-160 visa form, schedule biometric and consular interview appointments, and demonstrate adequate financial support.'
      }
    ],
    colleges: USA_COLLEGES,
  },

  'study-in-uk': {
    slug: 'study-in-uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    badge: '1-Year Fast Track Masters',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'Study in UK 2027: Top Universities, 1-Year Masters, Fees & PSW Visa | CareerWithMohit',
    description: 'Explore studying in UK for 2027. Compare Russell Group universities, 1-year fast track masters fees in INR, 2-year Graduate Route Post Study Work (PSW) visa, and admissions with Mohit Jain.',
    h1: 'Study in UK 2027: 1-Year Masters, Fees & Graduate Visa',
    subheading: 'Complete your Master’s degree in just 12 months with 2 years of unrestricted Graduate Route post-study work rights across London and UK financial centers.',
    optDuration: '2 Years (Graduate Route PSW) / 3 Years (PhD)',
    avgTuition: '₹12L – ₹28L / year (£12,000 – £26,000)',
    avgSalary: '£35,000 – £60,000 / year (₹38L – ₹65L)',
    livingCost: '£9,000 – £14,000 / year (London: ~£15k)',
    visaType: 'Student Visa (Tier 4 / Student Route)',
    intakes: 'September/October (Major) & January/February',
    examRequirements: ['IELTS (6.0–6.5) / PTE (58+) / MOI Waiver with 70%+ in 12th English', 'No GRE/GMAT required for most UK universities'],
    popularDegrees: ['1-Year MSc in Data Science & AI', '1-Year Global MBA & Management', 'MSc Finance & Fintech (London Hub)', 'LLM International Law', 'BSc/BEng Engineering'],
    highlights: [
      '1-Year Masters saves 50% tuition and 1 full year of living expenses compared to 2-year programs in other countries.',
      '2-Year Graduate Route post-study work visa allows unrestricted employment in any UK industry.',
      'Russell Group research pedigree and world-renowned degrees recognized globally by WES, AIU, and global employers.',
      'IELTS waiver available based on Class 12th English marks (70%+) at numerous prominent UK universities.'
    ],
    faqs: [
      {
        q: 'Is a 1-year UK Master\'s degree valid in India and globally?',
        a: 'Yes. Under the India-UK Free Trade Agreement and Association of Indian Universities (AIU) mutual recognition agreements, UK 1-year Master’s degrees are 100% equivalent to 2-year Indian Master’s degrees and accepted for government jobs, PhD, and corporate roles.'
      },
      {
        q: 'How does the 2-Year Graduate Route (PSW) work in the UK?',
        a: 'Upon successfully completing your degree, you are eligible to apply for a 2-year Graduate Visa allowing you to work, look for work, or start a business in the UK at any skill level without requiring employer sponsorship.'
      },
      {
        q: 'Can I get an IELTS waiver to study in the UK?',
        a: 'Yes, many UK universities waive the IELTS exam if you scored 70% or higher in English in your CBSE/ICSE/State Board Class 12 examinations or if your medium of instruction (MOI) was English.'
      }
    ],
    colleges: UK_COLLEGES,
  },

  'study-in-canada': {
    slug: 'study-in-canada',
    country: 'Canada',
    flag: '🇨🇦',
    badge: 'PGWP & PR Pathway',
    badgeColor: 'bg-red-500 text-white',
    title: 'Study in Canada 2027: Top Colleges, PGWP Work Permit & PR Guide | CareerWithMohit',
    description: 'Complete guide to study in Canada 2027 for Indian students. Learn about DLI public colleges, PGWP work permits up to 3 years, tuition fees in INR, SDS visa process, and Express Entry PR pathways.',
    h1: 'Study in Canada 2027: Colleges, PGWP & PR Pathways',
    subheading: 'High quality of life, affordable public college diplomas & master degrees, and clear post-graduation work permits (PGWP) leading to permanent residency.',
    optDuration: 'Up to 3 Years (Post-Graduation Work Permit - PGWP)',
    avgTuition: '₹9L – ₹22L / year (CAD $15,000 – $32,000)',
    avgSalary: 'CAD $55,000 – $85,000 / year (₹35L – ₹55L)',
    livingCost: 'CAD $10,000 – $15,000 / year (GIC ₹12L+)',
    visaType: 'Canada Study Permit (SDS / Non-SDS)',
    intakes: 'Fall (September), Winter (January), Spring (May)',
    examRequirements: ['IELTS Academic (6.0 bands) / PTE Academic (60+)', 'TOEFL iBT / Duolingo (Selected Colleges)'],
    popularDegrees: ['PG Diplomas in IT, Cloud & Cybersecurity', 'Masters in Computer Science & Data Analytics', 'MBA & International Business Management', 'Hospitality & Supply Chain Management', 'Mechanical & Civil Engineering Technology'],
    highlights: [
      'Post-Graduation Work Permit (PGWP) of up to 3 years after completing eligible 2-year programs at DLI public institutions.',
      'Clear immigration pathways through Canadian Experience Class (CEC), Provincial Nominee Programs (PNP), and Express Entry.',
      'Affordable tuition options at leading community colleges starting from ₹9.5 Lakhs/year.',
      'Part-time off-campus work allowed up to 24 hours per week during academic semesters.'
    ],
    faqs: [
      {
        q: 'What are the new rules for Canada Post-Graduation Work Permit (PGWP)?',
        a: 'Students graduating from master’s degree programs of even 1 year now qualify for a 3-year PGWP. For college diplomas, programs must align with Canada’s in-demand occupational sectors (healthcare, STEM, trade, agriculture, education).'
      },
      {
        q: 'What is the GIC requirement for a Canada student visa?',
        a: 'As per IRCC requirements, international students applying via the SDS stream must purchase a Guaranteed Investment Certificate (GIC) of CAD $20,635 to prove living expenses for the first year.'
      },
      {
        q: 'What is the difference between Canadian Universities and Community Colleges?',
        a: 'Universities focus on 4-year Bachelor degrees, Master degrees, and academic research, while Colleges offer 1 to 2-year Post-Graduate Diplomas (PGD) with hands-on, job-oriented technical training with direct industry co-op placements.'
      }
    ],
    colleges: CANADA_COLLEGES,
  },

  'study-in-germany': {
    slug: 'study-in-germany',
    country: 'Germany',
    flag: '🇩🇪',
    badge: 'Zero / Free Tuition',
    badgeColor: 'bg-emerald-500 text-white',
    title: 'Study in Germany 2027: Free Tuition Public Universities, English Courses & Visa | CareerWithMohit',
    description: 'Study in Germany for Indian students in 2027. Explore TU9 and public universities with zero tuition fees, English-taught MS/Engineering programs, 18-month job seeker visa, and APS certificate rules.',
    h1: 'Study in Germany 2027: Free Tuition & Engineering Hub',
    subheading: 'World-renowned automotive and engineering capital of Europe offering tuition-free higher education at public universities and an 18-month post-study work visa.',
    optDuration: '18 Months (Job Seeking Residence Permit) + EU Blue Card',
    avgTuition: '€0 – €3,000 / year (₹0 – ₹3L at Public Universities)',
    avgSalary: '€50,000 – €75,000 / year (₹45L – ₹68L)',
    livingCost: '€11,208 / year (Blocked Account ~₹10L)',
    visaType: 'German National Student Visa (APS Required)',
    intakes: 'Winter (September/October) & Summer (March/April)',
    examRequirements: ['APS Certificate (Mandatory for Indian students)', 'IELTS (6.5+) / TOEFL (90+) for English-taught courses', 'German Language (A1/B2) for German medium'],
    popularDegrees: ['MS in Automotive & Mechanical Engineering', 'MS in Computer Science, AI & Robotics', 'MSc Data Science & Computational Engineering', 'Renewable Energy & Sustainability', 'International MBA & Supply Chain Management'],
    highlights: [
      'Zero tuition fees at all public universities in 15 of 16 German federal states for international students.',
      'Strongest manufacturing and tech industrial economy in Europe (BMW, Mercedes, Siemens, Bosch, SAP, Porsche).',
      '18-month post-study job search visa with fast-track permanent residency (PR) transition via the EU Blue Card.',
      'Wide availability of 100% English-taught Master’s degree programs.'
    ],
    faqs: [
      {
        q: 'Is higher education really free in Germany for international students?',
        a: 'Yes! Public universities in Germany are funded by the federal government and charge zero tuition fees for both domestic and international students. Students only pay a nominal semester fee of €150–€350 for public transit and campus facilities.'
      },
      {
        q: 'What is the APS Certificate requirement for Germany?',
        a: 'The Academic Evaluation Centre (APS) certificate issued by the German Embassy in New Delhi verifies the authenticity of Indian academic documents before applying for a student visa and German university admissions.'
      },
      {
        q: 'Do I need to know German to study an MS in Germany?',
        a: 'Not for English-taught Master\'s programs! Hundreds of public universities offer complete degrees in English. However, learning basic German (A1/A2 level) is recommended for part-time jobs and daily social life.'
      }
    ],
    colleges: GERMANY_COLLEGES,
  },

  'study-in-australia': {
    slug: 'study-in-australia',
    country: 'Australia',
    flag: '🇦🇺',
    badge: 'Group of 8 Univs',
    badgeColor: 'bg-amber-500 text-white',
    title: 'Study in Australia 2027: Group of Eight Universities, Fees & Work Visa | CareerWithMohit',
    description: 'Guide to study in Australia 2027 for Indian students. Compare Go8 universities, MBA/MS fees in INR, Subclass 500 student visa, Post-Study Work Visa (Subclass 485), and PR pathways.',
    h1: 'Study in Australia 2027: Group of 8 & Work Rights',
    subheading: 'World top-50 universities, high minimum wage, beautiful coastal lifestyle, and generous post-study work rights across Sydney, Melbourne, Brisbane and regional hubs.',
    optDuration: '2 to 4 Years (Temporary Graduate Visa Subclass 485)',
    avgTuition: '₹16L – ₹35L / year (AUD $30,000 – $50,000)',
    avgSalary: 'AUD $70,000 – $105,000 / year (₹40L – ₹60L)',
    livingCost: 'AUD $24,505 / year (~₹13.5 Lakhs)',
    visaType: 'Student Visa (Subclass 500)',
    intakes: 'Semester 1 (February) & Semester 2 (July)',
    examRequirements: ['IELTS Academic (6.5) / PTE Academic (58+)', 'No GRE/GMAT required for majority of master degrees'],
    popularDegrees: ['Master of Information Technology & AI', 'Master of Professional Accounting & Finance', 'MBA & Global Business', 'Master of Engineering & Mining', 'Master of Nursing & Healthcare Management'],
    highlights: [
      '7 Australian universities ranked in the Global QS Top 50 (Group of Eight - Go8).',
      'Highest minimum wage globally ($24.10 AUD/hr) and 48 hours per fortnight permitted part-time work rights.',
      'Extra 1-2 years of post-study work visa for studying in regional locations (Adelaide, Perth, Gold Coast).',
      'Direct permanent residency pathways through General Skilled Migration (GSM) points system.'
    ],
    faqs: [
      {
        q: 'What is the Group of Eight (Go8) in Australia?',
        a: 'The Group of Eight consists of Australia’s premier research-intensive universities including University of Melbourne, University of Sydney, UNSW, ANU, UQ, Monash, UWA, and University of Adelaide.'
      },
      {
        q: 'What are the post-study work rights (Subclass 485) in Australia?',
        a: 'Graduates of Bachelor degrees receive a 2-year post-study work visa, Master graduates receive 2–3 years, and Doctoral graduates receive 3 years. Studying in designated regional areas grants an additional 1 to 2 years.'
      }
    ],
    colleges: AUSTRALIA_COLLEGES,
  },

  'study-in-ireland': {
    slug: 'study-in-ireland',
    country: 'Ireland',
    flag: '🇮🇪',
    badge: 'European Tech Hub',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'Study in Ireland 2027: European Silicon Valley, 2-Yr Stay Back Visa & Fees | CareerWithMohit',
    description: 'Study in Ireland 2027 for Indian students. Compare Trinity College, UCD, Dublin Tech Hub universities, 2-year post study work stay-back visa, fees in INR, and IT/Finance jobs.',
    h1: 'Study in Ireland 2027: European Silicon Valley & Jobs',
    subheading: 'European headquarters of Google, Apple, Meta, Microsoft, Pfizer, and Stripe offering English-speaking environment and a 2-year post-study work visa.',
    optDuration: '2 Years (Third Level Graduate Scheme)',
    avgTuition: '₹10L – ₹22L / year (€11,000 – €24,000)',
    avgSalary: '€42,000 – €70,000 / year (₹38L – ₹65L)',
    livingCost: '€10,000 – €14,000 / year (₹9L – ₹12L)',
    visaType: 'Ireland Study Visa (Stamp 2)',
    intakes: 'Autumn (September) & Spring (January)',
    examRequirements: ['IELTS (6.5) / PTE (63+) / Duolingo (115+)', 'No GRE/GMAT needed for most Tech MS programs'],
    popularDegrees: ['MSc in Data Analytics & Artificial Intelligence', 'MSc in Computer Science (Software Engineering)', 'MSc in Finance, Fintech & Risk Management', 'MSc in Pharmaceutical Science & Biotechnology', 'Global MBA & Marketing Strategy'],
    highlights: [
      'Europe’s premier tech and pharma capital with 1,000+ multinational corporate headquarters in Dublin.',
      'Only major English-speaking country remaining in the European Union (EU) offering seamless Eurozone access.',
      '2-Year Third Level Graduate Scheme work permit for all Master’s degree graduates.',
      'Consistently ranked in the world’s top 10 safest and friendliest countries for international students.'
    ],
    faqs: [
      {
        q: 'Why is Ireland called the Silicon Valley of Europe?',
        a: 'Ireland is home to the European headquarters of 9 of the top 10 global ICT companies (Google, Microsoft, Meta, Apple, Intel), 9 of the top 10 pharmaceutical companies (Pfizer, Johnson & Johnson), and top global financial institutions.'
      },
      {
        q: 'How long can Indian students work in Ireland after graduation?',
        a: 'Students graduating with an NFQ Level 9 Master\'s degree are granted a 2-year post-study stay-back visa (Stamp 1G) to work full-time in Ireland without needing an employment permit.'
      }
    ],
    colleges: IRELAND_COLLEGES,
  },

  'study-in-france': {
    slug: 'study-in-france',
    country: 'France',
    flag: '🇫🇷',
    badge: 'Grande Écoles & MiM',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Study in France 2027: Top Grande Écoles, 2-Yr Post-Study Visa & Fees | CareerWithMohit',
    description: 'Explore higher education in France for 2027. English-taught Master in Management (MiM), luxury brand management, affordable public university tuition, 2-year post-study visa, and CAF housing subsidies.',
    h1: 'Study in France 2027: World-Class Business & Tech',
    subheading: 'World leader in luxury brand management, aerospace, and business Grande Écoles with affordable tuition and 2-year post-study work authorization for Indian graduates.',
    optDuration: '2 Years (Post-Study Work Permit for Indian Master grads)',
    avgTuition: '₹3L – ₹18L / year (€3,500 – €20,000)',
    avgSalary: '€40,000 – €65,000 / year (₹36L – ₹60L)',
    livingCost: '€8,000 – €12,000 / year (CAF provides 30-40% rent subsidy)',
    visaType: 'Long-Stay Student Visa (VLS-TS)',
    intakes: 'Autumn (September/October) & Spring (January)',
    examRequirements: ['IELTS (6.5) / TOEFL (85+) / TOEIC', 'GMAT / GRE (Preferred for top MiM programs like HEC/ESSEC)'],
    popularDegrees: ['Master in Management (MiM - World Top Ranked)', 'Luxury Brand Management & Fashion Business', 'MSc Data Science & Artificial Intelligence', 'Aerospace & Mechanical Engineering', 'International MBA & Hospitality Management'],
    highlights: [
      'Top 5 of the world’s best Master in Management (MiM) programs located in France (HEC Paris, ESSEC, ESCP, EDHEC).',
      'French Government provides CAF housing subsidies covering up to 40% of student accommodation rent.',
      'Special 5-Year Short-Stay Schengen Visa granted to Indian alumni of French universities.',
      'Over 1,500+ programs taught entirely in English across public and private institutes.'
    ],
    faqs: [
      {
        q: 'What is the 5-year visa privilege for Indian students studying in France?',
        a: 'Indian students who hold a Master\'s degree from a recognized French institution are eligible for a 5-year short-stay Schengen circulation visa to travel across Europe for business and tourism.'
      },
      {
        q: 'What is the CAF accommodation subsidy in France?',
        a: 'CAF (Caisse d\'Allocations Familiales) is a French government welfare program that pays 20% to 40% of international students\' monthly hostel/apartment rent directly.'
      }
    ],
    colleges: FRANCE_COLLEGES,
  },

  'study-in-netherlands': {
    slug: 'study-in-netherlands',
    country: 'Netherlands',
    flag: '🇳🇱',
    badge: 'Orientation Year Visa',
    badgeColor: 'bg-orange-500 text-white',
    title: 'Study in Netherlands 2027: Top Research Universities, Fees & Search Year | CareerWithMohit',
    description: 'Study in the Netherlands 2027. English-taught universities (TU Delft, Amsterdam, Erasmus), affordable European tuition, 1-year Zoekjaar Orientation Year work visa, and high English proficiency.',
    h1: 'Study in Netherlands 2027: Innovation & Research Univs',
    subheading: 'Over 2,100+ English-taught programs, 95% English proficiency nationwide, and a 1-year Zoekjaar (Search Year) work permit in Europe’s trading and logistics gateway.',
    optDuration: '1 Year (Zoekjaar / Orientation Year Visa)',
    avgTuition: '₹8L – ₹18L / year (€9,000 – €20,000)',
    avgSalary: '€42,000 – €68,000 / year (₹38L – ₹62L)',
    livingCost: '€10,000 – €14,000 / year (₹9L – ₹13L)',
    visaType: 'MVV / VVR Residence Permit for Study',
    intakes: 'September (Major) & February',
    examRequirements: ['IELTS (6.5) / TOEFL (90+) / Cambridge English', 'High academic percentage in Bachelor degree'],
    popularDegrees: ['MSc Computer Science, AI & Embedded Systems', 'MSc Supply Chain Management & Logistics (Port of Rotterdam)', 'MSc Water Management & Environmental Engineering', 'International Business & Economics', 'MSc Agriculture & Biotechnology (Wageningen)'],
    highlights: [
      'Top-tier research universities ranked consistently among the top 100 globally (TU Delft, University of Amsterdam, Erasmus Rotterdam).',
      'Zoekjaar (Orientation Year) visa allows 1 full year to find high-skilled migrant employment without salary threshold barriers.',
      'Highest English proficiency in non-native English speaking Europe (over 95% of population speaks fluent English).',
      'Heart of European transport, trading, and semiconductor tech (home to ASML, Philips, Booking.com, Shell, Unilever).'
    ],
    faqs: [
      {
        q: 'What is the Zoekjaar (Orientation Year) in the Netherlands?',
        a: 'The Zoekjaar visa gives international graduates 12 months to work freely in the Netherlands or seek employment as a Highly Skilled Migrant with a reduced income threshold requirement.'
      }
    ],
    colleges: NETHERLANDS_COLLEGES,
  },

  'study-in-new-zealand': {
    slug: 'study-in-new-zealand',
    country: 'New Zealand',
    flag: '🇳🇿',
    badge: '3-Year Post Study Visa',
    badgeColor: 'bg-teal-600 text-white',
    title: 'Study in New Zealand 2027: Top Universities, Fees, Post-Study Visa & PR | CareerWithMohit',
    description: 'Explore studying in New Zealand 2027. Compare all 8 state universities (Auckland, Otago, Canterbury), up to 3-year post-study work visa, green list PR skills, and fees in INR.',
    h1: 'Study in New Zealand 2027: High Quality of Life & PR',
    subheading: 'All 8 universities ranked in the Global QS Top 500, pristine environment, up to 3 years of post-study work rights, and fast-track Green List residence pathways.',
    optDuration: 'Up to 3 Years (Post-Study Work Visa)',
    avgTuition: '₹14L – ₹26L / year (NZD $28,000 – $48,000)',
    avgSalary: 'NZD $65,000 – $95,000 / year (₹33L – ₹48L)',
    livingCost: 'NZD $20,000 / year (~₹10.5 Lakhs)',
    visaType: 'Fee Paying Student Visa',
    intakes: 'Semester 1 (February) & Semester 2 (July)',
    examRequirements: ['IELTS Academic (6.5) / PTE (58+) / TOEFL'],
    popularDegrees: ['Master of Information Technology & Cybersecurity', 'Master of Professional Accounting', 'Master of Civil & Environmental Engineering', 'Agribusiness & Food Technology', 'Tourism & Hospitality Leadership'],
    highlights: [
      '100% of New Zealand universities are public and ranked in the top 3% worldwide.',
      '3-Year Post-Study Work Visa granted to Master’s degree graduates (Level 9).',
      'Direct Green List Straight-to-Residence visa pathways for engineers, IT professionals, nurses, and teachers.',
      'Spouses of Master’s students are eligible for full-time open work rights in New Zealand.'
    ],
    faqs: [
      {
        q: 'Can my spouse work in New Zealand while I study a Master\'s degree?',
        a: 'Yes! International students enrolled in Level 9 Master\'s programs or Green List qualifications can support an open work visa for their partner with no restrictions on working hours.'
      }
    ],
    colleges: NEW_ZEALAND_COLLEGES,
  },

  'study-in-singapore': {
    slug: 'study-in-singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    badge: 'Asian Financial Capital',
    badgeColor: 'bg-red-600 text-white',
    title: 'Study in Singapore 2027: Top Global Universities (NUS, NTU, SMU), Fees & Jobs | CareerWithMohit',
    description: 'Study in Singapore 2027 for Indian students. Learn about NUS, NTU, SMU, leading private campuses (INSEAD, James Cook, Curtin Singapore), financial hub career prospects, and fees in INR.',
    h1: 'Study in Singapore 2027: Global Financial Capital',
    subheading: 'Home to NUS and NTU (ranked World Top 15), premier financial hub of Asia, low tax rates, and world-leading multinational corporate headquarters.',
    optDuration: '1 Year (Long-Term Visit Pass - LTVP)',
    avgTuition: '₹12L – ₹30L / year (SGD $20,000 – $50,000)',
    avgSalary: 'SGD $60,000 – $95,000 / year (₹38L – ₹60L)',
    livingCost: 'SGD $12,000 – $18,000 / year (₹7.5L – ₹11L)',
    visaType: 'Student’s Pass (ICA Singapore)',
    intakes: 'August (Major) & January',
    examRequirements: ['GMAT / GRE (For MBA & MS Finance at NUS/NTU)', 'IELTS (6.5) / TOEFL (90+)'],
    popularDegrees: ['Master in Finance & Wealth Management', 'MS in Computer Science & AI', 'Global MBA & Executive Management', 'Supply Chain & Maritime Logistics', 'Data Analytics & FinTech'],
    highlights: [
      'NUS and NTU ranked consistently in the World Top 15 universities by QS World Rankings.',
      'Asian headquarters for 4,000+ multinational companies with zero language barrier (English is official business language).',
      'Proximity to India (4-hour flight) with immense global networking opportunities.',
      'High safety index, pristine infrastructure, and fast-paced Asian economic growth environment.'
    ],
    faqs: [
      {
        q: 'What are the top universities to study in Singapore?',
        a: 'The top public universities are National University of Singapore (NUS), Nanyang Technological University (NTU), and Singapore Management University (SMU), alongside international campuses like INSEAD, James Cook University Singapore, and Curtin Singapore.'
      }
    ],
    colleges: [],
  },

  'study-in-dubai': {
    slug: 'study-in-dubai',
    country: 'Dubai (UAE)',
    flag: '🇦🇪',
    badge: 'Tax-Free Career Hub',
    badgeColor: 'bg-amber-600 text-white',
    title: 'Study in Dubai 2027: Top Global Branch Campuses, Fees & Tax-Free Jobs | CareerWithMohit',
    description: 'Study in Dubai (UAE) 2027. Global UK, Australian and Indian branch campuses (Middlesex, Wollongong, BITS, Heriot-Watt, SP Jain), 100% tax-free salaries, and easy student visa approval.',
    h1: 'Study in Dubai 2027: Branch Campuses & Tax-Free Jobs',
    subheading: 'Leading international branch campuses from the UK, Australia & USA located in Dubai Knowledge Park with 100% tax-free salaries and rapid student visa processing.',
    optDuration: '2 to 5 Years (Green Visa & Golden Visa for Top Graduates)',
    avgTuition: '₹8L – ₹18L / year (AED 35,000 – 80,000)',
    avgSalary: 'AED 80,000 – 140,000 / year (₹18L – ₹32L Tax-Free)',
    livingCost: 'AED 25,000 – 35,000 / year (₹5.5L – ₹8L)',
    visaType: 'UAE Student Residence Visa (Fast Track)',
    intakes: 'September, January, and May',
    examRequirements: ['IELTS (6.0) / TOEFL / Direct English assessment test', 'No GRE/GMAT required for most programs'],
    popularDegrees: ['MBA & Global Luxury Business', 'MSc Data Science & Artificial Intelligence', 'Civil & Architectural Engineering', 'Hospitality & International Tourism Management', 'Digital Marketing & E-Commerce'],
    highlights: [
      'Earn accredited British, Australian, and American degrees at 40% lower cost in Dubai.',
      '100% tax-free starting salaries with fast-track UAE Green Visa and Golden Visa eligibility for high achievers.',
      'Near-zero visa rejection rates with rapid processing (within 2-3 weeks) and minimal financial document friction.',
      'Proximity to India (3-hour flight) with vast Indian diaspora and corporate network.'
    ],
    faqs: [
      {
        q: 'Are degrees from Dubai branch campuses recognized worldwide?',
        a: 'Yes! Branch campuses of UK and Australian universities in Dubai (e.g., University of Wollongong Dubai, Middlesex University Dubai, Heriot-Watt University) award the exact same certificate and degree issued at their home campuses in the UK or Australia.'
      }
    ],
    colleges: [],
  },

  'study-in-sweden': {
    slug: 'study-in-sweden',
    country: 'Sweden',
    flag: '🇸🇪',
    badge: 'Tech & Sustainability',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Study in Sweden 2027: Top Universities, 1-Year Job Visa & Fees | CareerWithMohit',
    description: 'Study in Sweden 2027 for Indian students. English-taught Master degrees (KTH, Lund, Uppsala, Chalmers), innovation ecosystem (Spotify, IKEA, Ericsson), and 12-month post-study work visa.',
    h1: 'Study in Sweden 2027: Nordic Innovation & Tech',
    subheading: 'Home of the Nobel Prize, global unicorns (Spotify, Klarna, King), English-taught engineering programs, and a 1-year post-study job seeker residence permit.',
    optDuration: '12 Months (Residence Permit for Seeking Employment)',
    avgTuition: '₹8L – ₹16L / year (SEK 100,000 – 200,000)',
    avgSalary: 'SEK 400,000 – 550,000 / year (₹32L – ₹45L)',
    livingCost: 'SEK 10,000 / month (~₹8 Lakhs / year)',
    visaType: 'Sweden Residence Permit for Higher Education',
    intakes: 'Autumn (August/September)',
    examRequirements: ['IELTS (6.5) / TOEFL (90+)', 'Strong Bachelor GPA'],
    popularDegrees: ['MSc Embedded Systems & Wireless Tech', 'MSc Sustainable Energy & CleanTech', 'MSc Software Engineering & Cloud', 'Industrial Design & Innovation Management'],
    highlights: [
      'Ranked #1 in Europe for innovation and sustainability with world-class universities like KTH Royal Institute of Technology and Lund University.',
      '12-month post-study job seeker visa to find employment in Sweden or across the Nordic region.',
      'Ph.D. positions in Sweden are treated as salaried jobs with full employee benefits.'
    ],
    faqs: [
      {
        q: 'Can international students work during studies in Sweden?',
        a: 'Yes! Sweden places no legal limit on the number of hours international students can work during their studies, provided they maintain satisfactory academic progress.'
      }
    ],
    colleges: SWEDEN_COLLEGES,
  },

  'study-in-finland': {
    slug: 'study-in-finland',
    country: 'Finland',
    flag: '🇫🇮',
    badge: '2-Year Post Study Visa',
    badgeColor: 'bg-blue-400 text-slate-950',
    title: 'Study in Finland 2027: World Best Education, 2-Year Post-Study Visa | CareerWithMohit',
    description: 'Study in Finland 2027. World’s happiest country, leading tech universities (Aalto, Helsinki), generous scholarships up to 100%, 2-year post-study work permit, and permanent residency pathways.',
    h1: 'Study in Finland 2027: #1 Education & 2-Yr Post Study Visa',
    subheading: 'World’s highest quality education system, 2-year post-study job search visa, generous tuition fee scholarships up to 50–100%, and fast-track PR route.',
    optDuration: '2 Years (Extended Post-Study Residence Permit)',
    avgTuition: '₹7L – ₹14L / year (€8,000 – €16,000)',
    avgSalary: '€40,000 – €58,000 / year (₹36L – ₹52L)',
    livingCost: '€7,000 – €10,000 / year (₹6.5L – ₹9L)',
    visaType: 'Finland Continuous Residence Permit (Type A)',
    intakes: 'Autumn (August/September)',
    examRequirements: ['IELTS (6.5) / TOEFL (92+) / PTE (62+)', 'Strong academic transcripts'],
    popularDegrees: ['MS in Computer Science & 6G Wireless Networks', 'MS in Artificial Intelligence & Quantum Computing', 'CleanTech & Environmental Engineering', 'International Business & Game Development'],
    highlights: [
      'Finland offers a generous 2-Year Post-Study Residence Permit to look for work or start a business.',
      'Student visa counts directly (Type A Continuous Permit) toward the 4-year residency requirement for Finnish citizenship & PR.',
      'Generous institutional scholarships covering 50% to 100% of tuition fees for deserving candidates.'
    ],
    faqs: [
      {
        q: 'Does time spent studying in Finland count towards Permanent Residency (PR)?',
        a: 'Yes! Under updated Finnish immigration legislation, international students are granted a continuous Type A residence permit, and study years count 100% towards the 4-year requirement for Permanent Residency.'
      }
    ],
    colleges: FINLAND_COLLEGES,
  },

  'study-in-spain': {
    slug: 'study-in-spain',
    country: 'Spain',
    flag: '🇪🇸',
    badge: 'Top Business Schools',
    badgeColor: 'bg-yellow-500 text-slate-950',
    title: 'Study in Spain 2027: Top Triple Crown Business Schools & Visa | CareerWithMohit',
    description: 'Study in Spain 2027 for Indian students. Top global business schools (IE, ESADE, IESE), low cost of living, English-taught Master programs, and 12-month post-study work permit.',
    h1: 'Study in Spain 2027: World-Class B-Schools & Culture',
    subheading: 'Home to 3 of the World’s Top 10 Business Schools (IE, IESE, ESADE), vibrant European culture, affordable living costs, and 1-year post-study job search visa.',
    optDuration: '12 Months (Job Search Residence Authorization)',
    avgTuition: '₹3.5L – ₹16L / year (€4,000 – €18,000)',
    avgSalary: '€35,000 – €60,000 / year (₹32L – ₹55L)',
    livingCost: '€7,000 – €10,000 / year (₹6.5L – ₹9L)',
    visaType: 'Spain Long-Term Student Visa (Type D)',
    intakes: 'September/October & January/February',
    examRequirements: ['IELTS (6.5) / TOEFL (85+)', 'GMAT / GRE (For top MBA/MiM programs)'],
    popularDegrees: ['Master in International Management & MBA', 'Master in Big Data & Business Analytics', 'Tourism & Hospitality Management', 'Renewable Energy & Architecture', 'International Marketing & Digital Business'],
    highlights: [
      'Top 3 globally ranked MBA and Management institutions (IE Business School, IESE, ESADE).',
      'Affordable living expenses compared to Northern European countries (€600–€900/month).',
      '1-year post-study job seeker visa allowing graduates to transition directly into work residency.'
    ],
    faqs: [
      {
        q: 'Can I study in Spain in English?',
        a: 'Yes! Hundreds of Bachelor and Master degrees, particularly in Business, Data Analytics, Hospitality, and Economics, are delivered 100% in English.'
      }
    ],
    colleges: SPAIN_COLLEGES,
  },

  'study-in-malaysia': {
    slug: 'study-in-malaysia',
    country: 'Malaysia',
    flag: '🇲🇾',
    badge: 'Affordable Hub',
    badgeColor: 'bg-blue-500 text-white',
    title: 'Study in Malaysia 2027: UK & Australian Branch Campuses, Low Fees | CareerWithMohit',
    description: 'Study in Malaysia 2027. High quality UK/Australian twinning degrees (Monash, Nottingham, Southampton, Curtin Malaysia) at 1/3rd of the cost with easy student visa processing.',
    h1: 'Study in Malaysia 2027: Affordable Asian Education Hub',
    subheading: 'Earn world-class UK & Australian degrees at branch campuses in Kuala Lumpur at 70% lower tuition fees and living costs.',
    optDuration: '1 Year (Social Visit Pass for Graduates)',
    avgTuition: '₹3.5L – ₹8.5L / year (USD $4,500 – $10,000)',
    avgSalary: 'MYR 40,000 – 70,000 / year (₹7.5L – ₹14L)',
    livingCost: 'USD $3,500 – $5,000 / year (₹3L – ₹4.5L)',
    visaType: 'Student Pass (EMGS Visa Approval Letter)',
    intakes: 'February, July, and October',
    examRequirements: ['IELTS (6.0) / PTE (50+) / TOEFL / MOI Letter'],
    popularDegrees: ['BEng & MEng Engineering (UK Accredited)', 'BSc & MSc Computer Science & Software Tech', 'Bachelor of Business Administration & MBA', 'Hospitality & Culinary Arts Management'],
    highlights: [
      'Monash, Nottingham, Heriot-Watt, Southampton and Curtin branch campuses award identical degrees as home campuses.',
      'Extremely affordable total budget (₹7L–₹10L/year all-inclusive including food and housing).',
      'High visa success rate with English as the primary medium of university education.'
    ],
    faqs: [
      {
        q: 'What are the benefits of studying at a UK/Australian branch campus in Malaysia?',
        a: 'Students receive the exact same degree certificate awarded by University of Nottingham, Monash University, or Heriot-Watt University UK, but pay only 30% to 40% of the tuition fees and living expenses.'
      }
    ],
    colleges: MALAYSIA_COLLEGES,
  },
};
