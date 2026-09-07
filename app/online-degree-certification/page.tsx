import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BadgeCheck, Phone, ChevronDown, MapPin, Award, ShieldCheck, 
  GraduationCap, BookOpen, Sparkles, CheckCircle2, Building, 
  TrendingUp, Globe, FileText, Layers, ExternalLink, ArrowRight,
  HelpCircle, UserCheck
} from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import OnlineDegreeLeadForm from '@/components/OnlineDegreeLeadForm';
import { COLLEGES } from '@/data/onlineColleges';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/online-degree-certification';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Top Online Degrees in India 2027: UGC Approved Universities, Fees & Admission Guide | CareerWithMohit',
  description:
    'Compare 40+ UGC-DEB approved online universities in India for 2027. Fees from ₹20,000 to ₹2 Lakhs. Explore Online MBA, MCA, BBA, BCA, MA English, B.Com, M.Com & PGDM programs with NAAC A++ grades, WES recognition, and 100% government job validity. Free counselling by Mohit Jain.',
  keywords: [
    'online degree courses in india 2027',
    'ugc deb approved online universities',
    'ugc approved online universities list 2027',
    'online mba colleges in india fees',
    'best online mba for working professionals',
    'online mca admission 2027',
    'online bba colleges in india',
    'online bca admission 2027',
    'online ma in english 2027',
    'online ma english colleges india',
    'online bcom course fees',
    'online mcom colleges india',
    'online pgdm aicte approved',
    'jaipuria online pgdm review',
    'amity university online mba review',
    'chandigarh university online degree',
    'lpu online degree fees',
    'jain university online mba',
    'nmims online mba fees 2027',
    'manipal university jaipur online',
    'srm online degree',
    'dy patil online mba pune',
    'is online degree valid for upsc civil services',
    'is online degree accepted for government jobs',
    'ugc online degree equivalence gazette notification',
    'wes approved online universities india',
    'cheapest online mba in india',
    'online degree in delhi ncr',
    'online mba in bangalore',
    'online degree in mumbai pune maharashtra',
    'online degree admission 2027',
    'distance education vs online degree india',
    'mohit jain career counsellor'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Top Online Degrees in India 2027: UGC Approved Universities & Fees | CareerWithMohit',
    description:
      'Compare 40+ UGC-DEB approved online universities in India. Fees starting from ₹20,000. Online MBA, MCA, BBA, BCA, MA, B.Com programs. Free expert counselling by Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-online-degree.png`,
        width: 1200,
        height: 630,
        alt: 'Top Online Degrees & UGC Approved Universities in India 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Online Degrees in India 2027: UGC Approved Universities | CareerWithMohit',
    description:
      'Compare 40+ UGC-DEB approved online universities in India. Fees from ₹20,000. Free counselling by Mohit Jain.',
    images: [`${BASE_URL}/og-online-degree.png`],
    creator: '@careerwithmohit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { 
      index: true, 
      follow: true, 
      'max-snippet': -1, 
      'max-image-preview': 'large',
      'max-video-preview': -1 
    },
  },
};

