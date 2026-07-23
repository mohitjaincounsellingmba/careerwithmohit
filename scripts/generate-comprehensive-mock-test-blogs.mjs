import fs from 'fs';
import path from 'path';
import { EXAM_CONFIGS } from '../lib/mock-test-data.ts';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Detailed exam FAQs from optimize-mock-test-seo.mjs
const DETAILED_FAQS = {
  afcat: [
    { question: "What is the exam pattern for AFCAT 2026?", answer: "AFCAT 2026 is an online computer-based exam consisting of 100 questions carrying 300 marks. The sections include General Awareness, Verbal Ability in English, Numerical Ability, Reasoning, and Military Aptitude." },
    { question: "Is there negative marking in the AFCAT exam?", answer: "Yes, AFCAT has a negative marking scheme. Candidates get +3 marks for each correct answer and -1 mark for each incorrect answer. Unattempted questions carry zero marks." },
    { question: "What is a good score to clear the AFCAT cutoff?", answer: "A score of 150-165 out of 300 is usually the cutoff to clear the online written exam. To ensure a place in the final merit list after SSB, a score of 180+ is highly recommended." }
  ],
  bitsat: [
    { question: "Is there a bonus section in the BITSAT exam?", answer: "Yes, if a candidate answers all 130 questions of the BITSAT exam (without skipping) and has time remaining, they can attempt 12 bonus questions (4 each in Physics, Chemistry, and Mathematics)." },
    { question: "What is a good score in BITSAT 2026?", answer: "A score above 270+ (out of 390) is generally safe for securing admission into top branches at BITS Pilani campus, whereas 240+ can fetch you branches at Goa and Hyderabad campuses." },
    { question: "Are English and Logical Reasoning important for BITSAT?", answer: "Yes, English Proficiency and Logical Reasoning account for 30 questions (90 marks) out of the total 130 questions. This section is often the differentiator for high-percentile scores." }
  ],
  bpsc: [
    { question: "What is the pattern of BPSC Prelims?", answer: "BPSC Prelims is a qualifying offline test consisting of 150 objective questions on General Studies (GS) carrying 150 marks, with a duration of 2 hours." },
    { question: "Is there negative marking in the BPSC Prelims exam?", answer: "Yes, BPSC has a negative marking of -0.33 marks (1/3rd) for every incorrect answer. Candidates must attempt questions carefully." },
    { question: "What are the key areas to focus on for BPSC GS?", answer: "Candidates should focus heavily on Bihar Special GK, General Science, Indian History & Culture, and National/International Current Affairs, which carry the maximum weightage in BPSC Prelims." }
  ],
  cat: [
    { question: "What is the pattern of the CAT 2026 exam?", answer: "CAT 2026 is a 120-minute computer-based test with 3 sections: VARC (24 questions), DILR (20 questions), and Quantitative Ability (22 questions)." },
    { question: "Is there negative marking in CAT 2026?", answer: "Yes, there is a penalty of -1 mark for each incorrect multiple-choice question (MCQ). However, there is no negative marking for non-MCQs (TITA questions)." },
    { question: "What is a good score in CAT to get into top IIMs?", answer: "A raw score of 85+ (out of 198) is typically required to secure a 99+ percentile, which is the benchmark for getting call letters from the top 3 IIMs (A, B, C)." }
  ],
  cds: [
    { question: "What sections are tested in the UPSC CDS exam?", answer: "UPSC CDS for IMA, AFA, and INA consists of three papers: English, General Knowledge, and Elementary Mathematics (100 marks each). For OTA, only English and General Knowledge are mandatory." },
    { question: "Is there negative marking in the CDS exam?", answer: "Yes, UPSC CDS has a negative marking of -0.33 (1/3rd) of the marks assigned to each question for every wrong response." },
    { question: "What is a good score to clear the CDS written exam?", answer: "A score of 120-130+ out of 300 is usually safe to clear the written cutoff for IMA, while 100+ out of 200 is sufficient for the OTA cutoff." }
  ],
  clat: [
    { question: "How many questions are in CLAT 2026?", answer: "CLAT UG 2026 consists of 120 multiple-choice questions to be solved in 2 hours (120 minutes)." },
    { question: "What is the marking scheme for the CLAT exam?", answer: "Each correct answer carries +1 mark, while every incorrect answer results in a penalty of -0.25 marks." },
    { question: "Which sections are tested in CLAT?", answer: "CLAT tests candidates across 5 sections: English Language, Current Affairs & GK, Legal Reasoning, Logical Reasoning, and Quantitative Techniques (Data Interpretation)." }
  ],
  ctet: [
    { question: "What is the pattern of CTET Paper 1?", answer: "CTET Paper 1 consists of 150 multiple-choice questions carrying 150 marks with a duration of 150 minutes. The sections are Child Development & Pedagogy, EVS, Mathematics, Language I, and Language II (30 questions each)." },
    { question: "What is the qualifying marks for the CTET exam?", answer: "General category candidates must score at least 60% (90 out of 150 marks) to qualify CTET. For reserved category (SC/ST/OBC) candidates, the qualifying score is 55% (82 out of 150 marks)." },
    { question: "Is there negative marking in CTET?", answer: "No, there is no negative marking in the CTET exam. Candidates are advised to attempt all 150 questions." }
  ],
  cuet: [
    { question: "What is the structure of the CUET UG General Test?", answer: "The CUET UG General Test features 60 questions, out of which candidates need to attempt 50 questions in 60 minutes. It covers GK, Current Affairs, Mental Ability, and Numerical Ability." },
    { question: "Is there negative marking in CUET UG?", answer: "Yes, CUET UG has negative marking. Each correct response gets +5 marks, while -1 mark is deducted for every incorrect response." },
    { question: "Which universities accept CUET UG scores?", answer: "Top Central Universities like Delhi University (DU), Banaras Hindu University (BHU), Jawaharlal Nehru University (JNU), and Jamia Millia Islamia accept CUET UG scores for undergraduate admission." }
  ],
  sat: [
    { question: "What is the format of the Digital SAT?", answer: "The Digital SAT consists of two sections: Reading and Writing (54 questions in 64 minutes) and Math (44 questions in 70 minutes). The total duration is 2 hours and 14 minutes." },
    { question: "What is a good score on the Digital SAT?", answer: "A total score of 1400+ out of 1600 is considered very competitive and places you in the top tier for admissions to major universities worldwide." },
    { question: "Is a calculator allowed on the Digital SAT Math section?", answer: "Yes, a built-in Desmos graphing calculator is available inside the Bluebook app for the entire Math section, and you can also bring an approved hand-held calculator." }
  ],
  dsssb: [
    { question: "What is the DSSSB PRT/TGT exam pattern?", answer: "The DSSSB TGT/PRT exam consists of 200 questions carrying 200 marks, to be solved in 2 hours. Part A covers general subjects (100 marks) and Part B covers teaching methodology/subject knowledge (100 marks)." },
    { question: "Is there negative marking in DSSSB exams?", answer: "Yes, there is a penalty of -0.25 marks for every wrong answer in DSSSB. There is no negative marking for unanswered questions." },
    { question: "What are the qualifying marks for DSSSB?", answer: "The minimum qualifying marks for the written exam are 40% for General, 35% for OBC (Delhi), and 30% for SC/ST/PH candidates in both Part A and Part B separately." }
  ],
  duolingo: [
    { question: "How long is the Duolingo English Test?", answer: "The Duolingo English Test (DET) is a 1-hour adaptive online test consisting of a 5-minute setup, a 45-minute graded adaptive test, and a 10-minute ungraded video interview." },
    { question: "What is the score scale for the Duolingo English Test?", answer: "DET is scored on a scale from 10 to 160 in 5-point increments. A score of 120+ is generally considered excellent for admission to top global universities." },
    { question: "How is DET different from IELTS or TOEFL?", answer: "DET can be taken online from home at any time, is cheaper, adaptive in nature, and results are available in 48 hours. IELTS and TOEFL are longer and typically taken at physical test centers." }
  ],
  gre: [
    { question: "How long is the new GRE General Test?", answer: "The new GRE General Test is 1 hour and 58 minutes long, consisting of Analytical Writing (1 essay), Quantitative Reasoning (27 questions), and Verbal Reasoning (27 questions)." },
    { question: "Is there negative marking in the GRE?", answer: "No, there is no negative marking in the GRE. Your score is based on the number of correct responses, so you should answer every question." },
    { question: "What is a good GRE score for MS and MBA programs?", answer: "A score of 320+ (out of 340) with a Quant score of 165+ is highly competitive for engineering and computer science programs, while a balanced 315+ is good for other fields." }
  ],
  ibps_clerk: [
    { question: "What is the pattern of IBPS Clerk Prelims?", answer: "IBPS Clerk Prelims is a 60-minute test consisting of 100 questions carrying 100 marks. The sections include English (30 Qs), Quantitative Aptitude (35 Qs), and Reasoning Ability (35 Qs) with 20 minutes allotted for each section." },
    { question: "Is there a sectional cutoff in IBPS Clerk?", answer: "Yes, candidates must clear both sectional cutoffs (separate cutoffs for English, Quant, and Reasoning) and the overall cutoff to qualify for the IBPS Clerk Mains exam." },
    { question: "Is there negative marking in the IBPS Clerk exam?", answer: "Yes, there is a penalty of -0.25 (1/4th) of the marks assigned to that question for every incorrect answer." }
  ],
  ibps_po: [
    { question: "What is the pattern of the IBPS PO Prelims exam?", answer: "IBPS PO Prelims features 100 questions (30 English, 35 Quant, 35 Reasoning) carrying 100 marks, to be solved in 60 minutes with a strict sectional time limit of 20 minutes each." },
    { question: "Does IBPS PO have sectional cutoffs?", answer: "Yes, you must pass in each of the three sections by securing minimum qualifying marks determined by IBPS, in addition to clearing the overall cutoff." },
    { question: "What is the marking scheme and negative marking in IBPS PO?", answer: "Each correct answer carries +1 mark. If you mark a wrong answer, a penalty of -0.25 marks is applied. Unattempted questions carry no penalty." }
  ],
  ielts: [
    { question: "What is the format of the IELTS Academic test?", answer: "IELTS Academic contains 4 sections: Listening (40 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes). The total test time is 2 hours and 45 minutes." },
    { question: "What is a good band score in IELTS Academic?", answer: "A band score of 7.0 or higher is generally considered excellent and is accepted by most top universities globally in the US, UK, Canada, and Australia." },
    { question: "Is there negative marking in the IELTS exam?", answer: "No, there is no negative marking in the IELTS exam. You are encouraged to attempt all questions in both the Listening and Reading modules." }
  ],
  jee_advanced: [
    { question: "What is the exam date and organizing body for JEE Advanced 2026?", answer: "JEE Advanced 2026 is scheduled to be held on May 17, 2026, organized by IIT Roorkee. Both Paper 1 and Paper 2 are mandatory." },
    { question: "Are both Paper 1 and Paper 2 compulsory for ranking?", answer: "Yes, both Paper 1 (morning shift) and Paper 2 (afternoon shift) are mandatory. Missing either paper results in disqualification." },
    { question: "Is there partial marking in JEE Advanced?", answer: "Yes, in multiple-correct option questions, candidates receive partial marks if they select a subset of correct answers with no incorrect options marked." }
  ],
  jee_main: [
    { question: "What is the marking scheme for JEE Main 2026?", answer: "JEE Main features +4 marks for correct answers and -1 mark for incorrect answers. This applies to both MCQs and Numerical Value Questions." },
    { question: "How many attempts are allowed for JEE Main?", answer: "Candidates can attempt JEE Main a maximum of 6 times over 3 consecutive years (twice a year, usually in January and April)." },
    { question: "What is a safe score in JEE Main for NIT computer science?", answer: "A percentile of 99.5+ (usually corresponding to a raw score of 200+ out of 300) is safe to secure admission to CSE branches in top NITs like Trichy, Surathkal, and Warangal." }
  ],
  lic_aao: [
    { question: "What is the pattern of the LIC AAO Prelims exam?", answer: "LIC AAO Prelims consists of 100 questions carrying 70 marks (English is qualifying only, 30 questions) with a 60-minute duration (20 minutes per section)." },
    { question: "Is the English section score counted in the LIC AAO Prelims ranking?", answer: "No, the English Language section is only qualifying in nature. Candidates must clear the minimum qualifying marks in English, but the ranking is based on Quant and Reasoning (total 70 marks)." },
    { question: "Is there negative marking in the LIC AAO exam?", answer: "No, there is no negative marking in the LIC AAO Prelims exam. Candidates can attempt all questions without fear of penalty." }
  ],
  nabard: [
    { question: "What is the pattern of the NABARD Grade A Prelims exam?", answer: "NABARD Grade A Prelims consists of 200 questions carrying 200 marks, to be solved in 120 minutes. It contains 8 sections, categorized into merit and qualifying sections." },
    { question: "What are the merit sections in NABARD Grade A Prelims?", answer: "The merit sections are General Awareness, Economic & Social Issues (ESI), and Agriculture & Rural Development (ARD). Shortlisting for Mains is based only on these sections (100 marks total)." },
    { question: "Is there negative marking in the NABARD Grade A exam?", answer: "Yes, there is a penalty of -0.25 (1/4th) of the marks assigned to that question for every incorrect response." }
  ],
  nda: [
    { question: "What is the exam pattern for UPSC NDA?", answer: "UPSC NDA written exam consists of two papers: Mathematics (120 questions, 300 marks) and General Ability Test (GAT - 150 questions, 600 marks). Both papers are conducted on the same day." },
    { question: "What is the marking scheme for NDA Math and GAT?", answer: "For Mathematics, each correct answer is +2.5 marks and negative marking is -0.83. For GAT, each correct answer is +4 marks and negative marking is -1.33." },
    { question: "What is the written cutoff for UPSC NDA?", answer: "The written exam cutoff varies between 340-360 out of 900 marks. In addition, candidates must score at least 25% in each of the two papers individually." }
  ],
  neet: [
    { question: "What is the total marks and duration for NEET UG 2026?", answer: "NEET UG is a 200-minute (3 hours and 20 minutes) exam with a total of 720 marks. Candidates must answer 180 out of 200 questions across Physics, Chemistry, Botany, and Zoology." },
    { question: "Is there negative marking in the NEET exam?", answer: "Yes, NEET has a negative marking scheme. Correct answers are awarded +4 marks, while incorrect answers receive -1 mark. Unattempted questions get 0 marks." },
    { question: "What score is required to get a free seat in government medical college via NEET?", answer: "Generally, a score of 610+ (out of 720) for general category students is required to secure an MBBS seat in a government medical college through the All India Quota." }
  ],
  nmat: [
    { question: "What is the pattern of NMAT 2026?", answer: "NMAT consists of 108 questions to be answered in 120 minutes. The sections are Language Skills (36 Qs, 28 mins), Quantitative Skills (36 Qs, 52 mins), and Logical Reasoning (36 Qs, 40 mins)." },
    { question: "Is there negative marking in the NMAT exam?", answer: "No, NMAT does not have negative marking. This makes it unique, allowing students to attempt all questions." },
    { question: "Which colleges accept NMAT scores?", answer: "The primary college is NMIMS (Mumbai, Bengaluru, Hyderabad). Other top colleges include SPJIMR, ISB, VIT University, and XIMB." }
  ],
  rbi_assistant: [
    { question: "What is the pattern of RBI Assistant Prelims?", answer: "RBI Assistant Prelims is a 60-minute online test with 100 questions (30 English, 35 Numerical Ability, 35 Reasoning) carrying 100 marks, with 20 minutes sectional time limit for each." },
    { question: "Is the cutoff high for the RBI Assistant exam?", answer: "Yes, RBI Assistant cutoffs are exceptionally high (often 90+ out of 100 for general category) due to a relatively easy paper and intense competition for RBI state offices." },
    { question: "Is there negative marking in RBI Assistant?", answer: "Yes, a penalty of -0.25 marks is applied for every wrong answer marked by the candidate." }
  ],
  rbi_grade_b: [
    { question: "What is the pattern of RBI Grade B Phase 1?", answer: "RBI Grade B Phase 1 is a 120-minute test carrying 200 marks. The sections are General Awareness (80 Qs), Reasoning (60 Qs), English (30 Qs), and Quantitative Aptitude (30 Qs)." },
    { question: "Why is clearing RBI Grade B Phase 1 considered difficult?", answer: "The difficulty level of the Quantitative Aptitude and Reasoning sections is extremely high (comparable to CAT), and candidates must clear both strict sectional cutoffs and overall cutoffs." },
    { question: "Is there sectional timing in RBI Grade B Phase 1?", answer: "Yes, candidates are given specific sectional timings to solve each section, and they cannot switch sections at will." }
  ],
  reet: [
    { question: "What is the pattern of REET Level 1?", answer: "REET Level 1 (for Primary Teachers) consists of 150 questions carrying 150 marks with a duration of 2.5 hours. It covers Child Development, Language 1, Language 2, Mathematics, and EVS." },
    { question: "Is there negative marking in REET?", answer: "No, there is no negative marking in the REET written examination. Candidates can safely attempt all 150 questions." },
    { question: "What are the qualifying marks for REET?", answer: "General category candidates need to score at least 60% (90/150) to qualify, while non-creamy layer OBC, SC, and ST candidates need 55% (82/150)." }
  ],
  rpsc: [
    { question: "What is the pattern of RPSC RAS Prelims?", answer: "RPSC RAS Prelims features a single paper on General Knowledge and General Science consisting of 150 questions carrying 200 marks, with a duration of 3 hours." },
    { question: "Is there negative marking in the RAS Prelims exam?", answer: "Yes, there is a negative marking of 1/3rd (-0.33) of the mark of the question for every incorrect answer." },
    { question: "How many marks are required to clear RAS Prelims?", answer: "Historically, clearing RAS Prelims requires a score around 80-85 marks out of 200 for general category candidates." }
  ],
  rrb_alp: [
    { question: "What is the pattern of RRB ALP CBT 1?", answer: "RRB ALP CBT 1 is a 60-minute test consisting of 75 questions carrying 75 marks. The sections include Mathematics (20 Qs), Mental Ability (25 Qs), General Science (20 Qs), and General Awareness (10 Qs)." },
    { question: "Is there negative marking in RRB ALP CBT 1?", answer: "Yes, there is a negative marking of 1/3rd (-0.33) of the marks assigned to each question for every wrong response." },
    { question: "Is CBT 1 score counted in the final RRB ALP merit list?", answer: "No, CBT 1 is only qualifying in nature. It is used to screen candidates for CBT 2. The final merit is prepared based on CBT 2 Part A and Computer Based Aptitude Test (CBAT) scores." }
  ],
  rrb_ntpc: [
    { question: "What is the pattern of RRB NTPC CBT 1?", answer: "RRB NTPC CBT 1 consists of 100 questions carrying 100 marks to be solved in 90 minutes. It covers General Awareness (40 Qs), Mathematics (30 Qs), and General Intelligence & Reasoning (30 Qs)." },
    { question: "Is there negative marking in RRB NTPC?", answer: "Yes, there is a negative marking of 1/3rd (-0.33) marks for every wrong answer in both CBT 1 and CBT 2." },
    { question: "What is a good score to clear RRB NTPC CBT 1?", answer: "Depending on the zone and post category, a normalized score of 70-80+ is generally required to qualify for CBT 2." }
  ],
  sbi_clerk: [
    { question: "What is the pattern of SBI Clerk Prelims?", answer: "SBI Clerk Prelims features 100 questions (30 English, 35 Numerical Ability, 35 Reasoning) to be solved in 60 minutes with 20 minutes allotted for each section." },
    { question: "Is there a sectional cutoff in SBI Clerk Prelims?", answer: "No, SBI Clerk Prelims has no sectional cutoffs. Candidates are shortlisted for Mains based only on their overall score." },
    { question: "Is there negative marking in the SBI Clerk exam?", answer: "Yes, there is a negative marking of -0.25 (1/4th) of the marks assigned to that question for every incorrect response." }
  ],
  sbi_po: [
    { question: "What is the pattern of SBI PO Prelims?", answer: "SBI PO Prelims features 100 questions (30 English, 35 Quant, 35 Reasoning) to be solved in 60 minutes with 20-minute sectional timers." },
    { question: "Are there sectional cutoffs in SBI PO Prelims?", answer: "No, SBI PO has removed sectional cutoffs for both Prelims and Mains. Candidates are selected based on their aggregate score." },
    { question: "What is the negative marking penalty in SBI PO?", answer: "SBI PO penalizes wrong answers by deducting 1/4th (-0.25) of the mark of that question. There is no penalty for unattempted questions." }
  ],
  srmjeee: [
    { question: "What is the pattern of the SRMJEEE exam?", answer: "SRMJEEE is a 2.5-hour online exam consisting of 125 multiple-choice questions. The sections include Physics (35 Qs), Chemistry (35 Qs), Mathematics/Biology (40 Qs), English (5 Qs), and Aptitude (10 Qs)." },
    { question: "Is there negative marking in SRMJEEE?", answer: "No, there is no negative marking in the SRMJEEE exam. Candidates should attempt all 125 questions." },
    { question: "What is a good rank in SRMJEEE for CSE at KTR Campus?", answer: "To secure a seat in Computer Science Engineering (CSE) at SRM Kattankulathur (KTR) Main Campus, candidates should ideally aim for a rank under 10,000." }
  ],
  ssc_cgl: [
    { question: "What is the syllabus of SSC CGL Tier 1?", answer: "SSC CGL Tier 1 has 4 sections: Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, and General Awareness. Each section has 25 questions." },
    { question: "Is there negative marking in SSC CGL Tier 1?", answer: "Yes, there is a negative marking of 0.50 marks for each wrong answer in the SSC CGL Tier 1 exam." },
    { question: "What is a safe score to clear the cut-off for SSC CGL Tier 1?", answer: "A raw score of 150+ (out of 200) is usually safe for general category candidates to clear the Tier 1 cutoff and qualify for Tier 2." }
  ],
  ssc_chsl: [
    { question: "What is the pattern of the SSC CHSL Tier 1 exam?", answer: "SSC CHSL Tier 1 consists of 100 questions (25 each in English, Reasoning, Quant, and General Awareness) carrying 200 marks, to be completed in 60 minutes." },
    { question: "Is there negative marking in SSC CHSL Tier 1?", answer: "Yes, there is a negative marking of 0.50 marks for each wrong answer in the Tier 1 examination." },
    { question: "What posts are filled through the SSC CHSL exam?", answer: "SSC CHSL recruits candidates for Group C government posts such as Lower Divisional Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) in various ministries." }
  ],
  ssc_mts: [
    { question: "What is the pattern of the SSC MTS exam?", answer: "SSC MTS is conducted in two sessions. Session 1 covers Numerical & Mathematical Ability (20 Qs) and Reasoning (20 Qs) with no negative marking. Session 2 covers General Awareness (25 Qs) and English (25 Qs) with negative marking." },
    { question: "Is there negative marking in the SSC MTS exam?", answer: "There is no negative marking in Session 1. However, in Session 2, there is a negative marking of -1 mark for each incorrect answer." },
    { question: "How is the final merit list prepared for SSC MTS?", answer: "The final merit list is prepared solely based on the marks scored by the candidate in Session 2 (General Awareness and English) of the written exam." }
  ],
  toefl: [
    { question: "What is the duration of the TOEFL iBT exam?", answer: "The TOEFL iBT exam is approximately 2 hours long. It includes 4 sections: Reading, Listening, Speaking, and Writing." },
    { question: "What is the scoring scale for TOEFL iBT?", answer: "Each of the 4 sections is scored out of 30, making the total score out of 120. A score of 100+ is generally considered good for top global university admission." },
    { question: "Is a calculator or scratch paper allowed in TOEFL?", answer: "Scratch paper and a pencil are provided by the test center for taking notes during all sections of the TOEFL exam." }
  ],
  uppsc: [
    { question: "What is the pattern of UPPSC PCS Prelims?", answer: "UPPSC Prelims consists of two papers on the same day: Paper 1 (General Studies I - 150 questions, 200 marks) and Paper 2 (CSAT - 100 questions, 200 marks)." },
    { question: "Is the CSAT paper counted in the UPPSC Prelims cutoff ranking?", answer: "No, Paper 2 (CSAT) is qualifying in nature. Candidates only need to secure a minimum of 33% marks (66 marks out of 200) in CSAT. The cutoff is decided solely on Paper 1 (GS I) marks." },
    { question: "Is there negative marking in UPPSC PCS Prelims?", answer: "Yes, there is a negative marking of 1/3rd (-0.33) of the marks assigned to each question for every wrong response." }
  ],
  upsc: [
    { question: "What is the pattern of the UPSC CSE Prelims exam?", answer: "UPSC Prelims consists of two objective papers: GS Paper I (100 questions, 200 marks) and CSAT GS Paper II (80 questions, 200 marks) conducted on the same day." },
    { question: "What are the qualifying marks for the UPSC CSAT paper?", answer: "UPSC CSAT (GS Paper II) is qualifying in nature. A candidate must score at least 33% (66 marks out of 200) to pass the CSAT paper." },
    { question: "Is there negative marking in UPSC Prelims?", answer: "Yes, there is a negative marking of 1/3rd of the marks assigned to that question. This means -0.66 marks for GS Paper 1 and -0.83 marks for CSAT for each incorrect response." }
  ],
  upsc_epfo: [
    { question: "What is the pattern of the UPSC EPFO EO/AO exam?", answer: "The UPSC EPFO written exam (Recruitment Test) consists of 120 multiple-choice questions carrying 300 marks, with a duration of 2 hours." },
    { question: "Is there negative marking in the UPSC EPFO exam?", answer: "Yes, there is a negative marking of 1/3rd (-0.33) of the marks allotted to each question for every wrong response." },
    { question: "What are the key subjects tested in UPSC EPFO?", answer: "The syllabus includes General English, Indian Freedom Struggle, Current Events, Indian Economy & Polity, General Accounting Principles, Industrial Relations & Labor Laws, General Science, and Quantitative Aptitude." }
  ],
  upsssc: [
    { question: "What is the UPSSSC PET exam pattern?", answer: "UPSSSC PET consists of 100 multiple-choice questions carrying 100 marks, to be solved in 2 hours. It covers General Studies, Hindi, English, Elementary Mathematics, and Graph & Table Analysis." },
    { question: "Is there negative marking in the UPSSSC PET exam?", answer: "Yes, there is a negative marking of 0.25 (1/4th) of the marks assigned to that question for every incorrect answer." },
    { question: "What is the validity of the UPSSSC PET scorecard?", answer: "The UPSSSC PET scorecard is valid for 1 year from the date of result declaration. Candidates can apply for various UP Group C Mains exams using this score." }
  ],
  viteee: [
    { question: "What is the syllabus and section distribution of VITEEE 2026?", answer: "VITEEE is a 2.5-hour exam with 125 questions: Mathematics/Biology (40 Qs), Physics (35 Qs), Chemistry (35 Qs), Aptitude (10 Qs), and English (5 Qs)." },
    { question: "Is there negative marking in VITEEE?", answer: "No, there is no negative marking in the VITEEE exam. Candidates should answer all 125 questions to maximize their score." },
    { question: "What rank is required to get CSE in Category 1 at VIT Vellore?", answer: "To secure Computer Science Engineering (CSE) in Category 1 (lowest fee category) at VIT Vellore, candidates usually need a rank under 1,000." }
  ],
  fallback: [
    { question: "Are these mock tests free to attempt?", answer: "Yes, all mock tests on our platform are 100% free with no registration fees or credit card requirements." },
    { question: "Do I get a detailed scorecard after submission?", answer: "Yes, immediately upon submitting your mock test, you will receive an in-depth scorecard showing your section-wise correctness, accuracy, and estimated percentile." },
    { question: "Can I pause the mock test and resume later?", answer: "No, to simulate real exam conditions, the timer runs continuously. We recommend attempting the test in a single sitting without interruptions." }
  ]
};

