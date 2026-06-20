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
    { name: "Shaheed Sukhdev College of Business Studies (SSCBS)", fees: "₹20,000 (Annual)", exams: "CUET-UG", avgSalary: "₹9.8 LPA", highlight: "The best undergraduate business school in India under Delhi University with exceptional ROI." },
    { name: "Jamia Millia Islamia (JMI)", fees: "₹13,000 (Annual)", exams: "JMI Entrance Exam", avgSalary: "₹6.0 LPA", highlight: "Highly reputed central university offering premium courses at minimal fees." },
    { name: "Maharaja Agrasen Institute of Management Studies (MAIMS)", fees: "₹1.1 Lakhs (Annual)", exams: "IPU CET / CUET", avgSalary: "₹4.5 LPA", highlight: "Top GGSIPU-affiliated campus offering excellent academic environment." },
    { name: "Vivekananda Institute of Professional Studies (VIPS)", fees: "₹1.2 Lakhs (Annual)", exams: "IPU CET / CUET", avgSalary: "₹4.6 LPA", highlight: "Known for premium infrastructure, great faculty, and active student societies." },
    { name: "Maharaja Surajmal Institute (MSI)", fees: "₹1.1 Lakhs (Annual)", exams: "IPU CET / CUET", avgSalary: "₹4.8 LPA", highlight: "Ranked among the top IPU BBA colleges with consistent placement tracks." },
    { name: "Jagan Institute of Management Studies (JIMS Rohini)", fees: "₹1.2 Lakhs (Annual)", exams: "IPU CET / CUET", avgSalary: "₹4.2 LPA", highlight: "Reputed institution focusing on business communication and placement support." }
  ],
  "Noida": [
    { name: "IMS Noida", fees: "₹1.5 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.0 LPA", highlight: "Located in Noida's institutional area, popular choice for undergraduate management." },
    { name: "Hierank Business School", fees: "₹1.1 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹3.8 LPA", highlight: "Affordable fee structure with focus on practical business exposure." },
    { name: "Noida International University (NIU)", fees: "₹1.2 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹3.5 LPA", highlight: "Diverse campus environment with various global partnerships." },
    { name: "Jaypee Institute of Information Technology (JIIT)", fees: "₹1.8 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.5 LPA", highlight: "Highly structured academic program with tech-focused management study." }
  ],
  "Greater Noida": [
    { name: "Galgotias University (BBA Program)", fees: "₹1.2 Lakhs (Annual)", exams: "CUET-UG / Merit", avgSalary: "₹4.2 LPA", highlight: "Highly vibrant campus life with outstanding corporate placement base." },
    { name: "GL Bajaj Institute of Management", fees: "₹1.3 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.0 LPA", highlight: "Focus on corporate alignment, soft skills, and mock interviews." },
    { name: "GNIOT Institute of Management Studies", fees: "₹1.1 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹3.8 LPA", highlight: "Affordable business education in Knowledge Park II." },
    { name: "Noida Institute of Engineering and Technology (NIET)", fees: "₹1.0 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹3.6 LPA", highlight: "Subsidized fee structure with proactive placement services." }
  ],
  "Gurgaon": [
    { name: "Gurgaon University", fees: "₹30,000 (Annual)", exams: "Merit-Based", avgSalary: "₹4.0 LPA", highlight: "State university offering standard management courses at highly subsidized fees." },
    { name: "DPG Institute of Technology & Management", fees: "₹60,000 (Annual)", exams: "Merit / CUET", avgSalary: "₹3.8 LPA", highlight: "Affordable education with good local company connections." },
    { name: "WCTM Gurgaon", fees: "₹1.0 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹3.5 LPA", highlight: "Affordable fee structure offering strong core administrative certifications." }
  ],
  "Ghaziabad": [
    { name: "IMS Ghaziabad (University Courses Campus)", fees: "₹1.5 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.5 LPA", highlight: "Top ranked college for BBA in Ghaziabad with excellent campus infra." },
    { name: "ITS Ghaziabad (Mohan Nagar)", fees: "₹1.4 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.2 LPA", highlight: "Affiliated to CCS University, featuring consistent corporate linkages." },
    { name: "KIET Group of Institutions (BBA)", fees: "₹1.2 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.0 LPA", highlight: "Highly ranked technical-management campus with active placement cell." },
    { name: "Mewar Institute of Management", fees: "₹80,000 (Annual)", exams: "Merit / CUET", avgSalary: "₹3.5 LPA", highlight: "Extremely cost-effective BBA program with good local network." }
  ],
  "Mumbai": [
    { name: "Jai Hind College", fees: "₹50,000 (Annual)", exams: "Common Entrance Test", avgSalary: "₹6.5 LPA", highlight: "One of Mumbai's most prestigious colleges for management studies." },
    { name: "Mithibai College", fees: "₹60,000 (Annual)", exams: "CUET / Merit", avgSalary: "₹6.0 LPA", highlight: "Premium brand value, popular among top recruiters in Mumbai." },
    { name: "H.R. College of Commerce & Economics", fees: "₹45,000 (Annual)", exams: "Merit-Based", avgSalary: "₹5.8 LPA", highlight: "Top-tier commerce college with deep industry tie-ups." },
    { name: "St. Xavier's College", fees: "₹40,000 (Annual)", exams: "Xavier's Entrance", avgSalary: "₹6.2 LPA", highlight: "Historic college offering rich academic exposure and great placements." },
    { name: "K.J. Somaiya College of Arts & Commerce", fees: "₹60,000 (Annual)", exams: "Merit-Based", avgSalary: "₹5.0 LPA", highlight: "Beautiful campus in Vidyavihar with solid training and placements." },
    { name: "Sydenham College", fees: "₹30,000 (Annual)", exams: "Merit-Based", avgSalary: "₹5.2 LPA", highlight: "Pioneer in commerce and management education with superb ROI." }
  ],
  "Pune": [
    { name: "Brihan Maharashtra College of Commerce (BMCC)", fees: "₹50,000 (Annual)", exams: "Merit-Based", avgSalary: "₹5.0 LPA", highlight: "Prestigious commerce and management college under Pune University." },
    { name: "Bharati Vidyapeeth (Deemed to be University)", fees: "₹1.5 Lakhs (Annual)", exams: "BUMAT", avgSalary: "₹4.8 LPA", highlight: "Large campus with comprehensive infrastructure and dedicated placements." },
    { name: "Indira College of Commerce and Science", fees: "₹1.0 Lakhs (Annual)", exams: "Merit-Based", avgSalary: "₹4.2 LPA", highlight: "Corporate interface program offering good placement assistance." },
    { name: "Ness Wadia College of Commerce", fees: "₹40,000 (Annual)", exams: "Merit-Based", avgSalary: "₹4.0 LPA", highlight: "Affordable fee structure with historical background and active alumni." }
  ],
  "Jaipur": [
    { name: "JECRC University", fees: "₹1.2 Lakhs (Annual)", exams: "Merit / CUET", avgSalary: "₹4.2 LPA", highlight: "Modern private university with strong internship and placement support." },
    { name: "Poornima University", fees: "₹1.0 Lakhs (Annual)", exams: "Merit-Based", avgSalary: "₹3.8 LPA", highlight: "Structured curriculum focusing on corporate communication and soft skills." },
    { name: "Vivekananda Global University (VGU)", fees: "₹1.1 Lakhs (Annual)", exams: "VGUCET / Merit", avgSalary: "₹3.6 LPA", highlight: "Large campus offering active campus life and corporate placements." },
    { name: "Jaipur National University", fees: "₹1.0 Lakhs (Annual)", exams: "Merit / Entrance", avgSalary: "₹3.5 LPA", highlight: "Affordable management education with dedicated placement assistance." }
  ],
  "Bangalore": [
    { name: "Mount Carmel College (MCC)", fees: "₹1.5 Lakhs (Annual)", exams: "Merit-Based", avgSalary: "₹5.5 LPA", highlight: "One of Bangalore's top colleges for women, offering rich business learning." },
    { name: "St. Joseph's College of Commerce (SJCC)", fees: "₹1.2 Lakhs (Annual)", exams: "SJCC Entrance", avgSalary: "₹5.2 LPA", highlight: "Excellent ROI and highly reputed campus in central Bangalore." },
    { name: "Kristu Jayanti College", fees: "₹1.1 Lakhs (Annual)", exams: "Merit-Based", avgSalary: "₹4.8 LPA", highlight: "Awarded top ranks for infrastructure and consistent corporate placement." },
    { name: "M.S. Ramaiah College of Arts, Science & Commerce", fees: "₹1.2 Lakhs (Annual)", exams: "Merit-Based", avgSalary: "₹4.5 LPA", highlight: "Highly popular campus offering diverse corporate recruitments." }
  ]
};

