import { GenericQuestion } from './mock-test-data';

export const REAL_EXAM_QUESTIONS: Record<string, Partial<Record<string, GenericQuestion[]>>> = {
  'cat': {
    'varc': [
      { id: 101, sectionId: 'varc', text: "The passage suggests that Stoicism is often misunderstood as being about:", options: ["Suppression of all emotions", "Logical reasoning only", "Religious devotion", "Political activism"], correctAnswer: 0, explanation: "Stoicism focuses on managing emotions through reason, not suppressing them." },
      { id: 102, sectionId: 'varc', text: "In Para Jumble questions, the key to identifying the opening sentence is usually:", options: ["Finding the sentence with a pronoun", "Identifying the sentence that introduces the main topic", "Looking for concluding conjunctions like 'therefore'", "Finding the shortest sentence"], correctAnswer: 1, explanation: "Opening sentences are typically independent and introduce the subject." },
      { id: 103, sectionId: 'varc', text: "Which of the following would 'undermine' the author's argument in a Reading Comprehension passage?", options: ["A supporting example", "A counter-example", "A neutral statement", "A restatement"], correctAnswer: 1, explanation: "To undermine means to weaken the argument." },
      { id: 104, sectionId: 'varc', text: "The term 'Post-colonialism' in literature primarily refers to:", options: ["Writing after the independence of colonies", "Writing during the colonial era", "European classical literature", "Ancient Greek plays"], correctAnswer: 0, explanation: "It refers to the study of the cultural legacy of colonialism." },
      { id: 105, sectionId: 'varc', text: "Identify the odd sentence out in a paragraph about Solar Energy.", options: ["Solar panels convert sunlight to electricity.", "Photovoltaic cells are key components.", "Coal mining has environmental impacts.", "Solar energy is a renewable resource."], correctAnswer: 2, explanation: "The sentence about coal mining is irrelevant to the solar energy theme." },
      { id: 106, sectionId: 'varc', text: "Which of these is a common 'tone' of a Reading Comprehension passage?", options: ["Skeptical", "Circular", "Square", "Quiet"], correctAnswer: 0, explanation: "Skeptical is a common tone where the author expresses doubt." }
    ],
    'dilr': [
      { id: 201, sectionId: 'dilr', text: "In a company of 100 employees, 60 like coffee, 40 like tea, and 20 like both. How many like neither?", options: ["20", "10", "30", "0"], correctAnswer: 0, explanation: "100 - (60+40-20) = 20." },
      { id: 202, sectionId: 'dilr', text: "A, B, C, D, and E are sitting in a row. C is to the immediate right of B. D is to the immediate left of E. B is between A and C. Who is in the middle?", options: ["C", "B", "A", "D"], correctAnswer: 0, explanation: "Arrangement: A-B-C-D-E." },
      { id: 203, sectionId: 'dilr', text: "If 'MONDAY' is coded as 'TUESDAY' (hypothetically in a sequence), what comes after 'FRIDAY'?", options: ["SATURDAY", "SUNDAY", "MONDAY", "WEDNESDAY"], correctAnswer: 0, explanation: "Standard day sequence." },
      { id: 204, sectionId: 'dilr', text: "If 12th January 2024 is Friday, what day is 15th January 2024?", options: ["Monday", "Sunday", "Saturday", "Tuesday"], correctAnswer: 0, explanation: "Friday + 3 days = Monday." }
    ],
    'quant': [
      { id: 301, sectionId: 'quant', text: "If x + y = 20 and xy = 96, find |x - y|.", options: ["4", "2", "6", "8"], correctAnswer: 0, explanation: "x=12, y=8. |12-8|=4." },
      { id: 302, sectionId: 'quant', text: "A person sells two items at Rs. 1000 each. On one he gains 20% and on other he loses 20%. Overall result?", options: ["4% loss", "4% gain", "No loss no gain", "2% loss"], correctAnswer: 0, explanation: "(20/10)^2 = 4% loss." },
      { id: 303, sectionId: 'quant', text: "A can do a work in 10 days, B in 15 days. Together?", options: ["6 days", "8 days", "12 days", "5 days"], correctAnswer: 0, explanation: "1/10 + 1/15 = 5/30 = 1/6. So 6 days." },
      { id: 304, sectionId: 'quant', text: "The area of a circle is 154 sq cm. Its circumference?", options: ["44 cm", "22 cm", "88 cm", "66 cm"], correctAnswer: 0, explanation: "πr²=154 => r=7. 2πr = 2 * 22/7 * 7 = 44." }
    ]
  },
  'jee-main': {
    'physics': [
      { id: 401, sectionId: 'physics', text: "A particle moves in a circle of radius R with constant speed v. Acceleration?", options: ["v²/R", "v/R", "v²R", "0"], correctAnswer: 0, explanation: "a = v²/R." },
      { id: 402, sectionId: 'physics', text: "Dimensions of Planck's constant (h) are same as:", options: ["Angular Momentum", "Linear Momentum", "Energy", "Power"], correctAnswer: 0, explanation: "Both are [ML²T⁻¹]." },
      { id: 403, sectionId: 'physics', text: "The focal length of a concave mirror of radius of curvature 30 cm is:", options: ["-15 cm", "15 cm", "-30 cm", "30 cm"], correctAnswer: 0, explanation: "f = R/2. Concave mirror has negative focal length." }
    ],
    'chemistry': [
      { id: 501, sectionId: 'chemistry', text: "Strongest acid among these?", options: ["HClO4", "HClO3", "HClO2", "HClO"], correctAnswer: 0, explanation: "Oxidation state of Cl is highest (+7)." },
      { id: 502, sectionId: 'chemistry', text: "Number of σ and π bonds in benzene?", options: ["12 σ, 3 π", "9 σ, 3 π", "6 σ, 6 π", "12 σ, 6 π"], correctAnswer: 0, explanation: "6 C-C and 6 C-H σ bonds." },
      { id: 503, sectionId: 'chemistry', text: "The element with the highest electronegativity is:", options: ["Fluorine", "Chlorine", "Oxygen", "Nitrogen"], correctAnswer: 0, explanation: "Fluorine is the most electronegative element." }
    ],
    'maths': [
      { id: 601, sectionId: 'maths', text: "Derivative of sin(x²)?", options: ["2x cos(x²)", "cos(x²)", "2x sin(x²)", "-2x cos(x²)"], correctAnswer: 0, explanation: "Chain rule." },
      { id: 602, sectionId: 'maths', text: "The value of log₁₀(1000) is:", options: ["3", "2", "10", "1"], correctAnswer: 0, explanation: "10³ = 1000." },
      { id: 603, sectionId: 'maths', text: "If x + y = 10 and x - y = 2, then x is:", options: ["6", "4", "8", "5"], correctAnswer: 0, explanation: "2x = 12 => x = 6." }
    ]
  },
  'neet': {
    'botany': [
      { id: 701, sectionId: 'botany', text: "Powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], correctAnswer: 0, explanation: "ATP production happens here." },
      { id: 702, sectionId: 'botany', text: "Plants in salty environments?", options: ["Halophytes", "Xerophytes", "Hydrophytes", "Mesophytes"], correctAnswer: 0, explanation: "Adapted to salinity." }
    ],
    'zoology': [
      { id: 801, sectionId: 'zoology', text: "Chambers in a human heart?", options: ["4", "2", "3", "1"], correctAnswer: 0, explanation: "2 atria, 2 ventricles." },
      { id: 802, sectionId: 'zoology', text: "Emergency hormone?", options: ["Adrenaline", "Insulin", "Thyroxine", "Estrogen"], correctAnswer: 0, explanation: "Flight or fight response." }
    ]
  },
  'ielts': {
    'listening': [
      { id: 901, sectionId: 'listening', text: "What time is the flight departing according to the announcement? (Audio transcript: 'Attention passengers, flight 402 to London will depart at 14:30 from gate 6.')", options: ["2:30 PM", "4:02 PM", "6:00 PM", "4:30 PM"], correctAnswer: 0, explanation: "14:30 is 2:30 PM on a 12-hour clock." },
      { id: 902, sectionId: 'listening', text: "According to the speaker, what is the main advantage of the new library system? (Audio transcript: 'While the new system is slightly more expensive, its main benefit is the significantly faster search capability.')", options: ["It is cheaper", "It has more books", "It searches faster", "It is easier to learn"], correctAnswer: 2, explanation: "The speaker explicitly states the main benefit is 'significantly faster search capability'." }
    ],
    'reading': [
      { id: 1001, sectionId: 'reading', text: "Passage excerpt: 'The discovery of penicillin revolutionized modern medicine, turning previously fatal infections into treatable conditions.'\nQuestion: True, False, or Not Given? Penicillin made fatal infections treatable.", options: ["True", "False", "Not Given", "N/A"], correctAnswer: 0, explanation: "The passage directly states that it turned previously fatal infections into treatable conditions." },
      { id: 1002, sectionId: 'reading', text: "Passage excerpt: 'Solar energy adoption has increased by 40% in the last decade, primarily due to falling installation costs.'\nQuestion: What is the main reason for the increase in solar energy adoption?", options: ["Government subsidies", "Falling installation costs", "Environmental awareness", "Improved technology"], correctAnswer: 1, explanation: "The passage explicitly credits 'falling installation costs' as the primary reason." }
    ]
  },
  'sat': {
    'rw': [
      { id: 1101, sectionId: 'rw', text: "As artificial intelligence systems become more sophisticated, they are increasingly capable of ________ complex tasks that once required human intuition.\nWhich choice completes the text with the most logical and precise word?", options: ["executing", "sabotaging", "fabricating", "predicting"], correctAnswer: 0, explanation: "'Executing' is the most precise word in this context, meaning to carry out or accomplish complex tasks." },
      { id: 1102, sectionId: 'rw', text: "While many scientists study the macro-level impacts of climate change on ocean currents, Dr. Aris focuses on a more ________ phenomenon: the shifting metabolic rates of microscopic plankton.\nWhich choice completes the text with the most logical and precise word?", options: ["widespread", "localized", "catastrophic", "predictable"], correctAnswer: 1, explanation: "The contrast with 'macro-level' suggests a word meaning micro-level or specific, making 'localized' the best fit." }
    ],
    'maths': [
      { id: 1201, sectionId: 'maths', text: "If 3x - 5 = 16, what is the value of 6x?", options: ["14", "21", "42", "7"], correctAnswer: 2, explanation: "3x = 21, so x = 7. Therefore, 6x = 42." },
      { id: 1202, sectionId: 'maths', text: "A rectangle has a length of (x + 3) and a width of (x - 2). Which expression represents the area of the rectangle?", options: ["x^2 + x - 6", "x^2 - x - 6", "2x + 1", "4x + 2"], correctAnswer: 0, explanation: "(x + 3)(x - 2) = x^2 - 2x + 3x - 6 = x^2 + x - 6." }
    ]
  },
  'toefl': {
    'reading': [
      { id: 1301, sectionId: 'reading', text: "The word 'flourished' in the passage is closest in meaning to:", options: ["declined", "thrived", "transformed", "originated"], correctAnswer: 1, explanation: "'Flourished' means to grow vigorously or thrive." },
      { id: 1302, sectionId: 'reading', text: "According to paragraph 2, what was the primary cause of the civilization's decline?", options: ["Foreign invasion", "Extended drought", "Internal rebellion", "Economic collapse"], correctAnswer: 1, explanation: "The passage states that decades without rain led to crop failure, pointing to an extended drought." }
    ],
    'listening': [
      { id: 1401, sectionId: 'listening', text: "What is the main topic of the professor's lecture? (Audio context: The professor discusses the impact of invasive species on native ecosystems).", options: ["How to identify invasive species", "The history of native ecosystems", "The ecological damage caused by invasive species", "The benefits of introducing new species"], correctAnswer: 2, explanation: "The focus of the lecture is the negative impact and damage caused by these species." }
    ]
  },
  'gre': {
    'verbal': [
      { id: 1501, sectionId: 'verbal', text: "Despite her ________ nature, she managed to lead the team through the crisis with surprising decisiveness.\nSelect the word that best completes the sentence.", options: ["resolute", "capricious", "timid", "gregarious"], correctAnswer: 2, explanation: "'Timid' provides the necessary contrast to 'surprising decisiveness'." },
      { id: 1502, sectionId: 'verbal', text: "The politician's argument was so ________ that even his most ardent supporters struggled to follow his logic.\nSelect the word that best completes the sentence.", options: ["cogent", "convoluted", "perspicuous", "eloquent"], correctAnswer: 1, explanation: "'Convoluted' means extremely complex and difficult to follow." }
    ],
    'quant': [
      { id: 1601, sectionId: 'quant', text: "Quantity A: The area of a circle with radius 4\nQuantity B: The area of a square with side length 7\nSelect the correct relationship:", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], correctAnswer: 1, explanation: "Area of circle = 16π ≈ 50.24. Area of square = 49. Wait! 16 * 3.14159 = 50.26, which is > 49. So Quantity A is greater!" },
      { id: 1602, sectionId: 'quant', text: "If x is a positive integer and x^2 + 5x - 36 = 0, what is the value of x?", options: ["4", "9", "-9", "-4"], correctAnswer: 0, explanation: "(x + 9)(x - 4) = 0. Since x is positive, x = 4." }
    ]
  }
};
