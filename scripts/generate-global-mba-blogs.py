import os

colleges = [
  # USA
  {"name": "Harvard Business School", "slug": "harvard-business-school-mba-review-2026", "location": "USA", "fee": "\u20b965 Lakhs - \u20b970 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.5 Crores+"},
  {"name": "Stanford Graduate School of Business", "slug": "stanford-gsb-mba-review-2026", "location": "USA", "fee": "\u20b966 Lakhs - \u20b972 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.6 Crores+"},
  {"name": "The Wharton School", "slug": "wharton-school-mba-review-2026", "location": "USA", "fee": "\u20b968 Lakhs - \u20b975 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.5 Crores+"},
  {"name": "MIT Sloan School of Management", "slug": "mit-sloan-mba-review-2026", "location": "USA", "fee": "\u20b968 Lakhs - \u20b972 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.4 Crores+"},
  {"name": "Columbia Business School", "slug": "columbia-business-school-mba-review-2026", "location": "USA", "fee": "\u20b967 Lakhs - \u20b974 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.4 Crores+"},
  {"name": "Chicago Booth School of Business", "slug": "chicago-booth-mba-review-2026", "location": "USA", "fee": "\u20b965 Lakhs - \u20b970 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.4 Crores+"},
  {"name": "Kellogg School of Management", "slug": "kellogg-school-of-management-mba-review-2026", "location": "USA", "fee": "\u20b964 Lakhs - \u20b971 Lakhs/year", "exam": "GMAT/GRE", "ctc": "\u20b91.3 Crores+"},

  # Europe & UK
  {"name": "INSEAD", "slug": "insead-mba-review-2026", "location": "France/Singapore", "fee": "\u20b988 Lakhs - \u20b995 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b91.1 Crores+"},
  {"name": "London Business School (LBS)", "slug": "london-business-school-lbs-mba-review-2026", "location": "UK", "fee": "\u20b91.1 Crores - \u20b91.2 Crores (Total)", "exam": "GMAT/GRE", "ctc": "\u20b91.2 Crores+"},
  {"name": "HEC Paris", "slug": "hec-paris-mba-review-2026", "location": "France", "fee": "\u20b985 Lakhs - \u20b990 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b91 Crore+"},
  {"name": "IESE Business School", "slug": "iese-business-school-mba-review-2026", "location": "Spain", "fee": "\u20b985 Lakhs - \u20b995 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b91 Crore+"},
  {"name": "University of Oxford (Sa\u00efd)", "slug": "oxford-said-mba-review-2026", "location": "UK", "fee": "\u20b975 Lakhs - \u20b980 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b995 Lakhs+"},
  {"name": "University of Cambridge (Judge)", "slug": "cambridge-judge-mba-review-2026", "location": "UK", "fee": "\u20b970 Lakhs - \u20b975 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b990 Lakhs+"},
  {"name": "IMD Business School", "slug": "imd-business-school-mba-review-2026", "location": "Switzerland", "fee": "\u20b990 Lakhs - \u20b998 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b91.2 Crores+"},
  {"name": "SDA Bocconi", "slug": "sda-bocconi-mba-review-2026", "location": "Italy", "fee": "\u20b965 Lakhs - \u20b970 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b985 Lakhs+"},

  # Canada
  {"name": "Rotman School of Management", "slug": "rotman-school-of-management-mba-review-2026", "location": "Canada", "fee": "\u20b982 Lakhs - \u20b990 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b970 Lakhs+"},
  {"name": "Ivey Business School", "slug": "ivey-business-school-mba-review-2026", "location": "Canada", "fee": "\u20b975 Lakhs - \u20b980 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b975 Lakhs+"},
  {"name": "Desautels Faculty of Management (McGill)", "slug": "mcgill-desautels-mba-review-2026", "location": "Canada", "fee": "\u20b960 Lakhs - \u20b968 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b965 Lakhs+"},
  {"name": "Schulich School of Business", "slug": "schulich-school-of-business-mba-review-2026", "location": "Canada", "fee": "\u20b965 Lakhs - \u20b972 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b960 Lakhs+"},
  {"name": "Smith School of Business", "slug": "smith-school-of-business-queens-mba-review-2026", "location": "Canada", "fee": "\u20b962 Lakhs - \u20b970 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b965 Lakhs+"},

  # Asia-Pacific
  {"name": "National University of Singapore (NUS)", "slug": "nus-singapore-mba-review-2026", "location": "Singapore", "fee": "\u20b955 Lakhs - \u20b965 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b965 Lakhs+"},
  {"name": "Nanyang Business School (NTU)", "slug": "ntu-nanyang-mba-review-2026", "location": "Singapore", "fee": "\u20b950 Lakhs - \u20b960 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b960 Lakhs+"},
  {"name": "HKUST Business School", "slug": "hkust-business-school-mba-review-2026", "location": "Hong Kong", "fee": "\u20b962 Lakhs - \u20b968 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b965 Lakhs+"},
  {"name": "Melbourne Business School", "slug": "melbourne-business-school-mba-review-2026", "location": "Australia", "fee": "\u20b955 Lakhs - \u20b965 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b960 Lakhs+"},
  {"name": "ISB (Indian School of Business)", "slug": "isb-indian-school-of-business-mba-review-2026", "location": "India", "fee": "\u20b938 Lakhs - \u20b942 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b934 Lakhs+"},

  # Germany
  {"name": "Mannheim Business School", "slug": "mannheim-business-school-mba-review-2026", "location": "Germany", "fee": "\u20b938 Lakhs - \u20b942 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b975 Lakhs+"},
  {"name": "ESMT Berlin", "slug": "esmt-berlin-mba-review-2026", "location": "Germany", "fee": "\u20b940 Lakhs - \u20b945 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b970 Lakhs+"},
  {"name": "WHU \u2013 Otto Beisheim School of Management", "slug": "whu-otto-beisheim-mba-review-2026", "location": "Germany", "fee": "\u20b939 Lakhs - \u20b944 Lakhs (Total)", "exam": "GMAT/GRE", "ctc": "\u20b972 Lakhs+"}
]