// ── JSON-LD Structured Data Schemas ──────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Top Online Degrees in India 2027: UGC Approved Universities, Fees & Admission Guide | CareerWithMohit',
      description:
        'Compare 40+ UGC-DEB approved online universities in India for 2027. Find fees, NAAC grades, programs and get FREE expert counselling.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      author: {
        '@type': 'Person',
        'name': 'Mohit Jain',
        'url': `${BASE_URL}/about`,
        'jobTitle': 'Chief Career Counsellor & MBA Admissions Strategist'
      },
      publisher: {
        '@type': 'EducationalOrganization',
        'name': 'CareerWithMohit',
        'url': BASE_URL,
        'logo': `${BASE_URL}/logo.webp`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Online Degrees & Certifications', item: PAGE_URL },
        ],
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#ai-fast-facts', 'h1', 'h2']
      }
    },
    {
      '@type': 'ItemList',
      name: 'Top UGC Approved Online Universities in India 2027',
      description: 'Comprehensive directory of UGC-DEB approved online universities offering MBA, MCA, BBA, BCA, MA, B.Com, and PGDM programs in India.',
      url: PAGE_URL,
      numberOfItems: COLLEGES.length,
      itemListElement: COLLEGES.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: c.name,
        url: c.slug ? `${BASE_URL}/blog/${c.slug}` : `${BASE_URL}/online-degree-certification/${c.universitySlug}`,
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to Choose and Apply for a UGC-DEB Approved Online Degree in India (2027)',
      description: 'A 5-step comprehensive guide to verifying university approvals, selecting courses, calculating ROI, and applying for UGC approved online degrees.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Verify UGC-DEB Approval on Official Portal',
          text: 'Check the official UGC-DEB distance/online education portal to ensure the university holds active approval for your target academic session.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Check NAAC Accreditation & NIRF Ranking',
          text: 'Select universities holding NAAC A++, NAAC A+, or Category-I status for high curriculum standards and nationwide employer acceptance.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Evaluate Total Fees and Zero-Cost EMI Options',
          text: 'Compare 2-year total tuition fees, semester breakdown, exam fees, and interest-free monthly installment options starting from ₹3,000/month.'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm Global Validity and WES Recognition',
          text: 'If planning for overseas employment or Canada PR immigration, verify WES (World Education Services) recognition before enrolling.'
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Submit Online Application and Upload Documents',
          text: 'Upload graduation/12th marksheets, government photo ID, passport size photograph, and complete provisional admission on the university portal.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is an online degree from Indian universities legally valid for government jobs and UPSC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100%. As per the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020 published in the Gazette of India, degrees obtained through online mode from UGC-DEB approved institutions are treated as equivalent to conventional on-campus degrees. Graduates are fully eligible for UPSC Civil Services, SSC CGL, IBPS Bank PO, State PSCs, and public sector undertakings (PSUs).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the fee structure for an online MBA in India in 2027?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Total fees for an online MBA in India range from ₹62,200 (Andhra University) to ₹2,00,000–₹2,20,000 (NMIMS Online, SASTRA University, Amity University Online). The average fee for reputed NAAC A++ / A+ online MBA universities is ₹1.2 Lakhs to ₹1.8 Lakhs for the complete 2-year program with flexible semester EMIs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which are the top UGC-DEB approved online universities in India for 2027?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Top UGC-DEB approved online universities include Amity University Online (NAAC A+, WES approved), Jain University Online (NAAC A++), Lovely Professional University (LPU Online, NAAC A++), Chandigarh University Online (QS Ranked), Manipal University Jaipur Online (NAAC A+), NMIMS Online, D.Y. Patil University Online, Jamia Millia Islamia Online, and SASTRA University Online.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which online degrees in India hold WES approval for Canada PR and US jobs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Online degrees from Amity University Online, Jain University Online, Lovely Professional University (LPU Online), Manipal University Jaipur, and D.Y. Patil University are evaluated by World Education Services (WES) as equivalent to Canadian and US university degrees for immigration and higher studies.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I do an online MBA or MCA while working a full-time job?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Online degrees are designed specifically for working professionals. They feature self-paced Learning Management Systems (LMS), weekend live interactive masterclasses, recorded lecture repositories, and proctored online examinations from home, allowing you to study without career breaks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between an Online Degree and Distance Education (ODL)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In Online mode (OL), 100% of classes, e-learning content, assignments, and semester examinations are conducted digitally via LMS web platforms. In Distance mode (ODL), study material is primarily printed and dispatched by post, with occasional physical weekend contact classes and offline exam centers. Both are UGC-recognized.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which universities offer the cheapest UGC approved online degrees in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Central and State universities offer the lowest fees: Jamia Millia Islamia Online (MA & B.Com at ~₹20,000), Aligarh Muslim University Online (~₹21,000), Andhra University Online (MBA at ₹62,200), Kalinga University Online (₹80,000), and Galgotias University Online (₹90,000).',
          },
        },
        {
          '@type': 'Question',
          name: 'Are online degrees accepted by top private MNCs like TCS, Infosys, and Deloitte?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Top IT, consulting, and BFSI companies (TCS, Infosys, Wipro, Deloitte, Accenture, Amazon, HDFC Bank) actively recruit and promote employees holding UGC-DEB recognized online degrees. Many universities also provide dedicated virtual placement portals and interview prep drives.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'Is an online degree from Indian universities legally valid for government jobs & UPSC?',
    a: 'Yes, 100%. Under the UGC (Open and Distance Learning Programmes and Online Programmes) Regulations 2020 published in the Gazette of India, online degrees from UGC-DEB approved universities are treated as identical and legally equivalent to regular physical classroom degrees. You are fully eligible for UPSC Civil Services (IAS/IPS/IFS), SSC CGL, IBPS Bank PO/Clerk, State PSCs, UGC NET, and PSU recruitment exams.',
  },
  {
    q: 'What is the total fee for an Online MBA in India in 2027?',
    a: 'Online MBA fees in India start from ₹62,200 (Andhra University) up to ₹2,00,000–₹2,20,000 (NMIMS Online, SASTRA, Amity Online). The average fee for top-tier NAAC A++ and NAAC A+ universities is approximately ₹1.2 Lakhs to ₹1.8 Lakhs for the complete 2-year course, with monthly zero-cost EMI options starting around ₹4,000/month.',
  },
  {
    q: 'Which is the best UGC-DEB approved online university in India for MBA & MCA?',
    a: 'Top choices include Amity University Online (Global WES approval), Jain University Online (NAAC A++, Bangalore tech ecosystem), LPU Online (NAAC A++, robust LMS & placements), Chandigarh University Online (QS Ranked), Manipal University Jaipur (prestigious Manipal brand), and NMIMS Online (top business school heritage). Your ideal match depends on your career domain, specializations, and budget.',
  },
  {
    q: 'Which online universities have WES approval for Canada PR & USA jobs?',
    a: 'Amity University Online, Jain University Online, LPU Online, Manipal University Jaipur, and D.Y. Patil University hold recognized status with World Education Services (WES). A WES credential evaluation equates your Indian online postgraduate degree to a North American degree, essential for Canada Express Entry PR points and US H1-B processing.',
  },
  {
    q: 'How do online examinations and LMS classes work?',
    a: 'Classes are conducted via state-of-the-art Learning Management Systems (LMS) with live weekend interactive webinars and 24/7 access to recorded videos, e-books, and case studies. Semester exams are conducted online via AI-proctored web browsers with live webcam and microphone monitoring, enabling you to take exams from the comfort of your home.',
  },
  {
    q: 'Can I do an online degree while working a full-time job?',
    a: 'Yes, that is the core purpose of UGC-approved online education. You study flexibly during weekends or evening hours, with zero disruption to your job or salary. Furthermore, many universities count your professional experience toward live case study assignments.',
  },
  {
    q: 'What is the difference between an Online Degree and Distance Education (ODL)?',
    a: 'Online mode (OL) is 100% digital with live interactive classes, virtual discussion forums, digital libraries, and online proctored exams. Distance mode (ODL) traditionally relies on printed textbooks mailed to your address, self-study, and offline pen-and-paper exam centers. Both are UGC-recognized, but online degrees offer superior learning engagement and recruiter appeal.',
  },
  {
    q: 'Which universities offer the most affordable Online Degrees in India?',
    a: 'Jamia Millia Islamia Online (~₹20,000 for MA/B.Com), Aligarh Muslim University Online (~₹21,000), Andhra University Online (₹62,200 for MBA/MCA), Kalinga University Online (₹80,000), Galgotias University Online (₹90,000), and Uttaranchal University Online (₹98,000 for NAAC A+ MBA) represent the most budget-friendly accredited options in India.',
  },
  {
    q: 'Do online degree universities provide campus placements?',
    a: 'Yes. Premium universities like Amity, LPU, Jain, Chandigarh University, and Manipal feature dedicated virtual placement cells. They organize virtual job fairs, resume-building bootcamps, mock interview sessions with corporate mentors, and connect learners with 500+ hiring partners.',
  },
  {
    q: 'What are the top specializations offered in Online MBA & Online MCA?',
    a: 'Online MBA specializations include Marketing Management, Financial Management, Human Resource Management, Business Analytics, IT & FinTech, Operations & Supply Chain, Healthcare Management, and International Business. Online MCA specializations include Artificial Intelligence & Machine Learning, Data Science, Cyber Security, Cloud Computing, and Full Stack Software Development.',
  },
];

