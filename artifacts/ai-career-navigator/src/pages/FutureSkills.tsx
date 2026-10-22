import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'wouter';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import TrendSources from '../components/TrendSources';
import { useNavigator } from '../state/NavigatorContext';

const capabilities = [
  { name: 'Clear communication', category: 'People & judgment', note: 'Explain decisions, listen well, and adapt a message to its audience.', relation: 'Human-centered' },
  { name: 'Critical thinking', category: 'People & judgment', note: 'Check assumptions, evaluate outputs, and notice what is missing.', relation: 'Human-centered' },
  { name: 'Data fluency', category: 'Working with information', note: 'Ask sound questions of data and interpret results with care.', relation: 'AI-adjacent' },
  { name: 'Digital & AI literacy', category: 'Working with tools', note: 'Understand tool limits, privacy, and when a human check matters.', relation: 'AI-adjacent' },
  { name: 'Adaptability', category: 'Learning & change', note: 'Learn new workflows and transfer knowledge across situations.', relation: 'Transferable' },
  { name: 'Creative problem framing', category: 'Learning & change', note: 'Define the actual problem before choosing a tool or solution.', relation: 'Transferable' },
];

export default function FutureSkills() {
  const { profile } = useNavigator();
  return <div className="page">
    <PageIntro eyebrow="Explore / Capabilities" title="A radar for skills that travel.">The radar is a reflection aid, not a labor-market forecast. It brings together capabilities relevant to working with people, information, tools, and change—without ranking their future value.</PageIntro>
    <Panel className="panel-pad" style={{ background: 'hsl(166 23% 19%)', color: '#f8f4e8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div><div className="hero-kicker">Four lenses · qualitative</div><h2 className="section-title" style={{ fontSize: 23, margin: '12px 0 8px', color: 'inherit' }}>Notice the skill beneath the tool.</h2><p style={{ color: '#d3ded3', fontSize: 12, maxWidth: 650, lineHeight: 1.7, margin: 0 }}>A spreadsheet may change. Asking a better question, checking the answer, and explaining it clearly can transfer to many settings.</p></div>
        <div style={{ width: 140, height: 140, borderRadius: '50%', border: '1px solid #83958b', display: 'grid', placeItems: 'center', position: 'relative', background: 'radial-gradient(circle, hsl(16 65% 58% / .2), transparent 60%)' }} aria-label="Illustrative skill radar diagram" data-testid="graphic-skill-radar">
          <div style={{ position: 'absolute', inset: 25, border: '1px solid #71887c', borderRadius: '50%' }} /><div style={{ position: 'absolute', inset: 48, border: '1px solid #71887c', borderRadius: '50%' }} />
          <div style={{ width: 8, height: 8, background: '#efa88a', borderRadius: '50%', boxShadow: '27px -24px 0 #cdd6b0, -30px 12px 0 #e2b875, 8px 42px 0 #a7c7b6' }} /><span className="small-mono" style={{ position: 'absolute', bottom: -23, color: '#d3ded3' }}>illustrative, not measured</span>
        </div>
      </div>
    </Panel>
    <SectionHeading title="A capability map" detail="Descriptions are sample guidance, not a demand ranking." />
    <div className="grid-2">{capabilities.map((item, index) => <Panel className="panel-pad" key={item.name} data-testid={`card-capability-${index}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}><div><div className="small-mono">{item.category}</div><h3 className="section-title" style={{ margin: '9px 0 7px' }}>{item.name}</h3></div><span className="chip">{item.relation}</span></div>
      <p className="field-hint" style={{ lineHeight: 1.65, fontSize: 12 }}>{item.note}</p>
      {profile.skills.includes(item.name.toLowerCase()) && <span className="chip chip-selected">In your profile</span>}
    </Panel>)}</div>
    <div className="section-head"><div><h2 className="section-title">What this means for you</h2></div></div>
    <Panel className="panel-pad"><div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><Info size={18} color="hsl(var(--primary))" /><div><strong style={{ fontSize: 13 }}>Live trend data is not connected.</strong><p className="field-hint" style={{ lineHeight: 1.7 }}>The dated references below provide context, but they do not power a live forecast or this qualitative skills map. Use the map to reflect on capabilities you want to practice, then compare them with a specific role’s sample requirements.</p><Link className="resource-link" href="/careers">Compare careers <ArrowRight size={13} /></Link></div></div></Panel>
    <TrendSources />
  </div>;
}
