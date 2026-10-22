import { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import TrendSources from '../components/TrendSources';
import { disruptionScenarios } from '../data/resources';

export default function DisruptionPage() {
  const [selected, setSelected] = useState('moderate');
  const scenario = disruptionScenarios.find((item) => item.id === selected) ?? disruptionScenarios[0];
  return <div className="page">
    <PageIntro eyebrow="AI & work / Scenarios" title="Prepare for possibilities, not predictions.">No one can know exactly how AI will change a specific job. Compare two qualitative scenarios and consider what capabilities could help you adapt under either one.</PageIntro>
    <div className="callout" style={{ marginBottom: 24 }} data-testid="text-disruption-caveat"><AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /><strong>Explicit uncertainty:</strong> These are illustrative planning scenarios, not forecasts. They are not based on current trend data, and do not quantify job loss, growth, timing, or probability.</div>
    <div className="grid-2" role="group" aria-label="Choose a disruption scenario">{disruptionScenarios.map((item) => <button type="button" className={`panel panel-pad scenario-option ${selected === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id} data-testid={`button-scenario-${item.id}`} style={{ textAlign: 'left', color: 'inherit', cursor: 'pointer', borderColor: selected === item.id ? 'hsl(var(--primary))' : undefined, boxShadow: selected === item.id ? '0 0 0 2px hsl(var(--primary) / .12)' : undefined }}><span className="small-mono">{item.id === 'moderate' ? 'Scenario A · sample/demo' : 'Scenario B · sample/demo'}</span><h2 className="section-title" style={{ margin: '10px 0' }}>{item.title}</h2><span className="field-hint" style={{ display: 'block', lineHeight: 1.65 }}>{item.summary}</span></button>)}</div>
    <SectionHeading title={`In the ${scenario.title.toLowerCase()} scenario`} detail="Sample implications to discuss—not predicted outcomes." />
    <Panel className="panel-pad" data-testid="panel-scenario-implications"><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>{scenario.implications.map((implication, index) => <li key={implication} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.6 }}><span className="step-number" style={{ width: 28, height: 28, fontSize: 10 }}>{index + 1}</span>{implication}</li>)}</ul></Panel>
    <SectionHeading title="A practical response in either case" />
    <div className="grid-3"><Panel className="panel-pad"><div className="small-mono">01 / Notice</div><h3 className="section-title" style={{ fontSize: 15, margin: '10px 0' }}>Look at tasks, not headlines.</h3><p className="field-hint">Separate which tasks use routine information processing from where context, responsibility, and relationships matter.</p></Panel><Panel className="panel-pad"><div className="small-mono">02 / Experiment</div><h3 className="section-title" style={{ fontSize: 15, margin: '10px 0' }}>Try tools with care.</h3><p className="field-hint">Practice in low-risk situations. Check accuracy, privacy, accessibility, and the consequences of errors.</p></Panel><Panel className="panel-pad"><div className="small-mono">03 / Revisit</div><h3 className="section-title" style={{ fontSize: 15, margin: '10px 0' }}>Keep your options open.</h3><p className="field-hint">Talk with people in the field and update your assumptions as you learn more.</p></Panel></div>
    <Panel className="panel-pad" style={{ marginTop: 20 }}><Info size={16} color="hsl(var(--primary))" style={{ verticalAlign: 'middle', marginRight: 7 }} /><span className="field-hint">Trend data is not connected. These scenarios are illustrative and are not derived from the reference sources below.</span></Panel>
    <TrendSources />
  </div>;
}
