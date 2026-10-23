export type Career = {
  id: string;
  title: string;
  family: string;
  summary: string;
  requiredSkills: string[];
  interestTags: string[];
  outlook: string;
  sample: boolean;
};

export const careers: Career[] = [
  { id: 'data-analyst', title: 'Data analyst', family: 'Data & insight', summary: 'Turn messy information into clear findings that help teams make better decisions.', requiredSkills: ['data analysis', 'spreadsheets', 'communication', 'critical thinking', 'statistics'], interestTags: ['research', 'problem solving', 'business', 'technology'], outlook: 'A broad role across many industries; tools and task mix vary by employer.', sample: true },
  { id: 'ux-researcher', title: 'UX researcher', family: 'People & product', summary: 'Learn what people need, then help product teams make useful, accessible experiences.', requiredSkills: ['research', 'communication', 'empathy', 'critical thinking', 'writing'], interestTags: ['people', 'design', 'research', 'creativity'], outlook: 'A people-centered role where synthesis and judgment remain important.', sample: true },
  { id: 'ai-product-ops', title: 'AI product operations associate', family: 'AI & operations', summary: 'Coordinate the people, processes, and feedback that help AI-enabled products work responsibly.', requiredSkills: ['project management', 'communication', 'data analysis', 'writing', 'critical thinking'], interestTags: ['technology', 'business', 'people', 'problem solving'], outlook: 'A developing role pattern; exact responsibilities differ widely across teams.', sample: true },
  { id: 'learning-designer', title: 'Learning experience designer', family: 'Education & design', summary: 'Shape learning materials and experiences around real learner goals and feedback.', requiredSkills: ['writing', 'communication', 'design', 'research', 'project management'], interestTags: ['education', 'creativity', 'people', 'design'], outlook: 'A cross-disciplinary role spanning education, workplace learning, and digital products.', sample: true },
  { id: 'cybersecurity-analyst', title: 'Cybersecurity analyst', family: 'Trust & security', summary: 'Help organizations identify, investigate, and reduce risks to their systems and information.', requiredSkills: ['critical thinking', 'communication', 'problem solving', 'technology', 'data analysis'], interestTags: ['technology', 'problem solving', 'research', 'public impact'], outlook: 'Security practices evolve with technology; the work calls for continual learning.', sample: true },
  { id: 'sustainability-analyst', title: 'Sustainability analyst', family: 'Climate & impact', summary: 'Organize evidence about environmental and social impacts to support practical action.', requiredSkills: ['data analysis', 'research', 'communication', 'statistics', 'writing'], interestTags: ['environment', 'research', 'public impact', 'business'], outlook: 'Work may sit in companies, public agencies, nonprofits, or consulting teams.', sample: true },
];

export const skillOptions = ['communication', 'critical thinking', 'data analysis', 'design', 'empathy', 'project management', 'research', 'spreadsheets', 'statistics', 'technology', 'writing', 'problem solving'];
export const interestOptions = ['business', 'creativity', 'design', 'education', 'environment', 'people', 'problem solving', 'public impact', 'research', 'technology'];

export type Profile = {
  education: string;
  skills: string[];
  experience: string;
  projects: string;
  interests: string[];
};

export const blankProfile: Profile = { education: '', skills: [], experience: '', projects: '', interests: [] };
export const demoProfile: Profile = {
  education: 'Bachelor’s degree in Communications — in progress',
  skills: ['communication', 'research', 'writing', 'spreadsheets'],
  experience: 'Part-time student services assistant; organized intake notes and answered common questions.',
  projects: 'Course project: interviewed classmates and summarized recurring needs for a campus event guide.',
  interests: ['people', 'research', 'technology', 'public impact'],
};

export function scoreCareer(profile: Profile, role: Career) {
  const skillHits = role.requiredSkills.filter((skill) => profile.skills.includes(skill));
  const interestHits = role.interestTags.filter((tag) => profile.interests.includes(tag));
  const skillScore = skillHits.length / role.requiredSkills.length;
  const interestScore = interestHits.length / role.interestTags.length;
  const score = Math.round((skillScore * 0.7 + interestScore * 0.3) * 100);
  return { score, skillHits, interestHits, skillScore, interestScore };
}
