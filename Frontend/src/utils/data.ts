export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const CARD_BG = [
  { id: 1, bgcolor: "linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)" },
  { id: 2, bgcolor: "linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)" },
  { id: 3, bgcolor: "linear-gradient(135deg, #f5f3ff 0%, #fbfaff 100%)" },
  { id: 4, bgcolor: "linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)" },
  { id: 5, bgcolor: "linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)" },
  { id: 6, bgcolor: "linear-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)" },
  { id: 7, bgcolor: "linear-gradient(135deg, #fff4f5 0%, #fff8f8 100%)" },
  { id: 8, bgcolor: "linear-gradient(135deg, #f0f7ff 0%, #f7faff 100%)" },
  { id: 9, bgcolor: "linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)" },
  { id: 10, bgcolor: "linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)" },
];

export const APP_FEATURES: Feature[] = [
  {
    id: "01",
    title: "Tailored Just for You",
    description:
      "Get Interview Questions and Model Answers Based on Your Role, Experience, and Specific Focus Areas -- No Generic Practice Here.",
  },
  {
    id: "02",
    title: "Learn at Your Own Pace",
    description:
      "Expand Answers Only When You're Ready to Deepen Your Understanding. Deep Dive into Any Concept Instantly with AI-Powered Detailed Explanations.",
  },
  {
    id: "03",
    title: "Capture Your Insights",
    description:
      "Add Personal Notes to Any Question and Pin Important Ones to the Top -- Making Learning Easier, Effective and More Organized.",
  },
  {
    id: "04",
    title: `Understand The "Why" Behind Answers`,
    description:
      "Beyond Just Answers -- Unlock Detailed Concept Explanations for a Better Understanding of the Topic Using AI.",
  },
  {
    id: "05",
    title: "Save, Organize, and Revisit",
    description:
      "Easily Save Your Interview Sets, Organize Them Neatly in Your Dashboard, and Pick Up Your Preparation Right Where You Left Off.",
  },
];