import os

posts_dir = os.path.join(os.getcwd(), 'posts')
os.makedirs(posts_dir, exist_ok=True)

for college in colleges:
    content = f"""---
title: "{college['name']} MBA Review 2026: Fees in INR, Placements & Admission"
date: "2026-04-14"
description: "Planning to study at {college['name']}? Get a complete review of the MBA program in 2026, including total fees converted to INR, admission criteria, and placement reports."
keywords: ["{college['name']} MBA 2026", "{college['name']} MBA fees in INR", "Top MBA in {college['location']}", "MBA admissions 2026", "Study MBA abroad scholarships"]
---

Pursuing an MBA from a global top-tier business school is a transformative career milestone. **{college['name']}**, located in {college['location']}, stands out as one of the most prestigious institutions globally, shaping the business leaders of tomorrow. 

For Indian aspirants planning their 2026 intake, understanding the financial commitment in **Indian Rupees (INR)** and evaluating the return on investment (ROI) is crucial. Here is the uncompromised review of the {college['name']} MBA program.

---

## 🏛️ Program Overview

{college['name']} offers a rigorous MBA program characterized by a hyper-collaborative environment, global networking opportunities, and an incredibly diverse cohort. The curriculum focuses strongly on leadership, real-world case studies, and experiential learning.

| Feature | Details |
| :--- | :--- |
| **Location** | {college['location']} |
| **Standardized Test** | {college['exam']} |
| **Average Work Experience** | 4 - 6 Years |
| **Global Recognition** | Tier 1 / Elite |

---

## 💰 Fees Breakdown (Converted to INR)

Understanding the true cost of an MBA abroad involves tuition fees, living expenses, and miscellaneous costs. The estimated costs for the upcoming 2026 academic year are below:

- **Estimated Tuition Fees:** **{college['fee']}**
- **Living Expenses (Approx. per year):** ₹15 Lakhs - ₹25 Lakhs (depending on lifestyle and local currency rates)
- **Books & Supplies:** ₹2 Lakhs - ₹3 Lakhs
- **Total Estimated Budget:** Expect the total expenditure to add an additional 20-30% on top of the tuition fees.

*Note: Currency conversion rates fluctuate. The above figures in INR are highly accurate estimates for 2025-2026 planning.*

---

## 🚀 Placements & ROI

Graduates from {college['name']} are highly sought after by elite consulting firms, investment banks, and big tech companies (MBB - McKinsey, BCG, Bain, FAANG). 

- **Estimated Average Package:** **{college['ctc']}** (Base salary + Sign-on bonus in INR equivalent)
- **Top Sectors:** Management Consulting, Finance/PE/VC, Technology, Healthcare
- **Employment Rate:** 90%+ within 3 months of graduation

---

## 🎯 Admission Strategy for Indian Applicants

Getting into {college['name']} requires more than just a stellar {college['exam']} score. The admissions committee actively looks for:
1. **Leadership Impact:** Demonstrated ability to lead teams, drive change, and overcome professional challenges.
2. **Clear Career Vision:** A logical trajectory post-MBA. Why {college['name']}?
3. **Academic Rigor:** Strong undergraduate grades and quantitative capability.
4. **Diversity:** Unique perspectives from varied industries and backgrounds.

### Steps to Apply
- Prepare and conquer the **{college['exam']}**. Ensure your score is well above the median for Indian applicants.
- Draft compelling specific essays that highlight your unique narrative.
- Secure strong Letters of Recommendation (LORs) from direct supervisors.
- Prepare rigorously for the alumni/admissions committee interview.

---

## 📞 Get Expert Admission Strategy for Global MBAs
Drafting the perfect application for global elite schools like {college['name']} takes precision. Our experts help you curate a winning narrative, tackle the essays, and conquer the interviews.

[👉 Consult Mohit Jain for Global MBA Strategy](/inquiry) | [💬 Chat with us on WhatsApp](/inquiry)
"""
    file_path = os.path.join(posts_dir, f"{college['slug']}.md")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {file_path}")
