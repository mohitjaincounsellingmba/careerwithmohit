---
title: 'CAT DILR Important Questions with Solutions 2026: Set-Wise Practice Guide'
date: '2026-08-03'
description: >-
  Master CAT 2026 DILR with important questions and step-by-step solutions. Practice high-probability sets on Games & Tournaments, Matrix Arrangements, and Quant-based DI.
keywords:
  - cat dilr important questions with solutions
  - cat dilr practice sets with solutions 2026
  - dilr questions for cat exam
  - how to solve dilr sets in cat
  - cat logical reasoning questions with solutions
  - cat data interpretation practice questions
  - cat 2026 dilr strategy
  - games and tournaments cat dilr
  - quant based dilr cat questions
  - Noida Colleges
  - Best Colleges in Noida
  - Noida Admissions 2026
  - Direct Admission in Noida
  - Delhi NCR Colleges
  - Best Colleges in Delhi NCR
  - Direct Admission Delhi NCR
  - Delhi NCR College Counselling
faqs:
  - question: How many sets should I attempt in CAT 2026 DILR to score 99 percentile?
    answer: >-
      In CAT DILR (typically 20 questions across 4 sets of 5 questions each), accurately solving **2 complete sets (10 questions)** with 95%+ accuracy usually secures a **98-99+ percentile**. Attempting 2.5 to 3 sets accurately guarantees a 99.5+ score.
  - question: Which topics are most important for CAT DILR 2026?
    answer: >-
      The highest-probability DILR topics in CAT include **Games & Tournaments**, **Matrix & Grid Arrangements**, **Quant-based LR (Maxima & Minima)**, **Scheduling & Routes**, and **Table/Chart-based Reasoning with missing data**.
  - question: Can a non-engineer score 99+ percentile in CAT DILR?
    answer: >-
      Yes! CAT DILR tests **structured logical deduction, systematic table creation, and case analysis** rather than advanced engineering mathematics. Consistent practice of 200+ varied sets is key for both engineers and non-engineers.
  - question: How should I choose which DILR set to attempt first in the exam?
    answer: >-
      Spend the first **4–5 minutes** scanning all 4 sets. Pick sets with **explicit numerical constraints, familiar structures (like round-robin tournaments or scheduling)**, and fewer conditional variables. Avoid sets with highly ambiguous 'if-then' conditions in your first attempt.
---

The **Data Interpretation and Logical Reasoning (DILR)** section is widely considered the make-or-break segment of the Common Admission Test ([CAT Exam 2026](/posts/all-about-cat-exam)). While Verbal Ability tests language nuance and Quantitative Aptitude rewards formula familiarity, **DILR tests raw analytical problem-solving under extreme time pressure**.

To score a **99+ percentile in CAT 2026 DILR**, you do not need to solve all 20 questions. Mastering the art of **selecting the right sets and deploying structured tabular methods** is what separates IIM call-holders from the rest. For a holistic preparation overview, check out our [10 Proven Tips to Crack CAT 2026](/posts/10-tips-to-crack-cat-exam-2026).

In this comprehensive guide, we provide **three high-probability CAT-level DILR sets** with complete, step-by-step analytical solutions.

---

## 1. CAT DILR Section Pattern & Topic Weightage (2026)

Before diving into practice questions, understand the expected structural distribution of DILR in CAT 2026:

| Topic / Set Type | Expected Sets | Expected Questions | Key Competence Tested |
| :--- | :---: | :---: | :--- |
| **Games & Tournaments** | 1 Set | 5 Qs | Round-robin rules, knockouts, points tables, seeding |
| **Matrix Arrangements & Scheduling** | 1 Set | 5 Qs | Multi-variable matching, chronological sequencing |
| **Quant-Based LR (Maxima / Minima)** | 1 Set | 5 Qs | Set theory (Venn diagrams), optimization, extreme values |
| **Chart / Table-Based DI (Missing Data)** | 1 Set | 5 Qs | Ratio analysis, percentage growth, weighted averages |
| **Total Section Overview** | **4 Sets** | **20 Questions** | **40 Minutes Sectional Time Limit** |

---

## 2. Practice Set 1: Games & Tournaments (Logical Reasoning)

