import AISearchIllustration from './AISearchIllustration';
import FullStackIllustration from './FullStackIllustration';
import MobileIllustration from './MobileIllustration';
import ProblemSolvingIllustration from './ProblemSolvingIllustration';

// Keys used by `illustration` in profile.whatIDo.items.
const illustrations = {
  fullstack: FullStackIllustration,
  ai: AISearchIllustration,
  mobile: MobileIllustration,
  'problem-solving': ProblemSolvingIllustration,
};

export default illustrations;