// Map slug to a specific exam key for FAQS
function mapSlugToExamKey(slug) {
  const s = slug.toLowerCase();
  
  if (s.includes('afcat')) return 'afcat';
  if (s.includes('bitsat')) return 'bitsat';
  if (s.includes('bpsc')) return 'bpsc';
  if (s.includes('cat')) return 'cat';
  if (s.includes('cds')) return 'cds';
  if (s.includes('clat')) return 'clat';
  if (s.includes('ctet')) return 'ctet';
  if (s.includes('cuet')) return 'cuet';
  if (s.includes('sat')) return 'sat';
  if (s.includes('dsssb')) return 'dsssb';
  if (s.includes('duolingo')) return 'duolingo';
  if (s.includes('gre')) return 'gre';
  if (s.includes('ibps-clerk')) return 'ibps_clerk';
  if (s.includes('ibps-po')) return 'ibps_po';
  if (s.includes('ielts')) return 'ielts';
  if (s.includes('jee-advanced')) return 'jee_advanced';
  if (s.includes('jee-main')) return 'jee_main';
  if (s.includes('lic-aao')) return 'lic_aao';
  if (s.includes('nabard')) return 'nabard';
  if (s.includes('nda')) return 'nda';
  if (s.includes('neet')) return 'neet';
  if (s.includes('nmat')) return 'nmat';
  if (s.includes('rbi-assistant')) return 'rbi_assistant';
  if (s.includes('rbi-grade')) return 'rbi_grade_b';
  if (s.includes('reet')) return 'reet';
  if (s.includes('rpsc')) return 'rpsc';
  if (s.includes('rrb-alp')) return 'rrb_alp';
  if (s.includes('rrb-ntpc')) return 'rrb_ntpc';
  if (s.includes('sbi-clerk')) return 'sbi_clerk';
  if (s.includes('sbi-po')) return 'sbi_po';
  if (s.includes('srmjeee') || s.includes('srmjee')) return 'srmjeee';
  if (s.includes('ssc-cgl')) return 'ssc_cgl';
  if (s.includes('ssc-chsl')) return 'ssc_chsl';
  if (s.includes('ssc-mts')) return 'ssc_mts';
  if (s.includes('toefl')) return 'toefl';
  if (s.includes('uppsc')) return 'uppsc';
  if (s.includes('upsc-cse') || s.includes('upsc')) return 'upsc';
  if (s.includes('epfo') || s.includes('upsc-epfo')) return 'upsc_epfo';
  if (s.includes('upsssc')) return 'upsssc';
  if (s.includes('viteee')) return 'viteee';
  if (s.includes('xat')) return 'xat';
  if (s.includes('gmat')) return 'gmat';
  if (s.includes('snap')) return 'snap';
  if (s.includes('ipu-cet')) return 'fallback'; // fallback or generic
  if (s.includes('atma')) return 'fallback';
  
  return null;
}

