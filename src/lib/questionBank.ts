export interface Question {
  id: string;
  q: string;
  a: string;
  options?: string[];
  subject: string;
  difficulty: "easy" | "medium" | "hard";
}

export const questionBank: Question[] = [
  // Math
  { id: "m1", q: "What is the derivative of sin(x)?", a: "cos(x)", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], subject: "Math", difficulty: "easy" },
  { id: "m2", q: "∫ 2x dx = ?", a: "x² + C", options: ["x² + C", "2x² + C", "x + C", "x²"], subject: "Math", difficulty: "easy" },
  { id: "m3", q: "What is the value of e⁰?", a: "1", options: ["0", "1", "e", "∞"], subject: "Math", difficulty: "easy" },
  { id: "m4", q: "d/dx (eˣ) = ?", a: "eˣ", options: ["eˣ", "xeˣ⁻¹", "ln(x)", "1"], subject: "Math", difficulty: "medium" },
  { id: "m5", q: "What is lim(x→0) sin(x)/x?", a: "1", options: ["0", "1", "∞", "undefined"], subject: "Math", difficulty: "hard" },
  { id: "m6", q: "The Pythagorean theorem states:", a: "a² + b² = c²", options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "2a + 2b = c"], subject: "Math", difficulty: "easy" },

  // Physics
  { id: "p1", q: "Newton's 2nd law?", a: "F = ma", options: ["F = ma", "F = mv", "E = mc²", "F = mg"], subject: "Physics", difficulty: "easy" },
  { id: "p2", q: "Speed of light?", a: "3 × 10⁸ m/s", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "1 × 10⁸ m/s"], subject: "Physics", difficulty: "easy" },
  { id: "p3", q: "Unit of electric current?", a: "Ampere", options: ["Volt", "Ampere", "Ohm", "Watt"], subject: "Physics", difficulty: "easy" },
  { id: "p4", q: "What is Ohm's law?", a: "V = IR", options: ["V = IR", "P = IV", "F = qE", "V = Ed"], subject: "Physics", difficulty: "easy" },
  { id: "p5", q: "Acceleration due to gravity on Earth?", a: "9.8 m/s²", options: ["9.8 m/s²", "10.2 m/s²", "8.9 m/s²", "11 m/s²"], subject: "Physics", difficulty: "easy" },
  { id: "p6", q: "What is the SI unit of energy?", a: "Joule", options: ["Watt", "Newton", "Joule", "Pascal"], subject: "Physics", difficulty: "easy" },

  // Chemistry
  { id: "c1", q: "Benzene molecular formula?", a: "C₆H₆", options: ["C₆H₆", "C₆H₁₂", "C₂H₆", "CH₄"], subject: "Chemistry", difficulty: "easy" },
  { id: "c2", q: "What is the pH of pure water?", a: "7", options: ["0", "7", "14", "1"], subject: "Chemistry", difficulty: "easy" },
  { id: "c3", q: "Chemical symbol for Gold?", a: "Au", options: ["Go", "Gd", "Au", "Ag"], subject: "Chemistry", difficulty: "easy" },
  { id: "c4", q: "What type of bond is NaCl?", a: "Ionic", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], subject: "Chemistry", difficulty: "medium" },
  { id: "c5", q: "Avogadro's number?", a: "6.022 × 10²³", options: ["6.022 × 10²³", "3.14 × 10²³", "6.022 × 10²⁰", "1.6 × 10⁻¹⁹"], subject: "Chemistry", difficulty: "medium" },
  { id: "c6", q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], subject: "Chemistry", difficulty: "easy" },

  // Biology
  { id: "b1", q: "Mitochondria function?", a: "ATP production (powerhouse of the cell)", options: ["ATP production (powerhouse of the cell)", "Protein synthesis", "Cell division", "DNA storage"], subject: "Biology", difficulty: "easy" },
  { id: "b2", q: "What carries oxygen in blood?", a: "Hemoglobin", options: ["Plasma", "Hemoglobin", "White blood cells", "Platelets"], subject: "Biology", difficulty: "easy" },
  { id: "b3", q: "DNA stands for?", a: "Deoxyribonucleic Acid", options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Dynamic Nucleic Acid", "Dual Nitrogen Acid"], subject: "Biology", difficulty: "easy" },
  { id: "b4", q: "What organelle is responsible for photosynthesis?", a: "Chloroplast", options: ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus"], subject: "Biology", difficulty: "easy" },
  { id: "b5", q: "How many chromosomes do humans have?", a: "46", options: ["23", "46", "48", "44"], subject: "Biology", difficulty: "medium" },
  { id: "b6", q: "What is the basic unit of life?", a: "Cell", options: ["Atom", "Cell", "Tissue", "Organ"], subject: "Biology", difficulty: "easy" },
];

// Match pairs for Match Cards game
export interface MatchPair {
  id: string;
  term: string;
  definition: string;
  subject: string;
}

export const matchPairs: MatchPair[] = [
  { id: "mp1", term: "Mitochondria", definition: "Powerhouse of the cell", subject: "Biology" },
  { id: "mp2", term: "F = ma", definition: "Newton's 2nd Law", subject: "Physics" },
  { id: "mp3", term: "Au", definition: "Gold", subject: "Chemistry" },
  { id: "mp4", term: "∫ 2x dx", definition: "x² + C", subject: "Math" },
  { id: "mp5", term: "Hemoglobin", definition: "Carries oxygen", subject: "Biology" },
  { id: "mp6", term: "V = IR", definition: "Ohm's Law", subject: "Physics" },
  { id: "mp7", term: "C₆H₆", definition: "Benzene", subject: "Chemistry" },
  { id: "mp8", term: "cos(x)", definition: "Derivative of sin(x)", subject: "Math" },
];

export const getRandomQuestions = (count: number, difficulty?: string): Question[] => {
  let filtered = [...questionBank];
  if (difficulty) filtered = filtered.filter(q => q.difficulty === difficulty);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getWeakQuestions = (count: number): Question[] => {
  // Simulates weak topics - returns harder/chemistry/biology questions
  const weak = questionBank.filter(q => q.subject === "Chemistry" || q.difficulty === "hard");
  return weak.sort(() => Math.random() - 0.5).slice(0, count);
};