// ── Regional Universities Hub Mapping for Geotargeted SEO (GEO) ──────────────
const REGIONAL_HUBS = [
  {
    region: 'North India Hub',
    cities: 'Delhi NCR · Noida · Gurgaon · Chandigarh · Punjab · Jaipur · Dehradun',
    desc: 'Leading universities in the National Capital Region and northern education corridors with strong corporate ties.',
    colleges: [
      { name: 'Amity University Online', loc: 'Noida, UP', grade: 'NAAC A+', fee: '₹1.99 Lakhs', slug: 'amity-university-online-mba-review-2026', univSlug: 'amity-university-online', badge: 'Global Brand' },
      { name: 'Chandigarh University Online', loc: 'Chandigarh, Punjab', grade: 'NAAC A+', fee: '₹1.65 Lakhs', slug: 'chandigarh-university-online-mba-review-2026', univSlug: 'chandigarh-university-online', badge: 'QS Ranked' },
      { name: 'LPU Online', loc: 'Phagwara, Punjab', grade: 'NAAC A++', fee: '₹1.61 Lakhs', slug: 'lovely-professional-university-lpu-online-mba-review-2026', univSlug: 'lovely-professional-university-lpu-online', badge: 'NAAC A++' },
      { name: 'Manipal University Jaipur', loc: 'Jaipur, Rajasthan', grade: 'NAAC A+', fee: '₹1.75 Lakhs', slug: 'manipal-university-jaipur-online-mba-review-2026', univSlug: 'manipal-university-jaipur-online', badge: 'Top Brand ROI' },
      { name: 'UPES Online', loc: 'Dehradun, Uttarakhand', grade: 'NAAC A', fee: '₹1.80 Lakhs', slug: 'upes-online-mba-review-2026', univSlug: 'upes-online', badge: 'Industry Niche' },
      { name: 'Uttaranchal University Online', loc: 'Dehradun, Uttarakhand', grade: 'NAAC A+', fee: '₹98,000', slug: 'uttaranchal-university-online-mba-review-2026', univSlug: 'uttaranchal-university-online', badge: 'Affordable A+' },
      { name: 'Jamia Hamdard Online', loc: 'New Delhi', grade: 'NAAC A', fee: '₹1.03 Lakhs', slug: 'jamia-hamdard-university-online-mba-review-2026', univSlug: 'jamia-hamdard-university-online', badge: 'Delhi Legacy' },
      { name: 'Galgotias University Online', loc: 'Greater Noida, UP', grade: 'NAAC A+', fee: '₹90,000', slug: 'galgotias-university-online-mba-review-2026', univSlug: 'galgotias-university-online', badge: 'NCR Tech' },
    ]
  },
  {
    region: 'South India Hub',
    cities: 'Bangalore · Chennai · Coimbatore · Vijayawada · Visakhapatnam · Thanjavur',
    desc: 'High-ranking Category-I and NAAC A++ institutions anchored in India\'s prime IT and manufacturing ecosystems.',
    colleges: [
      { name: 'Jain University Online', loc: 'Bangalore, Karnataka', grade: 'NAAC A++', fee: '₹1.96 Lakhs', slug: 'jain-university-online-mba-review-2026', univSlug: 'jain-university-online', badge: 'Tech Specialized' },
      { name: 'SRM University Online', loc: 'Chennai, Tamil Nadu', grade: 'NAAC A++', fee: '₹1.00 Lakhs', slug: 'srm-university-online-mba-review-2026', univSlug: 'srm-university-online', badge: 'NAAC A++' },
      { name: 'Amrita University Online', loc: 'Coimbatore, TN', grade: 'NAAC A++', fee: '₹1.70 Lakhs', slug: 'amrita-university-online-mba-review-2026', univSlug: 'amrita-university-online', badge: 'NIRF Top 10' },
      { name: 'SASTRA University Online', loc: 'Thanjavur, TN', grade: 'NAAC A++', fee: '₹2.20 Lakhs', slug: 'sastra-university-online-mba-review-2026', univSlug: 'sastra-university-online', badge: 'Academic Rigor' },
      { name: 'KL University Online', loc: 'Vijayawada, AP', grade: 'NAAC A++', fee: '₹1.20 Lakhs', slug: 'kl-university-online-review-2026', univSlug: 'kl-university-online', badge: 'Category-I' },
      { name: 'Andhra University Online', loc: 'Visakhapatnam, AP', grade: 'NAAC A', fee: '₹62,200', slug: 'andhra-university-online-mba-review-2026', univSlug: 'andhra-university-online', badge: 'Lowest Fee King' },
    ]
  },
  {
    region: 'West India Hub',
    cities: 'Mumbai · Pune · Navi Mumbai · Vadodara · Gujarat · Maharashtra',
    desc: 'Premier business management hubs offering finance, corporate leadership, and industry-integrated credentials.',
    colleges: [
      { name: 'NMIMS Online', loc: 'Mumbai, Maharashtra', grade: 'NAAC A+', fee: '₹2.00 Lakhs', slug: 'nmims-online-mba-review-2026', univSlug: 'nmims-online', badge: 'Top B-School' },
      { name: 'D.Y. Patil University Online', loc: 'Pune, Maharashtra', grade: 'NAAC A++', fee: '₹1.89 Lakhs', slug: 'd-y-patil-university-pune-online-mba-review-2026', univSlug: 'd-y-patil-university-online-pune', badge: 'NAAC A++' },
      { name: 'DY Patil Vidyapeeth Online', loc: 'Navi Mumbai, MH', grade: 'NAAC A++', fee: '₹1.70 Lakhs', slug: 'dy-patil-navi-mumbai-online-review-2026', univSlug: 'd-y-patil-university-online-mumbai', badge: 'Healthcare & Mgmt' },
      { name: 'Parul University Online', loc: 'Vadodara, Gujarat', grade: 'NAAC A++', fee: '₹1.50 Lakhs', slug: 'parul-university-online-mba-review-2026', univSlug: 'parul-university-online', badge: 'Gujarat Top Pick' },
      { name: 'SCDL Symbiosis', loc: 'Pune, Maharashtra', grade: 'NAAC A++', fee: '₹74,000', slug: 'scdl-symbiosis-online-review-2026', univSlug: 'scdl-symbiosis-online', badge: 'Distance Pioneer' },
    ]
  },
  {
    region: 'Central & East India Hub',
    cities: 'Gangtok · Sikkim · Raipur · Central India Corridor',
    desc: 'Affordable, accredited online degree programs delivering high ROI across Central and Eastern India.',
    colleges: [
      { name: 'Sikkim Manipal University Online', loc: 'Gangtok, Sikkim', grade: 'NAAC A+', fee: '₹1.10 Lakhs', slug: 'sikkim-manipal-university-online-mba-review-2026', univSlug: 'sikkim-manipal-university-online', badge: '20+ Yrs Legacy' },
      { name: 'Kalinga University Online', loc: 'Raipur, Chhattisgarh', grade: 'NAAC B+', fee: '₹80,000', slug: 'kalinga-university-online-mba-review-2026', univSlug: 'kalinga-university-online', badge: 'Value Pick' },
    ]
  }
];

