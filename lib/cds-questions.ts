import { GenericQuestion } from './mock-test-data';

export const CDS_QUESTIONS: Partial<Record<string, GenericQuestion[]>> = {
  'arithmetic': [
    {
      id: 1,
      sectionId: 'arithmetic',
      text: "LCM of two numbers x and y is 481 where x > y. What is the value of (3x – 2y)?",
      options: ["85", "105", "111", "75"],
      correctAnswer: 0,
      explanation: "Factors of 481 are 1, 13, 37, 481. Since LCM(x, y) = 481 and x > y, the pair is x = 37 and y = 13 (as 13 * 37 = 481). Then, (3 * 37) - (2 * 13) = 111 - 26 = 85."
    },
    {
      id: 2,
      sectionId: 'arithmetic',
      text: "50 men can complete a work in 40 days. They begin the work together but a batch of 5 men leave after every 10 days. What is the total time to complete the work?",
      options: ["45 days", "50 days", "55 days", "60 days"],
      correctAnswer: 1,
      explanation: "Total work = 50 * 40 = 2000 units. Days 1-10: 50 * 10 = 500 units. Days 11-20: 45 * 10 = 450. Days 21-30: 40 * 10 = 400. Days 31-40: 35 * 10 = 350. Total after 40 days = 1700. Remaining = 300. Next period, 30 men work. Time = 300 / 30 = 10 days. Total = 50 days."
    },
    {
      id: 3,
      sectionId: 'arithmetic',
      text: "If the price of sugar increases by 20%, by what percent should a consumer reduce the consumption so that the expenditure remains the same?",
      options: ["16 2/3%", "20%", "25%", "15%"],
      correctAnswer: 0,
      explanation: "Reduction percentage = [r / (100 + r)] * 100 = [20 / 120] * 100 = 16.66% or 16 2/3%."
    },
    {
      id: 4,
      sectionId: 'arithmetic',
      text: "A person sells two items at Rs. 990 each. On one he grains 10% and on other he loses 10%. What is his overall gain or loss percent?",
      options: ["1% loss", "1% gain", "No loss no gain", "2% loss"],
      correctAnswer: 0,
      explanation: "In such cases where selling price is same and profit/loss % is same, there is always a loss of (x/10)^2 %. Here (10/10)^2 = 1% loss."
    },
    {
      id: 5,
      sectionId: 'arithmetic',
      text: "The sum of three consecutive natural numbers is 87. What is the middle number?",
      options: ["28", "29", "30", "27"],
      correctAnswer: 1,
      explanation: "Let numbers be n-1, n, n+1. Sum = 3n = 87 => n = 29."
    }
  ],
  'algebra': [
    {
      id: 41,
      sectionId: 'algebra',
      text: "If α and β are the roots of the equation x² - x - 1 = 0, find the value of (α²/β²) + (β²/α²).",
      options: ["7", "9", "5", "34"],
      correctAnswer: 0,
      explanation: "α + β = 1, αβ = -1. Value = (α⁴ + β⁴) / (αβ)². α² + β² = (α+β)² - 2αβ = 1 + 2 = 3. α⁴ + β⁴ = (α² + β²)² - 2(αβ)² = 9 - 2 = 7."
    },
    {
      id: 42,
      sectionId: 'algebra',
      text: "When the polynomial (x³ - 2x² + px - q) is divided by (x - 1) and (x - 2), the remainders are 1 and 2 respectively. Find p and q.",
      options: ["p=0, q=-2", "p=2, q=0", "p=1, q=1", "p=-2, q=0"],
      correctAnswer: 0,
      explanation: "f(1)=1 => 1-2+p-q=1 => p-q=2. f(2)=2 => 8-8+2p-q=2 => 2p-q=2. Solving gives p=0, q=-2."
    },
    {
      id: 43,
      sectionId: 'algebra',
      text: "If x + 1/x = 5, what is the value of x² + 1/x²?",
      options: ["23", "25", "27", "21"],
      correctAnswer: 0,
      explanation: "(x + 1/x)² = x² + 2 + 1/x² = 25 => x² + 1/x² = 23."
    },
    {
      id: 44,
      sectionId: 'algebra',
      text: "Solve for x: 2^(x+3) = 32.",
      options: ["x=2", "x=3", "x=5", "x=8"],
      correctAnswer: 0,
      explanation: "2^(x+3) = 2^5 => x+3 = 5 => x = 2."
    }
  ],
  'trig-stat': [
    {
      id: 81,
      sectionId: 'trig-stat',
      text: "If cos θ / (csc θ + 1) + cos θ / (csc θ - 1) = 2 where 0° < θ < 90°, find sin⁴ θ + cos⁴ θ.",
      options: ["1/2", "1", "1/4", "2"],
      correctAnswer: 0,
      explanation: "Simplifies to 2 tan θ = 2 => θ = 45°. sin⁴ 45 + cos⁴ 45 = (1/2)² + (1/2)² = 1/4 + 1/4 = 1/2."
    },
    {
      id: 82,
      sectionId: 'trig-stat',
      text: "If 3 sin θ + 5 cos θ = 5, then what is the value of 5 sin θ – 3 cos θ?",
      options: ["±3", "±5", "±4", "0"],
      correctAnswer: 0,
      explanation: "(a sin θ + b cos θ)² + (b sin θ - a cos θ)² = a² + b². 5² + k² = 3² + 5² => k² = 9 => k = ±3."
    },
    {
      id: 83,
      sectionId: 'trig-stat',
      text: "Evaluate: (sin 30° + cos 30°) - (sin 60° + cos 60°).",
      options: ["0", "1", "√3", "2"],
      correctAnswer: 0,
      explanation: "Substitute values: (1/2 + √3/2) - (√3/2 + 1/2) = 0."
    }
  ]
};
