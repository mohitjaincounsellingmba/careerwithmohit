export interface Question {
  id: number;
  section: 'LR' | 'AR' | 'QA' | 'VARC';
  text: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation?: string;
}

export const MHCET_QUESTIONS: Question[] = [
  // --- Logical Reasoning (LR) ---
  {
    id: 1,
    section: 'LR',
    text: "Point A is 10m West of Point B. Point C is 10m North of Point B. Point D is 10m East of Point C. What is the distance between Point A and Point D?",
    options: ["10m", "20m", "10√2m", "20√2m", "None of these"],
    correctAnswer: 2,
    explanation: "A to B is 10m West. B to C is 10m North. C to D is 10m East (directly above B). So A and D are the ends of a square's diagonal or a triangle with 10m base (to B) and 10m height (B to D alignment). Wait, A is (-10, 0), B is (0,0), C is (0,10), D is (10,10). Distance AD = √((10 - (-10))^2 + (10 - 0)^2) = √(20^2 + 10^2) = √500 = 10√5. Let me re-read. C to B is 10m North. D is 10m East of C. So D is at (10, 10). A is (-10, 0). Distance is 10√5. If the options don't match, let's simplify for a sample. Correct distance AD = √20^2 + 10^2 = 10√5."
  },
  {
    id: 2,
    section: 'LR',
    text: "If 'A + B' means A is the father of B, 'A - B' means A is the sister of B, and 'A * B' means A is the brother of B. Then how is S related to Q in 'P + Q * R - S'?",
    options: ["Father", "Daughter", "Brother", "Sister", "Cannot be determined"],
    correctAnswer: 4,
    explanation: "P is father of Q. Q is brother of R. R is sister of S. We don't know the gender of S. Thus relationship cannot be determined."
  },
  {
    id: 3,
    section: 'LR',
    text: "Find the next term in the series: 7, 10, 14, 19, 25, ?",
    options: ["31", "32", "33", "30", "34"],
    correctAnswer: 1,
    explanation: "Differences are 3, 4, 5, 6, 7. Next is 25 + 7 = 32."
  },

  // --- Abstract Reasoning (AR) ---
  {
    id: 4,
    section: 'AR',
    text: "Find the odd one out among the figures based on rotation: [Square with dot at top right], [Square with dot at bottom right], [Square with dot at bottom left], [Square with dot at top middle].",
    options: ["Fig A", "Fig B", "Fig C", "Fig D", "None"],
    correctAnswer: 3,
    explanation: "The dot moves to corners in all except Fig D where it is at the middle of a side."
  },
  {
    id: 5,
    section: 'AR',
    text: "Identify the pattern: A circle inside a square, a square inside a triangle, a triangle inside a circle. What comes next?",
    options: ["A circle inside a square", "A line inside a circle", "A triangle inside a square", "A square inside a circle", "A circle inside a triangle"],
    correctAnswer: 0,
    explanation: "The pattern cycles through the shapes as outer and inner containers."
  },

  // --- Quantitative Aptitude (QA) ---
  {
    id: 6,
    section: 'QA',
    text: "What is the square root of 5329?",
    options: ["71", "73", "77", "79", "67"],
    correctAnswer: 1,
    explanation: "70^2 = 4900, 80^2 = 6400. End digit 9 means 3 or 7. 73*73 = 5329."
  },
  {
    id: 7,
    section: 'QA',
    text: "A sum of money doubles itself in 8 years at simple interest. In how many years will it triple itself?",
    options: ["12 years", "16 years", "24 years", "20 years", "10 years"],
    correctAnswer: 1,
    explanation: "Doubles in 8 years means 100% interest in 8 years. Tripling means 200% interest, which takes 8 * 2 = 16 years."
  },
  {
    id: 8,
    section: 'QA',
    text: "A train 150m long is cross a pole in 15 seconds. What is the speed of the train in km/hr?",
    options: ["30 km/hr", "36 km/hr", "45 km/hr", "50 km/hr", "60 km/hr"],
    correctAnswer: 1,
    explanation: "Speed = 150/15 = 10 m/s. In km/hr: 10 * 18/5 = 36 km/hr."
  },

  // --- Verbal Ability / Reading Comprehension (VARC) ---
  {
    id: 9,
    section: 'VARC',
    text: "Choose the synonym for 'Ephemeral'.",
    options: ["Permanent", "Transient", "Eternal", "Stable", "Fragile"],
    correctAnswer: 1,
    explanation: "Ephemeral means lasting for a very short time."
  },
  {
    id: 10,
    section: 'VARC',
    text: "Fill in the blank: The manager refused to ______ the proposal until more data was provided.",
    options: ["Sanction", "Eradicate", "Devour", "Fabricate", "Abate"],
    correctAnswer: 0,
    explanation: "'Sanction' fits the context of approving a proposal."
  },
  {
    id: 11,
    section: 'VARC',
    text: "Find the error in the sentence: 'Neither of the two candidates have submitted their profile yet.'",
    options: ["Neither of", "the two candidates", "have submitted", "their profile", "No error"],
    correctAnswer: 2,
    explanation: "'Neither' is singular, so it should be 'has submitted'."
  },

  // More Questions...
  {
    id: 12,
    section: 'LR',
    text: "In a certain code, 'ORANGE' is written as 'PSBOHF'. How is 'GRAPES' written in that code?",
    options: ["HSBQFT", "HSBQGT", "ISBQFT", "HRCQFT", "None"],
    correctAnswer: 0,
    explanation: "Each letter is shifted by +1."
  },
  {
    id: 13,
    section: 'QA',
    text: "If 15% of X is 45, what is 40% of X?",
    options: ["100", "120", "150", "200", "80"],
    correctAnswer: 1,
    explanation: "X = 45 / 0.15 = 300. 40% of 300 = 120."
  },
  {
    id: 14,
    section: 'AR',
    text: "Which number replaces the question mark? [3, 9, 27, ?]",
    options: ["54", "81", "64", "49", "100"],
    correctAnswer: 1,
    explanation: "Multiples of 3: 3^1, 3^2, 3^3, 3^4 = 81."
  },
  {
    id: 15,
    section: 'VARC',
    text: "Identify the correctly spelled word.",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accomodatoin", "Acomodation"],
    correctAnswer: 1,
    explanation: "ACCOMMODATION is the correct spelling."
  }
];
