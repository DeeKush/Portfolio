// All site copy lives here. Image fields are a URL or a file name inside
// client/src/assets/images/<folder>/ (null shows a grey placeholder). Anything marked TODO is a placeholder to replace.

const profile = {
  name: { first: 'Deepak', last: 'Kushwaha' },
  role: 'Full Stack Developer',
  tagline: "I build products for problems I've actually run into.",
  status: 'Open to work & collaborations',
  photo: { alt: 'Portrait of Deepak Kushwaha' },

  // `count` names the list whose length is shown next to the link.
  nav: [
    { label: 'Work', target: 'work', count: 'projects' },
    { label: 'What I do', target: 'what-i-do', count: 'whatIDo' },
    { label: 'Journey', target: 'journey', count: 'journey' },
    { label: 'Contact', target: 'contact' },
  ],
  menu: { label: 'Menu', open: 'Open menu', close: 'Close menu' },
  cta: {
    nav: { label: "Let's talk", target: 'contact' },
    hero: { label: "Let's collaborate", target: 'contact' },
  },

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/DeeKush', external: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepak-kush/', external: true },
    { id: 'email', label: 'Email', href: 'mailto:deepak.kushwaha171206@gmail.com' },
    { id: 'resume', label: 'Resume', href: '/resume.pdf', download: true }, // TODO: add client/public/resume.pdf
  ],

  work: {
    label: '/Selected Work',
    watermark: 'Portfolio',
    filters: ['All', 'Products', 'Open Source'], // must match each project's category
    initialCount: 4,
    viewAll: 'View All Work',
    showLess: 'Show Less',
    empty: 'No projects in this category yet.',
    more: '/More Work',
  },

  // Each row's pop-up card shows an SVG from components/illustrations/ (`illustration` key).
  // To use a picture instead, replace it with image: 'https://...' or a file in assets/images/services/.
  whatIDo: {
    label: '/What I do',
    watermark: 'Skills',
    close: 'Close',
    items: [
      {
        title: 'Full Stack Products',
        description:
          'I take an idea to a deployed app, with a React frontend, a Firebase or Node backend, and the data rules that keep it correct.',
        illustration: 'fullstack',
      },
      {
        title: 'AI Features That Hold Up',
        description: 'Practical AI like smart recall and semantic search, with fallbacks for when an API goes down.',
        illustration: 'ai',
      },
      {
        title: 'Mobile Apps',
        description: 'Cross-platform apps with React Native; currently building Nylo.',
        illustration: 'mobile',
      },
      {
        title: 'Problem Solving',
        description: '400+ problems across LeetCode, Codeforces and CodeChef, so the logic underneath is solid.',
        illustration: 'problem-solving',
      },
    ],
  },

  journey: {
    label: '/Journey',
    watermark: 'Journey',
    aside: 'CS @ Scaler × BITS Pilani',
    items: [
      { title: 'Nylo', subtitle: 'Co-builder', date: 'Sep 2026 – Present' },
      {
        title: 'Yugantar, Scaler School of Technology',
        subtitle: 'Core Member, Hospitality Team',
        date: 'Aug 2026 – Present',
      },
      { title: "ASCENT'26", subtitle: 'Finalist', date: 'TODO' }, // TODO: date
      { title: 'Amar Mart', subtitle: 'Freelance Full Stack Engineer', date: 'Dec 2025 – Jan 2026' },
      { title: 'PoojaOne', subtitle: 'Co-Founder', date: 'Nov 2025 – Mar 2026' },
      { title: 'Open Source Club, Scaler School of Technology', subtitle: 'Member', date: 'Aug 2025 – Nov 2025' },
      {
        title: 'Scaler School of Technology × BITS Pilani',
        subtitle: 'B.Tech Computer Science, CGPA 9.3',
        date: '2025 – 2029',
      },
      { title: 'JEE Main', subtitle: '97.84 percentile, 99.5 in Mathematics', date: '2025' },
    ],
  },

  contact: {
    heading: 'Have a project in mind?',
    text: "An internship, a freelance build or an idea worth working on together. If you're building something, I'd like to hear about it.",
    button: 'Contact Me',
    form: {
      title: 'Send me a message',
      name: 'Name',
      email: 'Email',
      topic: "What's it about?",
      topicPlaceholder: 'Choose one',
      topics: ['Internship', 'Freelance project', 'Collaboration', 'Something else'],
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending…',
      success: "Thanks! Your message is in. I'll get back to you soon.",
      close: 'Close',
      errors: {
        invalid: 'Please fix the highlighted fields.',
        offline: "Couldn't send your message. Check your connection and try again.",
        server: 'Something went wrong while sending. Please try again, or email me directly.',
        'not-configured':
          'The contact form is not connected yet. Please email me at deepak.kushwaha171206@gmail.com.',
      },
    },
  },

  project: {
    back: 'Back',
    live: 'Live Preview',
    code: 'View Code',
    role: 'Role',
    timeline: 'Timeline',
    tools: 'Tools',
    about: 'About the project',
  },

  errors: {
    notFound: "That page doesn't exist.",
    home: 'Back to home',
  },
};

export default profile;
