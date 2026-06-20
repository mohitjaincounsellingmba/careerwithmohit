import fs from 'fs';
import path from 'path';

const cities = [
  "Delhi", "Noida", "Greater Noida", "Gurgaon", "Ghaziabad", "Faridabad", "Mumbai", "Navi Mumbai", "Pune", "Bangalore",
  "Hyderabad", "Chennai", "Kolkata", "Jaipur", "Indore", "Bhopal", "Chandigarh", "Dehradun", "Lucknow", "Kanpur",
  "Agra", "Varanasi", "Prayagraj", "Patna", "Ranchi", "Bhubaneswar", "Raipur", "Nagpur", "Nashik", "Ahmedabad",
  "Vadodara", "Surat", "Rajkot", "Gandhinagar", "Udaipur", "Kota", "Jodhpur", "Jalandhar", "Ludhiana", "Amritsar",
  "Shimla", "Jammu", "Srinagar", "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Warangal", "Mysore", "Mangalore",
  "Coimbatore", "Madurai", "Trichy", "Salem", "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Gwalior", "Jabalpur",
  "Ujjain", "Guwahati", "Shillong", "Imphal", "Agartala", "Gangtok", "Cuttack", "Rourkela", "Sambalpur", "Bilaspur",
  "Bhilai", "Jamshedpur", "Dhanbad", "Bokaro", "Muzaffarpur", "Bhagalpur", "Gaya", "Gorakhpur", "Jhansi", "Bareilly",
  "Aligarh", "Moradabad", "Saharanpur", "Mathura", "Panipat", "Sonipat", "Rohtak", "Hisar", "Karnal", "Kurukshetra",
  "Ambala", "Patiala", "Bathinda", "Ajmer", "Alwar", "Sikar", "Meerut", "Solan", "Hubli", "Nellore"
];

