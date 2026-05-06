export interface Question {
  id: number;
  section: 'LR' | 'AR' | 'QA' | 'VARC';
  text: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation?: string;
}

export const MHCET_QUESTIONS: Question[] = [
  {
    "id": 1,
    "section": "LR",
    "text": "If 'ORANGE' is coded as 'PSBOHF', then how is 'APPLE' coded?",
    "options": ["BQQMF", "BPPLF", "BQPME", "BQQNF", "BRQMF"],
    "correctAnswer": 0,
    "explanation": "Each letter is shifted by +1 (O->P, R->S, A->B, etc.). For APPLE: A->B, P->Q, P->Q, L->M, E->F."
  },
  {
    "id": 2,
    "section": "QA",
    "text": "A train 150m long is running at a speed of 60 km/hr. How much time will it take to pass a lamp post?",
    "options": ["9 seconds", "10 seconds", "12 seconds", "15 seconds", "8 seconds"],
    "correctAnswer": 0,
    "explanation": "Speed = 60 * 5/18 = 50/3 m/s. Time = Distance / Speed = 150 / (50/3) = 9 seconds."
  },
  {
    "id": 3,
    "section": "VARC",
    "text": "Choose the word most nearly opposite in meaning to 'ENORMOUS'.",
    "options": ["Tiny", "Huge", "Soft", "Average", "Weak"],
    "correctAnswer": 0,
    "explanation": "Enormous means very large, so the opposite is Tiny."
  },
  {
    "id": 4,
    "section": "AR",
    "text": "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
    "options": ["42", "40", "36", "44", "38"],
    "correctAnswer": 0,
    "explanation": "The differences are 4, 6, 8, 10... so the next difference is 12. 30 + 12 = 42."
  },
  {
    "id": 5,
    "section": "LR",
    "text": "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    "options": ["His son's", "His father's", "His own", "His nephew's", "His cousin's"],
    "correctAnswer": 0,
    "explanation": "My father's son = Me (since he has no siblings). So, that man's father is Me. Thus, the man in the photo is his son."
  },
  {
    "id": 6,
    "section": "QA",
    "text": "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
    "options": ["28", "26", "24", "22", "30"],
    "correctAnswer": 0,
    "explanation": "Sum of 5 numbers = 5 * 20 = 100. Sum of 4 numbers = 4 * 18 = 72. Excluded number = 100 - 72 = 28."
  },
  {
    "id": 7,
    "section": "VARC",
    "text": "Identify the correctly spelled word.",
    "options": ["Accommodation", "Acommodation", "Accomodation", "Acomodation", "Accomodasion"],
    "correctAnswer": 0,
    "explanation": "The correct spelling is Accommodation (double C, double M)."
  },
  {
    "id": 8,
    "section": "AR",
    "text": "Which of the following figures will complete the pattern?",
    "options": ["Figure A", "Figure B", "Figure C", "Figure D", "Figure E"],
    "correctAnswer": 1,
    "explanation": "The pattern follows a 90-degree clockwise rotation."
  },
  {
    "id": 9,
    "section": "LR",
    "text": "In a row of boys, A is 10th from the left and B is 9th from the right. If they interchange their positions, A becomes 15th from the left. How many boys are there in the row?",
    "options": ["23", "24", "22", "25", "21"],
    "correctAnswer": 0,
    "explanation": "Total = A's new position + B's old position - 1 = 15 + 9 - 1 = 23."
  },
  {
    "id": 10,
    "section": "QA",
    "text": "The price of an item is increased by 20% and then decreased by 20%. The net change is:",
    "options": ["4% decrease", "4% increase", "No change", "2% decrease", "2% increase"],
    "correctAnswer": 0,
    "explanation": "Net change = x + y + xy/100 = 20 - 20 + (20 * -20)/100 = -4%."
  },
  {
    "id": 11,
    "section": "VARC",
    "text": "Choose the most appropriate synonym for 'ABANDON'.",
    "options": ["Forsake", "Keep", "Adopt", "Cherish", "Pursue"],
    "correctAnswer": 0,
    "explanation": "Abandon means to leave or give up completely."
  },
  {
    "id": 12,
    "section": "AR",
    "text": "Find the odd one out from the following figures.",
    "options": ["Circle", "Square", "Triangle", "Rectangle", "Rhombus"],
    "correctAnswer": 0,
    "explanation": "Circle has no straight lines or vertices."
  },
  {
    "id": 13,
    "section": "LR",
    "text": "If 1st January 2024 was Monday, what day was 1st February 2024?",
    "options": ["Thursday", "Wednesday", "Tuesday", "Friday", "Monday"],
    "correctAnswer": 0,
    "explanation": "January has 31 days. 31/7 gives 3 remainder. Monday + 3 days = Thursday."
  },
  {
    "id": 14,
    "section": "QA",
    "text": "What is the cube root of 1728?",
    "options": ["12", "14", "16", "18", "11"],
    "correctAnswer": 0,
    "explanation": "12 * 12 * 12 = 1728."
  },
  {
    "id": 15,
    "section": "VARC",
    "text": "Choose the correct preposition: He is interested ___ music.",
    "options": ["in", "on", "at", "with", "for"],
    "correctAnswer": 0,
    "explanation": "The correct phrase is 'interested in'."
  },
  {
    "id": 16,
    "section": "LR",
    "text": "A is the brother of B. B is the daughter of C. D is the father of C. How is A related to D?",
    "options": ["Grandson", "Son", "Brother", "Father", "Nephew"],
    "correctAnswer": 0,
    "explanation": "C is the parent. D is the grandparent. A is the child of C."
  },
  {
    "id": 17,
    "section": "QA",
    "text": "A and B can do a piece of work in 12 days and 15 days respectively. They started together but A left after 3 days. How many more days will B take to finish?",
    "options": ["8.25", "9", "10", "11.25", "7.5"],
    "correctAnswer": 0,
    "explanation": "Work in 3 days = 3 * (1/12 + 1/15) = 3 * (9/60) = 27/60. Remaining = 33/60. B takes (33/60) / (1/15) = 33/4 = 8.25 days."
  }
];