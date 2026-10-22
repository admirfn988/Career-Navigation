export const learningResources = [
  { label: 'Coursera course catalog', url: 'https://www.coursera.org/courses', detail: 'Browse a current catalog and compare options before choosing.' },
  { label: 'edX course catalog', url: 'https://www.edx.org/search', detail: 'Search courses and programs from participating institutions.' },
  { label: 'Microsoft Learn', url: 'https://learn.microsoft.com/training/', detail: 'Browse Microsoft product and technology learning paths.' },
  { label: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', detail: 'Explore short, hands-on data and machine-learning tutorials.' },
  { label: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/catalog', detail: 'Browse technical learning content and labs.' },
];

export const recommendedLearningResources = [
  {
    label: 'Introduction to AI concepts',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/',
    duration: '40 min',
    checked: '23 Oct 2026',
    detail: 'Beginner module introducing AI concepts and responsible AI practices.',
  },
  {
    label: 'Introduction to machine learning concepts',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/',
    duration: '1 hr 33 min',
    checked: '23 Oct 2026',
    detail: 'Beginner module covering core machine-learning models and concepts.',
  },
];

export const trendSources = [
  {
    label: 'The Future of Jobs Report 2025',
    publisher: 'World Economic Forum',
    date: 'Published 7 Jan 2025',
    url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025',
    note: 'Employer perspectives on technology, jobs, and skills through 2030. The report describes AI and information processing as a trend expected to shape work; it is not a guarantee for any individual role.',
  },
  {
    label: 'Computer and Information Research Scientists',
    publisher: 'U.S. Bureau of Labor Statistics',
    date: 'Occupational outlook period: 2025–35 · page checked 23 Oct 2026',
    url: 'https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm',
    note: 'An example of an official, occupation-specific U.S. outlook source. Its projections are not a direct measure of AI disruption and should not be generalized to other occupations or regions.',
  },
];

export const sdgGoals = [
  { number: '04', title: 'Quality education', note: 'Career transitions are easier to navigate when people can access inclusive, relevant learning throughout life.', url: 'https://sdgs.un.org/goals/goal4' },
  { number: '08', title: 'Decent work and economic growth', note: 'Decent work includes opportunity, rights, social protection, and a voice—not only employment.', url: 'https://sdgs.un.org/goals/goal8' },
  { number: '10', title: 'Reduced inequalities', note: 'Access to career information and learning should not depend on a person’s background or resources.', url: 'https://sdgs.un.org/goals/goal10' },
];

export const disruptionScenarios = [
  {
    id: 'moderate',
    title: 'Moderate AI disruption',
    summary: 'AI tools assist with selected tasks while people continue to set direction, check quality, and work with others.',
    implications: ['Routine drafting and summarizing may become easier to automate.', 'Human review, context, and communication still shape the result.', 'Teams may redesign workflows gradually.'],
  },
  {
    id: 'fast',
    title: 'Fast AI disruption',
    summary: 'AI capabilities and adoption improve quickly, prompting more frequent changes to tasks and team workflows.',
    implications: ['Some task bundles may shift sooner than job titles do.', 'People may need to refresh tool knowledge and adapt workflows more often.', 'Organizations may vary widely in how quickly they change.'],
  },
];