export default function OnlineDegreePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div>
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] text-white py-20 md:py-28 border-b border-blue-900/40">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/15 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/15 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>UGC-DEB Approved Universities</span>
              <span className="text-blue-300">•</span>
              <span className="text-amber-300 font-bold">2027 Official Directory</span>
            </span>
            
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Top Online Degrees in India
              <br />
              <span className="text-amber-300">
                UGC Approved Universities &amp; Fees (2027)
              </span>
            </h1>
            
            <p className="text-blue-100/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal mb-10">
              Compare 40+ UGC-DEB approved online universities in India side-by-side. Check fee schedules (from ₹20,000), NAAC A++ accreditations, WES approval status, and get 100% free personalized admission counselling.
            </p>

            {/* Quick Links / Program Pills */}
            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto relative z-20 mb-12">
              {[
                { name: 'Online MBA', slug: 'online-mba', tag: 'PG' },
                { name: 'Online MCA', slug: 'online-mca', tag: 'PG' },
                { name: 'Online BBA', slug: 'online-bba', tag: 'UG' },
                { name: 'Online BCA', slug: 'online-bca', tag: 'UG' },
                { name: 'Online B.Com', slug: 'online-bcom', tag: 'UG' },
                { name: 'Online M.Com', slug: 'online-mcom', tag: 'PG' },
                { name: 'Online MA', slug: 'online-ma', tag: 'PG' },
                { name: 'Online MA (English)', slug: 'online-ma-english', tag: 'PG' },
                { name: 'Online BA', slug: 'online-ba', tag: 'UG' },
                { name: 'Online PGDM', slug: 'online-pgdm', tag: 'PG' },
                { name: 'Online B.Sc', slug: 'online-bsc', tag: 'UG' },
                { name: 'Online M.Sc', slug: 'online-msc', tag: 'PG' }
              ].map((link) => (
                <Link
                  key={link.slug}
                  href={`/online-degree-certification/${link.slug}`}
                  className="bg-white/10 hover:bg-blue-600 hover:border-blue-400 text-white border border-white/15 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all backdrop-blur-md shadow-sm flex items-center gap-1.5"
                >
                  <span>{link.name}</span>
                  <span className="opacity-60 text-[9px] font-bold tracking-widest">{link.tag}</span>
                </Link>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { num: `${COLLEGES.length}+`, label: 'Approved Universities', desc: 'UGC-DEB Recognized' },
                { num: '₹20,000', label: 'Starting Total Fee', desc: 'Central & State Univs' },
                { num: '100%', label: 'Legal Equivalence', desc: 'UGC Regulations 2020' },
                { num: '15+', label: 'WES Approved', desc: 'Valid for Canada / US' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-4 py-5 text-center transition-all hover:bg-white/10 hover:border-white/20">
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-amber-300">{s.num}</p>
                  <p className="text-white text-xs font-bold uppercase tracking-wider mt-1">{s.label}</p>
                  <p className="text-blue-200/70 text-[11px] font-medium mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA CALL STRIP ── */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 py-3.5 text-center text-white shadow-sm border-b border-blue-600/40 relative z-20">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm hover:underline underline-offset-4 tracking-wider uppercase transition-all"
            >
              <Phone size={15} />
              Call Counsellor: +91 95600 20771
            </a>
            <span className="hidden sm:inline text-blue-200/50">•</span>
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20need%20free%20guidance%20for%20online%20degree%20admission"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>

        {/* ── GEO & AI SEARCH FAST FACTS (Generative Engine Optimization) ── */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div id="ai-fast-facts" className="bg-white rounded-2xl border border-slate-200/90 p-7 md:p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/80 mb-3">
              <Sparkles size={15} />
              <span>AI Fast Facts &amp; Direct Answer Summary (2027 Edition)</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Key Facts: UGC-DEB Approved Online Degrees in India
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
              If you are researching online degrees in India, here is the verified regulatory, academic, and financial baseline certified by UGC-DEB and national education councils:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm font-medium text-slate-700">
              <div className="flex items-start gap-3.5 bg-slate-50 p-5 rounded-xl border border-slate-200/70 shadow-xs hover:border-blue-200 transition-colors">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">100% Legal Equivalence (UGC Regs 2020)</strong>
                  <span className="text-slate-600 font-normal leading-relaxed">Online degrees from UGC-DEB approved universities hold identical legal status to physical degrees for government recruitments (UPSC, Bank PO, SSC) and private MNC hiring.</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 bg-slate-50 p-5 rounded-xl border border-slate-200/70 shadow-xs hover:border-blue-200 transition-colors">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">Flexible Tuition Fees (₹20,000 – ₹2.2L)</strong>
                  <span className="text-slate-600 font-normal leading-relaxed">Central/state universities start from ₹20,000 for MA/B.Com, while top-tier private NAAC A++ universities range between ₹1.2L to ₹2.0L with monthly EMI options.</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 bg-slate-50 p-5 rounded-xl border border-slate-200/70 shadow-xs hover:border-blue-200 transition-colors">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">WES Approved for Global Immigration</strong>
                  <span className="text-slate-600 font-normal leading-relaxed">Top universities (Amity, LPU, Jain, Manipal, DY Patil) hold WES evaluation recognition, qualifying you for Canada PR Express Entry points and USA/UK jobs.</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 bg-slate-50 p-5 rounded-xl border border-slate-200/70 shadow-xs hover:border-blue-200 transition-colors">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">100% Digital LMS + Home Proctored Exams</strong>
                  <span className="text-slate-600 font-normal leading-relaxed">Attend live weekend sessions, watch recorded lectures on mobile/desktop, and take semester examinations from home via secure AI-proctored web browsers.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD CAPTURE FORM ── */}
        <section className="px-6 py-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <OnlineDegreeLeadForm />
          </div>
        </section>

        {/* ── GEOTARGETED REGIONAL DIRECTORY (GEO IN INDIA) ── */}
        <section className="bg-white py-16 md:py-24 border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80">
                <MapPin size={13} /> Regional &amp; State-Wise Directory
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                UGC Approved Online Universities by Region (India)
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Search accredited online degree providers across key metropolitan clusters in North, South, West, and Central India with verified fee structures and accreditations.
              </p>
            </div>

            {/* Quick Geo-Location Navigation Hub Grid */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200/80 mb-12 shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-3">
                <MapPin size={15} />
                <span>Geotargeted City &amp; Regional Hubs (2027 Edition)</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Explore Online Degrees by Your City / Region
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Delhi NCR Hub', slug: 'online-degree-delhi-ncr', desc: 'Noida, Gurgaon, Delhi' },
                  { name: 'Bangalore Hub', slug: 'online-degree-bangalore', desc: 'Bangalore, Karnataka' },
                  { name: 'Mumbai & Pune Hub', slug: 'online-degree-mumbai-pune', desc: 'Mumbai, Pune, MH' },
                  { name: 'Hyderabad & AP Hub', slug: 'online-degree-hyderabad', desc: 'Hyderabad, Vizag' },
                  { name: 'Jaipur & Rajasthan', slug: 'online-degree-jaipur-rajasthan', desc: 'Jaipur, Rajasthan' },
                  { name: 'Chandigarh & Punjab', slug: 'online-degree-chandigarh-punjab', desc: 'Chandigarh, Punjab' },
                  { name: 'South India Hub', slug: 'online-degree-south-india', desc: 'Chennai, TN, AP' },
                  { name: 'East & Central India', slug: 'online-degree-kolkata-east-india', desc: 'Kolkata, Sikkim, Raipur' }
                ].map((geo) => (
                  <Link
                    key={geo.slug}
                    href={`/online-degree-certification/${geo.slug}`}
                    className="bg-white hover:bg-blue-600 border border-slate-200/90 hover:border-blue-600 p-4 rounded-xl transition-all shadow-xs flex flex-col group"
                  >
                    <span className="font-bold text-slate-900 group-hover:text-white text-xs sm:text-sm flex items-center justify-between mb-1">
                      {geo.name}
                      <span className="text-blue-500 group-hover:text-white font-bold">→</span>
                    </span>
                    <span className="text-[11px] text-slate-500 group-hover:text-blue-100 font-medium">
                      {geo.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              {REGIONAL_HUBS.map((hub) => (
                <div key={hub.region} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Building size={20} className="text-blue-600" /> {hub.region}
                      </h3>
                      <p className="text-xs font-semibold text-blue-700 mt-1 uppercase tracking-wider">
                        {hub.cities}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 max-w-md font-normal">
                      {hub.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hub.colleges.map((col) => (
                      <div key={col.name} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200/60">
                              {col.grade}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                              {col.badge}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {col.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-normal flex items-center gap-1 mb-3">
                            <MapPin size={12} className="text-blue-500 shrink-0" />
                            {col.loc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Est. Fee</span>
                            <span className="text-xs font-bold text-emerald-700">{col.fee}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/online-degree-certification/${col.univSlug}`}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STREAM-WISE DEGREE GUIDES (Semantic Topic Silos) ── */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 bg-white px-3.5 py-1 rounded-full border border-slate-200/80">
                <Layers size={13} /> Program Streams &amp; Specializations
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Explore Popular Online Degrees by Domain
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Choose from undergraduate (UG) and postgraduate (PG) online degrees with industry-tailored curriculum, virtual projects, and global career scopes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Management Hub */}
              <div className="bg-white rounded-2xl p-7 md:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mb-5">
                    💼
                  </div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Management Hub</span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-1 mb-3">
                    Online MBA &amp; PGDM
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    India&apos;s #1 career accelerator for working professionals. Choose from Marketing, Finance, HR, Business Analytics, Operations, and FinTech specializations.
                  </p>
                  <div className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Duration: 2 Years (4 Semesters)</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Fees: ₹62,200 – ₹2,20,000 total</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Top Picks: Amity, LPU, Jain, NMIMS, Jaipuria</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link href="/online-degree-certification/online-mba" className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    Explore Online MBA Hub <ArrowRight size={13} />
                  </Link>
                  <Link href="/online-degree-certification/online-pgdm" className="text-xs font-semibold text-slate-500 hover:text-blue-600">
                    PGDM Hub →
                  </Link>
                </div>
              </div>

              {/* Card 2: Tech & IT Hub */}
              <div className="bg-white rounded-2xl p-7 md:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-5">
                    💻
                  </div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">IT &amp; Computer Science</span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-1 mb-3">
                    Online MCA &amp; BCA
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    Build high-paying software engineering credentials with tracks in Artificial Intelligence, Cloud Computing, Cyber Security, Data Science, and Full Stack Development.
                  </p>
                  <div className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Duration: 2 Yrs (MCA) / 3 Yrs (BCA)</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Fees: ₹80,000 – ₹1,80,000 total</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Top Picks: Jain, LPU, Chandigarh Univ, SRM</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link href="/online-degree-certification/online-mca" className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    Explore Online MCA <ArrowRight size={13} />
                  </Link>
                  <Link href="/online-degree-certification/online-bca" className="text-xs font-semibold text-slate-500 hover:text-blue-600">
                    BCA Hub →
                  </Link>
                </div>
              </div>

              {/* Card 3: Commerce & Humanities Hub */}
              <div className="bg-white rounded-2xl p-7 md:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xl mb-5">
                    📚
                  </div>
                  <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Arts &amp; Commerce</span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-1 mb-3">
                    Online MA &amp; B.Com / M.Com
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    Ideal for UPSC civil services preparation, CA/CS aspirants, educators, and commerce professionals seeking budget-friendly accredited postgraduate degrees.
                  </p>
                  <div className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Duration: 2 Yrs (MA/M.Com) / 3 Yrs (B.Com)</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Fees: Starting from ₹20,000 total</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Top Picks: JMI, LPU, Chandigarh Univ, VGU</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link href="/online-degree-certification/online-ma-english" className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                    MA English Guide <ArrowRight size={13} />
                  </Link>
                  <Link href="/online-degree-certification/online-bcom" className="text-xs font-semibold text-slate-500 hover:text-blue-600">
                    B.Com Hub →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── INTERACTIVE CLIENT FILTERING COMPONENT ── */}
        <div className="border-t border-slate-200">
          <OnlineDegreeClient />
        </div>

        {/* ── STATIC COMPARISON MATRIX TABLE (SEO POWERHOUSE) ── */}
        <section className="bg-white py-16 md:py-24 border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">Detailed Fee &amp; Accreditation Matrix</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Top UGC Approved Online Universities ROI Matrix (2027)
              </h2>
              <p className="text-slate-600 font-normal text-sm md:text-base">
                A verified breakdown of fee structures, specializations, NAAC ratings, and direct university comparison links.
              </p>
            </div>
            
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#0A192F] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">University Name</th>
                    <th className="px-6 py-4 text-center">NAAC Rating</th>
                    <th className="px-6 py-4">Est. Total Fees</th>
                    <th className="px-6 py-4">Key Programs</th>
                    <th className="px-6 py-4">Approvals</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700 text-sm">
                  {[
                    { name: 'Amity University Online', grade: 'A+ Rated', fee: '₹1.99 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Com, MA', approvals: 'UGC-DEB, WES, AICTE', slug: 'amity-university-online-mba-review-2026', univSlug: 'amity-university-online' },
                    { name: 'Jain University Online', grade: 'A++ Rated', fee: '₹1.96 Lakhs', programs: 'MBA, BBA, MCA, BCA, MA, M.Com', approvals: 'UGC-DEB, WES, AICTE', slug: 'jain-university-online-mba-review-2026', univSlug: 'jain-university-online' },
                    { name: 'LPU Online', grade: 'A++ Rated', fee: '₹1.61 Lakhs', programs: 'MBA, BBA, MCA, BCA, M.Sc, MA', approvals: 'UGC-DEB, AICTE, AIU', slug: 'lovely-professional-university-lpu-online-mba-review-2026', univSlug: 'lovely-professional-university-lpu-online' },
                    { name: 'Chandigarh University Online', grade: 'A+ Rated', fee: '₹1.65 Lakhs', programs: 'MBA, BBA, MCA, BCA, MA, M.Com', approvals: 'UGC-DEB, QS Ranked', slug: 'chandigarh-university-online-mba-review-2026', univSlug: 'chandigarh-university-online' },
                    { name: 'Manipal University Jaipur Online', grade: 'A+ Rated', fee: '₹1.75 Lakhs', programs: 'MBA, BBA, MCA, BCA, MA, M.Com', approvals: 'UGC-DEB, WES, AICTE', slug: 'manipal-university-jaipur-online-mba-review-2026', univSlug: 'manipal-university-jaipur-online' },
                    { name: 'NMIMS Online', grade: 'A+ Rated', fee: '₹2.00 Lakhs', programs: 'MBA, BBA, B.Com, Diploma', approvals: 'UGC-DEB, AICTE', slug: 'nmims-online-mba-review-2026', univSlug: 'nmims-online' },
                    { name: 'D.Y. Patil University Online (Pune)', grade: 'A++ Rated', fee: '₹1.89 Lakhs', programs: 'MBA, BBA, MCA, BCA, B.Sc, MA', approvals: 'UGC-DEB, WES, AICTE', slug: 'd-y-patil-university-pune-online-mba-review-2026', univSlug: 'd-y-patil-university-online-pune' },
                    { name: 'SASTRA University Online', grade: 'A++ Rated', fee: '₹2.20 Lakhs', programs: 'MBA, MCA, M.Com, B.Com', approvals: 'UGC-DEB, NIRF Top 30', slug: 'sastra-university-online-mba-review-2026', univSlug: 'sastra-university-online' },
                    { name: 'Jaipuria Online PGDM', grade: 'NAAC A', fee: '₹1.40 Lakhs', programs: 'PGDM (MBA Equivalent)', approvals: 'AICTE, AIU, NBA', slug: 'jaipuria-institute-of-management-online-pgdm-review-2026', univSlug: 'jaipuria-institute-of-management-online' },
                    { name: 'Jamia Millia Islamia Online', grade: 'A++ Rated', fee: '₹20,000', programs: 'MA, BBA, B.Com, M.Com, BA', approvals: 'UGC-DEB, NIRF #3', slug: '', univSlug: 'jamia-millia-islamia-online' },
                    { name: 'Andhra University Online', grade: 'A Rated', fee: '₹62,200', programs: 'MBA, MCA, MA, B.Com, BA', approvals: 'UGC-DEB, State Govt', slug: 'andhra-university-online-mba-review-2026', univSlug: 'andhra-university-online' },
                    { name: 'Uttaranchal University Online', grade: 'A+ Rated', fee: '₹98,000', programs: 'MBA, BBA, MCA, BCA, BA, MA', approvals: 'UGC-DEB, AICTE', slug: 'uttaranchal-university-online-mba-review-2026', univSlug: 'uttaranchal-university-online' },
                  ].map((univ, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <Link href={`/online-degree-certification/${univ.univSlug}`} className="hover:text-blue-600 hover:underline">
                          {univ.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/60">
                          {univ.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-700">{univ.fee}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{univ.programs}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{univ.approvals}</td>
                      <td className="px-6 py-4 text-center">
                        {univ.slug ? (
                          <Link href={`/blog/${univ.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60 transition-colors">
                            <BookOpen size={12} /> Review
                          </Link>
                        ) : (
                          <Link href={`/online-degree-certification/${univ.univSlug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:underline">
                            Details
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── UGC VALIDITY & REGULATIONS INFO SECTION ── */}
        <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 inline-block bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">Regulatory Compliance &amp; Legal Framework</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Are Online Degrees Legally Accepted in India &amp; Globally?
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Complete legal breakdown of UGC Gazette Notification 2020, UPSC Civil Services eligibility, and WES North American equivalence.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="bg-white border-l-4 border-blue-600 p-7 md:p-8 rounded-2xl shadow-sm border-t border-r border-b border-slate-200/80">
                <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                  <ShieldCheck size={22} className="text-blue-600" />
                  UGC Regulations 2020: Statutory Clause on Degree Equivalence
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 font-normal">
                  As per <strong>Regulation 22 of the University Grants Commission (Open and Distance Learning Programmes and Online Programmes) Regulations, 2020</strong> published in the Gazette of India:
                </p>
                <blockquote className="bg-blue-50/70 border-l-4 border-blue-500 p-4 rounded-r-xl italic text-xs md:text-sm font-semibold text-slate-800 mb-3">
                  &ldquo;Degrees at Undergraduate and Postgraduate levels awarded through Open and Distance Learning mode and/or Online mode by Higher Educational Institutions, shall be treated as equivalent to corresponding degrees awarded through the conventional physical classroom mode.&rdquo;
                </blockquote>
                <p className="text-xs text-slate-500 font-medium">
                  Source: University Grants Commission Notification F.No. 1-4/2018 (DEB-I), The Gazette of India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🏛️</div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">Government &amp; PSU Jobs</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-500 font-normal">
                    Eligible for UPSC (IAS/IPS), SSC CGL, Bank PO (SBI/IBPS), Railways (RRB), Defence, and state PSC recruitments. UGC-DEB degrees fulfill standard educational criteria.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🌐</div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">WES Approval &amp; Study Abroad</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-500 font-normal">
                    World Education Services (WES) evaluates credentials from Amity, LPU, Jain, and Manipal as equivalent to Canadian and US university degrees for Express Entry PR and MS admissions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">💼</div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">Corporate MNC Hiring</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-500 font-normal">
                    Top corporate employers (TCS, Infosys, Deloitte, Accenture, Amazon, HDFC Bank) prioritize verified skills, domain knowledge, and recognized accredited qualifications.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STEP-BY-STEP ADMISSION ROADMAP ── */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 inline-block bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">Step-By-Step Framework</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                How to Choose &amp; Apply for an Online Degree (2027)
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Follow this 5-stage roadmap to safeguard your investment and ensure maximum career ROI.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Verify UGC-DEB Approval on the Official Portal', desc: 'Always check the university’s active DEB approval status for the current academic year on deb.ugc.ac.in. This ensures 100% degree validity.' },
                { step: '02', title: 'Prioritize NAAC A++ / A+ and NIRF Ranked Universities', desc: 'Higher NAAC grades (A++, A+) and NIRF rank rankings correlate directly with superior curriculum rigor, learning LMS technology, and employer preference.' },
                { step: '03', title: 'Align Specialization with Industry Demand', desc: 'Pick in-demand specializations: Business Analytics, FinTech, AI, Data Science, or Digital Marketing. Verify dual-specialization options.' },
                { step: '04', title: 'Compare Total Fees vs. Zero-Cost EMI Plans', desc: 'Evaluate complete 2-year costs (tuition + LMS + exam fees). Most approved universities offer zero-interest EMI plans starting from ₹4,000/month.' },
                { step: '05', title: 'Verify Global Recognition (WES & AIU Status)', desc: 'If planning to work or migrate to Canada, USA, UK, or UAE, confirm WES accreditation and AIU membership before finalizing your admission.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 items-start bg-slate-50 rounded-2xl p-6 md:p-7 border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all">
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-blue-600 shrink-0 leading-none">{item.step}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGH-TRAFFIC HEAD-TO-HEAD COMPARISON HUBS ── */}
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 inline-block bg-white px-3 py-1 rounded-full border border-slate-200/80">Side-by-Side Analysis</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Popular Online University Comparisons
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-normal">
                Compare fees, NAAC grades, placement assistance, and LMS features between India’s top online universities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Amity Online vs Jain Online', slug: 'amity-vs-jain', tag: 'Top Comparison' },
                { title: 'LPU Online vs Chandigarh Univ', slug: 'lpu-vs-chandigarh', tag: 'Punjab Titans' },
                { title: 'Amity Online vs LPU Online', slug: 'amity-vs-lpu', tag: 'Brand vs LMS' },
                { title: 'Jain Online vs LPU Online', slug: 'jain-vs-lpu', tag: 'NAAC A++ Match' },
                { title: 'NMIMS Online vs Amity Online', slug: 'nmims-vs-amity', tag: 'Management Focus' },
                { title: 'Manipal Online vs Amity Online', slug: 'manipal-vs-amity', tag: 'Top Brand ROI' },
                { title: 'SASTRA Online vs Amrita Online', slug: 'sastra-vs-amrita', tag: 'South India Hub' },
                { title: 'SCDL Symbiosis vs NMIMS Online', slug: 'scdl-vs-nmims', tag: 'Executive MBA' },
                { title: 'DY Patil Pune vs Jain Online', slug: 'dy-patil-vs-jain', tag: 'A++ Battle' },
              ].map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/online-degree-certification/${comp.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {comp.tag}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base mt-2.5 mb-2 group-hover:text-blue-600 transition-colors">
                      {comp.title}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-3 group-hover:underline">
                    View Full Matrix →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTHOR E-E-A-T TRUST BLOCK ── */}
        <section className="bg-white py-14 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="w-18 h-18 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md shadow-blue-500/20">
                MJ
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-lg text-slate-900">Counselling &amp; Advisory by Mohit Jain</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Verified Expert
                  </span>
                </div>
                <p className="text-xs font-semibold text-blue-700">
                  IIM Bangalore &amp; FMS Delhi Certified in Digital Marketing · 6+ Years Admissions Advisory · 5,000+ Students Mentored
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Confused between multiple online universities? Get honest, unbiased profile evaluation, fee negotiation guidance, and scholarship assistance directly with Mohit Jain.
                </p>
                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3">
                  <a href="tel:+919560020771" className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 shadow-xs">
                    <Phone size={12} className="text-blue-600" /> +91 95600 20771
                  </a>
                  <Link href="/about" className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline py-1.5 flex items-center gap-1">
                    About Mohit Jain →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPREHENSIVE FAQ SECTION ── */}
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 inline-block bg-white px-3 py-1 rounded-full border border-slate-200/80">Answers to High-Search Questions</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="text-slate-600 font-normal text-sm md:text-base">
                Everything you need to know about UGC approvals, fees, exam modes, and career outcomes.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:border-blue-200"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-bold text-slate-900 text-sm md:text-base hover:text-blue-600 transition-colors">
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="text-blue-500 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 font-normal">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] py-20 md:py-28 relative overflow-hidden text-center text-white px-6 border-t border-blue-900/40">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/15 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-block bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 border border-white/15 backdrop-blur-md">
              100% Free Profile Assessment
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">
              Ready to Accelerate Your Career with an Online Degree?
            </h2>
            <p className="text-blue-100/80 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal">
              Get an unbiased 1-on-1 profile evaluation call with Mohit Jain and find the exact right university based on your budget, specializations, and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20free%20counselling%20for%20an%20online%20degree"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Get Free Counselling on WhatsApp →
              </a>
              <a
                href="tel:+919560020771"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base px-8 py-4 rounded-xl backdrop-blur-md transition-all"
              >
                Call +91 95600 20771
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
