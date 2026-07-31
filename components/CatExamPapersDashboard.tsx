'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Video,
  Target,
  Play,
  Download,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  HelpCircle,
  X,
  ArrowRight,
  Search,
  MessageCircle,
  Eye,
  BarChart2,
  Zap,
  Check,
  AlertCircle,
  Filter,
  RotateCcw,
  BadgeCheck
} from 'lucide-react';

/* ── INTERFACES ── */
interface CatSlotPaper {
  id: string;
  year: number;
  slot: string;
  totalQuestions: number;
  totalMarks: number;
  durationMins: number;
  difficulty: 'Moderate' | 'Moderate-Tough' | 'Tough' | 'Easy-Moderate';
  pdfUrl: string;
  sampleQuestion: {
    section: 'QA' | 'VARC' | 'LRDI';
    questionText: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    videoTip: string;
  };
}

interface TopicWiseCategory {
  id: string;
  title: string;
  section: 'QA' | 'VARC' | 'LRDI';
  weightage: string;
  questionCount: number;
  difficulty: string;
  desc: string;
  sampleQuestion: {
    questionText: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    videoTip: string;
  };
}

/* ── DATA: CAT PREVIOUS YEAR PAPERS (2000–2025) ── */
const CAT_YEAR_PAPERS: { year: number; conductingIim: string; slots: CatSlotPaper[] }[] = [
  {
    year: 2025,
    conductingIim: 'IIM Kozhikode (Expected Pattern / Mock)',
    slots: [
      {
        id: 'cat-2025-mock-1',
        year: 2025,
        slot: 'All-India Expected Mock 1',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate-Tough',
        pdfUrl: '/papers/cat-2025-expected-mock-1.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'If x and y are positive real numbers such that log_x(x^2 + 12) = 4 and 3 log_y(x) = 1, then the value of (x + y) equals:',
          options: ['10', '11', '20', '68'],
          correctAnswer: 0,
          explanation:
            'From 3 log_y(x) = 1, we get log_y(x) = 1/3 => y^(1/3) = x => y = x^3. Substituting in the first equation: x^4 = x^2 + 12 => (x^2 - 4)(x^2 + 3) = 0 => x^2 = 4 => x = 2 (since x > 0). Therefore, y = 2^3 = 8. Hence x + y = 2 + 8 = 10.',
          videoTip:
            'Mohit Jain Tip: Whenever logarithmic bases differ, convert one variable in terms of the other first before quadratic substitution.'
        }
      }
    ]
  },
  {
    year: 2024,
    conductingIim: 'IIM Calcutta',
    slots: [
      {
        id: 'cat-2024-s1',
        year: 2024,
        slot: 'Slot 1 (Morning)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate-Tough',
        pdfUrl: '/papers/cat-2024-slot-1.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'Let α and β be the distinct roots of 2x^2 - 6x + k = 0 such that (α + β) and αβ are the distinct roots of x^2 + px + p = 0. Then the value of 8(k - p) is:',
          options: ['4', '6', '8', '12'],
          correctAnswer: 1,
          explanation:
            'For 2x^2 - 6x + k = 0, sum of roots α + β = 3, and product αβ = k/2. These are roots of x^2 + px + p = 0. Sum of roots = 3 + k/2 = -p, and product = 3(k/2) = p. Solving these two linear equations gives k = -3/2 and p = -9/4. Thus 8(k - p) = 8(-3/2 - (-9/4)) = 6.',
          videoTip:
            'Algebra Shortcut: Use Vieta formulas directly to set up simultaneous equations in k and p.'
        }
      },
      {
        id: 'cat-2024-s2',
        year: 2024,
        slot: 'Slot 2 (Afternoon)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate',
        pdfUrl: '/papers/cat-2024-slot-2.pdf',
        sampleQuestion: {
          section: 'VARC',
          questionText:
            'Which of the following best captures the central argument of the passage on digital minimalism and human cognition in contemporary workplaces?',
          options: [
            'Digital tools enhance multitasking speed but degrade deep analytical retention over extended cycles.',
            'Workplace productivity requires total abstinence from cloud-based communication protocols.',
            'Cognitive offloading to AI systems permanently damages synaptic plasticity in adult brains.',
            'Modern organizations prioritize synchronous messaging over long-term strategic execution.'
          ],
          correctAnswer: 0,
          explanation:
            'The author consistently contrasts superficial multitasking speed with the erosion of sustained deep focus, making option A the precise synthesis of the argument.',
          videoTip:
            'VARC Golden Rule: Eliminate extreme vocabulary like "total abstinence" and "permanently damages" in main idea questions.'
        }
      },
      {
        id: 'cat-2024-s3',
        year: 2024,
        slot: 'Slot 3 (Evening)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Tough',
        pdfUrl: '/papers/cat-2024-slot-3.pdf',
        sampleQuestion: {
          section: 'LRDI',
          questionText:
            'In a 4-team round-robin tournament where every match ends in a win or draw, Team A scored 7 points (Win=3, Draw=1, Loss=0). What is the minimum possible total points scored by all 4 teams combined?',
          options: ['13', '14', '15', '16'],
          correctAnswer: 1,
          explanation:
            'Total matches played = 6. A match yields 3 points if decisive and 2 points if drawn. Team A won 2 and drew 1 (7 pts). For minimum total points, maximize the number of draws in remaining matches.',
          videoTip:
            'LRDI Tournament Hack: Always compute the minimum and maximum point bounds per match before constructing the score table.'
        }
      }
    ]
  },
  {
    year: 2023,
    conductingIim: 'IIM Lucknow',
    slots: [
      {
        id: 'cat-2023-s1',
        year: 2023,
        slot: 'Slot 1 (Morning)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Tough',
        pdfUrl: '/papers/cat-2023-slot-1.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'Brishti went on an 8-hour trip in a car. Before the trip, the car odometer read a palindromic whole number x km. At the end of the trip, it read 26862 km, which is again palindromic. If she never drove faster than 110 km/h, the greatest possible average speed (in km/h) was:',
          options: ['80', '90', '100', '110'],
          correctAnswer: 2,
          explanation:
            'Since total time is 8 hours and max speed is 110 km/h, max distance = 880 km. The previous palindromic number before 26862 within 880 km is 26062. Distance = 26862 - 26062 = 800 km. Average speed = 800 / 8 = 100 km/h.',
          videoTip:
            'Number System Trick: Palindromes of 5 digits with fixed first/last digits change in multiples of 100 or 110. Test backwards from 26862.'
        }
      },
      {
        id: 'cat-2023-s2',
        year: 2023,
        slot: 'Slot 2 (Afternoon)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Tough',
        pdfUrl: '/papers/cat-2023-slot-2.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'The number of integer solutions of the equation 2|x|(x^2 + 1) = 5x^2 is:',
          options: ['1', '2', '3', '4'],
          correctAnswer: 2,
          explanation:
            'Clearly x = 0 is one solution. For x != 0, divide by |x| to get 2(x^2 + 1) = 5|x| => 2|x|^2 - 5|x| + 2 = 0. Factoring gives (|x| - 2)(2|x| - 1) = 0. Since x is an integer, |x| = 2 => x = 2 or x = -2. Thus there are 3 integer solutions: -2, 0, 2.',
          videoTip:
            'Modulus Equation Tip: Remember that x^2 is identical to |x|^2. Convert quadratic terms to modulus form for instant factoring.'
        }
      },
      {
        id: 'cat-2023-s3',
        year: 2023,
        slot: 'Slot 3 (Evening)',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate-Tough',
        pdfUrl: '/papers/cat-2023-slot-3.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'If sqrt(5x + 9) + sqrt(5x - 9) = 3(2 + sqrt(2)), then sqrt(10x + 9) is equal to:',
          options: ['3 sqrt(7)', '4 sqrt(5)', '2 sqrt(7)', '3 sqrt(31)'],
          correctAnswer: 0,
          explanation:
            'Multiply by the conjugate sqrt(5x + 9) - sqrt(5x - 9) and use identity a^2 - b^2 = 18 to solve for individual square roots, yielding x = 5.4. Substituting x gives sqrt(54 + 9) = sqrt(63) = 3 sqrt(7).',
          videoTip:
            'Surds & Indices Rule: Always check the difference of squares under radicals before squaring both sides.'
        }
      }
    ]
  },
  {
    year: 2022,
    conductingIim: 'IIM Bangalore',
    slots: [
      {
        id: 'cat-2022-s1',
        year: 2022,
        slot: 'Slot 1, 2 & 3 Combined Official Paper',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate',
        pdfUrl: '/papers/cat-2022-all-slots.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'In a triangle ABC, the lengths of the sides AB and AC are 12 cm and 18 cm respectively. The length of the median AD is 9 cm. What is the area of triangle ABC in sq. cm?',
          options: ['27 sqrt(15)', '36 sqrt(5)', '18 sqrt(15)', '54 sqrt(3)'],
          correctAnswer: 0,
          explanation:
            'Using Apollonius Theorem: AB^2 + AC^2 = 2(AD^2 + BD^2). Substituting 144 + 324 = 2(81 + BD^2) => BD = sqrt(153). Apply Heron formula to get area = 27 sqrt(15).',
          videoTip:
            'Geometry Theorem: Apollonius Theorem is tested in 80% of CAT geometry questions involving medians.'
        }
      }
    ]
  },
  {
    year: 2021,
    conductingIim: 'IIM Ahmedabad',
    slots: [
      {
        id: 'cat-2021-s1',
        year: 2021,
        slot: 'Slot 1, 2 & 3 Official Question Bank',
        totalQuestions: 66,
        totalMarks: 198,
        durationMins: 120,
        difficulty: 'Moderate-Tough',
        pdfUrl: '/papers/cat-2021-all-slots.pdf',
        sampleQuestion: {
          section: 'VARC',
          questionText:
            'The four sentences (labelled 1, 2, 3, 4) below, when properly sequenced, form a coherent paragraph. Which sequence is correct?\n1. This dynamic allows historical narratives to be constantly reinterpreted.\n2. Archival preservation is not merely passive storage of old records.\n3. Rather, it represents an active curation of collective memory.\n4. Consequently, each generation uncovers different truths from the same vault.',
          options: ['2-3-1-4', '2-1-3-4', '3-2-4-1', '1-4-2-3'],
          correctAnswer: 0,
          explanation:
            'Sentence 2 introduces "archival preservation". Sentence 3 contrasts "merely passive" with "active curation" (2-3 mandatory pair). Sentence 1 explains the "dynamic" of curation, and 4 concludes with "Consequently".',
          videoTip:
            'Para Jumble Pro Tip: Identify mandatory contrast pairs (not merely... Rather...) to lock 2 adjacent sentences immediately.'
        }
      }
    ]
  },
  {
    year: 2020,
    conductingIim: 'IIM Indore',
    slots: [
      {
        id: 'cat-2020-s1',
        year: 2020,
        slot: 'Slot 1, 2 & 3 (76 Questions Pattern)',
        totalQuestions: 76,
        totalMarks: 228,
        durationMins: 120,
        difficulty: 'Moderate',
        pdfUrl: '/papers/cat-2020-all-slots.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'How many 3-digit numbers are there, for which the sum of digits is equal to 10 and digits are in strictly increasing order?',
          options: ['6', '8', '10', '12'],
          correctAnswer: 1,
          explanation:
            'Let the number be abc with a < b < c and a + b + c = 10. Possible sets: (1,2,7), (1,3,6), (1,4,5), (2,3,5). Each set gives exactly 1 strictly increasing number. Total = 4. (With 0 allowed as first digit? No, 3-digit number requires a >= 1).',
          videoTip:
            'Permutations Shortcut: Always list ordered triplets systematically starting from the smallest possible hundreds digit.'
        }
      }
    ]
  },
  {
    year: 2019,
    conductingIim: 'IIM Kozhikode',
    slots: [
      {
        id: 'cat-2019-s1',
        year: 2019,
        slot: 'Slot 1 & 2 (100 Questions Pattern)',
        totalQuestions: 100,
        totalMarks: 300,
        durationMins: 180,
        difficulty: 'Easy-Moderate',
        pdfUrl: '/papers/cat-2019-all-slots.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'If the rectangular faces of a brick have their diagonals in the ratio 3 : 2 sqrt(3) : sqrt(15), then the ratio of the length, width and height of the brick is:',
          options: ['1 : 2 : 3', '2 : 3 : 4', '1 : sqrt(3) : 2', 'sqrt(2) : sqrt(3) : sqrt(5)'],
          correctAnswer: 0,
          explanation:
            'Let dimensions be l, b, h. Diagonals squared are l^2+b^2 : b^2+h^2 : h^2+l^2 = 9 : 12 : 15. Solving gives l^2 : b^2 : h^2 = 1 : 4 : 9 => l : b : h = 1 : 2 : 3.',
          videoTip:
            'Mensuration Hack: Work with squares of diagonals rather than square roots to save calculation time.'
        }
      }
    ]
  },
  {
    year: 2018,
    conductingIim: 'IIM Calcutta',
    slots: [
      {
        id: 'cat-2018-s1',
        year: 2018,
        slot: 'Slot 1 & 2 Official Papers',
        totalQuestions: 100,
        totalMarks: 300,
        durationMins: 180,
        difficulty: 'Tough',
        pdfUrl: '/papers/cat-2018-all-slots.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'If log_2(5 + log_3(a)) = 3 and log_5(4a + 12 + log_2(b)) = 3, then a + b is equal to:',
          options: ['32', '40', '59', '67'],
          correctAnswer: 2,
          explanation:
            'From first equation: 5 + log_3(a) = 2^3 = 8 => log_3(a) = 3 => a = 27. From second equation: 4(27) + 12 + log_2(b) = 5^3 = 125 => 120 + log_2(b) = 125 => log_2(b) = 5 => b = 32. Thus a + b = 27 + 32 = 59.',
          videoTip:
            'Logarithm Basic Rule: Strip logarithmic shells from the outside one layer at a time.'
        }
      }
    ]
  },
  {
    year: 2017,
    conductingIim: 'IIM Lucknow',
    slots: [
      {
        id: 'cat-2017-s1',
        year: 2017,
        slot: 'Slot 1 & 2 Official Papers',
        totalQuestions: 100,
        totalMarks: 300,
        durationMins: 180,
        difficulty: 'Moderate',
        pdfUrl: '/papers/cat-2017-all-slots.pdf',
        sampleQuestion: {
          section: 'QA',
          questionText:
            'Arun\'s present age in years is 40% of Barun\'s. In another few years, Arun\'s age will be half of Barun\'s. By what percentage will Barun\'s age increase during this period?',
          options: ['20%', '25%', '30%', '50%'],
          correctAnswer: 0,
          explanation:
            'Let present ages be Arun = 4k, Barun = 10k. Difference in ages = 6k (remains constant). When Arun is half of Barun, ratio is 1 : 2, so difference of 1 unit = 6k. Thus Arun = 6k, Barun = 12k. Barun increases from 10k to 12k, an increase of 2k/10k = 20%.',
          videoTip:
            'Age Problem Secret: Age difference between two individuals is invariant over time.'
        }
      }
    ]
  }
];

