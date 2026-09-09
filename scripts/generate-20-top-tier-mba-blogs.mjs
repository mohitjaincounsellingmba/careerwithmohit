import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');
const today = '2026-09-10';

const collegesData = [
  // 1. ISB Hyderabad / Mohali
  {
    slug: 'isb-hyderabad-mohali-pgp-review-2027-fees-placements-cutoff',
    name: 'Indian School of Business (ISB)',
    campus: 'Hyderabad & Mohali',
    location: 'Hyderabad, Telangana / Mohali, Punjab',
    state: 'Telangana',
    program: 'Post Graduate Programme in Management (PGP - 1 Year)',
    degreeType: 'Post Graduate Certificate (Global Equivalence to MBA)',
    accreditation: 'Triple Crown (AACSB, EQUIS, AMBA)',
    ranking: 'Top 30 Global MBA (Financial Times Global MBA Ranking)',
    intake: 'Approx. 850–900 Seats across Hyderabad & Mohali campuses',
    totalFees: '₹41.50 – ₹44.00 Lakhs (inclusive of tuition, accommodation & GST)',
    tuitionFee: '₹37.20 Lakhs + taxes',
    hostelFee: '₹4.20 – ₹5.00 Lakhs',
    avgPackage: '₹33.25 – ₹34.21 LPA',
    medianPackage: '₹32.00 LPA',
    highestPackage: '₹66.00 – ₹72.00 LPA',
    top25Avg: '₹44.50 LPA',
    cutoff: 'GMAT: 710+ (Classic) / 655+ (Focus Edition); GRE: 325+ (No CAT/XAT)',
    examsAccepted: ['GMAT', 'GRE'],
    workExpReq: 'Minimum 24 months of full-time work experience required for standard PGP (Freshers can apply via YLP/EEO for deferred entry)',
    recruiters: ['McKinsey & Company', 'Boston Consulting Group (BCG)', 'Bain & Company', 'Microsoft', 'Google', 'Amazon', 'Aditya Birla Group', 'Hindustan Unilever', 'Morgan Stanley'],
    sectors: 'Consulting (45%), Tech & Product (22%), BFSI (14%), Conglomerates & FMCG (12%), Operations (7%)',
    usp: 'Triple Crown accredited, 1-year compressed curriculum with international visiting faculty from Wharton, Kellogg, and London Business School.',
    pros: [
      '1-year intensive format reduces opportunity cost by 50% compared to traditional 2-year MBAs.',
      'Unrivaled consulting placement figures with MBB hiring in double digits.',
      'Triple Crown global accreditation offering stellar international career mobility.',
      'World-class 260-acre Hyderabad and 70-acre Mohali green residential campuses.'
    ],
    cons: [
      'Significant financial outlay (fees exceed ₹41+ Lakhs).',
      'Requires minimum 2 years work experience; freshers cannot enter the direct PGP class without deferred YLP/EEO pathways.',
      'Intense, fast-paced 1-year academic schedule leaving minimal personal downtime.'
    ],
    faqs: [
      {
        question: 'Does ISB accept CAT or XAT scores for PGP admission?',
        answer: 'No. ISB accepts only GMAT and GRE scores for admission into its flagship PGP. CAT, XAT, MAT, or CMAT scores are strictly not eligible.'
      },
      {
        question: 'What is the minimum work experience needed for ISB PGP?',
        answer: 'Candidates applying for the direct Post Graduate Programme (PGP) must have at least 24 months (2 years) of full-time work experience as of the program start date. Candidates in college or with under 2 years experience can apply via the Young Leaders Programme (YLP) or Early Entry Option (EEO).'
      },
      {
        question: 'What is the average placement package at ISB Hyderabad and Mohali?',
        answer: 'The average CTC at ISB stands between ₹33.25 LPA and ₹34.21 LPA, with the median salary at ₹32.00 LPA and the highest domestic offers exceeding ₹66.00 to ₹72.00 LPA.'
      },
      {
        question: 'What is the total fee for ISB PGP 2027–2028?',
        answer: 'The total fee for the 1-year residential PGP at ISB is approximately ₹41.50 to ₹44.00 Lakhs, covering tuition, shared/individual studio accommodation, academic courseware, and applicable GST.'
      }
    ]
  },

  // 2. SPJIMR Mumbai
  {
    slug: 'spjimr-mumbai-pgdm-review-2027-fees-placements-cutoff',
    name: 'S.P. Jain Institute of Management and Research (SPJIMR)',
    campus: 'Andheri West Campus',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    program: 'Post Graduate Diploma in Management (PGDM / PGDM-BM)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB, AMBA Accredited',
    ranking: 'Top 5 in India (NIRF Management #16, Top 3 Private B-School)',
    intake: '240 Flagship PGDM + 120 PGDM-BM Seats',
    totalFees: '₹22.50 – ₹24.00 Lakhs (2 Years Full-Time Residential)',
    tuitionFee: '₹19.80 Lakhs',
    hostelFee: '₹2.70 – ₹4.20 Lakhs',
    avgPackage: '₹33.00 LPA',
    medianPackage: '₹31.50 LPA',
    highestPackage: '₹77.80 – ₹81.00 LPA',
    top25Avg: '₹39.20 LPA',
    cutoff: 'CAT: 85%ile (Profile-based qualifying) / 96–98%ile (Merit-based); GMAT: 700+ / 645+ Focus Edition',
    examsAccepted: ['CAT', 'GMAT'],
    workExpReq: 'Both Freshers and Experienced candidates eligible (Specializations chosen at the time of application)',
    recruiters: ['McKinsey', 'Bain & Co', 'Boston Consulting Group', 'Hindustan Unilever', 'Procter & Gamble', 'TAS', 'Amazon', 'ITC', 'Morgan Stanley'],
    sectors: 'Consulting (38%), FMCG & FMCD (25%), BFSI (20%), Tech/E-commerce (12%), General Management (5%)',
    usp: 'Unique autumn internships, non-classroom experiential learning (DOCC rural immersion), and mandatory Global Fast Track (GFT) at international Ivy-league business schools.',
    pros: [
      'Top 5 B-School in India rivaling IIM A, B, and C in Consulting and FMCG marketing roles.',
      'Profile-based interview calls allow high-achieving candidates with 85+ CAT percentile to secure admission.',
      'Global Fast Track (GFT) provides 3 weeks of intensive study at top US/European partner universities.',
      'Central Mumbai location offering unmatched industry exposure and executive guest lectures.'
    ],
    cons: [
      'Specialization locked during application time (Finance, Marketing, Operations, Information Management), reducing flexibility to switch later.',
      'Compact suburban campus with limited open sports grounds compared to suburban IIMs.',
      'Extremely competitive profile screening with heavy weightage on past 10th/12th/Grad academics.'
    ],
    faqs: [
      {
        question: 'How does SPJIMR profile-based shortlisting work?',
        answer: 'SPJIMR shortlists candidates in two phases: Phase 1 is Profile-Based (evaluating 10th, 12th, graduation marks, work experience achievements, and extra-curriculars with a qualifying minimum CAT score of 85 percentile). Phase 2 is Score-Based for candidates who score 96–98+ percentile in CAT.'
      },
      {
        question: 'What is the fee structure for SPJIMR Mumbai PGDM 2027–2029?',
        answer: 'The total program fee for the 2-year PGDM at SPJIMR is approximately ₹22.50 to ₹24.00 Lakhs, which includes tuition, hostel accommodation, academic material, and the Global Fast Track international immersion.'
      },
      {
        question: 'What is the average and highest placement package at SPJIMR Mumbai?',
        answer: 'In recent audited placement seasons, SPJIMR recorded an average CTC of ₹33.00 LPA, a median CTC of ₹31.50 LPA, and a highest domestic package reaching ₹77.80 to ₹81.00 LPA.'
      },
      {
        question: 'Do freshers get selected at SPJIMR Mumbai?',
        answer: 'Yes, freshers with excellent academic credentials (90/90/80+ in 10th, 12th, and graduation) and notable extra-curricular leadership accomplishments regularly secure admission through the profile-based route.'
      }
    ]
  },

  // 3. MDI Gurgaon
  {
    slug: 'mdi-gurgaon-pgdm-review-2027-fees-placements-cutoff',
    name: 'Management Development Institute (MDI)',
    campus: 'Sukhrali Campus, Sector 17',
    location: 'Gurugram, Delhi NCR / Haryana',
    state: 'Delhi NCR',
    program: 'PGDM, PGDM-HRM, PGDM-IB, PGDM-Business Analytics',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB, AMBA, SAQS Accredited',
    ranking: 'NIRF Management Rank #11 (Top Tier-1 Private B-School in North India)',
    intake: 'Approx. 480 Seats across PGDM programs',
    totalFees: '₹25.00 – ₹26.50 Lakhs (PGDM Core); ₹30.00 Lakhs (PGDM-IB dual degree)',
    tuitionFee: '₹21.50 Lakhs',
    hostelFee: '₹3.50 – ₹5.00 Lakhs (Air-conditioned residential)',
    avgPackage: '₹25.50 – ₹26.70 LPA',
    medianPackage: '₹24.20 LPA',
    highestPackage: '₹60.00 – ₹63.50 LPA',
    top25Avg: '₹32.40 LPA',
    cutoff: 'CAT: 95.0 – 97.0 Percentile (GMAT for NRI/Foreign applicants only)',
    examsAccepted: ['CAT', 'GMAT'],
    workExpReq: 'Open to freshers and experienced candidates. Minimum 12 months required for PGDM-IB.',
    recruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey & Company', 'BCG', 'Bain & Co', 'ITC', 'Airtel', 'JPMorgan Chase'],
    sectors: 'Consulting & Strategy (36%), BFSI (24%), Tech & Analytics (18%), FMCG/FMCD (14%), E-Commerce/Logistics (8%)',
    usp: 'Located right in the corporate heart of Gurugram (Millennium City), lush 37-acre red-brick residential campus with prestigious triple international accreditations.',
    pros: [
      'Strategic location in Cyber City/Gurgaon corporate corridor ensures daily CXO interactions and top corporate live projects.',
      'Exceptional HRM program considered the #2 best HR program in India after XLRI Jamshedpur.',
      'High peer caliber with strict 95–97+ CAT cutoff without reservation quotas in general admissions.',
      'Lush 37-acre campus with golf greens, swimming pool, and modern air-conditioned hostels.'
    ],
    cons: [
      'High total program fee touching ₹26.5+ Lakhs for general PGDM.',
      'Strict sectional and overall CAT cutoffs with little room for candidates below 94 percentile.',
      'Intense academic rigour with frequent midnight project deliverables and continuous evaluations.'
    ],
    faqs: [
      {
        question: 'What is the CAT cutoff for MDI Gurgaon PGDM?',
        answer: 'The CAT cutoff for general PGDM at MDI Gurgaon typically hovers between 95.0 and 97.0 percentile, along with sectional cutoffs around 85 percentile in VARC, DILR, and QA.'
      },
      {
        question: 'What is the difference between MDI PGDM Core and PGDM-IB?',
        answer: 'PGDM Core is a 2-year program entirely hosted at the Gurgaon campus, while PGDM-IB (International Business) involves dual-degree collaboration where students spend one academic term at ESCP Europe (Paris/Berlin/Madrid/London) and earn both an MDI PGDM and an ESCP Master in Management.'
      },
      {
        question: 'What was the average package at MDI Gurgaon in 2025–2026?',
        answer: 'The combined average package at MDI Gurgaon stands at ₹25.50 to ₹26.70 LPA, with the median salary at ₹24.20 LPA and the top domestic package reaching ₹63.50 LPA.'
      },
      {
        question: 'Is MDI Gurgaon considered equivalent to older IIMs?',
        answer: 'Yes, MDI Gurgaon consistently ranks alongside IIM Indore, IIM Kozhikode, and SPJIMR in placement quality, recruiter trust, and corporate alumni footprint.'
      }
    ]
  },

  // 4. BITSoM Mumbai
  {
    slug: 'bitsom-mumbai-mba-review-2027-fees-placements-cutoff',
    name: 'BITS School of Management (BITSoM)',
    campus: 'Kalyan / Powai Campus',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    program: '2-Year Full-Time Residential MBA',
    degreeType: 'Master of Business Administration (Degree awarded by BITS Pilani - Institution of Eminence)',
    accreditation: 'UGC Recognized under BITS Pilani Institution of Eminence (IoE) status',
    ranking: 'Fastest Rising New-Age B-School in India (Backed by Aditya Birla Group)',
    intake: 'Approx. 150–160 Seats (Curated Boutique Cohort)',
    totalFees: '₹27.00 – ₹28.50 Lakhs (Complete 2-Year Residential MBA including hostel & meals)',
    tuitionFee: '₹24.00 Lakhs',
    hostelFee: '₹3.50 – ₹4.50 Lakhs (Fully inclusive living)',
    avgPackage: '₹23.50 – ₹24.00 LPA',
    medianPackage: '₹22.50 LPA',
    highestPackage: '₹50.00 LPA',
    top25Avg: '₹28.10 LPA',
    cutoff: 'CAT: 90–94+ %ile; GMAT: 680+ (Focus 635+); GRE: 318+ (Holistic evaluation)',
    examsAccepted: ['CAT', 'GMAT', 'GRE'],
    workExpReq: 'Freshers and working professionals eligible. Equal emphasis on academics, essays, and extra-curricular leadership.',
    recruiters: ['McKinsey & Company', 'Bain & Company', 'Kearney', 'Arthur D. Little', 'J.P. Morgan', 'Hindustan Unilever', 'Unilever', 'Aditya Birla Group', 'PwC'],
    sectors: 'Management Consulting (40%), BFSI (22%), FMCG & Retail (18%), Technology/Product (15%), Conglomerates (5%)',
    usp: 'Backed by Kumar Mangalam Birla and the Aditya Birla Group, curriculum designed with global academic thought leaders, and stellar global visiting professors from Wharton, Kellogg, NYU Stern, and LBS.',
    pros: [
      'Boutique batch size (150 students) ensures individual executive mentoring and superior recruiter attention.',
      'Stellar placements with top consulting firms (McKinsey, Bain, Kearney, ADL) participating in day-1 placements.',
      'Brand prestige of BITS Pilani (Institution of Eminence) combined with deep corporate patronage of the Aditya Birla Group.',
      'Brand new 60-acre zero-carbon state-of-the-art residential campus in Mumbai.'
    ],
    cons: [
      'Younger institution compared to legacy 30+ year old B-schools.',
      'High fee structure (₹27+ Lakhs) reflecting new-age private boutique infrastructure.',
      'Rigorous multi-stage admissions process requiring detailed personal essays and comprehensive interview rounds.'
    ],
    faqs: [
      {
        question: 'What degree does BITSoM award upon graduation?',
        answer: 'Graduates receive a formal Master of Business Administration (MBA) degree awarded directly by Birla Institute of Technology and Science (BITS) Pilani, which holds the government-designated "Institution of Eminence" status.'
      },
      {
        question: 'What is the CAT cutoff for BITSoM Mumbai?',
        answer: 'BITSoM does not enforce a rigid cut-off score. It uses holistic evaluation; however, competitive admitted candidates typically possess CAT scores between 90 and 95 percentile, GMAT scores of 680–740, or GRE scores of 318–330.'
      },
      {
        question: 'What is the average package at BITSoM Mumbai?',
        answer: 'BITSoM has delivered remarkable placement outcomes with an average package of ₹23.50 to ₹24.00 LPA, a median package of ₹22.50 LPA, and the top 30% of the cohort securing over ₹28.00 LPA.'
      },
      {
        question: 'Who teaches at BITSoM Mumbai?',
        answer: 'The faculty comprises leading global professors from institutions like Kellogg School of Management, Wharton, NYU Stern, London Business School, and Texas A&M, bringing international pedagogy directly to Mumbai.'
      }
    ]
  },

  // 5. MICA Ahmedabad
  {
    slug: 'mica-ahmedabad-pgdm-c-review-2027-fees-placements-cutoff',
    name: 'MICA (Mudra Institute of Communications, Ahmedabad)',
    campus: 'Shela Campus',
    location: 'Ahmedabad, Gujarat',
    state: 'Gujarat',
    program: 'PGDM-C (Strategic Marketing & Communications) & PGDM',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'NBA Accredited, AIU MBA Equivalent',
    ranking: 'Ranked #1 in India for Strategic Marketing, Advertising, and Media Management',
    intake: '216 Seats across PGDM-C and PGDM',
    totalFees: '₹23.00 – ₹24.50 Lakhs (2 Years Full-Time Residential)',
    tuitionFee: '₹19.50 Lakhs',
    hostelFee: '₹3.50 – ₹5.00 Lakhs',
    avgPackage: '₹20.10 LPA',
    medianPackage: '₹19.00 LPA',
    highestPackage: '₹35.50 – ₹36.00 LPA',
    top25Avg: '₹25.80 LPA',
    cutoff: 'CAT / XAT: 80–85%ile minimum qualifying weightage + Mandatory MICAT Test (Score 40–50+ / 105)',
    examsAccepted: ['MICAT', 'CAT', 'XAT', 'GMAT'],
    workExpReq: 'Open to freshers and experienced graduates from arts, science, commerce, and engineering backgrounds.',
    recruiters: ['Google', 'Meta', 'Hindustan Unilever', 'Procter & Gamble', 'L’Oréal', 'Nestlé', 'Ogilvy', 'Leo Burnett', 'Tata Sons', 'Cognizant'],
    sectors: 'FMCG/FMCD Marketing (30%), Digital Platforms & Tech (25%), Media & Advertising (20%), Consulting (15%), BFSI (10%)',
    usp: 'Universally recognized as "The School of Ideas", MICA is Asia’s premier destination for brand strategy, digital marketing, creative management, and consumer research.',
    pros: [
      'Uncontested leadership in Brand Management, Digital Marketing, and Creative Advertising.',
      'Vibrant creative campus culture with legendary 24/7 Chakhna Point, open amphitheater, and rich peer diversity (50%+ non-engineers).',
      'Top FMCG giants (HUL, P&G, Nestlé, L’Oréal) recruit brand managers directly from MICA on par with top IIMs.',
      'Comprehensive holistic curriculum merging psychology, semiotics, data analytics, and digital brand building.'
    ],
    cons: [
      'High fee structure around ₹23+ Lakhs.',
      'Niche positioning: ideal for marketing, digital product, and media enthusiasts, but fewer pure investment banking / financial trading roles.',
      'Requires taking the dedicated MICAT entrance exam with unique creative psychometric and descriptive writing sections.'
    ],
    faqs: [
      {
        question: 'Is MICAT compulsory for admission to MICA Ahmedabad?',
        answer: 'Yes. All candidates must take MICAT (MICAT-I or MICAT-II) in addition to submitting valid CAT, XAT, or GMAT scores. The final composite score assigns 50% weight to CAT/XAT/GMAT and 50% to MICAT.'
      },
      {
        question: 'What is the cutoff for MICA Ahmedabad?',
        answer: 'Candidates generally need an 80+ percentile in CAT or XAT to clear the baseline, along with qualifying the psychometric test and scoring competitively in the descriptive and objective sections of MICAT.'
      },
      {
        question: 'What is the average placement package at MICA Ahmedabad?',
        answer: 'The average CTC at MICA currently stands at ₹20.10 LPA, with the median at ₹19.00 LPA, the top 25% averaging ₹25.80 LPA, and the highest domestic package reaching ₹36.00 LPA.'
      },
      {
        question: 'Is MICA suitable for students interested in tech and digital product management?',
        answer: 'Absolutely. Tech giants like Google, Meta, Microsoft, and Amazon recruit heavily from MICA for Product Marketing Management (PMM), Digital Strategy, and Customer Experience roles.'
      }
    ]
  },

  // 6. IMT Ghaziabad
  {
    slug: 'imt-ghaziabad-pgdm-review-2027-fees-placements-cutoff',
    name: 'Institute of Management Technology (IMT)',
    campus: 'Raj Nagar Campus',
    location: 'Ghaziabad, Delhi NCR / Uttar Pradesh',
    state: 'Delhi NCR',
    program: 'PGDM (Core), PGDM Marketing, PGDM Finance, PGDM BFS, PGDM Dual Country (DCP)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB, SAQS, NBA Accredited',
    ranking: 'NIRF Management Rank #35 (Ranked #1 Private B-School for Marketing in Delhi NCR)',
    intake: 'Approx. 600+ Seats across PGDM specializations at Ghaziabad',
    totalFees: '₹21.50 – ₹22.50 Lakhs (2 Years Full-Time Residential)',
    tuitionFee: '₹18.00 Lakhs',
    hostelFee: '₹3.50 – ₹4.50 Lakhs',
    avgPackage: '₹17.07 – ₹17.60 LPA',
    medianPackage: '₹16.00 LPA',
    highestPackage: '₹65.50 LPA (Domestic) / ₹28.00+ LPA (Median for Top 10%)',
    top25Avg: '₹23.00 LPA',
    cutoff: 'CAT: 90–92 Percentile; XAT: 90–92 Percentile; GMAT: 650+',
    examsAccepted: ['CAT', 'XAT', 'GMAT'],
    workExpReq: 'Open to freshers and experienced candidates. Strong profile-based evaluation with personal interview and critical thinking tests.',
    recruiters: ['Google', 'Microsoft', 'Amazon', 'Bain Capability Network', 'Deloitte', 'EY', 'Barclays', 'Goldman Sachs', 'Marico', 'Tata Consumer'],
    sectors: 'BFSI (30%), IT/ITES & Product (22%), FMCG/Consumer Goods (20%), Consulting (18%), Manufacturing & E-Commerce (10%)',
    usp: 'Over 45 years of brand legacy, world-renowned Marketing alumni base of 15,000+ business leaders, and stellar FMCG / Consulting campus placements.',
    pros: [
      'The undisputed marketing powerhouse among private B-Schools in North India.',
      'Massive alumni network spanning CXOs across top Fortune 500 FMCG and consulting companies.',
      'AACSB accredited curriculum with modern labs in behavioral sciences, Bloomberg finance, and analytics.',
      'Lively 14-acre Raj Nagar campus with 24/7 sports culture and active student committees.'
    ],
    cons: [
      'Large batch size (600+ across specializations) creates intense internal placement competition.',
      'Hostel rooms are compact given the central urban Raj Nagar location.',
      'Strict 90+ percentile CAT/XAT cutoff with stringent sectional evaluations.'
    ],
    faqs: [
      {
        question: 'What is the CAT and XAT cutoff for IMT Ghaziabad PGDM?',
        answer: 'The cutoff for the flagship PGDM program at IMT Ghaziabad typically ranges from 90 to 92 percentile in CAT and XAT, alongside a GMAT score of 650+.'
      },
      {
        question: 'What is the fee structure for IMT Ghaziabad for 2027–2029?',
        answer: 'The total fee for the 2-year full-time PGDM program at IMT Ghaziabad is approximately ₹21.50 to ₹22.50 Lakhs, covering tuition, academic material, and residential hostel charges.'
      },
      {
        question: 'What is the average package at IMT Ghaziabad in recent placements?',
        answer: 'The latest audited average package at IMT Ghaziabad is ₹17.07 to ₹17.60 LPA, with the top 25% cohort bagging an average of ₹23.00 LPA and the highest domestic offer touching ₹65.50 LPA.'
      },
      {
        question: 'Is IMT Ghaziabad good for Finance as well as Marketing?',
        answer: 'While IMT is globally known for Marketing, its PGDM (Financial Management) and PGDM (Banking & Financial Services) have grown rapidly, drawing elite BFSI recruiters like Goldman Sachs, Barclays, Morgan Stanley, and CRISIL.'
      }
    ]
  },

  // 7. IMI New Delhi
  {
    slug: 'imi-new-delhi-pgdm-review-2027-fees-placements-cutoff',
    name: 'International Management Institute (IMI)',
    campus: 'Qutab Institutional Area Campus',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    program: 'PGDM, PGDM (Human Resource Management), PGDM (Banking & Financial Services)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB, AMBA, SAQS Accredited',
    ranking: 'NIRF Management Rank #38 (India’s 1st Corporate Sponsored B-School)',
    intake: 'Approx. 360–400 Seats across PGDM, HRM & BFS',
    totalFees: '₹21.00 – ₹22.20 Lakhs (2 Years Full-Time PGDM)',
    tuitionFee: '₹18.50 Lakhs',
    hostelFee: '₹2.70 – ₹3.70 Lakhs (Off-campus and on-campus options)',
    avgPackage: '₹16.70 – ₹17.10 LPA',
    medianPackage: '₹16.00 LPA',
    highestPackage: '₹70.00 LPA (International) / ₹40.00 LPA (Domestic)',
    top25Avg: '₹21.50 LPA',
    cutoff: 'CAT: 88–90 Percentile; XAT: 88–90 Percentile; GMAT: 650+',
    examsAccepted: ['CAT', 'XAT', 'GMAT'],
    workExpReq: 'Welcomes both fresh graduates and experienced corporate professionals.',
    recruiters: ['Deloitte', 'PwC', 'KPMG', 'EY', 'Bank of America', 'Tata Motors', 'Shell', 'Aditya Birla Group', 'Standard Chartered'],
    sectors: 'BFSI (35%), Consulting/Analytics (28%), IT/ITES (18%), Conglomerates & Manufacturing (12%), FMCG (7%)',
    usp: 'Backed by the Sanjiv Goenka RPG Group, prestigious Qutab Institutional Area location facing Sanjay Van, and globally recognized dual AMBA and AACSB accreditations.',
    pros: [
      'Prime South Delhi institutional location adjacent to IIT Delhi and IIFT Delhi.',
      'Exceptional PGDM (Banking & Financial Services) program with massive Wall Street and private equity recruiter presence.',
      'International accreditations (AACSB, AMBA) unlocking strong student exchange programs across Europe.',
      'Consistently high median package (₹16.00 LPA) with verified audited placement records.'
    ],
    cons: [
      'Relatively compact campus footprint in Qutab Institutional Area with limited in-house hostel space.',
      'High total investment of ₹21–22 Lakhs.',
      'Strict competition in personal interview rounds focusing heavily on general awareness and business news.'
    ],
    faqs: [
      {
        question: 'What is the CAT cutoff for IMI New Delhi?',
        answer: 'The expected CAT and XAT cutoff for the core PGDM at IMI New Delhi is between 88 and 90 percentile, with slightly lower cutoffs (85–87%ile) for PGDM (HRM) and PGDM (BFS).'
      },
      {
        question: 'What is the total fee for IMI New Delhi PGDM 2027–2029?',
        answer: 'The total tuition and academic fee is approximately ₹21.00 to ₹22.20 Lakhs, with hostel and food expenses costing an additional ₹2.50 to ₹3.50 Lakhs over two years.'
      },
      {
        question: 'What are the top placement roles at IMI New Delhi?',
        answer: 'Key roles include Investment Banking Analyst, Strategy Consultant, Risk Advisory, HR Business Partner, and Financial Modeling across Big 4 firms, multinational banks, and tech corporations.'
      },
      {
        question: 'Does IMI New Delhi provide international placements?',
        answer: 'Yes, international recruiters regularly participate, offering overseas packages up to ₹70.00 LPA in Dubai, Singapore, and European business hubs.'
      }
    ]
  },

  // 8. Great Lakes Chennai
  {
    slug: 'great-lakes-chennai-pgpm-pgdm-review-2027-fees-placements-cutoff',
    name: 'Great Lakes Institute of Management',
    campus: 'East Coast Road (ECR) Campus, Manamai',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    program: 'PGPM (1-Year Flagship for 2+ yrs exp) & PGDM (2-Year for Freshers / 0-2 yrs exp)',
    degreeType: 'AICTE Approved PGDM / PGPM (AIU MBA Equivalence)',
    accreditation: 'AMBA (UK), SAQS, NBA Accredited',
    ranking: 'NIRF Management Rank #31 (Top Management Institute in South India)',
    intake: 'PGPM: Approx. 400 Seats; PGDM: Approx. 300 Seats',
    totalFees: 'PGPM (1-Year): ₹21.50 – ₹22.50 Lakhs; PGDM (2-Year): ₹20.00 – ₹21.00 Lakhs',
    tuitionFee: '₹16.50 – ₹17.50 Lakhs',
    hostelFee: '₹3.50 – ₹4.50 Lakhs (Green LEED-Platinum Residential Campus)',
    avgPackage: 'PGPM: ₹17.30 – ₹18.10 LPA; PGDM: ₹15.10 – ₹15.30 LPA',
    medianPackage: 'PGPM: ₹17.00 LPA; PGDM: ₹14.80 LPA',
    highestPackage: 'PGPM: ₹37.00 LPA; PGDM: ₹46.00 LPA',
    top25Avg: 'PGPM: ₹24.30 LPA; PGDM: ₹20.20 LPA',
    cutoff: 'CAT / XAT: 80–85+ %ile; GMAT: 600+; CMAT: 95%+ (PGDM only)',
    examsAccepted: ['CAT', 'XAT', 'GMAT', 'CMAT'],
    workExpReq: 'PGPM strictly requires 24+ months work experience; PGDM accepts freshers and candidates with 0–24 months experience.',
    recruiters: ['Microsoft', 'Accenture Strategy', 'Deloitte', 'Infosys Consulting', 'Cognizant', 'Amazon', 'Adani', 'HSBC', 'EY'],
    sectors: 'Business & Tech Consulting (42%), IT/ITES & Product (25%), BFSI (18%), Operations & Supply Chain (10%), Marketing (5%)',
    usp: 'Founded by management visionary Padma Shri Dr. Bala V. Balachandran, recognized as India’s first LEED Platinum green business school campus, offering pioneering Analytics and AI-embedded management pedagogy.',
    pros: [
      'Pioneer in Data Analytics, Machine Learning, and Cloud Business applications in MBA education.',
      '1-year PGPM offers accelerated career redirection and massive ROI for experienced working engineers and corporate analysts.',
      'Eco-friendly 30-acre residential campus on the scenic East Coast Road near Mahabalipuram.',
      'Distinguished global visiting faculty from Stanford, Kellogg, and Harvard.'
    ],
    cons: [
      'ECR campus is roughly 50 km outside central Chennai city.',
      '1-year PGPM schedule is intensely rigorous with back-to-back trimesters.',
      'Higher fee structure compared to traditional state university MBA programs.'
    ],
    faqs: [
      {
        question: 'What is the key difference between PGPM and PGDM at Great Lakes Chennai?',
        answer: 'PGPM is an accelerated 1-year full-time MBA designed specifically for candidates with more than 2 years (24+ months) of work experience. PGDM is a traditional 2-year MBA meant for freshers and candidates with 0 to 24 months of experience.'
      },
      {
        question: 'Does Great Lakes Chennai accept CMAT scores?',
        answer: 'Yes, Great Lakes accepts CMAT scores (typically 95+ percentile) for its 2-year PGDM program. However, for the 1-year PGPM, only CAT, XAT, and GMAT scores are accepted.'
      },
      {
        question: 'What was the average package at Great Lakes Chennai for the recent batch?',
        answer: 'The flagship 1-year PGPM recorded an average salary of ₹17.30 to ₹18.10 LPA, while the 2-year PGDM recorded an average salary of ₹15.10 to ₹15.30 LPA.'
      },
      {
        question: 'How is the campus life at Great Lakes Chennai?',
        answer: 'The campus is a 30-acre LEED Platinum certified green paradise located along the East Coast Road, offering 100% air-conditioned residential hostels, world-class sporting facilities, and an active corporate festival environment.'
      }
    ]
  },

  // 9. GIM Goa
  {
    slug: 'gim-goa-pgdm-review-2027-fees-placements-cutoff',
    name: 'Goa Institute of Management (GIM)',
    campus: 'Sanquelim Campus, Poriem',
    location: 'Sanquelim, Goa',
    state: 'Goa',
    program: 'PGDM (Core), PGDM (Healthcare Management - HCM), PGDM (Big Data Analytics - BDA), PGDM (Banking & Financial Services - BIFS)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB, AMBA, NBA Accredited',
    ranking: 'NIRF Management Rank #33 (Top 35 B-Schools in India)',
    intake: 'Approx. 540 Seats across Core, BDA, HCM & BIFS',
    totalFees: '₹19.50 – ₹21.00 Lakhs (2 Years Full-Time Residential)',
    tuitionFee: '₹16.50 Lakhs',
    hostelFee: '₹3.00 – ₹4.50 Lakhs',
    avgPackage: '₹15.00 – ₹15.20 LPA',
    medianPackage: '₹14.80 LPA',
    highestPackage: '₹60.00 LPA (International) / ₹55.00 LPA (Domestic)',
    top25Avg: '₹20.40 LPA',
    cutoff: 'CAT: 85–90 Percentile; XAT: 82–85 Percentile; CMAT: 98%+ (Regular & Achiever’s Round); GMAT: 620+',
    examsAccepted: ['CAT', 'XAT', 'CMAT', 'GMAT'],
    workExpReq: 'Achiever’s round offers interview shortlists without waiting for CAT/XAT scores for candidates with stellar stellar academic or sports/corporate achievements.',
    recruiters: ['Amazon', 'Microsoft', 'EY', 'Deloitte', 'Reliance Industries', 'ITC', 'Johnson & Johnson', 'Barclays', 'Novartis'],
    sectors: 'IT & Analytics (32%), BFSI (28%), Consulting (18%), Healthcare/Pharma (12%), FMCG & Retail (10%)',
    usp: '50-acre breathtaking campus nestled in the foothills of the Western Ghats, AACSB & AMBA accredited, and pioneer of India’s top-rated Big Data Analytics (BDA) and Healthcare (HCM) programs.',
    pros: [
      'Pioneering Big Data Analytics (BDA) program equipped with SAS, Python, and big data computing labs with 100% placement track record.',
      'Achiever’s Round provides early profile-based calls and scholarships to exceptional achievers.',
      'Scenic, pollution-free 50-acre residential campus with swimming pool, sports complexes, and lively multi-cultural events.',
      'Dual international accreditation (AACSB, AMBA) placing GIM in the top 2% of global business schools.'
    ],
    cons: [
      'Campus is in North Goa’s Sanquelim interior, about 1.5 hours drive from Panaji and Goa International Airport.',
      'Total expenses exceed ₹20+ Lakhs.',
      'Intense academic curriculum with continuous case study presentations and trimester exams.'
    ],
    faqs: [
      {
        question: 'What is GIM Goa Achiever’s Round?',
        answer: 'GIM’s Achiever’s Round is an early profile-based interview round for candidates with outstanding academic backgrounds, work experience in top companies, national sports achievements, or stellar co-curriculars. Shortlisted candidates are interviewed before CAT/XAT results and can receive preliminary offer letters.'
      },
      {
        question: 'What is the cutoff for GIM Goa through CAT and CMAT?',
        answer: 'The CAT cutoff is typically 85–90 percentile, XAT cutoff is 82–85 percentile, and CMAT cutoff is 98+ percentile for the general pool.'
      },
      {
        question: 'How is the Big Data Analytics (BDA) program at GIM Goa?',
        answer: 'GIM’s PGDM-BDA is widely recognized among the top 3 analytics management programs in India, delivering specialized training in predictive analytics, cloud computing, and machine learning, with average packages around ₹16.00 LPA.'
      },
      {
        question: 'What is the average package at GIM Goa in 2025–2026?',
        answer: 'The overall average CTC for the institute is ₹15.00 to ₹15.20 LPA, with top international offers reaching ₹60.00 LPA and top domestic offers hitting ₹55.00 LPA.'
      }
    ]
  },

  // 10. TAPMI Manipal
  {
    slug: 'tapmi-manipal-mba-review-2027-fees-placements-cutoff',
    name: 'T.A. Pai Management Institute (TAPMI)',
    campus: 'Manipal Campus',
    location: 'Manipal, Udupi, Karnataka',
    state: 'Karnataka',
    program: 'MBA (General), MBA (Banking & Financial Services - BKFS), MBA (Human Resources), MBA (Marketing), MBA (International Business)',
    degreeType: 'Master of Business Administration (Degree awarded by MAHE - Institution of Eminence)',
    accreditation: 'AACSB, AMBA Accredited',
    ranking: 'NIRF Management Rank #42 (Constituent Unit of MAHE Deemed University)',
    intake: 'Approx. 520 Seats across MBA specializations',
    totalFees: '₹18.50 – ₹19.50 Lakhs (Complete 2-Year Residential MBA)',
    tuitionFee: '₹15.50 Lakhs',
    hostelFee: '₹3.00 – ₹4.00 Lakhs (Air-conditioned residential accommodation)',
    avgPackage: '₹14.00 – ₹14.60 LPA',
    medianPackage: '₹13.50 LPA',
    highestPackage: '₹32.00 LPA',
    top25Avg: '₹18.20 LPA',
    cutoff: 'CAT: 80–85 Percentile; XAT: 80–85 Percentile; NMAT: 220+ Score; GMAT: 630+',
    examsAccepted: ['CAT', 'XAT', 'NMAT', 'GMAT'],
    workExpReq: 'Profile-based calls offered to candidates with 20+ months work experience; score-based calls for freshers and candidates below 20 months.',
    recruiters: ['J.P. Morgan Chase', 'Morgan Stanley', 'Deloitte', 'EY', 'Citi', 'Wells Fargo', 'Amul', 'Capgemini', 'HDFC Bank'],
    sectors: 'BFSI (36%), IT/ITES & Analytics (28%), Consulting (18%), FMCG/Retail (12%), Manufacturing/Logistics (6%)',
    usp: 'Backed by MAHE (Institution of Eminence), prestigious AACSB & AMBA accreditations, and home to India’s largest university Bloomberg Trading Terminal Lab with 16 live terminals.',
    pros: [
      'Constituent unit of MAHE awards a formal MBA degree (not just PGDM).',
      'Finance Bloomberg Lab provides hands-on algorithmic trading and equity research experience, making TAPMI a favorite for Wall Street investment banks.',
      'Dual international accreditation (AACSB, AMBA) held by fewer than 5% of global business schools.',
      'Picturesque university town environment in Manipal with vibrant student community and top medical/engineering infrastructure.'
    ],
    cons: [
      'Location in coastal Karnataka requires travel via Mangalore International Airport (65 km away).',
      'High academic rigor with strict 85% attendance mandates and zero-tolerance plagiarism policies.',
      'Fees have appreciated close to ₹19+ Lakhs.'
    ],
    faqs: [
      {
        question: 'Does TAPMI Manipal award an MBA or PGDM?',
        answer: 'TAPMI awards a formal Master of Business Administration (MBA) degree, as it is a constituent management institute of the Manipal Academy of Higher Education (MAHE), an Institution of Eminence deemed university.'
      },
      {
        question: 'What is the cutoff for TAPMI Manipal through NMAT and CAT?',
        answer: 'TAPMI accepts NMAT scores with a cutoff around 220+, while the CAT and XAT cutoffs generally stay between 80 and 85 percentile.'
      },
      {
        question: 'What is the Bloomberg Lab at TAPMI?',
        answer: 'TAPMI houses one of India’s largest academic Bloomberg Labs, equipped with 16 Bloomberg terminals, enabling students to manage real-time portfolios, execute simulated financial trades, and analyze market data.'
      },
      {
        question: 'What is the average placement package at TAPMI Manipal?',
        answer: 'The average CTC at TAPMI is ₹14.00 to ₹14.60 LPA, with top recruiters like J.P. Morgan Chase, Morgan Stanley, Deloitte, and Citi offering packages up to ₹32.00 LPA.'
      }
    ]
  },

  // 11. IRMA Anand
  {
    slug: 'irma-anand-pgdm-rm-review-2027-fees-placements-cutoff',
    name: 'Institute of Rural Management Anand (IRMA)',
    campus: 'Anand Campus',
    location: 'Anand, Gujarat',
    state: 'Gujarat',
    program: 'Post Graduate Diploma in Management - Rural Management (PGDM-RM)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'NBA Accredited, AIU MBA Equivalent, NAAC A Grade',
    ranking: 'Ranked #1 in India for Agribusiness, Rural Management, and Social Impact Management',
    intake: '240 Seats',
    totalFees: '₹18.60 Lakhs (2 Years Complete Residential including field immersions)',
    tuitionFee: '₹14.80 Lakhs',
    hostelFee: '₹3.80 Lakhs (Hostel, Mess & Village Fieldwork)',
    avgPackage: '₹15.50 – ₹16.10 LPA',
    medianPackage: '₹15.00 LPA',
    highestPackage: '₹31.16 LPA',
    top25Avg: '₹20.80 LPA',
    cutoff: 'CAT: 80–85 Percentile; XAT: 80–85 Percentile; CMAT: 90%+ (followed by IRMA Social Awareness Test / WAT-PI)',
    examsAccepted: ['CAT', 'XAT', 'CMAT'],
    workExpReq: 'Welcomes candidates from engineering, agriculture, humanities, and commerce backgrounds committed to rural transformation and sustainable business.',
    recruiters: ['Amul (GCMMF)', 'Mother Dairy', 'ITC Limited', 'Godrej Agrovet', 'HDFC Bank', 'Axis Bank', 'Ernst & Young', 'UNICEF', 'Tata Trusts'],
    sectors: 'Agribusiness & FMCG (34%), BFSI & Microfinance (28%), Development & Impact Consulting (18%), Supply Chain/E-Commerce (12%), CSR & Social Enterprises (8%)',
    usp: 'Founded in 1979 by Dr. Verghese Kurien (Father of the White Revolution), IRMA pioneered professional rural management in Asia and remains the gold standard for sustainable enterprise leadership.',
    pros: [
      'Unmatched monopoly in Agribusiness, FMCG Supply Chain, and Rural Banking recruitment.',
      'Fieldwork Segment (FWS) provides 7 weeks of ground-level village immersion, fostering deep real-world problem-solving skills.',
      'Massive corporate brand equity with Amul, Mother Dairy, ITC, and multilateral agencies recruiting top leaders.',
      'Serene 60-acre lush green campus in the milk capital of India (Anand, Gujarat).'
    ],
    cons: [
      'Specific thematic focus on rural enterprise, agribusiness, and development; not meant for candidates seeking pure Wall Street trading or luxury brand marketing.',
      'Mandatory 7-week rural village fieldwork requires high adaptability and resilience.',
      'Strict residential discipline and community-centric lifestyle.'
    ],
    faqs: [
      {
        question: 'Is IRMA only for NGO and social work jobs?',
        answer: 'No, this is a major myth. More than 80% of IRMA graduates work in leading corporate firms like Amul, ITC, Godrej Agrovet, HDFC Bank, Axis Bank, Big 4 consulting firms, and modern supply chain giants with corporate compensation structures.'
      },
      {
        question: 'What is the cutoff for IRMA Anand?',
        answer: 'IRMA accepts CAT and XAT scores with cutoffs around 80–85 percentile, and CMAT scores around 90+ percentile, followed by the IRMASAT / Personal Interview process.'
      },
      {
        question: 'What is the average placement package at IRMA Anand?',
        answer: 'The average CTC for IRMA graduates is ₹15.50 to ₹16.10 LPA, with the median package at ₹15.00 LPA and the highest domestic offer reaching ₹31.16 LPA.'
      },
      {
        question: 'What is the Village Fieldwork Segment (VWS/FWS) at IRMA?',
        answer: 'The Fieldwork Segment is a signature 7-week immersion where students live in rural communities across Indian states to understand ground realities, rural consumption patterns, and grassroots operational bottlenecks firsthand.'
      }
    ]
  },

  // 12. KJ Somaiya Mumbai
  {
    slug: 'kj-somaiya-mumbai-mba-review-2027-fees-placements-cutoff',
    name: 'K.J. Somaiya Institute of Management',
    campus: 'Somaiya Vidyavihar Campus, Ghatkopar / Vidyavihar',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    program: 'MBA (Flagship General Management with Major/Minor specializations), MBA (Healthcare), MBA (Sports Management)',
    degreeType: 'Master of Business Administration (Degree awarded by Somaiya Vidyavihar University)',
    accreditation: 'AACSB Accredited, AIU Recognized',
    ranking: 'NIRF Management Rank #63 (Top 25 Private B-Schools in India)',
    intake: 'Approx. 600 Seats across MBA specializations',
    totalFees: '₹21.00 – ₹22.50 Lakhs (2 Years Full-Time MBA)',
    tuitionFee: '₹18.00 Lakhs',
    hostelFee: '₹3.00 – ₹4.50 Lakhs (Optional hostel accommodation)',
    avgPackage: '₹12.50 – ₹13.00 LPA',
    medianPackage: '₹12.20 LPA',
    highestPackage: '₹28.00 – ₹30.00 LPA',
    top25Avg: '₹16.50 LPA',
    cutoff: 'CAT: 83–86 Percentile; XAT: 83–86 Percentile; NMAT: 222+ Score; CMAT: 95%+; GMAT: 600+',
    examsAccepted: ['CAT', 'XAT', 'NMAT', 'CMAT', 'GMAT'],
    workExpReq: 'Accepts freshers and experienced professionals. CA/CS/CFA candidates receive special academic profile points.',
    recruiters: ['Barclays', 'Citi', 'Nomura', 'Deloitte', 'Amazon', 'ITC', 'HDFC Bank', 'Capgemini', 'PwC India'],
    sectors: 'BFSI (38%), IT/ITES (24%), Consulting & Analytics (16%), FMCG & Retail (12%), Manufacturing/Logistics (10%)',
    usp: 'Sprawling 60-acre green campus in central Mumbai (Vidyavihar), AACSB international accreditation, and flexible Major-Minor specialization architecture.',
    pros: [
      'Rare 60-acre green sanctuary campus in the heart of Mumbai with Olympic-standard athletic tracks and sports stadiums.',
      'AACSB international accreditation validates high academic rigor and faculty research standards.',
      'Unmatched BFSI and capital markets connections with Wall Street banks and domestic NBFCs visiting annually.',
      'Offers flexible major-minor system allowing students to pair Marketing with Analytics, or Finance with Fintech.'
    ],
    cons: [
      'Large batch size (600+ students) requires proactive student initiative during placement drives.',
      'Tuition fees have risen to over ₹21+ Lakhs.',
      'Hostel availability is prioritized for outstation students due to high Mumbai urban demand.'
    ],
    faqs: [
      {
        question: 'Does KJ Somaiya accept NMAT scores for MBA admission?',
        answer: 'Yes, KJ Somaiya accepts NMAT scores (typically requiring a score of 222+), alongside CAT (83–86%ile), XAT (83–86%ile), and CMAT (95%+).'
      },
      {
        question: 'What degree does KJ Somaiya award?',
        answer: 'KJ Somaiya awards a formal Master of Business Administration (MBA) degree under the aegis of Somaiya Vidyavihar University.'
      },
      {
        question: 'What is the average package at KJ Somaiya Institute of Management?',
        answer: 'The average package at KJ Somaiya is ₹12.50 to ₹13.00 LPA, with the highest package reaching ₹28.00 to ₹30.00 LPA.'
      },
      {
        question: 'How is the campus infrastructure at Somaiya Vidyavihar?',
        answer: 'The campus spans 60 lush green acres in Vidyavihar, Mumbai, boasting synthetic running tracks, football grounds, indoor badminton courts, high-tech Bloomberg finance labs, and multi-cuisine food courts.'
      }
    ]
  },

  // 13. FORE School of Management New Delhi
  {
    slug: 'fore-school-delhi-pgdm-review-2027-fees-placements-cutoff',
    name: 'FORE School of Management',
    campus: 'Qutab Institutional Area Campus',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    program: 'PGDM (Core), PGDM (International Business - IB), PGDM (Financial Management - FM), PGDM (Big Data Analytics - BDA)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'SAQS Accredited, NBA Accredited, AIU MBA Equivalent',
    ranking: 'NIRF Management Rank #53 (Top 10 Private B-Schools in Delhi NCR)',
    intake: 'Approx. 420 Seats across PGDM specializations',
    totalFees: '₹18.50 – ₹19.50 Lakhs (2 Years Full-Time PGDM)',
    tuitionFee: '₹16.98 Lakhs',
    hostelFee: '₹2.50 – ₹3.50 Lakhs (Off-campus partner hostels with shuttle)',
    avgPackage: '₹14.50 – ₹15.00 LPA',
    medianPackage: '₹14.00 LPA',
    highestPackage: '₹70.00 LPA (International) / ₹30.00 LPA (Domestic)',
    top25Avg: '₹18.50 LPA',
    cutoff: 'CAT: 85–87 Percentile; XAT: 85–87 Percentile; GMAT: 620+',
    examsAccepted: ['CAT', 'XAT', 'GMAT'],
    workExpReq: 'Open to freshers and experienced candidates. Strong weightage on GD-PI and academic consistency.',
    recruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'ICICI Bank', 'Maruti Suzuki', 'Asian Paints', 'Cognizant', 'Schneider Electric'],
    sectors: 'BFSI (34%), IT/ITES (26%), Consulting & Analytics (20%), FMCG & Retail (12%), Automobiles & Manufacturing (8%)',
    usp: 'Prestigious South Delhi institutional location, 30+ years of academic excellence, and specialized dual-qualification curriculum in International Business (IB) and Big Data Analytics (BDA).',
    pros: [
      'Prime South Delhi location surrounded by premier institutions (IIT Delhi, IIFT, JNU), offering superior networking and live consulting projects.',
      'Specialized PGDM in International Business (IB) with built-in international immersion module.',
      'Strong campus placement track record with Big 4 consulting and major commercial banks recruiting heavily.',
      'High-caliber faculty body with extensive industry consulting background and published research.'
    ],
    cons: [
      'Compact non-residential institutional footprint without sprawling sports fields.',
      'Does not have in-campus hostels; students utilize institute-approved dedicated partner hostels in nearby Katwaria Sarai / Saket.',
      'Tuition fee stands at ~₹18.5 Lakhs.'
    ],
    faqs: [
      {
        question: 'What is the CAT cutoff for FORE School of Management?',
        answer: 'The CAT and XAT cutoff for the core PGDM at FORE School of Management ranges from 85 to 87 percentile, with cutoffs for PGDM-IB, PGDM-FM, and PGDM-BDA slightly lower around 82–85 percentile.'
      },
      {
        question: 'Does FORE School of Management have on-campus hostel facilities?',
        answer: 'FORE is an urban campus located in Qutab Institutional Area; it coordinates with dedicated student housing and hostel partners nearby with air-conditioned rooms, food, and shuttle connectivity.'
      },
      {
        question: 'What was the average package at FORE School of Management in 2025–2026?',
        answer: 'The overall average CTC at FORE School of Management is ₹14.50 to ₹15.00 LPA, with the top 20% of students receiving over ₹18.50 LPA, and international packages reaching up to ₹70.00 LPA.'
      },
      {
        question: 'Is FORE PGDM equivalent to an MBA degree?',
        answer: 'Yes. The PGDM program at FORE is AICTE-approved, NBA-accredited, and holds official MBA equivalence from the Association of Indian Universities (AIU).'
      }
    ]
  },

  // 14. LBSIM New Delhi
  {
    slug: 'lbsim-delhi-pgdm-review-2027-fees-placements-cutoff',
    name: 'Lal Bahadur Shastri Institute of Management (LBSIM)',
    campus: 'Dwarka Sector 11 Campus',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    program: 'PGDM (General), PGDM (Financial Management), PGDM (Research & Business Analytics), PGDM (E-Business), PGDM (Artificial Intelligence & Data Science)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'NBA Accredited, AIU MBA Equivalent',
    ranking: 'NIRF Management Rank #66 (Ranked among the Top Finance B-Schools in Delhi NCR)',
    intake: 'Approx. 360 Seats across PGDM programs',
    totalFees: '₹16.50 – ₹17.50 Lakhs (2 Years Full-Time PGDM)',
    tuitionFee: '₹14.90 Lakhs',
    hostelFee: '₹2.40 – ₹3.50 Lakhs (Off-campus partner hostel)',
    avgPackage: '₹12.80 – ₹13.20 LPA',
    medianPackage: '₹12.50 LPA',
    highestPackage: '₹24.00 – ₹25.00 LPA',
    top25Avg: '₹16.20 LPA',
    cutoff: 'CAT: 83–86 Percentile; XAT: 82–85 Percentile; GMAT: 600+',
    examsAccepted: ['CAT', 'XAT', 'GMAT'],
    workExpReq: 'Freshers and experienced graduates eligible; high preference for students with strong quantitative and analytical orientation.',
    recruiters: ['D.E. Shaw', 'Arcesium', 'Deloitte', 'Morgan Stanley', 'EY', 'The Smart Cube', 'Marsh McLennan', 'HDFC Bank', 'Wipro'],
    sectors: 'BFSI & Financial Research (42%), IT/ITES & Analytics (24%), Consulting (18%), FMCG/FMCD (10%), Manufacturing (6%)',
    usp: 'Founded in memory of India’s second Prime Minister Shri Lal Bahadur Shastri, renowned as North India’s premier finance academy, equipped with a state-of-the-art Bloomberg Financial Lab.',
    pros: [
      'Unrivaled reputation in Financial Management with boutique investment research firms (D.E. Shaw, Arcesium, Smart Cube) recruiting year after year.',
      'Prime metro-connected location in Sector 11 Dwarka, right next to the metro station.',
      'State-of-the-art Bloomberg finance lab and IBM analytics lab for quantitative modeling.',
      'Strong value system rooted in ethical business leadership and modest fee structure relative to peer B-schools.'
    ],
    cons: [
      'Relatively high batch concentration in Finance and Analytics; fewer pure creative advertising roles.',
      'Campus is compact and does not feature sprawling green grounds.',
      'Hostel accommodation is off-campus in Dwarka sectors.'
    ],
    faqs: [
      {
        question: 'Why is LBSIM considered top-tier for Finance?',
        answer: 'LBSIM has built a legendary reputation for financial modeling, equity analysis, and risk management over three decades. Elite quant firms like D.E. Shaw, Arcesium, and Morgan Stanley regularly visit LBSIM for specialized front-end analyst roles.'
      },
      {
        question: 'What is the CAT cutoff for LBSIM Dwarka?',
        answer: 'The CAT cutoff for the PGDM (General) and PGDM (Financial Management) is typically 83 to 86 percentile, with the XAT cutoff around 82 to 85 percentile.'
      },
      {
        question: 'What is the total fee for LBSIM PGDM 2027–2029?',
        answer: 'The total academic fee for the 2-year program is approximately ₹14.90 Lakhs, making total expenses around ₹16.50 to ₹17.50 Lakhs including living costs, which delivers an attractive ROI.'
      },
      {
        question: 'What was the average package at LBSIM Delhi in recent placements?',
        answer: 'The average CTC stands at ₹12.80 to ₹13.20 LPA, with the median at ₹12.50 LPA and the top 25% averaging over ₹16.20 LPA.'
      }
    ]
  },

  // 15. BIMTECH Greater Noida
  {
    slug: 'bimtech-greater-noida-pgdm-review-2027-fees-placements-cutoff',
    name: 'Birla Institute of Management Technology (BIMTECH)',
    campus: 'Knowledge Park II Campus',
    location: 'Greater Noida, Delhi NCR / Uttar Pradesh',
    state: 'Delhi NCR',
    program: 'PGDM (Core), PGDM (International Business), PGDM (Insurance Business Management), PGDM (Retail Management)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'AACSB Accredited, NBA Accredited, AIU MBA Equivalent',
    ranking: 'NIRF Management Rank #48 (Top 50 B-Schools in India)',
    intake: 'Approx. 420 Seats across all PGDM streams',
    totalFees: '₹14.50 – ₹16.00 Lakhs (Tuition) + ₹3.50 – ₹4.00 Lakhs (Hostel)',
    tuitionFee: '₹14.00 – ₹15.00 Lakhs',
    hostelFee: '₹3.50 – ₹4.00 Lakhs (Mandatory residential hostel)',
    avgPackage: '₹11.20 – ₹11.50 LPA',
    medianPackage: '₹10.50 LPA',
    highestPackage: '₹24.43 LPA',
    top25Avg: '₹14.80 LPA',
    cutoff: 'CAT: 72–75%ile (Core), 65–70%ile (Insurance/Retail); XAT: 70–75%ile; CMAT: 80–85%ile; MAT accepted for Insurance/Retail',
    examsAccepted: ['CAT', 'XAT', 'CMAT', 'MAT'],
    workExpReq: 'Open to freshers and experienced candidates across all undergraduate disciplines.',
    recruiters: ['EY', 'Deloitte', 'Infosys', 'Wipro', 'Swiss Re', 'Bajaj Allianz', 'Aditya Birla Capital', 'HDFC ERGO', 'Kantar'],
    sectors: 'Insurance & BFSI (38%), IT/ITES (26%), Retail & FMCG (18%), Consulting (12%), Operations & Logistics (6%)',
    usp: 'Backed by the legacy of the Basant Kumar Birla & Sarala Birla group, AACSB accredited, and widely acknowledged as Asia’s #1 management institution for Insurance Business Management (IBM).',
    pros: [
      'AACSB international accreditation placing BIMTECH among an elite league of global business schools.',
      'Unrivaled market monopoly in Insurance Business Management (IBM), drawing global reinsurance giants like Swiss Re, Munich Re, and Lloyd’s syndicates.',
      'Lush, fully residential green campus in Knowledge Park II, Greater Noida, equipped with tennis courts and modern amenities.',
      'Strong corporate backing of the Birla Conglomerate facilitating consistent industrial live projects.'
    ],
    cons: [
      'Greater Noida location requires travel to central Delhi (approx. 45–60 mins via Aqua/Blue Line metro).',
      'Batch strength across specialized programs (Insurance, Retail) requires focused domain interest.',
      'Residential hostel accommodation is mandatory for all enrolled students.'
    ],
    faqs: [
      {
        question: 'Does BIMTECH accept CMAT scores?',
        answer: 'Yes, BIMTECH accepts CMAT scores (typically 80–85 percentile) for its PGDM programs, alongside CAT and XAT scores.'
      },
      {
        question: 'Why is BIMTECH known for Insurance Business Management (IBM)?',
        answer: 'BIMTECH’s PGDM-IBM is recognized by the Chartered Insurance Institute (CII), UK, and is regarded as India’s premier program for corporate risk management, insurance underwriting, and reinsurance broking with near-100% niche placements.'
      },
      {
        question: 'What is the average package at BIMTECH Greater Noida?',
        answer: 'The overall average CTC is ₹11.20 to ₹11.50 LPA, with the top 25% cohort securing an average package of ₹14.80 LPA and the highest domestic package reaching ₹24.43 LPA.'
      },
      {
        question: 'Is BIMTECH residential?',
        answer: 'Yes, BIMTECH is a fully residential business school where all students reside on campus in air-conditioned hostels equipped with Wi-Fi, modern dining halls, and 24/7 library facilities.'
      }
    ]
  },

  // 16. Department of Management, BITS Pilani
  {
    slug: 'bits-pilani-mba-business-analytics-review-2027-fees-placements-cutoff',
    name: 'Department of Management, BITS Pilani',
    campus: 'Pilani Campus, Vidya Vihar',
    location: 'Pilani, Rajasthan',
    state: 'Rajasthan',
    program: 'MBA in Business Analytics (2-Year Full-Time Residential)',
    degreeType: 'Master of Business Administration (Degree awarded by BITS Pilani - Institution of Eminence)',
    accreditation: 'UGC Recognized under BITS Pilani Institution of Eminence (IoE) status',
    ranking: 'NIRF University Rank #20 (Ranked among India’s Top 3 High-ROI Business Analytics MBAs)',
    intake: 'Approx. 80–90 Seats (Boutique High-Caliber Cohort)',
    totalFees: '₹11.50 – ₹13.50 Lakhs (Total 2-Year Residential MBA including hostel & mess)',
    tuitionFee: '₹10.20 Lakhs',
    hostelFee: '₹1.80 – ₹2.50 Lakhs (Campus student housing & dining)',
    avgPackage: '₹13.50 – ₹14.20 LPA',
    medianPackage: '₹13.00 LPA',
    highestPackage: '₹22.00 – ₹27.00 LPA',
    top25Avg: '₹18.00 LPA',
    cutoff: 'BAAT (Business Analytics Aptitude Test conducted by BITS Pilani) + CAT / XAT: 75–80+ %ile for initial shortlisting',
    examsAccepted: ['BAAT (BITS Exam)', 'CAT', 'XAT', 'GMAT'],
    workExpReq: 'Welcomes engineering, mathematics, computer applications, and economics graduates with a strong analytical mindset.',
    recruiters: ['Gartner', 'Cognizant', 'EY', 'KPMG', 'IBM', 'Fractal Analytics', 'Mu Sigma', 'Tech Mahindra', 'Accenture'],
    sectors: 'Data Analytics & AI (40%), IT Consulting (28%), BFSI Analytics (18%), Supply Chain Analytics (10%), Product Operations (4%)',
    usp: 'Flagship 2-year MBA in Business Analytics hosted at BITS Pilani’s historic 328-acre Vidya Vihar campus, combining BITS brand prestige with an incredible 1:1 Fee-to-Average-Package Return on Investment (ROI).',
    pros: [
      'Exceptional Return on Investment (ROI): total fees of ~₹12.5 Lakhs vs average package of ₹13.5–14.2 LPA.',
      'Prestige of the BITS Pilani brand and access to the massive global BITSian alumni network across Silicon Valley and Indian startups.',
      'Curriculum deeply anchored in Artificial Intelligence, Python, SQL, R, Machine Learning, and Big Data Architecture.',
      'Small batch size (80-90 students) ensures high personal attention and near-100% quality analytics placement.'
    ],
    cons: [
      'Pilani is a remote historic campus town in Rajasthan (approx. 4.5 hours drive from Delhi NCR or Jaipur).',
      'Exclusively focused on Business Analytics; not suitable for students seeking traditional FMCG brand management or HR.',
      'Requires qualifying the proprietary Business Analytics Aptitude Test (BAAT) conducted by BITS Pilani.'
    ],
    faqs: [
      {
        question: 'What entrance exam is required for BITS Pilani MBA in Business Analytics?',
        answer: 'Candidates must take the Business Analytics Aptitude Test (BAAT) conducted online by BITS Pilani. Candidates are shortlisted for BAAT and personal interviews based on their CAT / XAT percentile (typically 75–80+ %ile) or academic credentials.'
      },
      {
        question: 'What is the fee structure for BITS Pilani MBA?',
        answer: 'The total program fee for the 2-year residential MBA at BITS Pilani is approximately ₹11.50 to ₹13.50 Lakhs including tuition, hostel accommodation, and mess charges, offering one of the best ROI ratios in India.'
      },
      {
        question: 'What was the average package for BITS Pilani MBA in Business Analytics?',
        answer: 'The recent graduating batch achieved an average package of ₹13.50 to ₹14.20 LPA, with top analytics recruiters offering packages reaching up to ₹27.00 LPA.'
      },
      {
        question: 'Can non-engineers apply for BITS Pilani MBA?',
        answer: 'Yes, graduates with a Bachelor’s degree in disciplines requiring mathematics or statistics at the 10+2 or degree level (such as B.Sc., BCA, B.Com., Economics, B.E./B.Tech) are eligible to apply.'
      }
    ]
  },

  // 17. Institute of Management, Nirma University Ahmedabad
  {
    slug: 'nirma-university-ahmedabad-mba-review-2027-fees-placements-cutoff',
    name: 'Institute of Management, Nirma University (IMNU)',
    campus: 'SG Highway Campus',
    location: 'Ahmedabad, Gujarat',
    state: 'Gujarat',
    program: 'Master of Business Administration (MBA - Flagship), MBA (Human Resource Management), MBA (Family Business & Entrepreneurship)',
    degreeType: 'Master of Business Administration (Degree awarded by Nirma University)',
    accreditation: 'NAAC A+ Grade, SAQS Accredited',
    ranking: 'NIRF Management Rank #55 (Top Tier Private University B-School in Western India)',
    intake: 'Approx. 300 Seats for Flagship MBA',
    totalFees: '₹12.50 – ₹13.50 Lakhs (2 Years Full-Time MBA Tuition)',
    tuitionFee: '₹12.00 Lakhs',
    hostelFee: '₹2.50 – ₹3.50 Lakhs (Hostel optional / off-campus)',
    avgPackage: '₹11.50 – ₹12.20 LPA',
    medianPackage: '₹11.00 LPA',
    highestPackage: '₹30.00 LPA',
    top25Avg: '₹15.20 LPA',
    cutoff: 'CAT: 75–80 Percentile (Exclusively accepts CAT scores for general Indian admissions); GMAT for NRI/Foreign category',
    examsAccepted: ['CAT', 'GMAT'],
    workExpReq: 'Open to freshers and experienced candidates from all undergraduate academic disciplines.',
    recruiters: ['Morgan Stanley', 'Infosys', 'Deloitte', 'Adani Group', 'HDFC Bank', 'ICICI Bank', 'Tata Consultancy Services', 'Kotak Mahindra Bank', 'Torrent Power'],
    sectors: 'BFSI (36%), IT/ITES (25%), Manufacturing & Conglomerates (18%), Consulting (12%), FMCG & Retail (9%)',
    usp: 'Lush 115-acre university campus on SG Highway Ahmedabad, NAAC A+ accredited, strong Gujarat industrial corridor linkages, and an exceptional 1:1 ROI fee structure under ₹13 Lakhs.',
    pros: [
      'Outstanding Return on Investment (ROI): total tuition of ~₹12 Lakhs vs average CTC of ₹11.5–12.2 LPA.',
      'Prestigious 115-acre world-class campus with high-end sports facilities, food courts, and air-conditioned amphitheater classrooms.',
      'Direct placement pipelines into leading conglomerates based in Gujarat and Western India (Adani, Torrent, Reliance, Zydus).',
      'Exclusively admits through CAT, ensuring a disciplined, meritorious cohort.'
    ],
    cons: [
      'Exclusively accepts CAT for domestic students; does not accept XAT, CMAT, MAT, or NMAT.',
      'Strict campus attendance policies and academic continuous evaluation system.',
      'Limited on-campus hostel capacity for MBA students; many students utilize nearby modern private student residences on SG Highway.'
    ],
    faqs: [
      {
        question: 'Does Nirma University accept CMAT or MAT for MBA?',
        answer: 'No. The Institute of Management, Nirma University exclusively accepts CAT scores for domestic admissions to its flagship MBA program. CMAT, MAT, XAT, and ATMA scores are strictly not accepted.'
      },
      {
        question: 'What is the CAT cutoff for Nirma University MBA?',
        answer: 'The CAT cutoff for Nirma University typically ranges between 75 and 80 percentile, followed by Theme-Based Personal Interviews and micro-presentation rounds.'
      },
      {
        question: 'What is the fee structure for MBA at Nirma University for 2027–2029?',
        answer: 'The total tuition fee for the 2-year MBA program is approximately ₹12.00 to ₹12.50 Lakhs, making it one of the most affordable high-ROI private MBA choices in India.'
      },
      {
        question: 'What is the average package at Nirma University?',
        answer: 'The latest average placement package at Nirma University is ₹11.50 to ₹12.20 LPA, with top packages touching ₹30.00 LPA.'
      }
    ]
  },

  // 18. Prin. L.N. Welingkar (WeSchool) Mumbai
  {
    slug: 'welingkar-weschool-mumbai-pgdm-review-2027-fees-placements-cutoff',
    name: 'Prin. L. N. Welingkar Institute of Management Development & Research (WeSchool)',
    campus: 'Matunga Campus',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    program: 'PGDM (Core), PGDM (E-Business), PGDM (Business Design), PGDM (Healthcare), PGDM (Retail Management), MMS (via CAP round)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence) & Mumbai University MMS',
    accreditation: 'NBA Accredited, SAQS Accredited, AIU MBA Equivalent',
    ranking: 'NIRF Management Rank #73 (Ranked among Top 10 B-Schools in Mumbai)',
    intake: 'Approx. 600+ Seats across diverse specialized PGDM programs',
    totalFees: 'PGDM: ₹14.50 – ₹15.50 Lakhs (2 Years); MMS: ₹7.50 – ₹8.50 Lakhs',
    tuitionFee: '₹14.00 Lakhs',
    hostelFee: '₹2.50 – ₹4.00 Lakhs (Off-campus partner residences in Mumbai)',
    avgPackage: '₹12.50 – ₹12.80 LPA',
    medianPackage: '₹12.00 LPA',
    highestPackage: '₹25.50 – ₹40.00 LPA',
    top25Avg: '₹15.80 LPA',
    cutoff: 'CAT/XAT: 80–85%ile; CMAT/ATMA: 85–90%ile; GMAT: 600+; MAH MBA CET: 99.2%+ (for MMS CAP quota)',
    examsAccepted: ['CAT', 'XAT', 'CMAT', 'ATMA', 'GMAT', 'MAH MBA CET'],
    workExpReq: 'Accepts freshers and experienced candidates across all academic backgrounds.',
    recruiters: ['Amazon', 'Morgan Stanley', 'EY', 'Deloitte', 'Accenture', 'Reliance Brands', 'Tata Consumer Products', 'ICICI Bank', 'HDFC Bank'],
    sectors: 'BFSI (35%), IT/ITES & E-Commerce (28%), Consulting (18%), FMCG & Retail (12%), Media & Healthcare (7%)',
    usp: 'Located in prime Central Mumbai (Matunga), pioneer of Design Thinking and E-Business management education in India, and strong corporate ties across Mumbai’s business ecosystem.',
    pros: [
      'Pioneering specialized programs like PGDM E-Business and Business Design with high market traction.',
      'Central Mumbai location in Matunga provides effortless access to corporate headquarters, guest lectures, and winter internships.',
      'Affordable MMS pathway via MAH CET for Maharashtra domicile and All-India high scorers.',
      'Vibrant campus culture with Maker’s Lab, prototyping centers, and active student-driven corporate initiatives.'
    ],
    cons: [
      'Urban vertical campus in Matunga with limited open outdoor sports fields.',
      'Large cumulative batch size across all PGDM specializations.',
      'On-campus hostel rooms are limited; students rely on partner hostels across Wadala and Dadar.'
    ],
    faqs: [
      {
        question: 'What entrance exams does Welingkar Mumbai accept for PGDM?',
        answer: 'For its PGDM programs, Welingkar accepts CAT, XAT, CMAT, ATMA, and GMAT scores. For its MMS program, it admits solely through the Maharashtra state centralized admission process (CAP) via MAH MBA CET / CAT.'
      },
      {
        question: 'What is the cutoff for Welingkar Mumbai PGDM?',
        answer: 'The typical cutoff for Welingkar PGDM is 80–85 percentile in CAT and XAT, and 85–90 percentile in CMAT and ATMA, accompanied by profile evaluation.'
      },
      {
        question: 'What is the difference between PGDM E-Business and PGDM Core at Welingkar?',
        answer: 'PGDM Core covers classical business management functions, whereas PGDM E-Business integrates digital transformation, cloud business models, data analytics, product management, and fintech systems.'
      },
      {
        question: 'What is the average package at Welingkar Mumbai?',
        answer: 'The average placement package across PGDM programs at Welingkar Mumbai is ₹12.50 to ₹12.80 LPA, with the top 20% averaging over ₹15.80 LPA and peak domestic packages reaching up to ₹25.50 to ₹40.00 LPA.'
      }
    ]
  },

  // 19. LIBA Chennai
  {
    slug: 'liba-chennai-pgdm-review-2027-fees-placements-cutoff',
    name: 'Loyola Institute of Business Administration (LIBA)',
    campus: 'Loyola College Campus, Nungambakkam',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    program: 'Post Graduate Diploma in Management (PGDM - Full-Time)',
    degreeType: 'AICTE Approved PGDM (AIU MBA Equivalence)',
    accreditation: 'SAQS Accredited, NBA Accredited, AIU MBA Equivalent',
    ranking: 'NIRF Management Rank #82 (Premier Jesuit Business School in South India)',
    intake: '180–240 Seats (Controlled Boutique Intake)',
    totalFees: '₹17.50 – ₹18.50 Lakhs (2 Years Full-Time PGDM)',
    tuitionFee: '₹15.20 Lakhs',
    hostelFee: '₹2.50 – ₹3.30 Lakhs',
    avgPackage: '₹11.20 – ₹11.80 LPA',
    medianPackage: '₹11.00 LPA',
    highestPackage: '₹20.50 – ₹21.00 LPA',
    top25Avg: '₹14.80 LPA',
    cutoff: 'CAT: 75–80 Percentile; XAT: 75–80 Percentile (Only CAT & XAT accepted)',
    examsAccepted: ['CAT', 'XAT'],
    workExpReq: 'Open to freshers and experienced candidates with clean academic records and ethical orientation.',
    recruiters: ['Goldman Sachs', 'Deloitte', 'PwC', 'Wells Fargo', 'HSBC', 'Cognizant', 'Asian Paints', 'Mindtree', 'Federal Bank'],
    sectors: 'BFSI & Global Capability Centers (40%), IT/ITES & Analytics (28%), Consulting (16%), FMCG & Retail (10%), Manufacturing (6%)',
    usp: 'Managed by the Society of Jesus (Jesuits) with prestigious XLRI heritage, located in prime Nungambakkam inside the historic 99-acre Loyola College campus, renowned for business ethics and corporate governance.',
    pros: [
      'Prestigious Jesuit pedigree sharing values, academic discipline, and ethics with XLRI Jamshedpur and XIMB.',
      'Prime central Chennai location in Nungambakkam, close to diplomatic consulates and corporate headquarters.',
      'Boutique batch size of ~180-240 students ensures individual career development and high faculty mentorship.',
      'High-tier Wall Street and GCC participation including Goldman Sachs, Wells Fargo, and HSBC.'
    ],
    cons: [
      'Accepts only CAT and XAT; does not accept MAT, CMAT, or ATMA.',
      'Strict campus dress codes and disciplined behavioral norms reflecting Jesuit institutional culture.',
      'Placement numbers have historically centered around ₹11–12 LPA with fewer astronomical peak packages.'
    ],
    faqs: [
      {
        question: 'Does LIBA Chennai accept CMAT or MAT scores?',
        answer: 'No. LIBA accepts only CAT and XAT scores for its full-time PGDM admissions. CMAT, MAT, ATMA, and state CET scores are not accepted.'
      },
      {
        question: 'What is the cutoff for LIBA Chennai?',
        answer: 'The CAT and XAT cutoff for LIBA Chennai generally stands between 75 and 80 percentile, followed by Personal Interview and Written Ability Test (WAT).'
      },
      {
        question: 'What is the total fee for PGDM at LIBA Chennai for 2027–2029?',
        answer: 'The total 2-year fee for the PGDM program is approximately ₹17.50 to ₹18.50 Lakhs, covering tuition, academic material, and basic campus amenities.'
      },
      {
        question: 'What is the average package at LIBA Chennai?',
        answer: 'The average CTC for the recent graduating batch at LIBA is ₹11.20 to ₹11.80 LPA, with top financial and tech firms offering packages up to ₹20.50 to ₹21.00 LPA.'
      }
    ]
  },

  // 20. IBS Hyderabad
  {
    slug: 'ibs-hyderabad-mba-review-2027-fees-placements-cutoff',
    name: 'ICFAI Business School (IBS)',
    campus: 'Donthanapally Campus, Shankarpally Road',
    location: 'Hyderabad, Telangana',
    state: 'Telangana',
    program: 'Master of Business Administration (MBA - Flagship 2-Year Full-Time)',
    degreeType: 'Master of Business Administration (Degree awarded by ICFAI Foundation for Higher Education - IFHE Deemed University)',
    accreditation: 'AACSB Accredited, NAAC A++ Grade, SAQS Accredited',
    ranking: 'NIRF Management Rank #40 (Ranked among Top 40 B-Schools in India)',
    intake: 'Approx. 1,000+ Seats across MBA specializations',
    totalFees: '₹16.02 Lakhs (Tuition) + ₹3.50 – ₹4.00 Lakhs (Hostel & Mess)',
    tuitionFee: '₹16.02 Lakhs',
    hostelFee: '₹3.50 – ₹4.00 Lakhs',
    avgPackage: '₹9.71 – ₹10.42 LPA',
    medianPackage: '₹9.00 LPA',
    highestPackage: '₹58.19 LPA (International) / ₹21.00 LPA (Domestic)',
    top25Avg: '₹13.97 LPA',
    cutoff: 'IBSAT: 70–75+ Score; CAT: 70–75 Percentile; NMAT: 150+ Score; GMAT: 550+',
    examsAccepted: ['IBSAT', 'CAT', 'NMAT', 'GMAT'],
    workExpReq: 'Open to freshers and working professionals with a minimum 50% aggregate in graduation.',
    recruiters: ['Deloitte', 'PwC', 'ICICI Bank', 'HDFC Bank', 'Morgan Stanley', 'Oracle', 'Kotak Mahindra Bank', 'Genpact', 'TCS'],
    sectors: 'Financial Services & Banking (45%), IT/ITES (26%), Consulting (14%), E-Commerce & Retail (10%), Manufacturing (5%)',
    usp: 'Prestigious AACSB and NAAC A++ accreditations, magnificent 91-acre self-contained residential campus, world-famous Case Research Center (CRC) with global Harvard/The Case Centre rankings, and a colossal alumni community of 66,000+ business professionals.',
    pros: [
      'AACSB international accreditation and NAAC A++ rating guarantee world-class academic governance.',
      'Case Study pedagogy: IBS is one of the world’s top case study developers, ranking alongside Harvard Business School and INSEAD at The Case Centre.',
      'Magnificent 91-acre green campus equipped with modern amphitheaters, sports complexes, food courts, and medical center.',
      'Unmatched BFSI recruiter network ensuring high-volume corporate placement hiring year after year.'
    ],
    cons: [
      'Very large batch size (1,000+ students) means high internal competition for marquee consulting and investment banking roles.',
      'Campus is situated in Donthanapally on Shankarpally Road, approximately 35 km away from central Hyderabad.',
      'Average package hovers around ₹10 LPA, requiring diligent personal preparation to break into the top 25% bracket (₹14+ LPA).'
    ],
    faqs: [
      {
        question: 'What entrance exams are accepted by IBS Hyderabad?',
        answer: 'IBS Hyderabad accepts IBSAT (the proprietary entrance test conducted nationwide by ICFAI), CAT (70–75%ile), NMAT (150+ score), and GMAT scores.'
      },
      {
        question: 'What is the fee structure for MBA at IBS Hyderabad for 2027–2029?',
        answer: 'The official tuition fee for the 2-year MBA at IBS Hyderabad is ₹16.02 Lakhs. Adding residential hostel and mess charges of ₹3.50 to ₹4.00 Lakhs brings the total program investment to approximately ₹19.50 to ₹20.00 Lakhs.'
      },
      {
        question: 'What is the average and highest package at IBS Hyderabad?',
        answer: 'The overall average package is ₹9.71 to ₹10.42 LPA, the top 25% cohort averages ₹13.97 LPA, the top 10% averages ₹17.66 LPA, and the highest international package reaches ₹58.19 LPA (with highest domestic at ₹21.00 LPA).'
      },
      {
        question: 'What is the Case Research Center (CRC) at IBS?',
        answer: 'IBS Case Research Center is internationally acclaimed for writing business case studies used by over 900 business schools in 80 countries, giving students daily training in real-world corporate problem-solving.'
      }
    ]
  }
];

