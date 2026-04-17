export type Stat = {
  value: string;
  label: string;
  detail: string;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  points: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  context: string;
  rating: number;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type ComparisonRow = {
  label: string;
  traditional: string;
  zoeabode: string;
};

export const stats: Stat[] = [
  {
    value: "120+",
    label: "curated titles",
    detail: "Books and guides organized by outcome, not just genre.",
  },
  {
    value: "4.9/5",
    label: "reader satisfaction",
    detail: "Premium editorial curation with practical value at the center.",
  },
  {
    value: "18 min",
    label: "average discovery time",
    detail: "A faster path from interest to the right book or guide.",
  },
  {
    value: "3x",
    label: "more return visits",
    detail: "Bookmarking, recommendations, and reading stacks keep users engaged.",
  },
];

export const valuePropositions: Feature[] = [
  {
    eyebrow: "Curated discovery",
    title: "Every shelf has a reason to exist.",
    description:
      "ZoeAbode is built like a premium editorial product, so readers can move from curiosity to the exact next book without decision fatigue.",
    metric: "Less searching. More reading.",
    points: [
      "Outcome-based categories instead of endless lists.",
      "Featured stacks that push toward action.",
      "Editorial summaries that respect busy readers.",
    ],
  },
  {
    eyebrow: "Knowledge capture",
    title: "Reading turns into reusable knowledge.",
    description:
      "Bookmarks, chapter notes, and insight highlights make the platform feel like a working system instead of a passive catalog.",
    metric: "Ideas compound over time.",
    points: [
      "Bookmarks that persist across sessions.",
      "Clear reading outcomes for every title.",
      "Fast paths from book page to action.",
    ],
  },
  {
    eyebrow: "Premium positioning",
    title: "A knowledge product with a high-trust feel.",
    description:
      "The copy, spacing, and section flow borrow Squareblack's conversion rhythm while replacing agency language with reader value.",
    metric: "Premium without feeling cold.",
    points: [
      "Strong headline hierarchy and repeated proof.",
      "Clear CTAs placed at the right moments.",
      "A polished visual system with breathing room.",
    ],
  },
];

export const features: Feature[] = [
  {
    eyebrow: "Editorial stacks",
    title: "Curated book journeys.",
    description:
      "Group books by use case, outcome, or moment in the user's life so the platform feels guided instead of generic.",
    metric: "Built for clarity.",
    points: [
      "Reading paths for focus, wealth, and self-development.",
      "Short summaries with a clear next step.",
      "Category chips that make browsing feel intentional.",
    ],
  },
  {
    eyebrow: "Bookmark system",
    title: "Keep the books that matter.",
    description:
      "Simple saved-book behavior makes ZoeAbode feel useful on day one and gives the product a reason to bring readers back.",
    metric: "Zero-friction saving.",
    points: [
      "Local bookmark persistence for demo-ready behavior.",
      "Saved books exposed inside the library panel.",
      "A natural path from browsing to action.",
    ],
  },
  {
    eyebrow: "Recommendations",
    title: "Helpful suggestions, not noise.",
    description:
      "Recommendation logic favors tag overlap, category match, and fit so the platform behaves like a thoughtful editor.",
    metric: "Relevant by design.",
    points: [
      "The right next book appears beside the current one.",
      "Related books reward deeper exploration.",
      "Readers always have a clear next move.",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "It feels less like a bookstore and more like a calm operating system for reading. I knew what to click and why within seconds.",
    name: "Amina Taylor",
    role: "Student and research assistant",
    context: "Used the library to build a weekly reading rhythm",
    rating: 5,
  },
  {
    quote:
      "The layout does what good conversion pages do: it removes friction, then makes the value obvious. That is rare in the book space.",
    name: "Daniel Brooks",
    role: "Founder and product lead",
    context: "Landed on the focus and wealth shelves first",
    rating: 5,
  },
  {
    quote:
      "I bookmarked three titles immediately. The page structure made it easy to trust the curation instead of scrolling forever.",
    name: "Priya Nair",
    role: "Designer and avid reader",
    context: "Saved books for later review sessions",
    rating: 4.9,
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Discover a shelf that fits your goal.",
    description:
      "Start with an outcome like focus, habit-building, or knowledge capture instead of a giant catalog.",
  },
  {
    number: "02",
    title: "Open the book detail and read the promise.",
    description:
      "Each book page explains what it helps you do, who it is for, and what you will leave with.",
  },
  {
    number: "03",
    title: "Save, revisit, and compound the value.",
    description:
      "Bookmarks and recommendations keep the experience useful after the first session is over.",
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Discovery",
    traditional: "Endless catalog with no editorial direction.",
    zoeabode: "Curated shelves organized by outcome and intent.",
  },
  {
    label: "Retention",
    traditional: "Users browse once and disappear.",
    zoeabode: "Bookmarks and reading stacks create a reason to return.",
  },
  {
    label: "Knowledge",
    traditional: "Books stay isolated from action.",
    zoeabode: "Summaries, insights, and recommendations support follow-through.",
  },
];