### **Set Directions (Questions 1 to 4):**
Five chess masters — **Ananya (A), Bhuvan (B), Chirag (C), Dev (D), and Esha (E)** — participated in a round-robin tournament where each player played exactly one game against every other player. 
* A **win** awards **2 points**, a **draw** awards **1 point**, and a **loss** awards **0 points**.
* At the end of the tournament, the final point totals were as follows: **A = 6 points, B = 5 points, C = 4 points, D = 3 points, and E = 2 points**.
* Exactly **two games** in the entire tournament ended in a **draw**.
* **Chirag (C)** did not lose any game against players who finished with lower total points than him.
* **Dev (D)** won his game against **Ananya (A)**.

---

### **Step-by-Step Analytical Deductions & Master Score Table**

1. **Total Number of Games Played:**
   $$\text{Total games} = \frac{5 \times 4}{2} = 10 \text{ games}.$$
   Total points distributed across 10 games = $10 \times 2 = 20 \text{ points}$.
   Let us verify: $6 + 5 + 4 + 3 + 2 = 20 \text{ points}$ (matches perfectly).

2. **Analyzing Draws:**
   * Each player plays 4 games. Maximum possible score is 8 points (4 wins).
   * **Esha (E)** scored 2 points in 4 games.
   * **Dev (D)** scored 3 points. Since D beat A (2 points), D earned 1 more point from the remaining 3 games $\implies$ **D drew exactly 1 game** and lost 2 games.
   * Let us construct the **W-D-L (Win-Draw-Loss)** record for each player:
     * **Ananya (A = 6 pts):** Lost to D (0 pts). To get 6 points in remaining 3 games against B, C, E, A must have **won all 3 games** (3W, 0D, 1L).
     * **Dev (D = 3 pts):** Won against A (2 pts). Must have 1 Draw and 2 Losses $\implies$ (1W, 1D, 2L).
     * **Chirag (C = 4 pts):** C did not lose against players with lower points (D and E). So against D and E, C scored points. Since A beat C (from A's record), C lost to A.
     * With 2 draws total in the tournament, let's identify the drawing pairs:
       * D has 1 draw. Who did D draw against?
       * Since C didn't lose to D or E, and C lost to A: C played B, D, E. If C beat D (2 pts) and beat E (2 pts), C would have 4 points and 0 draws (2W, 0D, 2L).
       * Consequently, the two draws in the tournament must be between **B, D, and E**.
       * Specifically: **B drew with D**, and **B drew with E** (giving B: 2W, 2D, 0L = 6 pts? No, B has 5 pts $\implies$ 2W, 1D, 1L).
       * Let us finalize the results grid (`W` = Row player beat Column player; `L` = Row lost to Column; `D` = Draw):

| Player | A | B | C | D | E | Total Points | W - D - L |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **A (Ananya)** | — | W | W | L | W | **6** | 3 - 0 - 1 |
| **B (Bhuvan)** | L | — | W | D | W | **5** | 2 - 1 - 1 |
| **C (Chirag)** | L | L | — | W | W | **4** | 2 - 0 - 2 |
| **D (Dev)** | W | D | L | — | L | **3** | 1 - 1 - 2 |
| **E (Esha)** | L | L | L | W | — | **2** | 1 - 0 - 3 |

*Wait, let us double check E's points:* In the table above, E beat D? If E beat D (2 pts) and lost to A, B, C, E gets 2 points! And D drew with B (1 pt), beat A (2 pts), lost to C and E $\implies$ D gets 3 points! Total draws = exactly 1 draw (B vs D)? But the question says *exactly two games ended in a draw*.
Let us adjust the 2 draws: **D drew with E (1 pt each)** and **B drew with E (1 pt each)**.
* Then **E (2 pts)** = 2 Draws (vs D, vs B) and 2 Losses (vs A, vs C).
* **D (3 pts)** = Beat A (2 pts), Drew with E (1 pt), Lost to B, C $\implies$ 3 points!
* **B (5 pts)** = Drew with E (1 pt), Beat C and D (4 pts), Lost to A $\implies$ 5 points!
* **C (4 pts)** = Beat D and E (4 pts), Lost to A and B $\implies$ 4 points!
* **A (6 pts)** = Beat B, C, E (6 pts), Lost to D $\implies$ 6 points!
* **This matrix satisfies 100% of the constraints!**

---

### **Questions & Solutions for Set 1**

#### **Q1. Which of the following players ended their game in a draw against Esha (E)?**
1. Ananya and Bhuvan  
2. Bhuvan and Chirag  
3. Bhuvan and Dev  
4. Chirag and Dev  

* **Correct Option:** **(3) Bhuvan and Dev**
* **Detailed Solution:** From our master analytical grid, Esha finished with 2 points and 0 wins. Her 2 points came from two drawn matches—one against Bhuvan (B) and one against Dev (D).

---

#### **Q2. How many matches did Chirag (C) win in the entire tournament?**
1. 1 match  
2. 2 matches  
3. 3 matches  
4. 0 matches  

* **Correct Option:** **(2) 2 matches**
* **Detailed Solution:** Chirag finished with 4 points with no draws. He won exactly 2 matches—against Dev (D) and Esha (E)—and lost his matches against Ananya (A) and Bhuvan (B).

---

#### **Q3. Who was the only player to defeat Ananya (A) in the tournament?**
1. Bhuvan (B)  
2. Chirag (C)  
3. Dev (D)  
4. Esha (E)  

* **Correct Option:** **(3) Dev (D)**
* **Detailed Solution:** Ananya scored 6 points by winning 3 matches (against B, C, and E) and losing exactly 1 match to Dev (D), as explicitly stated in the initial rules and confirmed by the points breakdown.

---

#### **Q4. What was the outcome of the match between Bhuvan (B) and Chirag (C)?**
1. Bhuvan won against Chirag  
2. Chirag won against Bhuvan  
3. The match ended in a draw  
4. Cannot be determined  

* **Correct Option:** **(1) Bhuvan won against Chirag**
* **Detailed Solution:** For Bhuvan to achieve 5 points (1 loss to A, 1 draw with E), he needed two wins (4 points). Those wins came against Chirag (C) and Dev (D). Hence, Bhuvan defeated Chirag.

---

## 3. Practice Set 2: Complex Matrix Arrangement & Scheduling (LR)

### **Set Directions (Questions 5 to 8):**
Four consulting managers — **Rohan, Neha, Vikram, and Pooja** — lead four distinct project verticals: **Strategy, Operations, IT Transformation, and Finance** (not necessarily in that order). Each project is implemented for a client located in a different city: **Mumbai, Bengaluru, Delhi, and Hyderabad**.
* The **Finance** project is not handled by Rohan and is not located in Mumbai.
* **Neha** handles the project in **Bengaluru**, but she does not lead **Operations**.
* The **Strategy** project is located in **Delhi**.
* **Vikram** leads the project located in **Hyderabad**, but he does not manage the **Finance** project.

---

### **Step-by-Step Table Construction & Deduction**

Let us map the four Managers, their Project Verticals, and their Client Cities using direct clues:
1. **Vikram** $\implies$ City: **Hyderabad**. Not Finance.
2. **Neha** $\implies$ City: **Bengaluru**. Not Operations.
3. Since Vikram is in Hyderabad and Neha is in Bengaluru, the remaining cities (**Delhi** and **Mumbai**) must belong to **Rohan** and **Pooja**.
4. Clue states: **Strategy** project is in **Delhi**.
5. Clue states: **Finance** is not in Mumbai and not handled by Rohan.
   * Who handles **Finance**?
   * It cannot be Vikram (explicitly ruled out).
   * It cannot be Rohan (explicitly ruled out).
   * Can it be in Delhi (Strategy is in Delhi)? No, Strategy is in Delhi.
   * Therefore, **Finance** must be located in **Bengaluru** (handled by **Neha**)!
6. Now let us determine the remaining verticals for Hyderabad, Delhi, and Mumbai:
   * We have four verticals: Strategy, Operations, IT Transformation, Finance.
   * Neha = Bengaluru = **Finance**.
   * Strategy = **Delhi**. Who is in Delhi? Rohan or Pooja?
   * Since Rohan does not handle Finance (already assigned to Neha), what about **Mumbai**?
   * We have two cities left: Delhi (Strategy) and Mumbai.
   * The remaining verticals are **Operations** and **IT Transformation**.
   * Who handles **Operations**? Vikram is in Hyderabad; can Vikram handle Operations? Yes!
   * Let us check all constraints:
     * **Rohan:** Must be in **Delhi** leading **Strategy** OR in **Mumbai** leading **IT Transformation** / **Operations**.
     * Let us check: If **Pooja** leads **Strategy (Delhi)**, then **Rohan** leads Mumbai (**IT Transformation** or **Operations**).
     * Notice: Exactly one unique allocation satisfies all conditions cleanly:
       * **Rohan:** Delhi — **Strategy**
       * **Neha:** Bengaluru — **Finance**
       * **Vikram:** Hyderabad — **Operations**
       * **Pooja:** Mumbai — **IT Transformation**

| Manager | Project Vertical | Client City |
| :--- | :--- | :--- |
| **Rohan** | Strategy | Delhi |
| **Neha** | Finance | Bengaluru |
| **Vikram** | Operations | Hyderabad |
| **Pooja** | IT Transformation | Mumbai |

---

### **Questions & Solutions for Set 2**

#### **Q5. Who leads the IT Transformation project?**
1. Rohan  
2. Neha  
3. Vikram  
4. Pooja  

* **Correct Option:** **(4) Pooja**
* **Detailed Solution:** From our deductive grid, Neha leads Finance (Bengaluru), Rohan leads Strategy (Delhi), and Vikram leads Operations (Hyderabad). Therefore, Pooja leads the IT Transformation project in Mumbai.

---

#### **Q6. In which city is the Operations project being implemented?**
1. Mumbai  
2. Hyderabad  
3. Delhi  
4. Bengaluru  

* **Correct Option:** **(2) Hyderabad**
* **Detailed Solution:** Vikram is based in Hyderabad and leads the Operations vertical.

---

#### **Q7. Which of the following combinations of Manager — Vertical — City is CORRECT?**
1. Rohan — Finance — Delhi  
2. Neha — Operations — Bengaluru  
3. Rohan — Strategy — Delhi  
4. Pooja — Strategy — Mumbai  

* **Correct Option:** **(3) Rohan — Strategy — Delhi**
* **Detailed Solution:** As derived in the master arrangement table, Rohan manages the Strategy project for the client in Delhi.

---

#### **Q8. If Vikram swaps his project vertical with Neha without changing their client cities, which vertical will be implemented in Bengaluru?**
1. Finance  
2. Operations  
3. Strategy  
4. IT Transformation  

* **Correct Option:** **(2) Operations**
* **Detailed Solution:** Currently, Neha is in Bengaluru leading Finance, while Vikram leads Operations in Hyderabad. If they swap their project verticals, Neha will handle **Operations** in Bengaluru.

---

## 4. Practice Set 3: Quant-Based DI (Table & Percentage Reasoning)

### **Set Directions (Questions 9 to 12):**
The table below displays the **Total Revenue (in INR Crores)** and the **Percentage of Revenue from International Operations** for a software company across four consecutive financial years:

| Financial Year | Total Revenue (in ₹ Crores) | % Revenue from International Operations |
| :---: | :---: | :---: |
| **FY 2023** | 400 | 45% |
| **FY 2024** | 500 | 50% |
| **FY 2025** | 600 | 60% |
| **FY 2026** | 800 | 65% |

---

### **Step-by-Step Pre-Calculation Table (Domestic vs. International)**

In CAT DI sets, spending **90 seconds** to calculate hidden absolute values before reading the questions saves significant time:

$$\text{International Revenue} = \text{Total Revenue} \times \frac{\% \text{ International}}{100}$$
$$\text{Domestic Revenue} = \text{Total Revenue} - \text{International Revenue}$$

| Financial Year | Total Revenue (₹ Cr) | International Revenue (₹ Cr) | Domestic Revenue (₹ Cr) |
| :---: | :---: | :---: | :---: |
| **FY 2023** | 400 | $400 \times 45\% = \mathbf{180}$ | $400 - 180 = \mathbf{220}$ |
| **FY 2024** | 500 | $500 \times 50\% = \mathbf{250}$ | $500 - 250 = \mathbf{250}$ |
| **FY 2025** | 600 | $600 \times 60\% = \mathbf{360}$ | $600 - 360 = \mathbf{240}$ |
| **FY 2026** | 800 | $800 \times 65\% = \mathbf{520}$ | $800 - 520 = \mathbf{280}$ |

---

### **Questions & Solutions for Set 3**

#### **Q9. What is the absolute percentage increase in International Revenue from FY 2023 to FY 2026?**
1. 144.44%  
2. 188.88%  
3. 200.00%  
4. 165.50%  

* **Correct Option:** **(2) 188.88%**
* **Detailed Solution:**
  * International Revenue in FY 2023 = ₹180 Crores.
  * International Revenue in FY 2026 = ₹520 Crores.
  * Absolute Increase = $520 - 180 = 340 \text{ Crores}$.
  * Percentage Increase = $\frac{340}{180} \times 100 = \frac{34}{18} \times 100 = 1.8888 \times 100 = \mathbf{188.88\%}$.

---

#### **Q10. In which financial year was the Domestic Revenue the lowest?**
1. FY 2023  
2. FY 2024  
3. FY 2025  
4. FY 2026  

* **Correct Option:** **(1) FY 2023**
* **Detailed Solution:** Looking at our Domestic Revenue column: FY 2023 = ₹220 Cr, FY 2024 = ₹250 Cr, FY 2025 = ₹240 Cr, FY 2026 = ₹280 Cr. The lowest Domestic Revenue was recorded in **FY 2023** (₹220 Crores).

---

#### **Q11. What is the ratio of Total Domestic Revenue across all four years to Total International Revenue across all four years?**
1. 99 : 131  
2. 11 : 15  
3. 45 : 62  
4. 89 : 120  

* **Correct Option:** **(1) 99 : 131**
* **Detailed Solution:**
  * Total Domestic Revenue (4 years) = $220 + 250 + 240 + 280 = \mathbf{990} \text{ Crores}$.
  * Total International Revenue (4 years) = $180 + 250 + 360 + 520 = \mathbf{1310} \text{ Crores}$.
  * Required Ratio = $\frac{990}{1310} = \mathbf{99 : 131}$.

---

#### **Q12. What is the compound annual growth rate (approximate simple annual average growth) of Total Revenue from FY 2024 to FY 2026?**
1. 25.0%  
2. 30.0%  
3. 33.3%  
4. 60.0%  

* **Correct Option:** **(2) 30.0%**
* **Detailed Solution:**
  * Total Revenue in FY 2024 = ₹500 Crores; FY 2026 = ₹800 Crores.
  * Total growth over 2 years = $\frac{800 - 500}{500} \times 100 = \frac{300}{500} \times 100 = 60\%$.
  * Average annual growth across the 2-year span = $\frac{60\%}{2} = \mathbf{30.0\%}$.

---

## 5. 5 Golden Rules to Solve CAT 2026 DILR Sets

1. **The 5-Minute Selection Rule:** Never start solving the first set you see. Read all 4 sets in the first 5 minutes and categorize them as *Easy*, *Moderate*, or *Time-Trap*.
2. **Always Draw a Standardized Grid:** For arrangements and tournaments, visual tables prevent working memory overload and double-counting.
3. **Identify "Anchor" Clues:** Start with definitive positive statements (e.g., *"Dev won against Ananya"*) rather than negative conditions (*"Rohan is not in Mumbai"*).
4. **Use Options in DI:** In calculation-intensive Data Interpretation questions, inspect option closeness before calculating decimal expansions.
5. **Know When to Abort:** If you spend 8 minutes on a set without unlocking at least 3 consecutive questions, cut your losses and switch sets immediately.

---

### 🚀 Boost Your Preparation
Looking to test your speed and accuracy under real exam simulation?  
👉 **[Explore Our Premium MBA Mock Test Series 2026](/mock-tests)** to practice full-length, sectional, and topic-wise AI-evaluated CAT mock tests.

---

## 6. Related Resources & MBA Guidance
* [All About CAT Exam 2026: Pattern, Syllabus & Registration](/posts/all-about-cat-exam)
* [10 Proven Tips to Crack CAT 2026 from Toppers](/posts/10-tips-to-crack-cat-exam-2026)
* [All About IIM Colleges: Fees, Placements & Admission Process 2026](/posts/all-about-iim-colleges-placements-fees-selection-2026)
* [IIM Cutoff 2026-28: Category-Wise Call Percentiles](/posts/all-iim-cut-off-2026-28-admission-mba-pgdm)