function generateMarkdown(c) {
  const metaDescription = `In-depth ${c.name} (${c.campus}) review for 2027 admissions. Explore verified fee structure (${c.totalFees}), latest placements (avg ${c.avgPackage}, highest ${c.highestPackage}), cutoffs (${c.cutoff}), and student verdict.`;

  const keywords = [
    `${c.name.toLowerCase()} review 2027`,
    `${c.name.toLowerCase()} fees`,
    `${c.name.toLowerCase()} placements 2026 2027`,
    `${c.name.toLowerCase()} average package`,
    `${c.name.toLowerCase()} highest package`,
    `${c.name.toLowerCase()} cutoff cat xat gmat`,
    `${c.name.toLowerCase()} admission process 2027`,
    `${c.name.toLowerCase()} ranking`,
    `${c.location} MBA colleges`,
    `best MBA colleges in ${c.state}`,
    `top private MBA colleges in India 2027`,
    `MBA direct admission 2027`
  ];

  return `---
title: '${c.name} Review 2027: Fees, Placements, Cutoff, Ranking & Admission Verdict'
date: '${today}'
category: MBA Admissions
description: >-
  ${metaDescription}
keywords:
${keywords.map(k => `  - ${k}`).join('\n')}
faqs:
${c.faqs.map(f => `  - question: ${f.question}\n    answer: >-\n      ${f.answer}`).join('\n')}
location: ${c.location.split(',')[0]}
state: ${c.state}
---

# ${c.name} (${c.campus}) Review 2027: Fees, Placements, Cutoff, Ranking & Honest Verdict

> 💡 **Key Takeaways (Direct AI Answer Summary)**
> - **2027–2029 Admission Status**: Applications are active via ${c.examsAccepted.join(', ')} scores and structured profile-evaluation / WAT-PI rounds for an approved batch intake of **${c.intake}**.
> - **Verified Total Fee Investment**: **${c.totalFees}** for the comprehensive curriculum (${c.tuitionFee} tuition + living expenses).
> - **Placement & ROI Benchmark**: Average salary officially stands at **${c.avgPackage}** (Top 25% average: **${c.top25Avg}**; Peak package: **${c.highestPackage}**) with premier corporate recruiters.

[InquiryCard title="Get Free MBA / PGDM Admission Guidance 2027" description="Compare top tier MBA colleges (fees, CAT/XAT/GMAT cutoffs, placements, profile shortlisting) with expert counselor Mohit Jain." cta="Get Free Counselling" type="admission"]

When management aspirants shortlist premier non-IIM and top-tier private business schools in India, **[${c.name}](/inquiry)** consistently features as a premier target institution. With its established academic credentials, **${c.accreditation}** accreditations, and distinguished **${c.ranking}**, the institute draws thousands of competitive applicants each admissions season.

However, with escalating educational investments, shifting corporate hiring patterns, and rigorous entrance exam benchmarks, selecting the right business school demands an unvarnished examination of fees, median salary distributions, and campus ground reality. 

In this comprehensive, data-verified **${c.name} review for 2027 admissions**, we dissect the **latest audited placement report, revised 2027–2029 fee structure, entrance exam cutoffs, curriculum highlights, pros & cons, and peer comparisons**.

---

## 1. Quick Institutional Overview & Key Highlights (2027 Update)

Here is a consolidated institutional fact-sheet for ${c.name}:

| Parameter | Official Verified Details |
| :--- | :--- |
| **Institution Name** | **${c.name}** |
| **Campus Location** | ${c.location} |
| **Flagship Program** | ${c.program} |
| **Degree Awarded** | ${c.degreeType} |
| **Accreditations** | ${c.accreditation} |
| **National / Global Rankings** | ${c.ranking} |
| **Total Program Intake** | ${c.intake} |
| **Accepted Entrance Exams** | ${c.examsAccepted.join(', ')} |
| **Expected Cutoff Threshold** | ${c.cutoff} |
| **Total Course Fee (2027–29)** | **${c.totalFees}** |
| **Tuition & Academic Fees** | ${c.tuitionFee} |
| **Hostel & Residential Charges**| ${c.hostelFee} |
| **Average Package (Latest)** | **${c.avgPackage}** |
| **Median Package** | **${c.medianPackage}** |
| **Top 25% Batch Average** | **${c.top25Avg}** |
| **Highest Salary Offer** | **${c.highestPackage}** |
| **Key Recruiting Partners** | ${c.recruiters.slice(0, 5).join(', ')} |

---

## 2. Updated Fee Structure & Living Expenses (2027–2029 Batch)

Pursuing management education at ${c.name} represents a substantial capital commitment. Understanding the exact division between tuition, accommodation, books, and refundable deposits is essential for calculating personal return on investment (ROI).

### Detailed Program Fee Breakdown

*   **Tuition & Courseware:** **${c.tuitionFee}** covering academic instruction, Harvard/Ivey case studies, digital library databases, and software licenses.
*   **Hostel & Residential Living:** **${c.hostelFee}** including air-conditioned accommodation, basic utilities, and high-speed campus networking.
*   **Total Estimated Program Cost:** **${c.totalFees}**.
*   **Education Loans & Financial Aid:** The institute has established formal corporate loan tie-ups with leading banks including SBI, HDFC Credila, Axis Bank, and Bank of Baroda, offering collateral-free education loans at competitive interest rates with extended moratorium options. Merit-cum-means scholarships are also awarded to top-ranking entrance test achievers.

---

## 3. Cutoff & Admission Selection Process 2027

Admission to ${c.name} is highly selective and evaluates candidate potential through a multi-dimensional assessment matrix rather than test scores alone.

### Entrance Exam Cutoff Benchmarks

| Exam Category | Minimum Qualifying Percentile / Score | Notes & Shortlisting Mode |
| :--- | :--- | :--- |
| **CAT** | ${c.cutoff.includes('CAT') ? c.cutoff.split(';')[0] : 'N/A'} | Profile-based & Score-based shortlisting |
| **XAT / GMAT** | ${c.cutoff.includes('XAT') || c.cutoff.includes('GMAT') ? c.cutoff : 'Considered on merit'} | International GMAT valid for 5 years |
| **Other Tests** | ${c.examsAccepted.filter(e => !['CAT', 'XAT', 'GMAT'].includes(e)).join(', ') || 'N/A'} | Check program-specific eligibility criteria |

### Selection Stages & Weightage Matrix

1.  **Application Screening & Profile Evaluation:** Academic consistency across Class 10th, 12th, and Graduation (minimum 50–60% requirement), quality of undergraduate university, and relevant corporate full-time work experience.
2.  **Written Ability Test (WAT) / Analytical Writing:** Candidates are tested on current socioeconomic issues, abstract thought, and structured articulation.
3.  **Personal Interview (PI):** In-depth interview assessing business awareness, domain clarity, leadership potential, communication clarity, and cultural fitment.
4.  **Final Offer Generation:** Composite merit list synthesized from entrance scores, WAT-PI performance, work experience diversity, and academic diversity points.

---

## 4. Latest Placement Report & Salary Analysis

Placements remain the ultimate metric of corporate confidence in a business school. In the recent placement drive, ${c.name} showcased solid corporate patronage across diversified sectors.

### Salary Highlights & Metrics

*   **Overall Average CTC:** **${c.avgPackage}**
*   **Median CTC:** **${c.medianPackage}**
*   **Top 25% Cohort Average:** **${c.top25Avg}**
*   **Highest Domestic Package:** **${c.highestPackage}**
*   **Key Placement Sectors:** ${c.sectors}

### Prominent Recruiters by Domain

*   **Management & Strategy Consulting:** ${c.recruiters.filter(r => ['McKinsey', 'Bain', 'BCG', 'Deloitte', 'PwC', 'EY', 'KPMG', 'Accenture', 'Arthur D. Little', 'Gartner'].some(x => r.includes(x))).join(', ') || 'Deloitte, EY, PwC, KPMG'}
*   **BFSI & FinTech:** ${c.recruiters.filter(r => ['Bank', 'Morgan', 'Goldman', 'JPMorgan', 'Citi', 'Barclays', 'Wells', 'HSBC', 'Capital', 'Finance'].some(x => r.includes(x))).join(', ') || 'HDFC Bank, ICICI Bank, Morgan Stanley, Barclays'}
*   **FMCG, Retail & E-Commerce:** ${c.recruiters.filter(r => ['Unilever', 'Amazon', 'ITC', 'P&G', 'Nestlé', 'Amul', 'Marico', 'L’Oréal', 'Asian Paints', 'Retail'].some(x => r.includes(x))).join(', ') || 'Amazon, HUL, ITC, Tata Consumer Products'}
*   **Technology, Product & Operations:** ${c.recruiters.filter(r => ['Google', 'Microsoft', 'Cognizant', 'Infosys', 'Wipro', 'Tech', 'IBM', 'Oracle'].some(x => r.includes(x))).join(', ') || 'Microsoft, Google, Cognizant, Infosys'}

---

## 5. College Review: Academic Rigor, Campus Life & Ground Reality

### Academic Pedagogy & Global Curriculum
${c.usp} The academic environment blends Harvard and European case-study methodologies, live simulations, industrial capstone consulting engagements, and regular guest addresses from industry CXOs.

### Campus Infrastructure & Student Life
The campus at ${c.campus} offers state-of-the-art academic auditoriums, digital research libraries, trading and computing labs, modern recreational facilities, and vibrant student-managed clubs spanning marketing, finance, entrepreneurship, and social initiatives.

### Honest Pros and Cons

#### ✅ Key Advantages (Pros)
${c.pros.map(p => `*   **${p.split(' ')[0]} ${p.split(' ')[1] || ''}**: ${p}`).join('\n')}

#### ⚠️ Key Considerations (Cons)
${c.cons.map(cn => `*   **${cn.split(' ')[0]} ${cn.split(' ')[1] || ''}**: ${cn}`).join('\n')}

---

## 6. Verified MBA / PGDM Peer Comparison Matrix

To help you assess comparative ROI, here is how ${c.name} compares with top-tier business schools in India:

| College Name | Total Fees (2027–29) | Avg Package (Latest) | ROI & Admission Eligibility |
| :--- | :--- | :--- | :--- |
| **${c.name}** | **${c.totalFees}** | **${c.avgPackage}** | ${c.examsAccepted.join('/')} · ${c.cutoff.split(';')[0]} |
| **SPJIMR Mumbai** | ₹22.50L – ₹24.00L | ₹33.00 LPA | CAT/GMAT (85%+ %ile Profile / 96%+ Score) · AACSB |
| **MDI Gurgaon** | ₹25.00L – ₹26.50L | ₹25.50 LPA | CAT (95%+ %ile) · Triple Accreditations |
| **IMT Ghaziabad** | ₹21.50L – ₹22.50L | ₹17.07 LPA | CAT/XAT (90%+ %ile) · AACSB Accredited Marketing Leader |
| **IMI New Delhi** | ₹21.00L – ₹22.20L | ₹16.70 LPA | CAT/XAT (88%+ %ile) · AACSB & AMBA Dual Accredited |
| **Great Lakes Chennai** | ₹20.00L – ₹22.50L | ₹15.10L – ₹17.30L | CAT/XAT/GMAT/CMAT · Analytics & Tech Pioneer |
| **TAPMI Manipal** | ₹18.50L – ₹19.50L | ₹14.00 LPA | CAT/XAT (80%+ %ile) / NMAT (220+) · MAHE Deemed MBA |

---

## 7. Frequently Asked Questions (FAQ)

${c.faqs.map((f, idx) => `### ${idx + 1}. ${f.question}\n${f.answer}\n`).join('\n')}

---

## 8. Final Counselor Verdict: Should You Apply to ${c.name}?

**Final Verdict**: For aspirants targeting top-tier management education with guaranteed corporate recognition, high faculty standards, and reliable placement trajectories, **${c.name}** stands as an outstanding investment. If your entrance test scores and profile align with the expected cutoffs, submitting an early application will significantly maximize your interview shortlisting prospects.

[👉 Book Free 1-on-1 Profile Counselling with Mohit Jain](/inquiry) | [👉 Explore Premium MBA Mock Test Series 2026](/mock-tests)

---

### 🚀 Recommended Internal Guides & Reviews
*   [Top MBA Colleges Accepting 80 to 85 CAT Percentile](/blog/mba-colleges-accepting-cat-cut-off-80-to-85-percentile-2026)
*   [SPJIMR Mumbai Comprehensive PGDM Review](/blog/spjimr-mumbai-pgdm-review-2027-fees-placements-cutoff)
*   [MDI Gurgaon PGDM Admission Analysis](/blog/mdi-gurgaon-pgdm-review-2027-fees-placements-cutoff)
*   [IMT Ghaziabad Fees, Placements & Cutoff Guide](/blog/imt-ghaziabad-pgdm-review-2027-fees-placements-cutoff)
*   [10 Proven Strategies to Crack CAT Exam](/blog/10-tips-to-crack-cat-exam-2026)
`;
}

console.log(`🚀 Starting generation of 20 distinct MBA College Blogs...`);

let count = 0;
for (const col of collegesData) {
  const filePath = path.join(POSTS_DIR, `${col.slug}.md`);
  const markdown = generateMarkdown(col);
  fs.writeFileSync(filePath, markdown, 'utf8');
  count++;
  console.log(`[${count}/20] Written: ${col.slug}.md (${(Buffer.byteLength(markdown) / 1024).toFixed(2)} KB)`);
}

console.log(`\n🎉 Successfully generated ${count} college blogs in posts/!`);
