const fs = require('fs');
const path = require('path');

const data = {
  "delhi": {
    "city": "Delhi",
    "colleges": [
      {"name": "Shaheed Sukhdev College of Business Studies (SSCBS)", "fees": "₹20,000", "exams": "CUET"},
      {"name": "Jamia Millia Islamia (JMI)", "fees": "₹13,000", "exams": "JMI Entrance"},
      {"name": "Maharaja Agrasen Institute of Management Studies (MAIMS)", "fees": "₹1.1 Lakhs", "exams": "IPU CET / CUET"},
      {"name": "Vivekananda Institute of Professional Studies (VIPS)", "fees": "₹1.2 Lakhs", "exams": "IPU CET / CUET"},
      {"name": "Deen Dayal Upadhyaya College (DDUC)", "fees": "₹25,000", "exams": "CUET"},
      {"name": "Keshav Mahavidyalaya", "fees": "₹20,000", "exams": "CUET"},
      {"name": "Maharaja Surajmal Institute (MSI)", "fees": "₹1.1 Lakhs", "exams": "IPU CET"},
      {"name": "Jagan Institute of Management Studies (JIMS Rohini)", "fees": "₹1.2 Lakhs", "exams": "IPU CET"},
      {"name": "Gargi College", "fees": "₹15,000", "exams": "CUET"},
      {"name": "Sri Guru Gobind Singh College of Commerce", "fees": "₹30,000", "exams": "CUET"}
    ]
  },
  "noida": {
    "city": "Noida",
    "colleges": [
      {"name": "Symbiosis Centre for Management Studies (SCMS Noida)", "fees": "₹3.5 Lakhs", "exams": "SET"},
      {"name": "Amity University, Noida", "fees": "₹3.8 Lakhs", "exams": "Merit / CUET"},
      {"name": "Jaypee Institute of Information Technology (JIIT)", "fees": "₹2.5 Lakhs", "exams": "Merit / CUET"},
      {"name": "IMS Noida", "fees": "₹1.5 Lakhs", "exams": "IPU CET"},
      {"name": "Asian School of Business (ASB)", "fees": "₹1.8 Lakhs", "exams": "Merit"},
      {"name": "Hierank Business School", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "JSS Academy of Higher Education", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "FDDI Noida", "fees": "₹1.2 Lakhs", "exams": "FDDI AIST"},
      {"name": "Chetan Anand Institute", "fees": "₹1 Lakhs", "exams": "Merit"},
      {"name": "Noida International University (NIU)", "fees": "₹1.2 Lakhs", "exams": "Merit / CUET"}
    ]
  },
  "greater-noida": {
    "city": "Greater Noida",
    "colleges": [
      {"name": "Galgotias University", "fees": "₹1.2 Lakhs", "exams": "CUET / Merit"},
      {"name": "Sharda University", "fees": "₹1.8 Lakhs", "exams": "SUAT / CUET"},
      {"name": "GL Bajaj Institute of Management", "fees": "₹1.3 Lakhs", "exams": "Merit"},
      {"name": "GNIOT Institute of Management", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Lloyd Business School", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "IILM University, Greater Noida", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "Accurate Institute of Management", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Mangalmay Institute of Management", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Noida Institute of Engineering and Technology (NIET)", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "United Group of Institutions", "fees": "₹1.1 Lakhs", "exams": "Merit"}
    ]
  },
  "ghaziabad": {
    "city": "Ghaziabad",
    "colleges": [
      {"name": "IMS Ghaziabad (University Courses Campus)", "fees": "₹1.6 Lakhs", "exams": "Merit"},
      {"name": "ITS Ghaziabad", "fees": "₹1.4 Lakhs", "exams": "Merit"},
      {"name": "Christ University (Delhi NCR Campus)", "fees": "₹2.5 Lakhs", "exams": "CUET (Christ)"},
      {"name": "KIET Group of Institutions", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Jaipuria Institute of Management", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "ABES Engineering College", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "SRM University, NCR Campus", "fees": "₹1.5 Lakhs", "exams": "SRMJEEE / Merit"},
      {"name": "Mewar Institute of Management", "fees": "₹80,000", "exams": "Merit"},
      {"name": "INMANTEC Institutions", "fees": "₹75,000", "exams": "Merit"},
      {"name": "Hi-Tech Institute of Engineering", "fees": "₹70,000", "exams": "Merit"}
    ]
  },
  "gurgaon": {
    "city": "Gurgaon",
    "colleges": [
      {"name": "BML Munjal University", "fees": "₹3.0 Lakhs", "exams": "CUET / UGAT"},
      {"name": "GD Goenka University", "fees": "₹2.5 Lakhs", "exams": "CUET"},
      {"name": "NorthCap University", "fees": "₹2.2 Lakhs", "exams": "Merit"},
      {"name": "Amity University, Gurugram", "fees": "₹2.8 Lakhs", "exams": "Merit"},
      {"name": "IILM University, Gurugram", "fees": "₹2.5 Lakhs", "exams": "Merit"},
      {"name": "Sushant University", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "K.R. Mangalam University", "fees": "₹1.8 Lakhs", "exams": "CUET / Merit"},
      {"name": "Masters' Union (UG Programme)", "fees": "₹10 Lakhs", "exams": "MU-BAAT"},
      {"name": "WCTM Gurgaon", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Apeejay Stya University", "fees": "₹2.6 Lakhs", "exams": "Merit"}
    ]
  },
  "delhi-ncr": {
    "city": "Delhi NCR",
    "colleges": [
      {"name": "Shaheed Sukhdev College of Business Studies (SSCBS)", "fees": "₹20,000", "exams": "CUET"},
      {"name": "Symbiosis Centre for Management Studies (SCMS Noida)", "fees": "₹3.5 Lakhs", "exams": "SET"},
      {"name": "Christ University (Delhi NCR Campus)", "fees": "₹2.5 Lakhs", "exams": "CUET (Christ)"},
      {"name": "Maharaja Agrasen Institute of Management Studies (MAIMS)", "fees": "₹1.1 Lakhs", "exams": "IPU CET"},
      {"name": "Amity University, Noida", "fees": "₹3.8 Lakhs", "exams": "Merit"},
      {"name": "BML Munjal University, Gurgaon", "fees": "₹3.0 Lakhs", "exams": "UGAT"},
      {"name": "Galgotias University, Greater Noida", "fees": "₹1.2 Lakhs", "exams": "CUET"},
      {"name": "IMS Ghaziabad", "fees": "₹1.6 Lakhs", "exams": "Merit"},
      {"name": "Jagan Institute of Management Studies (JIMS Rohini)", "fees": "₹1.2 Lakhs", "exams": "IPU CET"},
      {"name": "Jamia Millia Islamia", "fees": "₹13,000", "exams": "JMI Entrance"}
    ]
  },
  "pune": {
    "city": "Pune",
    "colleges": [
      {"name": "Symbiosis Centre for Management Studies (SCMS)", "fees": "₹3.5 Lakhs", "exams": "SET"},
      {"name": "MIT World Peace University (MIT-WPU)", "fees": "₹3.1 Lakhs", "exams": "MIT-WPU CET"},
      {"name": "Christ University, Pune Lavasa", "fees": "₹2.2 Lakhs", "exams": "CUET (Christ)"},
      {"name": "Brihan Maharashtra College of Commerce (BMCC)", "fees": "₹50,000", "exams": "Merit"},
      {"name": "Bharati Vidyapeeth (BUMAT)", "fees": "₹1.5 Lakhs", "exams": "BUMAT"},
      {"name": "Indira College of Commerce and Science", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "FLAME University", "fees": "₹8.0 Lakhs", "exams": "FEAT"},
      {"name": "Lexicon Management Institute", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "Ness Wadia College of Commerce", "fees": "₹40,000", "exams": "Merit"},
      {"name": "Dr. D.Y. Patil Vidyapeeth", "fees": "₹1.2 Lakhs", "exams": "Merit"}
    ]
  },
  "jaipur": {
    "city": "Jaipur",
    "colleges": [
      {"name": "Manipal University Jaipur", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "JECRC University", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Poornima University", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Vivekananda Global University (VGU)", "fees": "₹1.2 Lakhs", "exams": "Merit / VGUCET"},
      {"name": "Amity University Jaipur", "fees": "₹1.8 Lakhs", "exams": "Merit"},
      {"name": "JK Lakshmipat University (JKLU)", "fees": "₹1.6 Lakhs", "exams": "Merit"},
      {"name": "UEM Jaipur", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Jaipur National University", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Suresh Gyan Vihar University", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Poddar International College", "fees": "₹80,000", "exams": "Merit"}
    ]
  },
  "rajasthan": {
    "city": "Rajasthan",
    "colleges": [
      {"name": "Manipal University Jaipur", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "Mody University (Sikar)", "fees": "₹2.2 Lakhs", "exams": "Merit"},
      {"name": "JECRC University, Jaipur", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Poornima University, Jaipur", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Vivekananda Global University (VGU)", "fees": "₹1.2 Lakhs", "exams": "Merit / VGUCET"},
      {"name": "Amity University Jaipur", "fees": "₹1.8 Lakhs", "exams": "Merit"},
      {"name": "Sir Padampat Singhania University (Udaipur)", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Mohanlal Sukhadia University (Udaipur)", "fees": "₹50,000", "exams": "Merit"},
      {"name": "Jaipur National University", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Suresh Gyan Vihar University", "fees": "₹1.0 Lakhs", "exams": "Merit"}
    ]
  },
  "indore": {
    "city": "Indore",
    "colleges": [
      {"name": "IIM Indore (IPMAT)", "fees": "₹5.0 Lakhs", "exams": "IPMAT"},
      {"name": "NMIMS Indore", "fees": "₹2.8 Lakhs", "exams": "NPAT"},
      {"name": "Prestige Institute of Management", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "IPS Academy", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Acropolis Institute", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Symbiosis University of Applied Sciences", "fees": "₹2.5 Lakhs", "exams": "Merit"},
      {"name": "Medicaps University", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Renaissance University", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Sage University", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Shri Vaishnav Vidyapeeth", "fees": "₹90,000", "exams": "Merit"}
    ]
  },
  "mumbai": {
    "city": "Mumbai",
    "colleges": [
      {"name": "NMIMS Anil Surendra Modi School of Commerce", "fees": "₹3.5 Lakhs", "exams": "NPAT"},
      {"name": "Jai Hind College", "fees": "₹50,000", "exams": "Merit"},
      {"name": "Mithibai College", "fees": "₹60,000", "exams": "CUET / Merit"},
      {"name": "H.R. College of Commerce", "fees": "₹45,000", "exams": "Merit"},
      {"name": "Usha Pravin Gandhi College", "fees": "₹55,000", "exams": "Merit"},
      {"name": "St. Xavier's College", "fees": "₹40,000", "exams": "Entrance Test"},
      {"name": "K.J. Somaiya College of Arts & Commerce", "fees": "₹60,000", "exams": "Merit"},
      {"name": "Sydenham College", "fees": "₹30,000", "exams": "Merit"},
      {"name": "R.A. Podar College", "fees": "₹35,000", "exams": "Merit"},
      {"name": "Amity University Mumbai", "fees": "₹2.5 Lakhs", "exams": "Merit"}
    ]
  },
  "bangalore": {
    "city": "Bangalore",
    "colleges": [
      {"name": "Christ University", "fees": "₹2.5 Lakhs", "exams": "CUET (Christ)"},
      {"name": "NMIMS Bangalore", "fees": "₹3.0 Lakhs", "exams": "NPAT"},
      {"name": "Jain University", "fees": "₹2.0 Lakhs", "exams": "JET"},
      {"name": "Mount Carmel College", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "St. Joseph's College of Commerce", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Kristu Jayanti College", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "PES University", "fees": "₹2.5 Lakhs", "exams": "PESSAT"},
      {"name": "MS Ramaiah College", "fees": "₹1.8 Lakhs", "exams": "Merit"},
      {"name": "IFIM College", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "Alliance University", "fees": "₹2.5 Lakhs", "exams": "AUSAT"}
    ]
  },
  "chennai": {
    "city": "Chennai",
    "colleges": [
      {"name": "Madras Christian College (MCC)", "fees": "₹40,000", "exams": "Merit"},
      {"name": "Loyola College", "fees": "₹45,000", "exams": "Merit"},
      {"name": "Stella Maris College", "fees": "₹35,000", "exams": "Merit"},
      {"name": "SRM Institute of Science and Technology", "fees": "₹1.5 Lakhs", "exams": "SRMJEEE"},
      {"name": "VELS University", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Hindustan Institute of Technology", "fees": "₹1.3 Lakhs", "exams": "Merit"},
      {"name": "Ethiraj College for Women", "fees": "₹30,000", "exams": "Merit"},
      {"name": "DG Vaishnav College", "fees": "₹35,000", "exams": "Merit"},
      {"name": "Crescent Institute", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "SSN College", "fees": "₹1.1 Lakhs", "exams": "Merit"}
    ]
  },
  "kolkata": {
    "city": "Kolkata",
    "colleges": [
      {"name": "St. Xavier's College", "fees": "₹80,000", "exams": "Merit"},
      {"name": "J.D. Birla Institute", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Bhawanipur Education Society", "fees": "₹60,000", "exams": "Merit"},
      {"name": "Scottish Church College", "fees": "₹50,000", "exams": "Merit"},
      {"name": "Techno India University", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "Amity University Kolkata", "fees": "₹2.0 Lakhs", "exams": "Merit"},
      {"name": "UEM Kolkata", "fees": "₹1.1 Lakhs", "exams": "Merit"},
      {"name": "Sister Nivedita University", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Brainware University", "fees": "₹90,000", "exams": "Merit"},
      {"name": "Adamas University", "fees": "₹1.1 Lakhs", "exams": "Merit"}
    ]
  },
  "dehradun": {
    "city": "Dehradun",
    "colleges": [
      {"name": "UPES Dehradun", "fees": "₹2.5 Lakhs", "exams": "Merit / UPESMET"},
      {"name": "Graphic Era University", "fees": "₹1.8 Lakhs", "exams": "Merit"},
      {"name": "DIT University", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Uttaranchal University", "fees": "₹1.2 Lakhs", "exams": "Merit"},
      {"name": "IMS Unison University", "fees": "₹1.4 Lakhs", "exams": "Merit"},
      {"name": "Doon Business School", "fees": "₹1.6 Lakhs", "exams": "Merit"},
      {"name": "BFIT Group of Institutions", "fees": "₹80,000", "exams": "Merit"},
      {"name": "Swami Rama Himalayan University", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Tula's Institute", "fees": "₹90,000", "exams": "Merit"},
      {"name": "ICFAI University Dehradun", "fees": "₹1.1 Lakhs", "exams": "Merit"}
    ]
  },
  "chandigarh": {
    "city": "Chandigarh",
    "colleges": [
      {"name": "Goswami Ganesh Dutta (GGDSD) College", "fees": "₹40,000", "exams": "Merit"},
      {"name": "DAV College", "fees": "₹35,000", "exams": "Merit"},
      {"name": "MCM DAV College for Women", "fees": "₹35,000", "exams": "Merit"},
      {"name": "Post Graduate Government College (PGGC)", "fees": "₹25,000", "exams": "Merit"},
      {"name": "Chandigarh University (Mohali)", "fees": "₹1.6 Lakhs", "exams": "CUCET"},
      {"name": "Chitkara University (Rajpura)", "fees": "₹1.5 Lakhs", "exams": "Merit"},
      {"name": "Panjab University (UBS affiliated)", "fees": "₹50,000", "exams": "PU MET"},
      {"name": "University of Fraser Valley (Chandigarh Campus)", "fees": "₹4.0 Lakhs", "exams": "Merit"},
      {"name": "Rayat Bahra University", "fees": "₹1.0 Lakhs", "exams": "Merit"},
      {"name": "Sri Guru Gobind Singh College", "fees": "₹30,000", "exams": "Merit"}
    ]
  }
};

const date = "2026-05-10";

for (const slug in data) {
  const info = data[slug];
  const title = `Top 10 BBA Colleges in ${info.city} 2026: Fees, Placements & Admission`;
  const filename = path.join(__dirname, 'posts', `top-10-bba-colleges-${slug}-2026.md`);
  
  let markdown = `---
title: "${title}"
date: "${date}"
description: "Discover the top 10 BBA colleges in ${info.city} for 2026. Get detailed information on fees, admission processes, and placement records to make the best career choice."
keywords: ["top 10 bba colleges in ${info.city} 2026", "best bba colleges in ${info.city}", "bba admission 2026 ${info.city}", "bba fees ${info.city}"]
---

Finding the right undergraduate management program is the first step toward a successful career in business. ${info.city} is home to some of the finest educational institutions in the country, offering state-of-the-art infrastructure, excellent faculty, and outstanding placement records.

Here is a curated list of the **Top 10 BBA Colleges in ${info.city} for 2026** to help you make an informed decision.

---

## 🏆 Top 10 BBA Colleges in ${info.city} (2026 Rankings)

`;

  info.colleges.forEach((col, index) => {
    markdown += `### ${index + 1}. ${col.name}
- **Approximate Annual Fees:** ${col.fees}
- **Entrance Exam / Admission Process:** ${col.exams}
- **Highlight:** Known for strong academic foundations and excellent corporate connections.

`;
  });

  markdown += `---

## 📉 Summary Comparison Table

| Rank | College Name | Entrance Exam | Annual Fees |
| :--- | :--- | :--- | :--- |
`;

  info.colleges.forEach((col, index) => {
    markdown += `| **${index + 1}** | **${col.name}** | ${col.exams} | ${col.fees} |
`;
  });

  markdown += `

---

## 🚀 Pro-Tip for 2026 Admissions
Admissions to the top BBA programs are highly competitive. It is advisable to track the admission deadlines for entrance exams like CUET, SET, NPAT, or IPU CET early on. Many colleges also offer merit-based admissions based on Class 12th board results, so maintaining a strong academic record is crucial.

---

## 🔗 Related Resources
- [Best BBA Specializations for 2026](/blog/bba-specializations-skills-salary-2026-guide)
- [BBA vs BCom vs BMS: Career Comparison](/blog/bba-vs-bcom-vs-bms-career-comparison)
- [Direct BBA Admission 2026](/blog/direct-bba-admission-2026-management-quota)

---

## 📞 Need Admission Assistance in ${info.city}?
Securing a seat in a top BBA college can be overwhelming. From tracking cutoffs to preparing for personal interviews, expert guidance makes a huge difference.

[👉 Build My BBA Roadmap](/inquiry) | [💬 Schedule a Private Profile Review](/inquiry)

---

### 🚀 Boost Your Preparation
Looking for more resources? **[Explore Our Premium Mock Test Series 2026](https://www.careerwithmohit.online/tools/mock-tests)** to get real-time exam experience and detailed performance analytics.
`;

  fs.writeFileSync(filename, markdown);
  console.log(`Created ${filename}`);
}