/* ── TOPIC-WISE QUESTION CATEGORIES ── */
const CAT_QUANT_TOPICS: TopicWiseCategory[] = [
  {
    id: 'quant-arithmetic',
    title: 'Arithmetic (Percentages, TSD, Profit & Loss)',
    section: 'QA',
    weightage: '38%–42% Weightage (8–9 Qs)',
    questionCount: 420,
    difficulty: 'Moderate',
    desc: 'The backbone of CAT Quant. Covers Time Speed Distance, Ratio & Proportion, Averages, Mixtures, Work, and Commercial Math.',
    sampleQuestion: {
      questionText:
        'A trader sells two articles at Rs. 9,900 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage?',
      options: ['1% Loss', '1% Gain', 'No Gain No Loss', '2% Loss'],
      correctAnswer: 0,
      explanation:
        'When selling prices are equal and gain % = loss % = x%, there is always an overall loss given by (x^2 / 100)%. Here x = 10, so loss % = 100/100 = 1% Loss.',
      videoTip: 'Arithmetic Shortcut: Use net effective percentage change formulas to bypass absolute values.'
    }
  },
  {
    id: 'quant-algebra',
    title: 'Algebra (Linear & Quadratic Equations, Logarithms)',
    section: 'QA',
    weightage: '32%–35% Weightage (7–8 Qs)',
    questionCount: 380,
    difficulty: 'Moderate-Tough',
    desc: 'High-scoring topic including Inequalities, Logarithms, Functions & Graphs, Sequences & Series, and Modulus equations.',
    sampleQuestion: {
      questionText: 'If f(x) = (x + 1)/(x - 1) for all x != 1, then the value of f(f(f(f(5)))) is:',
      options: ['5', '3/2', '1', '-5'],
      correctAnswer: 0,
      explanation:
        'Compute f(f(x)): f((x+1)/(x-1)) = [(x+1)/(x-1) + 1] / [(x+1)/(x-1) - 1] = x. Therefore f(f(x)) is the identity function x. Hence applying f four times returns the original value 5.',
      videoTip: 'Functions Trick: Always test for periodic or self-inverting functions before calculating high iterations.'
    }
  },
  {
    id: 'quant-geometry',
    title: 'Geometry & Mensuration (Triangles, Circles, Solids)',
    section: 'QA',
    weightage: '14%–18% Weightage (3–4 Qs)',
    questionCount: 290,
    difficulty: 'Moderate',
    desc: 'Covers Euclidean properties, Circles, Polygons, Coordinate Geometry, and 3D surface area & volume.',
    sampleQuestion: {
      questionText: 'The ratio of the area of the inscribed circle to the circumscribed circle of a square is:',
      options: ['1 : 2', '1 : 4', '1 : sqrt(2)', '2 : 3'],
      correctAnswer: 0,
      explanation:
        'For a square of side a, inradius r = a/2 and circumradius R = a/sqrt(2). Ratio of radii squared is (1/4) : (1/2) = 1 : 2.',
      videoTip: 'Geometry Hack: Remember standard area and radius ratios for equilateral triangles and squares.'
    }
  },
  {
    id: 'quant-numbers',
    title: 'Number System (Remainders, Divisibility, Factors)',
    section: 'QA',
    weightage: '5%–10% Weightage (1–2 Qs)',
    questionCount: 240,
    difficulty: 'Tough',
    desc: 'Focuses on Remainder theorems, Euler Totient, Unit digits, Base systems, and Factorials.',
    sampleQuestion: {
      questionText: 'What is the remainder when 3^100 is divided by 7?',
      options: ['4', '2', '1', '6'],
      correctAnswer: 0,
      explanation:
        'By Fermat Little Theorem, 3^6 = 1 (mod 7). Since 100 = 6(16) + 4, remainder is 3^4 mod 7 = 81 mod 7 = 4.',
      videoTip: 'Number System Tip: Master Euler Totient and Fermat Little Theorem for instantaneous remainder evaluation.'
    }
  },
  {
    id: 'quant-modern',
    title: 'Modern Math (P&C, Probability, Set Theory)',
    section: 'QA',
    weightage: '5%–10% Weightage (1–2 Qs)',
    questionCount: 210,
    difficulty: 'Moderate-Tough',
    desc: 'Permutation & Combination, Basic probability, and Venn Diagram equations.',
    sampleQuestion: {
      questionText:
        'In how many ways can 5 distinct balls be distributed among 3 identical boxes such that no box remains empty?',
      options: ['25', '15', '30', '20'],
      correctAnswer: 0,
      explanation:
        'Using Stirling numbers of the second kind S(5,3) or listing partitions: (3,1,1) -> 5C3 = 10 ways; (2,2,1) -> (5C2 * 3C2)/2 = 15 ways. Total = 10 + 15 = 25 ways.',
      videoTip: 'P&C Golden Rule: Distinguish carefully between identical vs. distinct boxes before applying formulas.'
    }
  }
];

