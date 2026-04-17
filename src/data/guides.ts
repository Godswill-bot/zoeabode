export type GuidePath = {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  outcome: string;
  duration: string;
  steps: string[];
};

export const guidePaths: GuidePath[] = [
  {
    slug: "focus-and-deep-work",
    title: "Focus and Deep Work",
    summary:
      "A compact path through attention, environment design, and execution habits for people who want more meaningful output.",
    audience: "Students and builders",
    outcome: "Build a reliable focus routine.",
    duration: "2 weeks",
    steps: ["Study The Focus Protocol", "Save your top friction points", "Create a deep-work schedule"],
  },
  {
    slug: "reading-consistency",
    title: "Reading Consistency",
    summary:
      "Turn reading into a repeatable habit with rituals, tracking, and a clearer sense of why each book matters.",
    audience: "Avid readers",
    outcome: "Finish more books with less guilt.",
    duration: "10 days",
    steps: ["Start a 20-minute loop", "Choose a reading anchor", "Review once a week"],
  },
  {
    slug: "knowledge-compounding",
    title: "Knowledge Compounding",
    summary:
      "A practical pathway for people who want notes, highlights, and ideas to become useful writing, planning, or product decisions.",
    audience: "Creators and researchers",
    outcome: "Turn notes into reusable thinking.",
    duration: "3 weeks",
    steps: ["Capture with intent", "Link related ideas", "Ship a small output each week"],
  },
  {
    slug: "calmer-money",
    title: "Calmer Money Decisions",
    summary:
      "A guide through budget clarity, long-term thinking, and simpler rules for money decisions that do not steal attention.",
    audience: "First-time investors",
    outcome: "Make money decisions with less noise.",
    duration: "1 month",
    steps: ["Read Quiet Wealth", "Set decision rules", "Review your progress monthly"],
  },
];