// Slugs mapping for generated blog post filename
function getBlogSlug(slug) {
  if (slug === 'cat') return 'free-cat-mock-test-2026';
  if (slug === 'nmat') return 'free-nmat-mock-test-2026-nmims-prep';
  if (slug === 'atma') return 'free-atma-mock-test-2026';
  if (slug === 'mhcet') return 'free-mhcet-mock-test-2026';
  if (slug === 'bitsat') return 'free-bitsat-mock-test-2026';
  if (slug === 'jee-advanced') return 'free-jee-advanced-mock-test-2026';
  if (slug === 'jee-main') return 'free-jee-main-mock-test-2026';
  if (slug === 'srmjee') return 'free-srmjeee-mock-test-2026';
  if (slug === 'nabard-grade-a') return 'free-nabard-grade-a-mock-test-2026';
  if (slug === 'upsc-cse') return 'free-upsc-cse-prelims-mock-test-2026';
  if (slug === 'cuet-ug') return 'free-cuet-ug-general-test-mock-test-2026';
  if (slug === 'sat') return 'free-digital-sat-mock-test-2026';
  if (slug === 'toefl') return 'free-toefl-ibt-mock-test-2026';
  if (slug === 'gre') return 'free-gre-mock-test-2026';
  if (slug === 'duolingo') return 'free-duolingo-mock-test-2026';
  if (slug === 'ielts') return 'free-ielts-academic-mock-test-2026';
  if (slug === 'nda') return 'free-nda-gat-mock-test-2026';
  if (slug === 'rpsc-ras') return 'free-rpsc-ras-mock-test-2026';
  if (slug === 'uppsc-pcs') return 'free-uppsc-pcs-mock-test-2026';
  if (slug === 'upsssc-pet') return 'free-upsssc-pet-mock-test-2026';
  if (slug === 'upsc-epfo') return 'free-upsc-epfo-mock-test-2026';
  
  return `free-${slug}-mock-test-2026`;
}