const CAT_VARC_TOPICS: TopicWiseCategory[] = [
  {
    id: 'varc-rc',
    title: 'Reading Comprehension (Passages: Business, Philosophy, Science)',
    section: 'VARC',
    weightage: '66% Weightage (16 Qs | 4 Passages)',
    questionCount: 520,
    difficulty: 'Moderate-Tough',
    desc: 'Covers diverse genres: Philosophy, Evolutionary Biology, Economics, Tech, and Cultural Anthropology.',
    sampleQuestion: {
      questionText:
        'When an RC question asks "Which of the following is an assumption underlying the author\'s argument?", what must be true about the correct answer?',
      options: [
        'It is an unstated premise without which the argument collapses.',
        'It is a direct quote from the passage supporting the conclusion.',
        'It is an extreme generalization of the author\'s final sentence.',
        'It is a counterargument that the author rejects.'
      ],
      correctAnswer: 0,
      explanation:
        'An assumption is a necessary unstated bridge between the evidence and the conclusion. If negated, the author conclusion must fail.',
      videoTip: 'RC Strategy: Use the Negation Test on critical assumption questions.'
    }
  },
  {
    id: 'varc-pj',
    title: 'Para Jumbles (4-Sentence Sequence · TITA)',
    section: 'VARC',
    weightage: '12%–15% Weightage (3 Qs)',
    questionCount: 310,
    difficulty: 'Tough',
    desc: 'Non-MCQ (Type In The Answer) questions testing structural coherence and transition markers.',
    sampleQuestion: {
      questionText:
        'What is the most reliable first step when solving a 4-sentence CAT Para Jumble without options?',
      options: [
        'Find a mandatory pair using pronouns, acronyms, or contrast connectors.',
        'Always pick the shortest sentence as the opening statement.',
        'Read sentences backwards from 4 to 1.',
        'Look for words with the most syllables.'
      ],
      correctAnswer: 0,
      explanation:
        'Mandatory pairs reduce a 24-possibility factorial space into just 6 or fewer sequences instantly.',
      videoTip: 'Para Jumble Trick: Never guess blindly on TITA; identify at least one rock-solid pronoun or chronology link.'
    }
  },
  {
    id: 'varc-ps',
    title: 'Para Summary (Paragraph Gist & Synthesis)',
    section: 'VARC',
    weightage: '8%–10% Weightage (2 Qs)',
    questionCount: 220,
    difficulty: 'Moderate',
    desc: 'MCQ questions asking for the most accurate and concise summary of a 150-word paragraph.',
    sampleQuestion: {
      questionText:
        'Which trap is most commonly found in incorrect CAT Para Summary options?',
      options: [
        'An option that is factually true per the paragraph but misses the central thesis.',
        'An option that contains grammatically simple sentences.',
        'An option that uses synonyms instead of exact words.',
        'An option that is shorter than 20 words.'
      ],
      correctAnswer: 0,
      explanation:
        'CAT examiners frequently create distractors that state a minor detail accurately while omitting the primary conclusion.',
      videoTip: 'Para Summary Hack: The correct summary must cover both the subject and the author perspective.'
    }
  },
  {
    id: 'varc-ooo',
    title: 'Odd One Out (Out of Context Sentence)',
    section: 'VARC',
    weightage: '8%–10% Weightage (2 Qs)',
    questionCount: 190,
    difficulty: 'Moderate-Tough',
    desc: 'Identify which of the 5 sentences does not fit into the coherent theme of the paragraph.',
    sampleQuestion: {
      questionText:
        'When 4 out of 5 sentences form a sequence, how should you identify the Odd One Out?',
      options: [
        'Form the sequence of the 4 coherent sentences first; the remaining sentence is the odd one.',
        'Select the sentence with the most complex vocabulary.',
        'Pick the sentence that mentions a proper noun.',
        'Choose the sentence that appears first in the question.'
      ],
      correctAnswer: 0,
      explanation:
        'Always assemble the 4-sentence narrative flow; the odd sentence will either be off-scope or contradict the flow.',
      videoTip: 'Odd One Out Tip: Look for subtle shifts in scope or time-frame (e.g. general theory vs. specific unrelated case).'
    }
  }
];

