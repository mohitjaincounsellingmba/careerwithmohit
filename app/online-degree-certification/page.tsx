import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BadgeCheck, Phone, ChevronDown, MapPin, Award, ShieldCheck, 
  GraduationCap, BookOpen, Sparkles, CheckCircle2, Building, 
  TrendingUp, Globe, FileText, Layers, ExternalLink, ArrowRight,
  HelpCircle, UserCheck, Flame, Video, MessageCircle, Zap
} from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import OnlineDegreeLeadForm from '@/components/OnlineDegreeLeadForm';
import { College4SureScrollProgress } from '@/components/College4SureScrollProgress';
import { College4SureTicker } from '@/components/College4SureTicker';
import { College4SureSeoLinks } from '@/components/College4SureSeoLinks';
import { COLLEGES } from '@/data/onlineColleges';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/online-degree-certification/';
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
    <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
      {/* Top Multi-Color Gradient Scroll Progress & Back to Top */}
      <College4SureScrollProgress />

      {/* 1. Live Marquee Ticker Bar */}
      <College4SureTicker />

      {/* ── HERO SECTION (Light Theme matching Home Page) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/90 text-[#061124] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
        {/* Soft Ambient Glowing Halos */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-[-100px] w-80 h-80 bg-[#FF007A]/8 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-100px] left-[-80px] w-80 h-80 bg-[#10B981]/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Cyber Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,17,36,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,17,36,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#061124]/10 shadow-[0_4px_20px_rgba(6,17,36,0.06)] font-mono text-xs font-extrabold uppercase tracking-wider mb-6 text-[#10B981] backdrop-blur-md">
            <span className="dotlive" />
            <span>40+ UGC-DEB Approved Universities</span>
            <span className="text-[#061124]/30">•</span>
            <span className="text-[#2563EB] font-black">2027 Official Directory</span>
          </div>
          
          {/* Main Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[62px] font-black text-[#061124] leading-[1.08] tracking-tight mb-6">
            Top Online Degrees in India<br />
            <span className="inline-block relative min-h-[1.35em] mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#0EA5E9]">
              UGC Approved Universities &amp; Fees (2027)
            </span>
          </h1>
          
          {/* Lede Paragraph */}
          <p className="text-[#475569] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            Compare 40+ UGC-DEB approved online universities in India side-by-side. Check fee schedules (from ₹20,000), NAAC A++ accreditations, WES approval status, and get 100% free personalized admission counselling.
          </p>

          {/* Quick Links / Program Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto relative z-20 mb-10">
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
                className="bg-white hover:bg-[#2563EB] text-[#061124] hover:text-white border border-[#061124]/10 hover:border-[#2563EB] rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all shadow-[0_4px_14px_rgba(6,17,36,0.04)] hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 group"
              >
                <span>{link.name}</span>
                <span className="font-mono text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#F1F5F9] group-hover:bg-white/20 text-[#475569] group-hover:text-white transition-colors">
                  {link.tag}
                </span>
              </Link>
            ))}
          </div>

          {/* Key Metric Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
            <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 sm:p-5 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:border-[#2563EB]/40 hover:-translate-y-1.5 transition-all text-center group">
              <b className="block font-display font-black text-2xl sm:text-3xl text-[#2563EB] leading-none group-hover:scale-105 transition-transform">
                {COLLEGES.length}+
              </b>
              <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#061124] mt-1.5">
                Approved Univs
              </span>
              <span className="text-[#475569] text-[11px] font-medium mt-0.5 block">UGC-DEB Recognized</span>
            </div>

            <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 sm:p-5 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:border-[#10B981]/40 hover:-translate-y-1.5 transition-all text-center group">
              <b className="block font-display font-black text-2xl sm:text-3xl text-[#10B981] leading-none group-hover:scale-105 transition-transform">
                ₹20,000
              </b>
              <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#061124] mt-1.5">
                Starting Total Fee
              </span>
              <span className="text-[#475569] text-[11px] font-medium mt-0.5 block">Central &amp; State Univs</span>
            </div>

            <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 sm:p-5 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:border-[#FF007A]/40 hover:-translate-y-1.5 transition-all text-center group">
              <b className="block font-display font-black text-2xl sm:text-3xl text-[#FF007A] leading-none group-hover:scale-105 transition-transform">
                100%
              </b>
              <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#061124] mt-1.5">
                Legal Equivalence
              </span>
              <span className="text-[#475569] text-[11px] font-medium mt-0.5 block">UGC Regulations 2020</span>
            </div>

            <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-4 sm:p-5 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:border-[#F59E0B]/40 hover:-translate-y-1.5 transition-all text-center group">
              <b className="block font-display font-black text-2xl sm:text-3xl text-[#F59E0B] leading-none group-hover:scale-105 transition-transform">
                15+
              </b>
              <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#061124] mt-1.5">
                WES Approved
              </span>
              <span className="text-[#475569] text-[11px] font-medium mt-0.5 block">Valid for Canada &amp; US</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA CALL & ADMISSIONS STRIP (Light Theme) ── */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50 py-3.5 text-center border-b border-[#061124]/10 relative z-20">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-2 font-mono font-extrabold text-xs sm:text-sm text-[#061124] hover:text-[#2563EB] transition-colors"
          >
            <Phone size={14} className="text-[#2563EB]" />
            <span>Admissions Helpline: +91 95600 20771</span>
          </a>
          <span className="hidden sm:inline text-[#061124]/20">•</span>
          <a
            href="https://wa.me/919560020771?text=Hi%2C%20I%20need%20free%20guidance%20for%20online%20degree%20admission"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-1.5 rounded-full font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm hover:-translate-y-0.5"
          >
            <span>Chat on WhatsApp →</span>
          </a>
        </div>
      </div>

      {/* ── GEO & AI SEARCH FAST FACTS (Generative Engine Optimization) ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div id="ai-fast-facts" className="rounded-[28px] sm:rounded-[36px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-7 sm:p-10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)]">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              AI Fast Facts &amp; Direct Answer Summary (2027 Edition)
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061124] mb-3 tracking-tight">
              Key Facts: UGC-DEB Approved Online Degrees in India
            </h2>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-3xl">
              If you are researching online degrees in India, here is the verified regulatory, academic, and financial baseline certified by UGC-DEB and national education councils:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-5 sm:p-6 shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong className="font-display font-bold text-base text-[#061124] block mb-1">
                    100% Legal Equivalence (UGC Regs 2020)
                  </strong>
                  <span className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    Online degrees from UGC-DEB approved universities hold identical legal status to physical degrees for government recruitments (UPSC, Bank PO, SSC) and private MNC hiring.
                  </span>
                </div>
              </div>

              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-5 sm:p-6 shadow-sm hover:border-[#10B981]/40 hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong className="font-display font-bold text-base text-[#061124] block mb-1">
                    Flexible Tuition Fees (₹20,000 – ₹2.2L)
                  </strong>
                  <span className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    Central/state universities start from ₹20,000 for MA/B.Com, while top-tier private NAAC A++ universities range between ₹1.2L to ₹2.0L with monthly EMI options.
                  </span>
                </div>
              </div>

              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-5 sm:p-6 shadow-sm hover:border-[#8B5CF6]/40 hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong className="font-display font-bold text-base text-[#061124] block mb-1">
                    WES Approved for Global Immigration
                  </strong>
                  <span className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    Top universities (Amity, LPU, Jain, Manipal, DY Patil) hold WES evaluation recognition, qualifying you for Canada PR Express Entry points and USA/UK jobs.
                  </span>
                </div>
              </div>

              <div className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-5 sm:p-6 shadow-sm hover:border-[#0EA5E9]/40 hover:shadow-md transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0EA5E9] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong className="font-display font-bold text-base text-[#061124] block mb-1">
                    100% Digital LMS + Home Proctored Exams
                  </strong>
                  <span className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    Attend live weekend sessions, watch recorded lectures on mobile/desktop, and take semester examinations from home via secure AI-proctored web browsers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM SECTION ── */}
      <section className="py-10 bg-[#F8FAFC] border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <OnlineDegreeLeadForm />
        </div>
      </section>

      {/* ── GEOTARGETED REGIONAL DIRECTORY (GEO IN INDIA) ── */}
      <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
                Regional &amp; State-Wise Directory
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
                UGC Approved Online Universities by Region
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl">
                Search accredited online degree providers across key metropolitan clusters in North, South, West, and Central India with verified fee structures and accreditations.
              </p>
            </div>
            <Link
              href="#degree-explorer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#2563EB] text-[#061124] hover:text-white border border-[#061124]/15 font-bold text-sm transition-all shadow-sm group self-start sm:self-auto"
            >
              <span>Explore All Universities</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Quick Geo-Location Navigation Hub Grid */}
          <div className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)] mb-12">
            <div className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-wider text-[#2563EB] mb-2">
              <MapPin size={14} />
              <span>Geotargeted City &amp; Regional Hubs (2027 Edition)</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#061124] mb-5">
              Explore Online Degrees by Your City / Region
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {[
                { name: 'Delhi NCR Hub', slug: 'online-degree-delhi-ncr', desc: 'Noida · Gurgaon · Delhi' },
                { name: 'Bangalore Hub', slug: 'online-degree-bangalore', desc: 'Bangalore · Karnataka' },
                { name: 'Mumbai & Pune Hub', slug: 'online-degree-mumbai-pune', desc: 'Mumbai · Pune · MH' },
                { name: 'Hyderabad & AP Hub', slug: 'online-degree-hyderabad', desc: 'Hyderabad · Vizag' },
                { name: 'Jaipur & Rajasthan', slug: 'online-degree-jaipur-rajasthan', desc: 'Jaipur · Rajasthan' },
                { name: 'Chandigarh & Punjab', slug: 'online-degree-chandigarh-punjab', desc: 'Chandigarh · Punjab' },
                { name: 'South India Hub', slug: 'online-degree-south-india', desc: 'Chennai · TN · AP' },
                { name: 'East & Central India', slug: 'online-degree-kolkata-east-india', desc: 'Kolkata · Sikkim · Raipur' }
              ].map((geo) => (
                <Link
                  key={geo.slug}
                  href={`/online-degree-certification/${geo.slug}`}
                  className="bg-[#F8FAFC] hover:bg-[#2563EB] border border-[#061124]/10 hover:border-[#2563EB] p-4 rounded-[20px] transition-all shadow-xs flex flex-col justify-between group"
                >
                  <span className="font-display font-extrabold text-[#061124] group-hover:text-white text-xs sm:text-sm flex items-center justify-between mb-1">
                    {geo.name}
                    <span className="text-[#2563EB] group-hover:text-white font-bold transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#475569] group-hover:text-white/90 font-medium">
                    {geo.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 4 Regional Hubs */}
          <div className="space-y-8">
            {REGIONAL_HUBS.map((hub) => (
              <div key={hub.region} className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#061124]/10">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-[#061124] flex items-center gap-2.5">
                      <Building size={22} className="text-[#2563EB]" />
                      <span>{hub.region}</span>
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#2563EB] mt-1 uppercase tracking-wider">
                      {hub.cities}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] max-w-md font-normal leading-relaxed">
                    {hub.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hub.colleges.map((col) => (
                    <div key={col.name} className="rounded-[20px] bg-[#F8FAFC] p-5 border border-[#061124]/8 shadow-xs flex flex-col justify-between hover:bg-white hover:border-[#2563EB]/40 hover:shadow-md hover:-translate-y-1 transition-all group">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded border border-blue-200/60">
                            {col.grade}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                            {col.badge}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-[#061124] text-sm group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-1 leading-snug min-h-[38px]">
                          {col.name}
                        </h4>
                        <p className="font-mono text-[11px] text-[#475569] font-normal flex items-center gap-1 mb-3">
                          <MapPin size={12} className="text-[#2563EB] shrink-0" />
                          <span>{col.loc}</span>
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#061124]/8 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[9px] uppercase font-bold text-[#475569] block">Est. Fee</span>
                          <span className="font-display font-black text-xs text-[#10B981]">{col.fee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/online-degree-certification/${col.univSlug}`}
                            className="font-mono text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5"
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
      <section className="py-16 sm:py-24 bg-white border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
                Program Streams &amp; Specializations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
                Explore Popular Online Degrees by Domain
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl">
                Choose from undergraduate (UG) and postgraduate (PG) online degrees with industry-tailored curriculum, virtual projects, and global career scopes.
              </p>
            </div>
            <Link
              href="/online-degree-certification/online-mba"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold text-sm transition-all shadow-[0_12px_26px_-12px_rgba(37,99,235,0.85)] hover:-translate-y-0.5 self-start sm:self-auto"
            >
              <span>Explore Online MBA Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* Card 1: Management Hub */}
            <div className="group rounded-[28px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-7 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)] hover:bg-white hover:shadow-[0_34px_70px_-30px_rgba(6,17,36,0.22)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left bg-[#F59E0B]" />
              <div>
                <div className="w-12 h-12 rounded-[16px] bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-2xl mb-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  💼
                </div>
                <span className="font-mono text-xs font-extrabold text-[#F59E0B] uppercase tracking-wider">Management Hub</span>
                <h3 className="font-display text-2xl font-extrabold text-[#061124] mt-1 mb-3">
                  Online MBA &amp; PGDM
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 font-normal">
                  India&apos;s #1 career accelerator for working professionals. Choose from Marketing, Finance, HR, Business Analytics, Operations, and FinTech specializations.
                </p>
                <div className="space-y-2 text-xs font-semibold text-[#061124] mb-6">
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Duration: 2 Years (4 Semesters)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Fees: ₹62,200 – ₹2,20,000 total</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Top Picks: Amity, LPU, Jain, NMIMS, Jaipuria</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#061124]/8 flex items-center justify-between">
                <Link href="/online-degree-certification/online-mba" className="font-mono text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1">
                  Explore MBA Hub <ArrowRight size={13} />
                </Link>
                <Link href="/online-degree-certification/online-pgdm" className="font-mono text-xs font-bold text-[#475569] hover:text-[#2563EB]">
                  PGDM Hub →
                </Link>
              </div>
            </div>

            {/* Card 2: Tech & IT Hub */}
            <div className="group rounded-[28px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-7 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)] hover:bg-white hover:shadow-[0_34px_70px_-30px_rgba(6,17,36,0.22)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left bg-[#2563EB]" />
              <div>
                <div className="w-12 h-12 rounded-[16px] bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-2xl mb-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  💻
                </div>
                <span className="font-mono text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">IT &amp; Computer Science</span>
                <h3 className="font-display text-2xl font-extrabold text-[#061124] mt-1 mb-3">
                  Online MCA &amp; BCA
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 font-normal">
                  Build high-paying software engineering credentials with tracks in Artificial Intelligence, Cloud Computing, Cyber Security, Data Science, and Full Stack Development.
                </p>
                <div className="space-y-2 text-xs font-semibold text-[#061124] mb-6">
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Duration: 2 Yrs (MCA) / 3 Yrs (BCA)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Fees: ₹80,000 – ₹1,80,000 total</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Top Picks: Jain, LPU, Chandigarh Univ, SRM</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#061124]/8 flex items-center justify-between">
                <Link href="/online-degree-certification/online-mca" className="font-mono text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1">
                  Explore Online MCA <ArrowRight size={13} />
                </Link>
                <Link href="/online-degree-certification/online-bca" className="font-mono text-xs font-bold text-[#475569] hover:text-[#2563EB]">
                  BCA Hub →
                </Link>
              </div>
            </div>

            {/* Card 3: Commerce & Humanities Hub */}
            <div className="group rounded-[28px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-7 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)] hover:bg-white hover:shadow-[0_34px_70px_-30px_rgba(6,17,36,0.22)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left bg-[#10B981]" />
              <div>
                <div className="w-12 h-12 rounded-[16px] bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-2xl mb-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  📚
                </div>
                <span className="font-mono text-xs font-extrabold text-[#10B981] uppercase tracking-wider">Arts &amp; Commerce</span>
                <h3 className="font-display text-2xl font-extrabold text-[#061124] mt-1 mb-3">
                  Online MA &amp; B.Com / M.Com
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 font-normal">
                  Ideal for UPSC civil services preparation, CA/CS aspirants, educators, and commerce professionals seeking budget-friendly accredited postgraduate degrees.
                </p>
                <div className="space-y-2 text-xs font-semibold text-[#061124] mb-6">
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Duration: 2 Yrs (MA/M.Com) / 3 Yrs (B.Com)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Fees: Starting from ₹20,000 total</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Top Picks: JMI, LPU, Chandigarh Univ, VGU</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#061124]/8 flex items-center justify-between">
                <Link href="/online-degree-certification/online-ma-english" className="font-mono text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1">
                  MA English Guide <ArrowRight size={13} />
                </Link>
                <Link href="/online-degree-certification/online-bcom" className="font-mono text-xs font-bold text-[#475569] hover:text-[#2563EB]">
                  B.Com Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CLIENT FILTERING COMPONENT ── */}
      <div id="degree-explorer">
        <OnlineDegreeClient />
      </div>

      {/* ── STATIC COMPARISON MATRIX TABLE (SEO POWERHOUSE) ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Detailed Fee &amp; Accreditation Matrix
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Top UGC Approved Online Universities ROI Matrix (2027)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              A verified breakdown of fee structures, specializations, NAAC ratings, and direct university comparison links.
            </p>
          </div>
          
          <div className="overflow-hidden border-[1.5px] border-[#061124]/10 rounded-[28px] shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-[#F1F5F9] text-[#061124] font-mono text-xs uppercase tracking-wider font-extrabold border-b border-[#061124]/10">
                    <th className="px-6 py-4">University Name</th>
                    <th className="px-6 py-4 text-center">NAAC Rating</th>
                    <th className="px-6 py-4">Est. Total Fees</th>
                    <th className="px-6 py-4">Key Programs</th>
                    <th className="px-6 py-4">Approvals</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#061124]/8 font-medium text-[#061124] text-sm">
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
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 font-display font-extrabold text-[#061124]">
                        <Link href={`/online-degree-certification/${univ.univSlug}`} className="hover:text-[#2563EB] hover:underline">
                          {univ.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full text-xs font-bold border border-blue-200/60">
                          {univ.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-display font-black text-[#10B981]">{univ.fee}</td>
                      <td className="px-6 py-4 font-mono text-xs text-[#475569]">{univ.programs}</td>
                      <td className="px-6 py-4 font-mono text-xs font-bold text-[#061124]">{univ.approvals}</td>
                      <td className="px-6 py-4 text-center">
                        {univ.slug ? (
                          <Link href={`/blog/${univ.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:bg-[#2563EB] hover:text-white bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200/60 transition-colors">
                            <BookOpen size={12} /> Review
                          </Link>
                        ) : (
                          <Link href={`/online-degree-certification/${univ.univSlug}`} className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#475569] hover:text-[#2563EB] hover:underline">
                            Details →
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── UGC VALIDITY & REGULATIONS INFO SECTION ── */}
      <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Regulatory Compliance &amp; Legal Framework
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Are Online Degrees Legally Accepted in India &amp; Globally?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Complete legal breakdown of UGC Gazette Notification 2020, UPSC Civil Services eligibility, and WES North American equivalence.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 border-l-[6px] border-l-[#2563EB] p-7 sm:p-9 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)]">
              <h3 className="font-display font-extrabold text-[#061124] text-xl sm:text-2xl mb-3 flex items-center gap-2.5">
                <ShieldCheck size={24} className="text-[#2563EB]" />
                <span>UGC Regulations 2020: Statutory Clause on Degree Equivalence</span>
              </h3>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-4 font-normal">
                As per <strong>Regulation 22 of the University Grants Commission (Open and Distance Learning Programmes and Online Programmes) Regulations, 2020</strong> published in the Gazette of India:
              </p>
              <blockquote className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 rounded-r-2xl italic text-xs sm:text-sm font-semibold text-[#061124] mb-3 leading-relaxed">
                &ldquo;Degrees at Undergraduate and Postgraduate levels awarded through Open and Distance Learning mode and/or Online mode by Higher Educational Institutions, shall be treated as equivalent to corresponding degrees awarded through the conventional physical classroom mode.&rdquo;
              </blockquote>
              <p className="font-mono text-xs text-[#475569] font-medium">
                Source: University Grants Commission Notification F.No. 1-4/2018 (DEB-I), The Gazette of India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="rounded-[24px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🏛️</div>
                <h4 className="font-display font-extrabold text-[#061124] text-base sm:text-lg mb-2">Government &amp; PSU Jobs</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#475569] font-normal">
                  Eligible for UPSC (IAS/IPS), SSC CGL, Bank PO (SBI/IBPS), Railways (RRB), Defence, and state PSC recruitments. UGC-DEB degrees fulfill standard educational criteria.
                </p>
              </div>

              <div className="rounded-[24px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">🌐</div>
                <h4 className="font-display font-extrabold text-[#061124] text-base sm:text-lg mb-2">WES Approval &amp; Study Abroad</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#475569] font-normal">
                  World Education Services (WES) evaluates credentials from Amity, LPU, Jain, and Manipal as equivalent to Canadian and US university degrees for Express Entry PR and MS admissions.
                </p>
              </div>

              <div className="rounded-[24px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">💼</div>
                <h4 className="font-display font-extrabold text-[#061124] text-base sm:text-lg mb-2">Corporate MNC Hiring</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#475569] font-normal">
                  Top corporate employers (TCS, Infosys, Deloitte, Accenture, Amazon, HDFC Bank) prioritize verified skills, domain knowledge, and recognized accredited qualifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP ADMISSION ROADMAP ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Step-By-Step Framework
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              How to Choose &amp; Apply for an Online Degree (2027)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Follow this 5-stage roadmap to safeguard your investment and ensure maximum career ROI.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { step: '01', title: 'Verify UGC-DEB Approval on the Official Portal', desc: 'Always check the university’s active DEB approval status for the current academic year on deb.ugc.ac.in. This ensures 100% degree validity.' },
              { step: '02', title: 'Prioritize NAAC A++ / A+ and NIRF Ranked Universities', desc: 'Higher NAAC grades (A++, A+) and NIRF rank rankings correlate directly with superior curriculum rigor, learning LMS technology, and employer preference.' },
              { step: '03', title: 'Align Specialization with Industry Demand', desc: 'Pick in-demand specializations: Business Analytics, FinTech, AI, Data Science, or Digital Marketing. Verify dual-specialization options.' },
              { step: '04', title: 'Compare Total Fees vs. Zero-Cost EMI Plans', desc: 'Evaluate complete 2-year costs (tuition + LMS + exam fees). Most approved universities offer zero-interest EMI plans starting from ₹4,000/month.' },
              { step: '05', title: 'Verify Global Recognition (WES & AIU Status)', desc: 'If planning to work or migrate to Canada, USA, UK, or UAE, confirm WES accreditation and AIU membership before finalizing your admission.' },
            ].map((item) => (
              <div key={item.step} className="rounded-[24px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-xs hover:bg-white hover:border-[#2563EB]/40 hover:shadow-md transition-all flex gap-5 items-start">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#2563EB] shrink-0 leading-none">{item.step}</span>
                <div>
                  <h3 className="font-display font-bold text-[#061124] text-base sm:text-lg mb-1">{item.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGH-TRAFFIC HEAD-TO-HEAD COMPARISON HUBS ── */}
      <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-b border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Side-by-Side Analysis
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Popular Online University Comparisons
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Compare fees, NAAC grades, placement assistance, and LMS features between India’s top online universities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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
                className="rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 p-5 sm:p-6 shadow-sm hover:border-[#2563EB] hover:shadow-lg hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {comp.tag}
                  </span>
                  <h3 className="font-display font-extrabold text-[#061124] text-sm sm:text-base mt-3 mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {comp.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-[#2563EB] flex items-center gap-1 mt-3 group-hover:underline">
                  View Full Matrix →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR E-E-A-T TRUST BLOCK ── */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#061124]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#F8FAFC] border-[1.5px] border-[#061124]/10 p-7 sm:p-10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] flex flex-col sm:flex-row items-center gap-7">
            <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-lg shadow-blue-500/25">
              MJ
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h3 className="font-display font-extrabold text-xl text-[#061124]">Counselling &amp; Advisory by Mohit Jain</h3>
                <span className="bg-emerald-100 text-[#059669] text-[10px] font-mono font-extrabold uppercase px-3 py-0.5 rounded-full border border-emerald-200">
                  Verified Expert
                </span>
              </div>
              <p className="font-mono text-xs font-extrabold text-[#2563EB]">
                IIM Bangalore &amp; FMS Delhi Certified in Digital Marketing · 6+ Years Admissions Advisory · 5,000+ Students Mentored
              </p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                Confused between multiple online universities? Get honest, unbiased profile evaluation, fee negotiation guidance, and scholarship assistance directly with Mohit Jain.
              </p>
              <div className="pt-3 flex flex-wrap justify-center sm:justify-start gap-3">
                <a href="tel:+919560020771" className="font-mono text-xs font-bold text-[#061124] bg-white border border-[#061124]/15 px-4 py-2 rounded-full hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                  <Phone size={13} className="text-[#2563EB]" /> +91 95600 20771
                </a>
                <Link href="/about" className="font-mono text-xs font-bold text-[#2563EB] hover:underline py-2 flex items-center gap-1">
                  About Mohit Jain →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPREHENSIVE FAQ SECTION ── */}
      <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-b border-[#061124]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Answers to High-Search Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Everything you need to know about UGC approvals, fees, exam modes, and career outcomes.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group rounded-[22px] bg-white border-[1.5px] border-[#061124]/10 shadow-[0_10px_30px_-15px_rgba(6,17,36,0.06)] overflow-hidden transition-all hover:border-[#2563EB]/40"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display font-bold text-[#061124] text-sm sm:text-base hover:text-[#2563EB] transition-colors">
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="text-[#2563EB] shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#475569] text-sm leading-relaxed border-t border-[#061124]/6 pt-4 font-normal">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL COSMIC CTA BANNER (Matching Home Page) ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)] bg-gradient-to-br from-[#061124] via-[#1E40AF] to-[#0D9488]">
            {/* Dual Cosmic Rotating Dashed Rings */}
            <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full border-2 border-dashed border-white/20 animate-spinv-slow pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-72 h-72 rounded-full border-2 border-dashed border-white/20 animate-spinv-reverse pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-xs font-extrabold uppercase tracking-wider mb-5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Free 1-on-1 Profile Assessment
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Ready to accelerate your career with an online degree?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Get an unbiased 1-on-1 profile evaluation call with Mohit Jain (IIM Bangalore &amp; FMS Delhi certified) and find the exact right university based on your budget, specializations, and career goals.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20free%20counselling%20for%20an%20online%20degree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#061124]" />
                  <span>Get Free WhatsApp Guidance</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="tel:+919560020771"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-display font-bold text-sm sm:text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#00F0FF]" />
                  <span>Call +91 95600 20771</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO City Hubs & Tools Footer Ribbon ── */}
      <College4SureSeoLinks />

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
