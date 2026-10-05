// Your projects, in display order. Shown in Selected Work and on /work/:slug.
//
// - category: must be one of profile.work.filters (other than 'All').
// - summary: the short line after the title on the project card.
// - description: the paragraph under the title on the project page.
// - details: optional longer write-up for the "About the project" card (hidden when null).
// - images: the first one is the card thumbnail; all of them show on the project page.
//   Each entry is a URL or a file name inside client/src/assets/images/projects/
//   (e.g. 'lostify.png'). For an image that shouldn't be cropped, use
//   { src: 'file.png', fit: 'contain', bg: '#hex' }. The picsum.photos URLs are demo images.
// - liveUrl / githubUrl: null hides the button. codeNote shows a label instead (e.g. private repos).
// - Fields set to 'TODO' are shown on the site as-is so they are easy to spot.

const projects = [
  {
    slug: 'coderecall',
    title: 'CodeRecall',
    category: 'Products',
    summary: 'For students who lose track of the code they save',
    description:
      'For students who lose track of the code they save. A recall-priority algorithm resurfaces the snippets you need first, and a step-by-step execution visualizer for Java and C++, built from scratch, runs entirely in the browser. Built solo in a 7-day public sprint; switched the AI layer from Gemini to Groq mid-build, with multi-key fallback, after reliability issues.',
    details: null,
    tags: ['React', 'AI'],
    role: 'Solo developer',
    timeline: '7 days (Feb 2026)',
    tools: ['React', 'Firebase', 'Groq'],
    liveUrl: 'https://coderecall-app.vercel.app',
    githubUrl: 'https://github.com/DeeKush/Code-Recall',
    images: [
      { src: 'coderecall.png', fit: 'contain', bg: '#0A0A0A' }, // landing page (wide, shown whole)
      'https://picsum.photos/seed/coderecall-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/coderecall-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
  {
    slug: 'amar-mart',
    title: 'Amar Mart',
    category: 'Products',
    summary: 'A full-stack store for a kirana shop going digital',
    description:
      "A kirana shop owner back home wanted to go digital, so I built a full-stack store for the shop. It uses atomic transactions and role-based security rules. The code held up; adoption hit a literacy barrier I hadn't planned for, and that taught me more than a clean launch would have.",
    details: null,
    tags: ['React', 'Firebase'],
    role: 'Freelance full stack engineer',
    timeline: 'Dec 2025 – Jan 2026',
    tools: ['React', 'Firebase'],
    liveUrl: null,
    githubUrl: null,
    codeNote: 'Private repo',
    images: [
      { src: 'amarmart.png', fit: 'contain', bg: '#FFFFFF' }, // storefront (wide, shown whole)
      'https://picsum.photos/seed/amar-mart-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/amar-mart-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
  {
    slug: 'lostify',
    title: 'Lostify',
    category: 'Products',
    summary: "A proper lost-and-found platform for our college",
    description:
      "Our college's lost-and-found WhatsApp group was useless, so a friend and I built a proper platform for it. An automatic matching algorithm pairs lost reports with found items, so people don't have to scroll through every post.",
    details: null,
    tags: ['Full Stack', 'Matching Algorithm'],
    role: 'Co-developer',
    timeline: 'TODO (2025)',
    tools: [], // TODO
    liveUrl: null, // TODO: live preview link
    githubUrl: 'https://github.com/DeeKush/Lostify',
    images: [
      { src: 'lostify.png', fit: 'contain', bg: '#192A44' }, // home page (wide, shown whole)
      'https://picsum.photos/seed/lostify-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/lostify-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
  {
    slug: 'nylo',
    title: 'Nylo',
    category: 'Products',
    summary: 'Send it. Forget it. Find it.',
    description:
      'Send it. Forget it. Find it. Nylo finds your saved Instagram Reels from what you remember about them, instead of endless scrolling. Building it with Ariyan Pradhan; a web app is next.',
    details: null,
    tags: ['React Native', 'Semantic Search'],
    role: 'Co-builder',
    timeline: 'Sep 2026 – Present',
    tools: ['React Native', 'Python'],
    liveUrl: null,
    githubUrl: null,
    codeNote: 'Private repo',
    images: [
      { src: 'nylo.png', fit: 'contain', bg: '#CAF0DB' }, // portrait logo, shown whole
      'https://picsum.photos/seed/nylo-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/nylo-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
  {
    slug: 'scaler-assignment-export',
    title: 'Scaler++ Assignment Export',
    category: 'Open Source',
    summary: 'My first merged open-source contribution',
    description:
      'My first merged open-source contribution, to a Chrome extension Scaler students use daily. It went through two weeks of review, real bug reports and a concurrency fix before it was merged.',
    details: null,
    tags: ['JavaScript', 'Chrome Extension'],
    role: 'Contributor',
    timeline: 'TODO (2026)',
    tools: ['JavaScript', 'Google Chrome'],
    liveUrl: null,
    githubUrl: 'https://github.com/DeeKush/Scaler-extension',
    images: [
      'https://picsum.photos/seed/scaler-assignment-export-1/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/scaler-assignment-export-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/scaler-assignment-export-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
  {
    slug: 'poojaone',
    title: 'PoojaOne',
    category: 'Products',
    summary: 'Book verified pandits who follow your regional rituals',
    description:
      'Helps families who move to metro cities book verified pandits who follow their own regional rituals. I co-founded it.',
    details: null,
    tags: ['React', 'TypeScript'],
    role: 'Co-founder',
    timeline: 'Nov 2025 – Mar 2026',
    tools: ['React', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/DeeKush/PoojaOne',
    images: [
      'https://picsum.photos/seed/poojaone-1/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/poojaone-2/1600/1000', // TODO: replace with real screenshot
      'https://picsum.photos/seed/poojaone-3/1600/1000', // TODO: replace with real screenshot
    ],
  },
];

export default projects;
