import { SiFirebase, SiGooglechrome, SiJavascript, SiPython, SiReact, SiTypescript } from 'react-icons/si';

// Tool name (as written in projects.js) -> brand icon and colour.
// Tools not listed here show their name as text in the circle instead.
const toolIcons = {
  React: { Icon: SiReact, color: '#61DAFB' },
  'React Native': { Icon: SiReact, color: '#61DAFB' },
  Firebase: { Icon: SiFirebase, color: '#FFCA28' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  Python: { Icon: SiPython, color: '#3776AB' },
  'Google Chrome': { Icon: SiGooglechrome, color: '#4285F4' },
  'Chrome Extension': { Icon: SiGooglechrome, color: '#4285F4' },
  // Groq has no icon in Simple Icons, so it falls back to text.
};

export default toolIcons;