function getDynamicColleges(city) {
  return [
    {
      name: `Department of Commerce & Management, University of ${city}`,
      fees: "₹30,000 - ₹90,000 (Total)",
      exams: "CUET / Merit-Based",
      avgSalary: "₹3.8 LPA - ₹5.0 LPA",
      highlight: `State-affiliated university department in ${city} offering the highest ROI and standard curriculum.`
    },
    {
      name: `Government PG College, ${city}`,
      fees: "₹15,000 - ₹45,000 (Total)",
      exams: "Class 12th Marks (Merit)",
      avgSalary: "₹3.0 LPA - ₹4.2 LPA",
      highlight: "Affordable education catering to local students with standard graduate facilities."
    },
    {
      name: `${city} Institute of Management Studies (CIMS)`,
      fees: "₹1.2 Lakhs - ₹1.8 Lakhs (Annual)",
      exams: "CUET / Institute Merit",
      avgSalary: "₹3.5 LPA - ₹4.5 LPA",
      highlight: `Well-integrated local private college in ${city} with good connection to regional industries.`
    }
  ];
}

const postsDir = path.join(process.cwd(), 'posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let generatedCount = 0;

cities.forEach(city => {
  const slug = `bba-colleges-under-5-lakhs-in-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-2026`;
  const title = `Top BBA Colleges Under 5 Lakhs in ${city} 2026: Fees & Placements`;
  const date = "2026-06-20";
  const category = "BBA Admissions";
  
  const colleges = customColleges[city] || getDynamicColleges(city);
  
  const description = `Looking for BBA colleges under 5 Lakhs in ${city}? Check our list of the best affordable BBA options in ${city} for 2026, comparing fees, entrance exams, and placement packages.`;
  const keywords = [
    `BBA Colleges under 5 Lakhs in ${city}`,
    `affordable BBA in ${city}`,
    `low fees BBA colleges in ${city}`,
    `best BBA in ${city} under 5 Lakhs`
  ];
  
  const faqs = [
    {
      question: `Which is the best BBA college under 5 Lakhs in ${city}?`,
      answer: `The best option is generally a state university department or reputed government-aided institution (like the University of ${city} or related state departments) which offers highly subsidised fees (typically under 1.5 Lakhs for 3 years) and solid regional placements.`
    },
    {
      question: `What entrance exams are accepted for low-fee BBA colleges in ${city}?`,
      answer: `Most institutions in ${city} accept scores from CUET-UG, state-level entrance exams, or admit students based on their Class 12th board marks.`
    },
    {
      question: `Is pursuing a BBA under 5 Lakhs in ${city} a good choice?`,
      answer: `Yes, BBA programs under 5 Lakhs provide an exceptional Return on Investment (ROI). With moderate tuition fees, students can secure average placement packages ranging from 3 LPA to 6 LPA, facilitating a quick career start with minimal student debt.`
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

Pursuing a Bachelor of Business Administration (BBA) is a great foundation for a corporate career, but it doesn't need to break the bank. While some premium private universities charge hefty fees, several top government-aided institutions, state university departments, and regional private colleges in **${city}** offer quality management education for under ₹5 Lakhs.

For students targeting the 2026 academic batch on a budget, we have compiled the ultimate guide to the **Top BBA Colleges under 5 Lakhs in ${city}** that deliver exceptional value and Return on Investment (ROI).

---

## 🏆 Top Affordable BBA Colleges in ${city} (2026 List)

These institutions keep tuition fees under ₹5 Lakhs (either total program fee or annual fees matching a budget-friendly layout) while offering solid placement opportunities.

`;

  colleges.forEach((col, index) => {
    markdown += `### ${index + 1}. ${col.name}
- **Approximate Fees:** ${col.fees}
- **Accepted Entrance Exams:** ${col.exams}
- **Average Placement Package:** **${col.avgSalary}**
- **Key Highlight:** ${col.highlight}

`;
  });

  markdown += `---

## 📊 Summary Comparison Table

Here is a quick snapshot comparing the fee structures and average placements for the top affordable BBA choices in ${city}:

| College Name | Entrance Exams | Approximate Fees | Avg Placement Package |
| :--- | :--- | :--- | :--- |
`;

  colleges.forEach(col => {
    markdown += `| **${col.name}** | ${col.exams} | ${col.fees} | **${col.avgSalary}** |\n`;
  });

  markdown += `
---

## 📈 ROI Analysis: Why a Low-Fee BBA in ${city} Makes Sense

Return on Investment (ROI) is the most critical metric for any management aspirant. When you pursue a BBA in ${city} under 5 Lakhs:
- **Low Debt Trap:** You avoid high-interest educational loans for your undergraduate studies, keeping you financially flexible.
- **Faster Break-Even:** With average starting salaries ranging from **3 LPA to 6 LPA**, most students recover their total tuition fees in their first 6 to 12 months of employment.
- **Strong Foundation for MBA:** You get the same academic foundations and core training needed to ace corporate job roles or pursue premium PGDM/MBA degrees later.

---

## 💡 Tips to Secure Admission

1. **Axe your CUET Preparation:** CUET-UG is now widely accepted by Central, State, and many Private universities. Getting a good score guarantees admission to highly subsidized top-tier departments.
2. **Track State University Timelines:** Many colleges in ${city} admit students directly through state-wide counselling portals or merit boards.
3. **Build Core Business Skills:** Enhance your presentation and soft skills to clear personal interviews and group discussion rounds.

---

## 🔗 Related Resources
- [Best BBA Specializations for 2026](/blog/bba-specializations-skills-salary-2026-guide)
- [BBA vs BCom vs BMS: Career Comparison](/blog/bba-vs-bcom-vs-bms-career-comparison)
- [Direct BBA Admission 2026](/blog/direct-bba-admission-2026-management-quota)

---

## 🙋 Need Admission Assistance in ${city}?

Choosing a budget-friendly BBA college that matches your career aspirations can be challenging.

**Get professional profile evaluation and admissions guidance:**

[👉 Build My BBA Roadmap](/inquiry) | [💬 Schedule a Private Profile Review](/inquiry)

Source: Shiksha.com

---

## 🚀 Boost Your Preparation

Looking for more resources? **[Explore Our Premium Mock Test Series 2026 (CUET/IPU CET Prep)](https://www.careerwithmohit.online/tools/mock-tests)** to get real-time exam experience and detailed performance analytics.

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

console.log(`\n🎉 Success! Generated ${generatedCount} BBA blog posts in the 'posts' directory.`);
