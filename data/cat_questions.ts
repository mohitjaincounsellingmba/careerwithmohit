export interface Question {
  id: string;
  exam: string;
  year: number;
  slot: string;
  section: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanationUrl: string;
}

export const CAT_QUESTIONS: Question[] = [
  {
    id: 'cat2023-q1',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'If $x$ and $y$ are positive real numbers such that $\\log _x(x^2+12)=4$ and $3 \\log _y x=1$, then $x+y$ equals',
    options: ['20', '11', '68', '10'],
    correctAnswer: '10',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-1.shtml'
  },
  {
    id: 'cat2023-q2',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'If $x$ and $y$ are real numbers such that $x^2+(x-2 y-1)^2=-4 y(x+y)$, then the value $x-2 y$ is',
    options: ['0', '1', '2', '-1'],
    correctAnswer: '1',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-2.shtml'
  },
  {
    id: 'cat2023-q3',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'If $\\sqrt{5 x+9}+\\sqrt{5 x-9}=3(2+\\sqrt{2})$, then $\\sqrt{10 x+9}$ is equal to',
    options: ['$4 \\sqrt{5}$', '$2 \\sqrt{7}$', '$3 \\sqrt{31}$', '$3 \\sqrt{7}$'],
    correctAnswer: '$3 \\sqrt{7}$',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-3.shtml'
  },
  {
    id: 'cat2023-q4',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'Let $n$ be the least positive integer such that 168 is a factor of $1134^n$. If $m$ is the least positive integer such that $1134^n$ is a factor of $168^m$, then $m+n$ equals',
    options: ['12', '9', '15', '24'],
    correctAnswer: '15',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-4.shtml'
  },
  {
    id: 'cat2023-q5',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'The number of integer solutions of equation $2|x|(x^2+1)=5 x^2$ is',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-5.shtml'
  },
  {
    id: 'cat2023-q6',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'Let $\\alpha$ and $\\beta$ be the two distinct roots of the equation $2 x^2-6 x+k=0$, such that $(\\alpha+\\beta)$ and $\\alpha \\beta$ are the distinct roots of the equation $x^2+p x+p=0$. Then, the value of $8(k-p)$ is',
    options: ['4', '6', '8', '12'],
    correctAnswer: '6',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-6.shtml'
  },
  {
    id: 'cat2023-q7',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'The equation $x^3+(2 r+1) x^2+(4 r-1) x+2=0$ has -2 as one of the roots. If the other two roots are real, then the minimum possible non-negative integer value of $r$ is',
    options: ['0', '1', '2', '3'],
    correctAnswer: '2',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-7.shtml'
  },
  {
    id: 'cat2023-q8',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'Brishti went on an 8-hour trip in a car. Before the trip, the car had travelled a total of $x \\mathrm{~km}$ till then, where $x$ is a whole number and is palindromic. At the end of the trip, the car had travelled a total of $26862 \\mathrm{~km}$ till then, this number again being palindromic. If Brishti never drove at more than $110 \\mathrm{~km} / \\mathrm{h}$, then the greatest possible average speed at which she drove during the trip, in $\\mathrm{km} / \\mathrm{h}$, was',
    options: ['90', '100', '80', '110'],
    correctAnswer: '100',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-8.shtml'
  },
  {
    id: 'cat2023-q9',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'The minor angle between the hours hand and minutes hand of a clock was observed at $8: 48 \\mathrm{am}$. The minimum duration, in minutes, after 8.48 am when this angle increases by $50 \\%$ is',
    options: ['$\\frac{36}{11}$', '$\\frac{24}{11}$', '2', '4'],
    correctAnswer: '$\\frac{24}{11}$',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-9.shtml'
  },
  {
    id: 'cat2023-q10',
    exam: 'CAT',
    year: 2023,
    slot: 'Slot 1',
    section: 'Quant',
    questionText: 'In an examination, the average marks of 4 girls and 6 boys is 24. Each of the girls has the same marks while each of the boys has the same marks. If the marks of any girl is at most double the marks of any boy, but not less than the marks of any boy, then the number of possible distinct integer values of the total marks of 2 girls and 6 boys is',
    options: ['19', '21', '20', '22'],
    correctAnswer: '21',
    explanationUrl: 'https://online.2iim.com/CAT-question-paper/CAT-2023-Question-Paper-Slot-1-Quant/quants-question-10.shtml'
  }
];