const CAT_LRDI_TOPICS: TopicWiseCategory[] = [
  {
    id: 'lrdi-matrix',
    title: 'Seating Arrangement, Matrix & Grouping Puzzles',
    section: 'LRDI',
    weightage: '25%–30% Weightage (1–2 Sets)',
    questionCount: 280,
    difficulty: 'Moderate',
    desc: 'Grid arrangements, linear/circular seating, scheduling, and conditional grouping sets.',
    sampleQuestion: {
      questionText:
        'In a circular arrangement of 6 persons facing the centre, if A is opposite B, and C is to the immediate right of A, who is to the immediate left of B?',
      options: ['Cannot be determined without more data', 'C', 'A', 'D'],
      correctAnswer: 0,
      explanation:
        'With 6 positions, A and B occupy positions 1 and 4. C at immediate right of A is at position 6. Immediate left of B is position 5, which could be D, E, or F. Thus more data is needed.',
      videoTip: 'LRDI Rule: Always draw a clean diagram and label definite vs. ambiguous positions clearly.'
    }
  },
  {
    id: 'lrdi-games',
    title: 'Games & Tournaments (Round Robin, Knockout)',
    section: 'LRDI',
    weightage: '25% Weightage (1 Set)',
    questionCount: 210,
    difficulty: 'Tough',
    desc: 'Championship points tables, goal differentials, seeding, and knockout brackets.',
    sampleQuestion: {
      questionText:
        'In a knockout tennis tournament with 64 players, how many total matches are played to decide the champion?',
      options: ['63', '64', '32', '128'],
      correctAnswer: 0,
      explanation:
        'In any single-elimination knockout tournament with N players, exactly N - 1 matches are required because each match eliminates exactly 1 player until 1 champion remains (64 - 1 = 63).',
      videoTip: 'Tournament Hack: For knockout tournaments, total matches = N - 1. Never waste time summing powers of 2!'
    }
  },
  {
    id: 'lrdi-venn',
    title: 'Venn Diagrams (3-Set, 4-Set & Maxima-Minima)',
    section: 'LRDI',
    weightage: '20% Weightage (1 Set)',
    questionCount: 190,
    difficulty: 'Moderate-Tough',
    desc: 'Set overlap calculations, maximum/minimum intersection bounds, and survey analysis.',
    sampleQuestion: {
      questionText:
        'In a class of 100 students, 70 passed in Math and 80 passed in Science. What is the minimum number of students who passed in both subjects?',
      options: ['50', '60', '70', '30'],
      correctAnswer: 0,
      explanation:
        'Minimum intersection = n(A) + n(B) - Total = 70 + 80 - 100 = 50 students.',
      videoTip: 'Venn Diagram Secret: Use the formula Min(A intersection B) = A + B - 100% for instant lower bounds.'
    }
  },
  {
    id: 'lrdi-quant-lr',
    title: 'Quant-Based LR & Arithmetic Reasoning',
    section: 'LRDI',
    weightage: '25% Weightage (1 Set)',
    questionCount: 240,
    difficulty: 'Tough',
    desc: 'Puzzles requiring arithmetic optimization, averages, ratio constraints, and financial tables.',
    sampleQuestion: {
      questionText:
        'A vendor sells apples in lots of 5 or 8. What is the largest integer number of apples that CANNOT be bought using exact lots of 5 and 8?',
      options: ['27', '23', '31', '19'],
      correctAnswer: 0,
      explanation:
        'For two coprime integers a and b, the Frobenius coin problem states that the largest unobtainable number is ab - a - b. Here a=5, b=8 => 40 - 5 - 8 = 27.',
      videoTip: 'Quant LR Trick: Memorize the Frobenius number formula (ab - a - b) for stamp/coin combination sets.'
    }
  }
];

