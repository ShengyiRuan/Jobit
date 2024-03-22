// Specifying the words you want to search for
const specificWords = [
  "React",
  "JavaScript",
  "Vue",
  "Angular",
  "Node\\.js",
  "Express\\.js",
  "PHP",
  "AWS",
  "C#",
  "JQuery",
  "Laravel",
  "CSS3",
  "HTML5",
  "Java",
  "Python",
  "SQL",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Rust",
  "Ruby",
  "Go",
  "Swift",
  "TypeScript",
  "Scala",
  "Kotlin",
  "R",
  "Dart",
  "Agile",
  "Scrum",
  "Kubernetes",
  "Docker",
  "Git",
  "Jenkins",
  "Jira",
  "Redux",
  "SASS",
  "LESS",
  "Bootstrap",
  "Tailwind",
  "Material UI",
  "Next.js",
  "Gatsby",
  "Nest.js",
  "Spring",
  "Flask",
  "Django",
  "ASP.NET",
  "Ruby on Rails",
  "TensorFlow",
  "PyTorch",
  "COBOL",
];

export const extractRequiredSkills = (jobDescription: string): string[] => {
  // NOTE The \\b represents a word boundary, ensuring that only complete words are matched.
  // NOTE This prevents partial word matches. For example, it will match "React" but not "Reacting."
  const pattern = new RegExp(`\\b(${specificWords.join(`\\b|`)})\\b`, "gi"); // "gi" makes the search case-insensitive

  // NOTE new Set(...) to eliminate duplicates (if any) since a Set only contains unique values.
  // NOTE Return value: A new Set object.
  const matchingWords = new Set(jobDescription.match(pattern) || []);

  return Array.from(matchingWords);
};
