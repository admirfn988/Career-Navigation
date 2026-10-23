import { Link } from 'wouter';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { careers } from '../data/careers';
import { learningResources, recommendedLearningResources } from '../data/resources';
import { useNavigator } from '../state/NavigatorContext';

export default function Roadmap() {
  const { profile, profileReady, selectedCareerId } = useNavigator();
  const role = careers.find((career) => career.id === selectedCareerId);
  if (!profileReady || !role) return <div className="page"><PageIntro eyebrow="04 / Learning roadmap" title="Make a plan around one role.">Choose a recommended sample role before using the personalized gap view and learning prompts.</PageIntro><Panel className="empty-state"><BookOpen size={28} /><h3>{!profileReady ? 'Add your profile details' : 'Choose a career first'}</h3><p>{!profileReady ? 'Education, skills, and interests guide your role comparison.' : 'Select a role in Career matching before creating a roadmap.'}</p><Link href={!profileReady ? '/profile' : '/careers'} className="button button-primary" data-testid="link-roadmap-prerequisite">Continue <ArrowRight size={14} /></Link></Panel></div>;
  const gaps = role.requiredSkills.filter((skill) => !profile.skills.includes(skill));
  const steps = [
    { title: 'Choose a gap worth closing', detail: gaps.length ? `Start with one of these sample role skills: ${gaps.slice(0, 3).join(', ')}. Confirm it matters to the work you actually want to do.` : 'No example skill gaps remain. Pick one skill you want to deepen or apply in a new setting.' },
    { title: 'Learn through a small, real task', detail: `Try a low-stakes task related to ${role.title.toLowerCase()}—for example, analyze a small public dataset, write a short research brief, or document a workflow. Choose a task that matches your interests and access.` },
    { title: 'Create evidence and ask for feedback', detail: 'Keep a short note about your goal, approach, what changed after feedback, and what you would do next. Share only work you have permission to share.' },
    { title: 'Review and adjust your profile', detail: 'When you have new evidence, update your skills and examples. Revisit career matches; a changed profile may produce a different overlap score.' },
  ];
  return <div className="page">
    <PageIntro eyebrow="04 / Learning roadmap" title="Small steps. Real evidence. Your pace.">A flexible sequence for {role.title}, based on sample role requirements. The plan has no fixed timeline; the optional resources below show the provider-listed durations checked on 23 Oct 2026.</PageIntro>
    <Panel className="panel-pad" style={{ marginBottom: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}><div><div className="small-mono">Roadmap for selected sample career</div><h2 className="section-title" style={{ marginTop: 7 }}>{role.title}</h2><p className="field-hint" style={{ marginBottom: 0 }}>{gaps.length ? `${gaps.length} example role skill${gaps.length === 1 ? '' : 's'} not listed in your profile.` : 'All example role skills appear in your profile.'}</p></div><Link href="/skills-gap" className="button button-secondary button-small" data-testid="link-roadmap-gap">Review comparison</Link></Panel>
    <SectionHeading title="Your next few moves" detail="Use, skip, or reorder these ideas to suit your situation." />
    <div>{steps.map((step, index) => <div className="roadmap-step" key={step.title} data-testid={`roadmap-step-${index + 1}`}><div className="step-number">{String(index + 1).padStart(2, '0')}</div><div className="panel panel-pad" style={{ flex: 1 }}><h3 className="section-title" style={{ fontSize: 15 }}>{step.title}</h3><p className="field-hint" style={{ lineHeight: 1.7, marginBottom: 0 }}>{step.detail}</p></div></div>)}</div>
    <SectionHeading title="Recommended short introductions" detail="Verified provider modules with stated durations; these are optional starting points, not a required credential." />
    <div className="grid-2">{recommendedLearningResources.map((resource, index) => <Panel className="panel-pad" key={resource.url} data-testid={`card-recommended-resource-${index}`}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><div><div className="small-mono">{resource.provider} · Provider-listed duration: {resource.duration}</div><h3 className="section-title" style={{ fontSize: 15, margin: '8px 0' }}>{resource.label}</h3><p className="field-hint">{resource.detail}</p><p className="small-mono">Duration checked {resource.checked}</p></div><BookOpen size={19} color="hsl(var(--primary))" /></div><a className="resource-link" href={resource.url} target="_blank" rel="noreferrer" data-testid={`link-recommended-resource-${index}`}>Open official module <ExternalLink size={12} /></a></Panel>)}</div>
    <SectionHeading title="Official catalogs to browse" detail="These are catalog entry points, not endorsements of a particular course." />
    <div className="grid-2">{learningResources.map((resource, index) => <Panel className="panel-pad" key={resource.url} data-testid={`card-resource-${index}`}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><div><div className="small-mono">Browse resource catalog</div><h3 className="section-title" style={{ fontSize: 15, margin: '8px 0' }}>{resource.label}</h3><p className="field-hint">{resource.detail}</p></div><BookOpen size={19} color="hsl(var(--primary))" /></div><a className="resource-link" href={resource.url} target="_blank" rel="noreferrer" data-testid={`link-resource-${index}`}>Visit official catalog <ExternalLink size={12} /></a></Panel>)}</div>
    <div className="callout" style={{ marginTop: 22 }}>Catalog content, access, costs, and availability can change. Check details directly with the provider before committing.</div>
  </div>;
}