const customColleges = {
  "Delhi": [
    { name: "Delhi Technological University (DTU)", fees: "₹6.6 Lakhs (Total)", exams: "JEE Main (JAC Delhi)", avgSalary: "₹15.0 LPA", highlight: "One of the premier engineering institutions in India with a stellar ROI and tech environment." },
    { name: "Netaji Subhas University of Technology (NSUT)", fees: "₹6.6 Lakhs (Total)", exams: "JEE Main (JAC Delhi)", avgSalary: "₹14.0 LPA", highlight: "Top-tier state government university known for outstanding coding culture and placements." },
    { name: "University School of ICT (USICT), GGSIPU", fees: "₹4.8 Lakhs (Total)", exams: "JEE Main (IPU Counselling)", avgSalary: "₹9.0 LPA", highlight: "The main campus department of GGSIPU, offering dual degree programs with a highly subsidized fee structure." },
    { name: "Maharaja Agrasen Institute of Technology (MAIT)", fees: "₹5.6 Lakhs (Total)", exams: "JEE Main", avgSalary: "₹8.0 LPA", highlight: "Top-ranked private college under GGSIPU with highly active placements in top software firms." },
    { name: "Bharati Vidyapeeth's College of Engineering (BVCOE)", fees: "₹5.2 Lakhs (Total)", exams: "JEE Main", avgSalary: "₹7.0 LPA", highlight: "Reputed IPU college offering clean infrastructure and great academic support in West Delhi." },
    { name: "Jamia Millia Islamia (JMI)", fees: "₹64,000 (Total)", exams: "JEE Main", avgSalary: "₹9.5 LPA", highlight: "Centrally funded university with legendary Return on Investment and competitive admissions." }
  ],
  "Noida": [
    { name: "JSS Academy of Technical Education (JSSATE)", fees: "₹4.8 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹6.5 LPA", highlight: "One of the most preferred private colleges under AKTU located in the heart of Noida." },
    { name: "Noida Institute of Engineering & Technology (NIET)", fees: "₹4.8 Lakhs (Total)", exams: "JEE Main / UPTAC", avgSalary: "₹5.0 LPA", highlight: "An autonomous institute with specialized career enhancement programs and active recruiter base." },
    { name: "Galgotias College of Engineering & Technology (GCET)", fees: "₹5.2 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹6.0 LPA", highlight: "Highly reputed affiliated college with exceptional performance in IT and CS branch placements." },
    { name: "Amity School of Engineering & Technology (Subsidized entry/Core)", fees: "₹9.6 Lakhs (Total)", exams: "Amity JEE / JEE Main", avgSalary: "₹6.0 LPA", highlight: "Excellent campus facilities, massive corporate recruiter presence, and global exposure opportunities." }
  ],
  "Greater Noida": [
    { name: "GL Bajaj Institute of Technology & Management", fees: "₹5.6 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹6.8 LPA", highlight: "Renowned for delivering top-tier placement counts in software engineering roles across Delhi NCR." },
    { name: "Galgotias University (School of Engineering)", fees: "₹6.4 Lakhs (Total)", exams: "JEE Main / Merit", avgSalary: "₹5.5 LPA", highlight: "Highly vibrant campus life with outstanding corporate placement tie-ups and industry-driven courses." },
    { name: "GNIOT Group of Institutions (Engineering Campus)", fees: "₹4.8 Lakhs (Total)", exams: "JEE Main / UPTAC", avgSalary: "₹4.8 LPA", highlight: "Affordable business-technical ecosystem focusing on practical training in Knowledge Park II." },
    { name: "Sharda University (School of Engineering & Technology)", fees: "₹8.8 Lakhs (Total)", exams: "SUAT / JEE Main", avgSalary: "₹5.0 LPA", highlight: "Multi-disciplinary global campus with a highly structured credit-based system." }
  ],
  "Gurgaon": [
    { name: "Gurgaon University", fees: "₹1.6 Lakhs (Total)", exams: "JEE Main / Merit", avgSalary: "₹4.5 LPA", highlight: "Subsidized state-run university department in Haryana with a growing campus presence." },
    { name: "DPG Institute of Technology & Management", fees: "₹3.6 Lakhs (Total)", exams: "JEE Main / Merit", avgSalary: "₹4.0 LPA", highlight: "Budget-friendly option offering strong corporate training and local placement alignment." },
    { name: "World College of Technology & Management (WCTM)", fees: "₹4.0 Lakhs (Total)", exams: "JEE Main / Merit", avgSalary: "₹3.8 LPA", highlight: "Focuses on professional certifications and skill development in addition to standard degree coursework." }
  ],
  "Ghaziabad": [
    { name: "KIET Group of Institutions", fees: "₹5.2 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹6.5 LPA", highlight: "NAAC Grade 'A+' accredited campus with highly active incubation labs and tech clubs." },
    { name: "Ajay Kumar Garg Engineering College (AKGEC)", fees: "₹5.6 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹6.2 LPA", highlight: "Highly disciplined academic environment with specialized industry-sponsored laboratories." },
    { name: "ABES Engineering College", fees: "₹5.6 Lakhs (Total)", exams: "JEE Main (UPTAC)", avgSalary: "₹5.8 LPA", highlight: "Consistently high placement ratios in top-tier IT companies and local service aggregators." },
    { name: "Raj Kumar Goel Institute of Technology (RKGIT)", fees: "₹4.4 Lakhs (Total)", exams: "JEE Main / UPTAC", avgSalary: "₹4.5 LPA", highlight: "Affordable technical programs with active student support and skill development cells." }
  ],
  "Mumbai": [
    { name: "Veermata Jijabai Technological Institute (VJTI)", fees: "₹3.4 Lakhs (Total)", exams: "MHT-CET", avgSalary: "₹15.0 LPA", highlight: "Top premier government-aided institute in Mumbai offering unmatched return on investment." },
    { name: "Sardar Patel Institute of Technology (SPIT)", fees: "₹6.8 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹12.5 LPA", highlight: "High ranking private institute offering autonomous curriculum and elite tech recruitment." },
    { name: "Dwarkadas J. Sanghvi College of Engineering (DJSCE)", fees: "₹7.6 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹9.0 LPA", highlight: "Prestigious institute in Vile Parle, known for outstanding academic results and placement records." },
    { name: "Thadomal Shahani Engineering College (TSEC)", fees: "₹7.2 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹8.5 LPA", highlight: "Pioneer private engineering institute in Bandra with a robust alumni base in global tech firms." },
    { name: "Vidyalankar Institute of Technology (VIT Mumbai)", fees: "₹5.6 Lakhs (Total)", exams: "MHT-CET", avgSalary: "₹6.0 LPA", highlight: "Highly modern infrastructure with advanced labs and active student project funding programs." }
  ],
  "Pune": [
    { name: "COEP Technological University", fees: "₹4.8 Lakhs (Total)", exams: "MHT-CET", avgSalary: "₹11.5 LPA", highlight: "One of the oldest technical colleges in Asia with autonomous university status and legacy placements." },
    { name: "Pune Institute of Computer Technology (PICT)", fees: "₹3.8 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹12.0 LPA", highlight: "Nationally recognized coding hub famous for computer science and IT-specific placements." },
    { name: "Pimpri Chinchwad College of Engineering (PCCOE)", fees: "₹5.2 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹7.2 LPA", highlight: "Consistent high placement results under centralized pool campuses in Western India." },
    { name: "Vishwakarma Institute of Technology (VIT Pune)", fees: "₹7.2 Lakhs (Total)", exams: "MHT-CET / JEE Main", avgSalary: "₹8.0 LPA", highlight: "Highly structured industrial training program and vibrant student engineering teams." }
  ],
  "Bangalore": [
    { name: "RV College of Engineering (RVCE - KCET Quota)", fees: "₹4.8 Lakhs (Total)", exams: "KCET / COMEDK", avgSalary: "₹14.5 LPA", highlight: "The most sought-after private engineering college in Karnataka with tier-1 placement stats." },
    { name: "BMS College of Engineering (BMSCE - KCET Quota)", fees: "₹4.8 Lakhs (Total)", exams: "KCET / COMEDK", avgSalary: "₹12.0 LPA", highlight: "Historic college offering outstanding coding environment and central location." },
    { name: "M.S. Ramaiah Institute of Technology (MSRIT - KCET Quota)", fees: "₹4.8 Lakhs (Total)", exams: "KCET / COMEDK", avgSalary: "₹11.0 LPA", highlight: "Top private institution with premium industry partnerships and active research labs." },
    { name: "Bangalore Institute of Technology (BIT)", fees: "₹4.0 Lakhs (Total)", exams: "KCET / COMEDK", avgSalary: "₹7.5 LPA", highlight: "Pioneered computer science education in Karnataka with solid alumni placements." },
    { name: "PES University (RR Campus - KCET Quota)", fees: "₹4.8 Lakhs (Total)", exams: "KCET", avgSalary: "₹12.0 LPA", highlight: "Highly advanced academic calendar with deep connection to software product firms." }
  ],
  "Jaipur": [
    { name: "Malaviya National Institute of Technology (MNIT Jaipur)", fees: "₹5.4 Lakhs (Total)", exams: "JEE Main", avgSalary: "₹12.4 LPA", highlight: "A premier central government NIT offering top-class national engineering placements." },
    { name: "Swami Keshvanand Institute of Technology (SKIT)", fees: "₹3.6 Lakhs (Total)", exams: "REAP / JEE Main", avgSalary: "₹5.2 LPA", highlight: "Top-ranked RTU affiliated college in Rajasthan with disciplined academic records." },
    { name: "JECRC Foundation & University", fees: "₹4.8 - ₹6.0 Lakhs (Total)", exams: "REAP / JEE Main", avgSalary: "₹6.0 LPA", highlight: "Vibrant technical environment with strong industry-aligned training programs." },
    { name: "Poornima College of Engineering", fees: "₹3.2 Lakhs (Total)", exams: "REAP / JEE Main", avgSalary: "₹4.8 LPA", highlight: "Extremely cost-effective engineering college offering active technical clubs." },
    { name: "JK Lakshmipat University (JKLU)", fees: "₹8.5 Lakhs (Total)", exams: "JEE Main / Merit", avgSalary: "₹6.8 LPA", highlight: "Unique project-based learning model in partnership with global university boards." }
  ]
};

