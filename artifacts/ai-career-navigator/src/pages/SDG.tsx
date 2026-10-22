import { ExternalLink, Globe2 } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { sdgGoals } from '../data/resources';

export default function SDGPage() {
  return <div className="page">
    <PageIntro eyebrow="Work & society" title="A career sits inside a wider world.">The UN Sustainable Development Goals offer a shared framework for thinking about learning, opportunity, and decent work. These connections are context for reflection—not a rating of a job or employer.</PageIntro>
    <Panel className="panel-pad" style={{ background: 'hsl(166 23% 19%)', color: '#f8f4e8' }}><div style={{ display: 'flex', gap: 18, alignItems: 'center' }}><Globe2 size={30} color="#efa88a" /><div><div className="hero-kicker">United Nations · Sustainable Development Goals</div><h2 className="section-title" style={{ color: 'inherit', margin: '8px 0 0', fontSize: 23 }}>Skills, livelihoods, and fair access.</h2></div></div></Panel>
    <SectionHeading title="Three relevant goals" detail="Read each goal at its official UN page for the complete targets and indicators." />
    <div className="grid-3">{sdgGoals.map((goal) => <Panel className="panel-pad" key={goal.number} data-testid={`card-sdg-${goal.number}`}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="small-mono">Goal {goal.number}</span><span style={{ font: '800 26px var(--app-font-display)', color: 'hsl(var(--accent))' }}>{goal.number}</span></div><h3 className="section-title" style={{ margin: '15px 0 9px' }}>{goal.title}</h3><p className="field-hint" style={{ lineHeight: 1.7, minHeight: 80 }}>{goal.note}</p><a className="resource-link" href={goal.url} target="_blank" rel="noreferrer" data-testid={`link-sdg-${goal.number}`}>Official UN goal page <ExternalLink size={12} /></a></Panel>)}</div>
    <SectionHeading title="Bring the goals into your own reflection" />
    <Panel className="panel-pad"><div className="grid-2"><div><div className="small-mono">Ask about learning</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>What kind of learning would help you participate in work that matters to you—and what access or support would make it possible?</p></div><div><div className="small-mono">Ask about decent work</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>What conditions make a role sustainable for you, beyond its title or technology?</p></div></div><div className="callout" style={{ marginTop: 10 }}>These are questions, not an impact assessment. The tool does not score careers against UN indicators.</div></Panel>
  </div>;
}