// Mapping of custom tools URLs
function getToolUrl(slug) {
  if (slug === 'cat') return '/tools/cat-mock-test';
  if (slug === 'nmat') return '/tools/nmat-mock-test';
  if (slug === 'atma') return '/tools/atma-mock-test';
  if (slug === 'mhcet') return '/tools/mhcet-mock-test';
  if (slug === 'bitsat') return '/tools/bitsat-mock-test';
  if (slug === 'jee-advanced') return '/tools/jee-advanced-mock-test';
  if (slug === 'jee-main') return '/tools/jee-main-mock-test';
  return `/tools/mock-test/${slug}`;
}

// Generate the comprehensive blog post content
function generateBlogContent(config) {
  const toolUrl = getToolUrl(config.slug);
  const examFaqsKey = mapSlugToExamKey(config.slug);
  const faqs = (examFaqsKey && DETAILED_FAQS[examFaqsKey]) ? DETAILED_FAQS[examFaqsKey] : (config.faqs || DETAILED_FAQS.fallback);

  // Generate H2 pattern table
  let patternTable = `| Section | Questions |\n| :--- | :--- |\n`;
  config.sections.forEach(s => {
    patternTable += `| **${s.label}** | ${s.questionCount} Questions |\n`;
  });
  patternTable += `| **Total** | **${config.totalQuestions} Questions** |\n`;

  // Generate features list
  const defaultFeatures = [
    `Realistic Exam Simulator UI: Experience identical timer triggers and color coding.`,
    `Detailed Analytics Dashboard: Instant section-wise analysis, accuracy ratings, and percentile indicators.`,
    `Expert-Curated Questions: Regularly updated questions matching ${config.name} 2026/2027 standards.`,
    `100% Free Forever: Uncompromised preparation resources without billing requirements.`
  ];
  const features = config.features && config.features.length > 0 ? config.features : defaultFeatures;

  // Generate examDetails or defaults
  const detailTitle1 = config.examDetails?.[0]?.title || `How to Excel in ${config.name} 2026-27`;
  const detailContent1 = config.examDetails?.[0]?.content || `Acing the ${config.name} requires consistent practice in timed settings. Build conceptual frameworks in each section first, then transition to solving short, timed chapter-wise sets, and finally attempt full-length mocks. Analyzing incorrect answers is the single most critical factor in driving score improvements.`;

  const detailTitle2 = config.examDetails?.[1]?.title || `Strategic Section-by-Section Time Management`;
  const detailContent2 = config.examDetails?.[1]?.content || `In ${config.name}, time is your primary currency. Allocate a maximum number of seconds to read a question and make a decision: Solve, Bookmark to review, or Skip immediately. Do not get stuck on any single question. Maintaining sectional balance is crucial if the exam has strict cutoffs.`;

  // Dynamic targeting sentence
  const targetSentence = config.topCollegesList && config.topCollegesList.length > 0
    ? `Getting a good score on our mock test prepares you directly for target institutes like **${config.topCollegesList.slice(0, 3).map(c => c.name).join(', ')}**.`
    : `Preparing with full-length mocks allows you to build confidence and targets elite universities offering top placements.`;

  return `---
title: 'Free ${config.name} Mock Test 2026: Online Practice Paper & Strategy Guide'
date: '2026-07-23'
category: 'Exams'
description: 'Attempt our 100% Free ${config.name} Mock Test 2026. Realistic computer-based exam simulator, ${config.totalQuestions} questions, ${config.durationMinutes} minutes, instant AI score analysis, and target percentiles.'
keywords:
  - "${config.name} mock test free"
  - "${config.slug} practice paper 2026"
  - "${config.slug} online test series"
  - "free mock test 2026"
  - "online exam preparation"
  - "practice paper online"
faqs:
${faqs.map(faq => `  - question: "${faq.question}"\n    answer: >-\n      ${faq.answer}`).join('\n')}
---

Succeeding in the **${config.name}** entrance exam demands not just subject expertise but also robust pacing, high accuracy under pressure, and sharp decision-making. Utilizing simulated tests is the absolute benchmark method utilized by high-scoring candidates to gauge their preparedness and improve their execution speed.

To help you measure your standing, we offer a high-fidelity **[Free ${config.name} Mock Test](${toolUrl})** designed to match the current 2026 exam pattern. Get instant percentiles, deep sectional analysis, and master your time management.

---

## 📊 ${config.name} Exam Pattern & Structure

The exam features a comprehensive layout testing key skills across sections. Here is the sectional weightage of the mock test:

${patternTable}

*The test runs on a strict timer of **${config.durationMinutes} minutes** to closely mimic real exam pressure.*

---

## 📚 Core Syllabus & High-Weightage Chapters

To maximize your score in the ${config.name} mock, focus heavily on prioritizing the chapters that carry the highest marks:

${config.sections.map(s => `- **${s.label}**: Master fundamental concepts, quick calculation shortcuts, and practice diverse problem types. Focus on past 5 years' high-frequency patterns.`).join('\n')}

${targetSentence}

---

## 💡 Strategic Section-by-Section Mock Attempting Guide

Attempting the mock test without a strategy is a missed learning opportunity. Follow this step-by-step framework to maximize your mock results:

### 1. Cycle-Based Question Selection
- **First Pass (Easy Questions):** Scan through the section and solve the low-hanging fruit (straightforward questions with simple steps) first.
- **Second Pass (Medium Questions):** Return to questions that require calculations but are within your comfort zone.
- **Third Pass (Hard/New Questions):** Dedicate remaining time to challenging puzzles or lengthy math problems.

### 2. Time-Blocking Strategy
- Divide the total exam duration into strict blocks.
- Set target cutoffs for yourself: e.g., if you have a 60-minute section, check your progress at the 30-minute mark to ensure you've crossed at least half the question set.

---

## ✨ Why Choose CareerWithMohit Free ${config.name} Mock Tests?

Our testing platform is custom-built to deliver elite preparation value:

${features.map(f => `- **${f.split(':')[0]}**: ${f.split(':').slice(1).join(':')}`).join('\n')}

---

## 🛠️ ${detailTitle1}

${detailContent1}

## ⌛ ${detailTitle2}

${detailContent2}

---

## 🚀 How to Attempt the Free Mock Test

1. Navigate to the official **[${config.name} Mock Test Tool](${toolUrl})**.
2. Read the instructions carefully and select your starting section order.
3. Keep rough sheets and a pen handy to track your calculations.
4. Click **Start Test** to begin the timer.
5. Attempt the questions and click **Submit Test** when done.
6. Review your detailed score report, check the AI analytics, and seek personal guidance if needed.

[InquiryCard title="Get Free Exam & Profile Evaluation" description="Struggling to clear sectional cutoffs in your mock exams? Connect with Mohit Jain for personalized counselling and selection planning." cta="Talk to Expert" type="admission"]

---

## ❓ Frequently Asked Questions (FAQ)

${faqs.map(faq => `### ${faq.question}\n${faq.answer}\n`).join('\n')}

---

### 🚀 Boost Your Preparation

Looking for more resources? **[Explore Our Premium MBA Mock Test Series 2026](/mock-tests)** to get real-time exam experience and detailed performance analytics.

---
`;
}

function run() {
  console.log(`🚀 Scanning and generating ${EXAM_CONFIGS.length} mock test blogs...`);
  
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  let count = 0;
  EXAM_CONFIGS.forEach(config => {
    const filename = `${getBlogSlug(config.slug)}.md`;
    const filePath = path.join(POSTS_DIR, filename);
    const content = generateBlogContent(config);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated comprehensive blog: ${filename}`);
    count++;
  });

  console.log(`\n🎉 Success! Created/Regenerated ${count} mock test blog posts in 'posts/' folder.`);
}

run();
