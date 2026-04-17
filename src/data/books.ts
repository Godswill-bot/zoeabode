export type BookAccent = "ember" | "sage" | "ocean" | "violet" | "gold" | "rose";

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  format: string;
  summary: string;
  outcome: string;
  price: string;
  rating: number;
  readTime: string;
  audience: string;
  featured?: boolean;
  tags: string[];
  accent: BookAccent;
  chapters: string[];
  insights: string[];
};

export const books: Book[] = [
  {
    id: "focus-protocol",
    slug: "focus-protocol",
    title: "The Focus Protocol",
    author: "ZoeAbode Editorial",
    category: "Productivity Systems",
    format: "Premium ebook",
    summary:
      "A disciplined reading and work system for people who want fewer distractions, deeper work, and a calmer way to finish important things.",
    outcome: "Build a daily focus loop that protects your best hours.",
    price: "$18",
    rating: 4.9,
    readTime: "3.5 hours",
    audience: "Students, founders, and operators",
    featured: true,
    tags: ["focus", "habits", "decision making", "deep work"],
    accent: "ember",
    chapters: [
      "Attention debt and why it keeps growing",
      "Designing a zero-friction work session",
      "Rules that protect your reading and output time",
      "A weekly reset for clearer decisions",
    ],
    insights: [
      "A practical focus score to measure your attention drift.",
      "A repeatable ritual that turns reading into execution.",
      "A simple method to stop collecting unfinished ideas.",
    ],
  },
  {
    id: "reading-loop",
    slug: "reading-loop",
    title: "The Reading Loop",
    author: "Mara Ellis",
    category: "Reading Habits",
    format: "Guide + templates",
    summary:
      "A lightweight reading system for people who want consistency instead of guilt, with simple rituals that make books easier to finish.",
    outcome: "Turn reading from a burst into a lasting habit.",
    price: "$14",
    rating: 4.8,
    readTime: "2.8 hours",
    audience: "Avid readers and lifelong learners",
    tags: ["reading", "habits", "consistency", "journaling"],
    accent: "sage",
    chapters: [
      "Choosing books that keep momentum alive",
      "The 20-minute reading loop",
      "How to retain what you read without heavy note-taking",
      "Planning a quarter of reading with intent",
    ],
    insights: [
      "Build momentum with a frictionless opening ritual.",
      "Keep track of what matters without clutter.",
      "Use small weekly targets that compound.",
    ],
  },
  {
    id: "quiet-wealth",
    slug: "quiet-wealth",
    title: "Quiet Wealth",
    author: "Noah Price",
    category: "Wealth Mindset",
    format: "Deep read",
    summary:
      "A calm, research-backed guide to money habits, patient investing, and the psychology that makes long-term wealth easier to keep.",
    outcome: "Make better money choices without noisy advice.",
    price: "$22",
    rating: 4.9,
    readTime: "4.2 hours",
    audience: "Professionals and first-time investors",
    tags: ["money", "investing", "mindset", "planning"],
    accent: "gold",
    chapters: [
      "Why short-term money thinking gets expensive",
      "The portfolio rules that reduce stress",
      "Behaviors that make saving stick",
      "A long-horizon plan you can actually follow",
    ],
    insights: [
      "A way to align spending with life goals.",
      "Simple decision filters for volatile markets.",
      "A personal finance dashboard for better visibility.",
    ],
  },
  {
    id: "notes-that-compound",
    slug: "notes-that-compound",
    title: "Notes That Compound",
    author: "Elena Hart",
    category: "Knowledge Work",
    format: "Toolkit",
    summary:
      "A system for capturing highlights, linking ideas, and turning scattered notes into a library that helps you write, think, and build faster.",
    outcome: "Create a note system that gets more useful over time.",
    price: "$16",
    rating: 4.7,
    readTime: "3 hours",
    audience: "Creators, writers, and researchers",
    tags: ["notes", "research", "writing", "memory"],
    accent: "ocean",
    chapters: [
      "Why most note apps fail after week two",
      "A capture process that works during real reading",
      "Turning notes into useful writing prompts",
      "Connecting ideas without overbuilding your system",
    ],
    insights: [
      "A three-layer note stack for daily reading.",
      "A review cadence that surfaces valuable ideas.",
      "A path from note to publishable output.",
    ],
  },
  {
    id: "attention-advantage",
    slug: "attention-advantage",
    title: "The Attention Advantage",
    author: "Sofia Lane",
    category: "Digital Wellness",
    format: "Audio + ebook bundle",
    summary:
      "A premium guide to reducing digital noise, controlling context switching, and reclaiming enough attention to do meaningful work.",
    outcome: "Reduce noise and recover more usable time.",
    price: "$24",
    rating: 4.8,
    readTime: "2.9 hours",
    audience: "Remote teams and busy readers",
    tags: ["attention", "wellness", "digital habits", "boundaries"],
    accent: "violet",
    chapters: [
      "The cost of fragmented attention",
      "Device rules that create breathing room",
      "The reading environment that helps you finish",
      "Designing a calm digital week",
    ],
    insights: [
      "A practical screen audit for daily life.",
      "A simple plan to reduce decision fatigue.",
      "A framework for healthier digital routines.",
    ],
  },
  {
    id: "crafting-taste",
    slug: "crafting-taste",
    title: "Crafting Taste",
    author: "Jonah Reed",
    category: "Design Thinking",
    format: "Case-study book",
    summary:
      "A visual and strategic field guide for people who want better taste, sharper judgment, and stronger product decisions.",
    outcome: "Use better taste to make better product calls.",
    price: "$20",
    rating: 4.9,
    readTime: "3.8 hours",
    audience: "Designers, builders, and founders",
    tags: ["design", "taste", "product", "judgment"],
    accent: "rose",
    chapters: [
      "What taste actually means in product work",
      "How to compare without copying",
      "The visual language of trust",
      "Making a decision system you can defend",
    ],
    insights: [
      "A taste scorecard for critiquing interfaces.",
      "A process for evaluating quality under pressure.",
      "A tighter way to align vision and execution.",
    ],
  },
];

export const featuredBooks = books.filter((book) => book.featured);
