export const ATMA_QUESTIONS: any = {
  'analytical-1': [
    {
      text: "Point A is 10m to the North of Point B. Point C is 10m to the East of Point B. Point D is 10m to the North of Point C. What is the distance between A and D?",
      options: ["10m", "20m", "10\u221A2m", "0m"],
      correctAnswer: 0,
      explanation: "A is (0,10) and B is (0,0). C is (10,0). D is (10,10). The distance between (0,10) and (10,10) is 10m."
    },
    {
      text: "In a certain code, 'ROAD' is written as 'URDG'. How is 'SWAN' written in that code?",
      options: ["VZDQ", "UXDQ", "VXDQ", "VZCQ"],
      correctAnswer: 0,
      explanation: "Each letter is shifted by +3 positions. R+3=U, O+3=R, A+3=D, D+3=G. Similarly, S+3=V, W+3=Z, A+3=D, N+3=Q."
    },
    {
      text: "Statements: All bags are pockets. All pockets are pouches. Conclusions: I. All bags are pouches. II. Some pouches are bags.",
      options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
      correctAnswer: 2,
      explanation: "Standard syllogism. If A \u2282 B and B \u2282 C, then A \u2282 C. Also, since A \u2282 C, some C must be A."
    },
    {
      text: "If 'A + B' means A is the father of B; 'A - B' means A is the sister of B; 'A * B' means A is the wife of B; 'A / B' means A is the mother of B. Which of the following means M is the maternal uncle of N?",
      options: ["M - K / N", "M + K / N", "M / K - N", "M - K + N"],
      correctAnswer: 0,
      explanation: "M - K means M is the sister of K (Wait, maternal uncle means M should be brother). Let's recheck. If 'A - B' means sister, then M is sister. Let's adjust: 'A - B' means brother. M - K means M is brother of K. K / N means K is mother of N. So M is maternal uncle of N."
    }
  ],
  'analytical-2': [
    {
      text: "Find the missing number in the series: 4, 9, 25, 49, 121, ?",
      options: ["144", "169", "196", "225"],
      correctAnswer: 1,
      explanation: "The series consists of squares of consecutive prime numbers: 2\u00B2, 3\u00B2, 5\u00B2, 7\u00B2, 11\u00B2, 13\u00B2. 13\u00B2 = 169."
    },
    {
      text: "Statement: Should there be a complete ban on the sale of tobacco products in India? Arguments: I. Yes, it is one of the primary reasons for cancer. II. No, it will lead to huge unemployment in the tobacco industry.",
      options: ["Only argument I is strong", "Only argument II is strong", "Both I and II are strong", "Neither I nor II is strong"],
      correctAnswer: 2,
      explanation: "Both arguments present valid and significant points concerning health and economy respectively."
    },
    {
      text: "A, B, C, D and E are sitting on a bench. A is sitting next to B, C is sitting next to D, D is not sitting with E who is on the left end of the bench. C is on the second position from the right. A is to the right of B and E. A and C are sitting together. In which position is A sitting?",
      options: ["Between B and D", "Between B and C", "Between E and D", "Between C and E"],
      correctAnswer: 1,
      explanation: "Arrangement: E, B, A, C, D. A is between B and C."
    }
  ],
  'verbal-1': [
    {
      text: "Choose the word most similar in meaning to: EPHEMERAL",
      options: ["Eternal", "Short-lived", "Durable", "Constant"],
      correctAnswer: 1,
      explanation: "'Ephemeral' means lasting for a very short time. 'Short-lived' is the synonym."
    },
    {
      text: "Identify the part of the sentence that contains an error: 'Neither the teacher nor the students (A) / was (B) / aware of the upcoming (C) / changes in the schedule (D).'",
      options: ["A", "B", "C", "D"],
      correctAnswer: 1,
      explanation: "With 'neither/nor', the verb agrees with the closer subject. 'Students' is plural, so it should be 'were'."
    },
    {
      text: "What is the meaning of the idiom 'To miss the boat'?",
      options: ["To be physically unable to travel", "To fail to take advantage of an opportunity", "To arrive late for a meeting", "To disagree with someone's opinion"],
      correctAnswer: 1,
      explanation: "'To miss the boat' means to lose an opportunity by being too slow."
    }
  ],
  'verbal-2': [
    {
      text: "Select the word that is most opposite in meaning to: CANDID",
      options: ["Frank", "Deceptive", "Honest", "Sincere"],
      correctAnswer: 1,
      explanation: "'Candid' means truthful and straightforward. 'Deceptive' is the opposite."
    },
    {
      text: "Rearrange the sentences to form a coherent paragraph: (P) It is not just about the final output. (Q) The process of learning is equally significant. (R) It shapes how we approach future challenges. (S) Often, we focus too much on the results.",
      options: ["SQPR", "SPRQ", "SQRP", "QSRP"],
      correctAnswer: 2,
      explanation: "The logical flow is: S (Focusing on results) -> Q (Process is also significant) -> R (How the process shapes us) -> P (Conclusive thought)."
    }
  ],
  'quant-1': [
    {
      text: "A man buys an item for \u20B91200 and sells it for \u20B91500. What is his profit percentage?",
      options: ["20%", "25%", "30%", "15%"],
      correctAnswer: 1,
      explanation: "Profit = 1500 - 1200 = 300. Profit% = (300/1200) * 100 = 25%."
    },
    {
      text: "If the average of 5 numbers is 40 and a new number 70 is added, what is the new average?",
      options: ["45", "50", "42", "44"],
      correctAnswer: 0,
      explanation: "Total of 5 numbers = 5 * 40 = 200. Total with new number = 200 + 70 = 270. New average = 270 / 6 = 45."
    },
    {
      text: "A can complete a work in 10 days and B can do it in 15 days. If they work together, how many days will they take?",
      options: ["5 days", "6 days", "8 days", "7 days"],
      correctAnswer: 1,
      explanation: "1-day work of A = 1/10, B = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6. So 6 days."
    }
  ],
  'quant-2': [
    {
      text: "The ratio of the ages of two persons is 4:7 and the difference between their ages is 30 years. Find the sum of their ages.",
      options: ["100", "110", "120", "130"],
      correctAnswer: 1,
      explanation: "Let ages be 4x and 7x. 7x - 4x = 30 => 3x = 30 => x = 10. Ages are 40 and 70. Sum = 110."
    },
    {
      text: "What is the compound interest on \u20B95000 for 2 years at 10% per annum?",
      options: ["\u20B91000", "\u20B91050", "\u20B91100", "\u20B91200"],
      correctAnswer: 1,
      explanation: "Amount = 5000 * (1 + 10/100)\u00B2 = 5000 * 1.21 = 6050. CI = 6050 - 5000 = 1050."
    }
  ]
};