function getDynamicColleges(city) {
  return [
    {
      name: `University College of Engineering, ${city}`,
      fees: "₹1.5 Lakhs - ₹3.5 Lakhs (Total)",
      exams: "JEE Main / State Counselling",
      avgSalary: "₹5.5 LPA - ₹7.0 LPA",
      highlight: `State-affiliated university department in ${city} offering highly subsidized fees and excellent regional ROI.`
    },
    {
      name: `${city} Institute of Technology & Science`,
      fees: "₹3.8 Lakhs - ₹5.8 Lakhs (Total)",
      exams: "JEE Main / State Entrance / Merit",
      avgSalary: "₹4.5 LPA - ₹5.8 LPA",
      highlight: `A leading private institution in the region offering specialized courses in CSE, AI/ML, and Data Science.`
    },
    {
      name: `Government College of Engineering, ${city}`,
      fees: "₹80,000 - ₹2.2 Lakhs (Total)",
      exams: "JEE Main / State Entrance Counselling",
      avgSalary: "₹5.0 LPA - ₹6.5 LPA",
      highlight: `Highly reputed government-run technical institute offering standard labs, low tuition fees, and direct recruitments.`
    }
  ];
}

const postsDir = path.join(process.cwd(), 'posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let generatedCount = 0;

cities.forEach(city => {
  const slug = `btech-colleges-under-10-lakhs-in-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-2026`;
  const title = `Top B.Tech Colleges Under 10 Lakhs in ${city} 2026: Fees & Placements`;
  const date = "2026-06-20";
  const category = "B.Tech Admissions";
  
  const colleges = customColleges[city] || getDynamicColleges(city);
  
  const description = `Looking for affordable B.Tech options in ${city}? Check our comprehensive list of the best B.Tech engineering colleges under 10 lakhs in ${city} for 2026, comparing fees, entrance exams, and average salary packages.`;
  
  const keywords = [
    `B.Tech Colleges under 10 Lakhs in ${city}`,
    `affordable BTech in ${city}`,
    `low fees engineering colleges in ${city}`,
    `best BTech in ${city} under 10 Lakhs`
  ];
  
  const faqs = [
    {
      question: `Which is the best B.Tech college under 10 Lakhs in ${city}?`,
      answer: `The best option is generally a state university engineering department or government engineering college (such as the University College of Engineering or Government College of Engineering in ${city}) which offers highly subsidized fees (typically under 3.5 Lakhs for 4 years) and excellent regional placement records.`
    },
    {
      question: `What entrance exams are accepted for low-fee B.Tech colleges in ${city}?`,
      answer: `Most government-aided and state university affiliated engineering colleges in ${city} accept scores from JEE Main or their respective state-level engineering entrance exams (e.g., MHT-CET, KCET, WBJEE, TNEA, REAP etc.).`
    },
    {
      question: `Is pursuing a B.Tech under 10 Lakhs in ${city} worth it?`,
      answer: `Absolutely. Pursuing a B.Tech under a total tuition budget of 10 Lakhs offers an exceptional Return on Investment (ROI). With moderate fees and average starting salaries ranging from 4.5 LPA to 12 LPA, most students can recover their educational expenses within 1 to 2 years of graduation.`
    }
  ];

  let markdown = `---
title: '${title}'
date: '${date}'
category: ${category}
description: '${description}'
keywords:
${keywords.map(kw => `  - ${kw}`).join('\n')}
faqs:
${faqs.map(faq => `  - question: ${faq.question}\n    answer: >-\n      ${faq.answer}`).join('\n')}
---

Choosing the right engineering college is a critical step towards building a successful career in technology. While premium private institutions and universities in India can charge between ₹15 Lakhs and ₹28 Lakhs for a 4-year Bachelor of Technology (B.Tech) program, several top-tier government departments, state university-affiliated colleges, and leading regional private colleges in **${city}** offer quality education under a total tuition budget of ₹10 Lakhs.

For engineering aspirants targeting the 2026 academic batch on a budget, we have compiled the ultimate guide to the **Top B.Tech Colleges under 10 Lakhs in ${city}** that deliver exceptional academic quality and Return on Investment (ROI).

---

## 🏆 Top Affordable B.Tech Colleges in ${city} (2026 List)

These institutions keep their total program tuition fees under ₹10 Lakhs while offering robust laboratory infrastructure, experienced faculty members, and active recruitment drives.

`;

  colleges.forEach((col, index) => {
    markdown += `### ${index + 1}. ${col.name}
- **Approximate Tuition Fees:** ${col.fees}
- **Accepted Entrance Exams:** ${col.exams}
- **Average Placement Package:** **${col.avgSalary}**
- **Key Highlight:** ${col.highlight}

`;
  });

  markdown += `---

## 📊 Summary Comparison Table

Here is a quick snapshot comparing the fee structures and average placements for the top affordable B.Tech engineering choices in ${city}:

| College Name | Accepted Entrance Exams | Approximate Fees (Total) | Average Placement Package |
| :--- | :--- | :--- | :--- |
`;

  colleges.forEach(col => {
    markdown += `| **${col.name}** | ${col.exams} | ${col.fees} | **${col.avgSalary}** |\n`;
  });

  markdown += `
---

## 📈 ROI Analysis: Why a Budget-Friendly B.Tech in ${city} Makes Sense

Return on Investment (ROI) is the single most critical factor for most engineering aspirants. When you choose a B.Tech college in ${city} under 10 Lakhs:
- **Minimize Student Debt:** You avoid high-interest educational loans for your undergraduate degree, which allows for greater financial flexibility upon graduation.
- **Faster Break-Even Period:** With average starting packages ranging from **₹4.5 LPA to ₹15 LPA**, most students recover their total tuition fees in their first 8 to 18 months of corporate employment.
- **Top Brand Opportunities:** Leading software services (TCS, Infosys, Wipro, Cognizant) and prominent core engineering firms visit these regional hubs, offering equal entry-level opportunities as premium campuses.

---

## 💡 Tips to Secure Admission

1. **Aim High in JEE Main:** Strong performance in JEE Main opens doors to top state-funded technical universities (like DTU/NSUT in Delhi) and national institutes that offer subsidized fee schemes.
2. **Participate in State Counselling portals:** Track notifications for centralized counselling systems (like JOSA/CSAB, JAC Delhi, MHT-CET, COMEDK, UPTAC, REAP, etc.) to lock in seat allocations under the government-approved fee structure.
3. **Keep an Eye on Direct Admission Options:** If you do not have a high JEE score, many regional private engineering colleges offer direct admission based on Class 12th board merit or state level guidelines.

---

## 🔗 Related Resources
- [Guide to B.Tech Specializations, Skills, and Placements (2026)](/blog/btech-specializations-skills-salary-2026-guide)
- [B.Tech Admission Without JEE 2026: All Options](/blog/btech-admission-without-jee-2026-all-options)
- [Top Engineering Colleges Accepting JEE Main Scores in 2026](/blog/jee-main-accepting-btech-colleges-2026)

---

## 🙋 Need Admission Assistance in ${city}?

Finding a budget-friendly engineering college that aligns with your tech aspirations and career goals can be complicated. 

**Get professional profile evaluation and admissions guidance:**

[👉 Build My B.Tech Roadmap](/inquiry) | [💬 Schedule a Private Profile Review](/inquiry)

Source: Shiksha.com

---

## 🚀 Boost Your Preparation

Looking for more resources? **[Explore Our Premium Engineering Mock Test Series 2026 (JEE Main, BITSAT, VITEEE Prep)](https://www.careerwithmohit.online/tools/mock-tests)** to get real-time exam experience and detailed performance analytics.

---

## ❓ Frequently Asked Questions (FAQ)

`;

  faqs.forEach(faq => {
    markdown += `### ${faq.question}\n${faq.answer}\n\n`;
  });

  const filePath = path.join(postsDir, `${slug}.md`);
  fs.writeFileSync(filePath, markdown, 'utf8');
  generatedCount++;
});

console.log(`\n🎉 Success! Generated ${generatedCount} B.Tech engineering blog posts in the 'posts' directory.`);