/* ── FAQ LIST ON CAT PYQs (iQuanta SEO Style) ── */
const CAT_PYQ_FAQS = [
  {
    q: 'Is the CAT exam previous year paper enough for CAT preparation?',
    a: 'Yes, solving CAT previous year question papers from 2000–2025 is one of the most effective preparation methods. It gives complete clarity on the CAT exam pattern, marking scheme (+3/-3), sectional time constraints, and the types of questions asked across QA, VARC, and LRDI.'
  },
  {
    q: 'What is the difficulty level of the CAT exam paper?',
    a: 'The difficulty level of the CAT exam usually ranges from moderate to difficult. As per recent trends (CAT 2023–2024), QA has tested conceptual depth in algebra and arithmetic, while VARC requires strong inference and LRDI requires structured puzzle-solving.'
  },
  {
    q: 'What is the medium and duration of a CAT question paper?',
    a: 'The CAT question paper is conducted exclusively in English. It is a computer-based test (CBT) of 120 minutes duration, divided into three sections of 40 minutes each (VARC, LRDI, and QA) with a total of 66 questions.'
  },
  {
    q: 'What are the different sections in the CAT exam paper?',
    a: 'The CAT paper has three mandatory sections in sequential order: 1) Verbal Ability and Reading Comprehension (VARC - 24 Qs), 2) Logical Reasoning and Data Interpretation (LRDI - 20 Qs), and 3) Quantitative Aptitude (QA - 22 Qs).'
  },
  {
    q: 'Why should aspirants solve CAT old question papers?',
    a: 'CAT question papers act as a transparent mirror to the actual examination. Familiarity with repeating patterns helps aspirants target high-weightage topics (like Arithmetic, RC passages, and Matrix arrangements), build stamina, and refine question selection strategy.'
  },
  {
    q: 'What should be the approach to solve a CAT previous year paper?',
    a: 'The most crucial strategy is learning "the art of leaving." Start by scanning the section for 2 minutes, pick round-1 easy questions first, and avoid spending more than 3 minutes on any single stuck LRDI set or algebra problem.'
  },
  {
    q: 'By which Indian Institute of Management (IIM) is the CAT paper prepared?',
    a: 'The CAT exam paper is prepared by different older IIMs on a rotational basis. For instance, CAT 2024 was conducted by IIM Calcutta, CAT 2023 by IIM Lucknow, and CAT 2025/2026 is expected to be organized by IIM Kozhikode.'
  },
  {
    q: 'How can I download all CAT 2000–2025 PYQ PDFs with detailed solutions?',
    a: 'You can download the complete All-in-One CAT 2000–2025 Question Paper PDF bundle with verified answer keys and detailed step-by-step solutions directly from this dashboard or by requesting it via WhatsApp from Mohit Jain\'s counselling desk.'
  }
];

/* ── MAIN DASHBOARD COMPONENT ── */
export default function CatExamPapersDashboard() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'pyq' | 'quant' | 'varc' | 'lrdi'>('pyq');

  // Search & Filter state for PYQ papers
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expanded year accordion state
  const [expandedYears, setExpandedYears] = useState<number[]>([2025, 2024, 2023, 2022]);

  // Interactive Live Mock Test Simulation Modal State
  const [activeMockQuestion, setActiveMockQuestion] = useState<{
    title: string;
    section: 'QA' | 'VARC' | 'LRDI';
    questionText: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    videoTip: string;
  } | null>(null);

  // Selected answer in Mock Modal
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // PDF Lead / Bundle Modal State
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [pdfForm, setPdfForm] = useState({ name: '', phone: '', email: '', targetYear: 'CAT 2026' });
  const [pdfSubmitted, setPdfSubmitted] = useState<boolean>(false);

  // Toggle accordion year
  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  // Filter papers
  const filteredPapers = useMemo(() => {
    return CAT_YEAR_PAPERS.filter((item) => {
      if (yearFilter !== 'all' && item.year.toString() !== yearFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesYear = item.year.toString().includes(q);
        const matchesIim = item.conductingIim.toLowerCase().includes(q);
        const matchesSlot = item.slots.some((s) => s.slot.toLowerCase().includes(q));
        return matchesYear || matchesIim || matchesSlot;
      }
      return true;
    });
  }, [yearFilter, searchQuery]);

  // Handle opening mock simulation modal
  const openMockSimulation = (
    title: string,
    question: {
      section: 'QA' | 'VARC' | 'LRDI';
      questionText: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      videoTip: string;
    }
  ) => {
    setActiveMockQuestion({
      title,
      ...question
    });
    setSelectedOption(null);
    setShowSolution(false);
  };

  // Handle PDF bundle form submit
  const handlePdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPdfSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fc] rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden font-sans">
      {/* ── 1. HERO HEADER BANNER & 4 HIGHLIGHT BADGES ── */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 md:p-10 relative overflow-hidden">
        {/* Subtle orange glow accent */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#f26b23]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-[#f26b23]/20 border border-[#f26b23]/40 text-[#f26b23] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              <Sparkles size={14} />
              iQuanta-Inspired Official CAT Resource Hub
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              2000–2025 Verified Question Bank
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3">
            CAT <span className="text-[#f26b23]">Previous Year Question Papers</span> &amp; Mock Test Dashboard
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed font-medium">
            Solving CAT previous year papers from 2000–2025 with detailed textual &amp; video solutions helps aspirants complete up to 95% of their preparation. Practice slot-wise mocks and topic-wise QA, VARC &amp; LRDI sets.
          </p>

          {/* 4 Feature Highlights Cards */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              onClick={() => setActiveTab('pyq')}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border-l-4 border-[#f26b23] p-3.5 rounded-r-xl cursor-pointer transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f26b23] to-[#d9531e] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                <BookOpen size={18} className="text-white" />
              </div>
              <p className="text-xs font-bold text-white leading-snug">All Previous Year Question Papers</p>
            </div>

            <div
              onClick={() => setActiveTab('pyq')}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border-l-4 border-[#f26b23] p-3.5 rounded-r-xl cursor-pointer transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f26b23] to-[#d9531e] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                <Target size={18} className="text-white" />
              </div>
              <p className="text-xs font-bold text-white leading-snug">CAT PYQ Papers in Mock Test Mode</p>
            </div>

            <div
              onClick={() => setActiveTab('quant')}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border-l-4 border-[#f26b23] p-3.5 rounded-r-xl cursor-pointer transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f26b23] to-[#d9531e] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                <Video size={18} className="text-white" />
              </div>
              <p className="text-xs font-bold text-white leading-snug">Detailed Textual &amp; Video Solutions</p>
            </div>

            <div
              onClick={() => setActiveTab('lrdi')}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border-l-4 border-[#f26b23] p-3.5 rounded-r-xl cursor-pointer transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f26b23] to-[#d9531e] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                <Award size={18} className="text-white" />
              </div>
              <p className="text-xs font-bold text-white leading-snug">All Topic-Wise CAT Practice Sets</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1.5. FULL-LENGTH LIVE CBT MOCK TEST HERO BANNER (66 Qs, Timed, With Solutions) ── */}
      <div className="bg-gradient-to-r from-orange-500 via-[#f26b23] to-amber-600 text-white p-6 md:p-8 shadow-xl border-b-4 border-[#0f172a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full text-amber-200 text-xs font-black uppercase tracking-wider">
              <Zap size={14} className="text-yellow-300" />
              100% Free · TCS iON Real Exam CBT Simulation
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Appear For Full-Length CAT 2026/2027 Live Mock Test
            </h3>
            <p className="text-orange-100 text-xs md:text-sm font-medium max-w-2xl leading-relaxed">
              Submit your details once to unlock our complete 66-question CAT simulation with 40-minute sectional timers (VARC, DILR, QA), instant AI scorecard, and comprehensive question-by-question solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="/tools/cat-mock-test"
              className="w-full sm:w-auto px-8 py-4 bg-[#0f172a] hover:bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-orange-300/30"
            >
              <span>Launch Live CBT Mock Test</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. CATEGORY TAB SWITCHER ── */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'pyq', label: 'CAT Exam Previous Year Paper 2000 - 2025', badge: '25+ Years' },
            { id: 'quant', label: 'CAT Quant Questions Topic Wise', badge: '5 Topics' },
            { id: 'varc', label: 'CAT VARC Questions Topic Wise', badge: '4 Topics' },
            { id: 'lrdi', label: 'CAT LRDI Questions Topic Wise', badge: '4 Topics' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative whitespace-nowrap px-4 py-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0f172a] text-white shadow-md'
                    : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-black'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#f26b23] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. MAIN CONTENT GRID (LEFT 3/4 + RIGHT SIDEBAR 1/4) ── */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: TAB CONTENT (8/12 OR 9/12) */}
          <div className="lg:col-span-8 space-y-6">
            {/* ── TAB 1: CAT PREVIOUS YEAR PAPERS ── */}
            {activeTab === 'pyq' && (
              <div className="space-y-6">
                {/* Search and Year Filter toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search year, slot, or IIM..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#f26b23]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    <span className="text-xs font-bold text-gray-400 uppercase">Filter:</span>
                    {['all', '2025', '2024', '2023', '2022', '2021', '2020'].map((year) => (
                      <button
                        key={year}
                        onClick={() => setYearFilter(year)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${
                          yearFilter === year
                            ? 'bg-[#f26b23] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {year === 'all' ? 'All Years' : year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of Years / Accordion */}
                <div className="space-y-4">
                  {filteredPapers.map((item) => {
                    const isExpanded = expandedYears.includes(item.year);
                    return (
                      <div
                        key={item.year}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Year Title Header */}
                        <div
                          onClick={() => toggleYear(item.year)}
                          className="bg-gradient-to-r from-[#1e293b] to-[#334155] text-white px-5 py-4 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-[#f26b23] text-white text-xs font-black uppercase px-3 py-1 rounded-full">
                              CAT {item.year}
                            </span>
                            <span className="text-sm md:text-base font-bold text-gray-100">
                              Official Question Papers · {item.conductingIim}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-300 hidden sm:inline">
                              {item.slots.length} {item.slots.length === 1 ? 'Paper' : 'Slots'}
                            </span>
                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Accordion Slots List */}
                        {isExpanded && (
                          <div className="divide-y divide-gray-100 p-2 md:p-4 bg-gray-50/50">
                            {item.slots.map((slot) => (
                              <div
                                key={slot.id}
                                className="p-4 bg-white rounded-xl mb-2 border border-gray-100 hover:border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                              >
                                {/* Slot Info */}
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm md:text-base font-black text-[#0f172a]">
                                      CAT {slot.year} — {slot.slot}
                                    </h4>
                                    <span
                                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                        slot.difficulty === 'Tough'
                                          ? 'bg-red-100 text-red-700'
                                          : slot.difficulty === 'Moderate-Tough'
                                          ? 'bg-amber-100 text-amber-700'
                                          : 'bg-green-100 text-green-700'
                                      }`}
                                    >
                                      {slot.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-gray-500 flex items-center gap-3">
                                    <span>{slot.totalQuestions} Questions</span>
                                    <span>•</span>
                                    <span>{slot.totalMarks} Marks</span>
                                    <span>•</span>
                                    <span>{slot.durationMins} Mins (40 min/section)</span>
                                  </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    onClick={() => openMockSimulation(`CAT ${slot.year} - ${slot.slot}`, slot.sampleQuestion)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f26b23] hover:bg-[#d9531e] text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
                                  >
                                    <Play size={13} fill="currentColor" />
                                    Attempt in Real CAT Mode
                                  </button>

                                  <button
                                    onClick={() => {
                                      openMockSimulation(`CAT ${slot.year} - ${slot.slot}`, slot.sampleQuestion);
                                      setShowSolution(true);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl transition-all"
                                  >
                                    <Video size={13} />
                                    Text + Video Solution
                                  </button>

                                  <button
                                    onClick={() => setShowPdfModal(true)}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-all"
                                  >
                                    <Download size={13} />
                                    PDF
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TAB 2: CAT QUANT TOPIC WISE ── */}
            {activeTab === 'quant' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0f172a]">
                      Quantitative Aptitude (QA) · All Topic-Wise Questions
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">
                      Practice 1,500+ past year questions categorized across 5 foundational modules.
                    </p>
                  </div>
                  <span className="bg-orange-50 text-[#f26b23] border border-orange-200 text-xs font-black uppercase px-3 py-1.5 rounded-full">
                    22 Questions | 40 Mins
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {CAT_QUANT_TOPICS.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f26b23]" />
                          <h4 className="text-base font-black text-[#0f172a]">{topic.title}</h4>
                        </div>
                        <p className="text-xs font-medium text-gray-500">{topic.desc}</p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                            {topic.weightage}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {topic.questionCount}+ Practice Qs
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openMockSimulation(topic.title, { section: 'QA', ...topic.sampleQuestion })}
                          className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Target size={14} />
                          Practice Topic Set
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 3: CAT VARC TOPIC WISE ── */}
            {activeTab === 'varc' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0f172a]">
                      Verbal Ability &amp; Reading Comprehension (VARC) · Topic-Wise
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">
                      Master RC passages, Para Jumbles, Para Summary, and Odd One Out sets.
                    </p>
                  </div>
                  <span className="bg-orange-50 text-[#f26b23] border border-orange-200 text-xs font-black uppercase px-3 py-1.5 rounded-full">
                    24 Questions | 40 Mins
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {CAT_VARC_TOPICS.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                          <h4 className="text-base font-black text-[#0f172a]">{topic.title}</h4>
                        </div>
                        <p className="text-xs font-medium text-gray-500">{topic.desc}</p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="bg-indigo-50 text-indigo-700 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                            {topic.weightage}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {topic.questionCount}+ Practice Qs
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => openMockSimulation(topic.title, { section: 'VARC', ...topic.sampleQuestion })}
                        className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
                      >
                        <Target size={14} />
                        Practice Topic Set
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 4: CAT LRDI TOPIC WISE ── */}
            {activeTab === 'lrdi' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0f172a]">
                      Logical Reasoning &amp; Data Interpretation (LRDI) · Topic-Wise
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">
                      Structured puzzle sets: Seating arrangement, Games &amp; Tournaments, Venn diagrams &amp; Quant LR.
                    </p>
                  </div>
                  <span className="bg-orange-50 text-[#f26b23] border border-orange-200 text-xs font-black uppercase px-3 py-1.5 rounded-full">
                    20 Questions | 40 Mins
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {CAT_LRDI_TOPICS.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                          <h4 className="text-base font-black text-[#0f172a]">{topic.title}</h4>
                        </div>
                        <p className="text-xs font-medium text-gray-500">{topic.desc}</p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                            {topic.weightage}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {topic.questionCount}+ Practice Sets
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => openMockSimulation(topic.title, { section: 'LRDI', ...topic.sampleQuestion })}
                        className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
                      >
                        <Target size={14} />
                        Practice Topic Set
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY ACTION CARDS (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Real CAT Mode */}
            <div className="bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f26b23]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="relative z-10">
                <span className="bg-[#f26b23] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
                  Simulated CBT
                </span>
                <h3 className="text-lg font-black leading-snug mb-2">Attempt PYQ in Real CAT Mode</h3>
                <p className="text-xs text-gray-300 mb-5 leading-relaxed font-medium">
                  Experience full-length 66-question mock tests with 40-minute sectional timers, percentile prediction, and AI accuracy analysis.
                </p>
                <button
                  onClick={() =>
                    openMockSimulation('CAT 2024 - Slot 1 (Full Test Simulation)', CAT_YEAR_PAPERS[1].slots[0].sampleQuestion)
                  }
                  className="w-full bg-white hover:bg-gray-100 text-[#0f172a] font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Play size={14} className="text-[#f26b23]" fill="currentColor" />
                  Attempt Mock Now
                </button>
              </div>
            </div>

            {/* Card 2: Video & Textual Solutions */}
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
                  99.9+ Percentile Mentors
                </span>
                <h3 className="text-lg font-black leading-snug mb-2">PYQs Video Solutions</h3>
                <p className="text-xs text-gray-300 mb-5 leading-relaxed font-medium">
                  Watch step-by-step video solutions and shortcut tricks by Mohit Jain and top CAT mentors for every QA, VARC, and DILR set.
                </p>
                <button
                  onClick={() => {
                    openMockSimulation('CAT 2024 - Slot 1 (Video Solution Mode)', CAT_YEAR_PAPERS[1].slots[0].sampleQuestion);
                    setShowSolution(true);
                  }}
                  className="w-full bg-[#f26b23] hover:bg-[#d9531e] text-white font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Video size={14} />
                  Watch Video Solutions
                </button>
              </div>
            </div>

            {/* Card 3: Free All-in-One PDF Bundle */}
            <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
                Free Download
              </span>
              <h3 className="text-lg font-black text-[#0f172a] leading-snug mb-2">
                Get All CAT 2000–2025 PYQ PDFs
              </h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed font-medium">
                Download the complete 25+ years CAT question paper bundle with official answer keys &amp; formulas in 1 click.
              </p>
              <button
                onClick={() => setShowPdfModal(true)}
                className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Download size={14} />
                Get All PDFs on WhatsApp
              </button>
            </div>

            {/* Card 4: Mohit Jain Direct Advisory */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck size={18} />
                <h4 className="font-black text-sm uppercase tracking-wide">CAT 2026 Strategy Call</h4>
              </div>
              <p className="text-xs text-emerald-100 mb-4 leading-relaxed font-medium">
                Confused about your CAT profile or IIM call predictor? Connect with Mohit Jain for 1-on-1 MBA admission guidance.
              </p>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20sir%2C%20I%20want%20to%20know%20more%20about%20CAT%202026%20preparation%20and%20PYQ%20mock%20tests."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                WhatsApp Mohit Jain Directly
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. INTERACTIVE LIVE MOCK SIMULATION MODAL ── */}
      {activeMockQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-[#f26b23] text-white text-xs font-black uppercase px-2.5 py-1 rounded">
                  {activeMockQuestion.section}
                </span>
                <h3 className="font-black text-sm md:text-base text-gray-100">{activeMockQuestion.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg text-xs font-bold text-amber-300">
                  <Clock size={14} />
                  <span>38:42</span>
                </div>
                <button
                  onClick={() => setActiveMockQuestion(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Question Content */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Question Text */}
              <div className="bg-gray-50 border-l-4 border-[#f26b23] p-5 rounded-r-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                  Question 1 of 22 · +3 Marks / -1 Mark
                </span>
                <p className="text-base font-bold text-[#0f172a] leading-relaxed whitespace-pre-line">
                  {activeMockQuestion.questionText}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {activeMockQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeMockQuestion.correctAnswer;
                  let optionClass =
                    'border-2 border-gray-200 bg-white hover:border-gray-300 text-gray-700';

                  if (showSolution) {
                    if (isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'border-red-400 bg-red-50 text-red-800';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-[#f26b23] bg-orange-50/50 text-[#0f172a] font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !showSolution && setSelectedOption(idx)}
                      disabled={showSolution}
                      className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <span>
                        <strong className="mr-3 text-gray-400 font-black">
                          {String.fromCharCode(65 + idx)}.
                        </strong>
                        {opt}
                      </span>
                      {showSolution && isCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Solution Panel (if revealed) */}
              {showSolution && (
                <div className="bg-indigo-50/80 border-2 border-indigo-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                      <Zap size={16} className="text-amber-500" />
                      <span>Step-by-Step Detailed Solution</span>
                    </div>
                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Verified Answer: Option {String.fromCharCode(65 + activeMockQuestion.correctAnswer)}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-indigo-950/80 font-medium leading-relaxed">
                    {activeMockQuestion.explanation}
                  </p>

                  <div className="bg-white/80 p-4 rounded-xl border border-indigo-200/80 flex items-start gap-3">
                    <Video size={18} className="text-[#f26b23] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black text-[#0f172a]">Video Solution &amp; Shortcut Concept</h5>
                      <p className="text-xs text-gray-600 font-medium mt-0.5">{activeMockQuestion.videoTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Toolbar */}
            <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setShowSolution(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900"
              >
                <RotateCcw size={14} />
                Reset Question
              </button>

              <div className="flex items-center gap-3">
                {!showSolution ? (
                  <button
                    onClick={() => setShowSolution(true)}
                    className="px-5 py-2.5 bg-[#f26b23] hover:bg-[#d9531e] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    Check Solution &amp; Video Tip
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <a
                      href="/tools/cat-mock-test"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
                    >
                      ⚡ Full 66-Q Timed Mock Test
                    </a>
                    <button
                      onClick={() => setActiveMockQuestion(null)}
                      className="px-6 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                    >
                      Finish
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. ALL-IN-ONE PDF BUNDLE DOWNLOAD MODAL ── */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowPdfModal(false);
                setPdfSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {pdfSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-[#0f172a] mb-2">PDF Bundle Sent!</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-6">
                  We have dispatched the complete <strong>CAT 2000–2025 PYQ PDF Bundle</strong> with official answer keys to your WhatsApp number.
                </p>
                <button
                  onClick={() => {
                    setShowPdfModal(false);
                    setPdfSubmitted(false);
                  }}
                  className="w-full bg-[#0f172a] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-black text-[#0f172a] mb-1">
                  Download CAT 2000–2025 PYQ PDFs
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Enter your details to receive all 25+ years of CAT question papers with step-by-step solutions instantly on WhatsApp.
                </p>

                <form onSubmit={handlePdfSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={pdfForm.name}
                    onChange={(e) => setPdfForm({ ...pdfForm, name: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#f26b23]"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp Phone Number"
                    value={pdfForm.phone}
                    onChange={(e) => setPdfForm({ ...pdfForm, phone: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#f26b23]"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={pdfForm.email}
                    onChange={(e) => setPdfForm({ ...pdfForm, email: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#f26b23]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#f26b23] hover:bg-[#d9531e] text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    Send Me All PYQ PDFs
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 6. COMPREHENSIVE SEO FAQ SECTION (iQuanta Style) ── */}
      <div className="bg-white border-t border-gray-200 p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-black text-[#f26b23] uppercase tracking-widest block mb-1">
              CAT Exam Intelligence
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-[#0f172a]">
              Frequently Asked Questions on CAT Previous Year Papers
            </h3>
          </div>

          {/* Exam Pattern Overview Box */}
          <div className="bg-gray-50 border-l-4 border-[#f26b23] p-6 rounded-r-2xl space-y-3">
            <h4 className="text-base font-black text-[#0f172a]">The Pattern of the CAT Exam</h4>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              The Common Admission Test (CAT) consists of three timed sections: <strong>VARC</strong> (Verbal Ability &amp; Reading Comprehension), <strong>LRDI</strong> (Logical Reasoning &amp; Data Interpretation), and <strong>QA</strong> (Quantitative Aptitude). Each section is allocated exactly 40 minutes (120 minutes total) with +3 marks for every correct answer and -1 mark for incorrect MCQ answers.
            </p>
          </div>

          {/* Accordion FAQs */}
          <div className="space-y-3">
            {CAT_PYQ_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-bold text-sm text-[#0f172a] select-none">
                  <span>{faq.q}</span>
                  <ChevronRight size={18} className="text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-4 md:px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 font-medium border-t border-gray-100 leading-relaxed bg-gray-50/50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
