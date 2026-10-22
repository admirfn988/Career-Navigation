import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, CircleDashed } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { careers } from '../data/careers';
import { useNavigator } from '../state/NavigatorContext';

export default function SkillsGap() {
  const { profile, profileReady, selectedCareerId } = useNavigator();
  const role = careers.find((career) => career.id === selectedCareerId);
  if (!profileReady || !role) return <div className="page"><PageIntro eyebrow="03 / Skills gap" title="A gap view needs a chosen direction.">This page only compares your skills with the one career you selected. Choose from your sample matches first.</PageIntro><Panel className="empty-state"><CircleDashed size={29} /><h3>{!profileReady ? 'Complete your profile first' : 'No career selected yet'}</h3><p>{!profileReady ? 'Education, one skill, and one interest are required for analysis.' : 'Choose one role in Career matching before viewing its gaps.'}</p><Link href={!profileReady ? '/profile' : '/careers'} className="button button-primary" data-testid="link-gap-prerequisite">{!profileReady ? 'Go to profile' : 'Choose a career'} <ArrowRight size={14} /></Link></Panel></div>;
  const matched = role.requiredSkills.filter((skill) => profile.skills.includes(skill));
  const gaps = role.requiredSkills.filter((skill) => !profile.skills.includes(skill));
  return <div className="page">
    <PageIntro eyebrow="03 / Skills gap" title={`A useful comparison for ${role.title}.`}>This is a simple list comparison against a sample role profile—not a test of your capability. A missing skill means it is not listed in your profile yet; it may already be part of your experience.</PageIntro>
    <Panel className="panel-pad" style={{ marginBottom: 23 }}><div className="small-mono">Selected pathway · sample role</div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 8 }}><div><h2 className="section-title">{role.title}</h2><p className="field-hint" style={{ marginBottom: 0 }}>Compared with {role.requiredSkills.length} example requirements drawn from this prototype’s role data.</p></div><Link href="/careers" className="button button-secondary button-small" data-testid="link-change-selected-role">Change role</Link></div></Panel>
    <div className="grid-2">
      <Panel className="panel-pad"><div style={{ display: 'flex', justifyContent: 'space-between' }}><h2 className="section-title">Already in your profile</h2><span className="chip chip-selected">{matched.length} listed</span></div>
        {matched.length ? <div style={{ marginTop: 12 }}>{matched.map((skill) => <div className="skill-item" key={skill} data-testid={`row-matched-skill-${skill.replaceAll(' ', '-')}`}><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><CheckCircle2 size={15} color="hsl(var(--primary))" />{skill}</span><span className="field-hint">Listed skill</span><span className="small-mono">Matched</span></div>)}</div> : <p className="field-hint" style={{ marginTop: 18 }}>No listed skills overlap yet. You can update your profile if this misses experience you have.</p>}
      </Panel>
      <Panel className="panel-pad"><div style={{ display: 'flex', justifyContent: 'space-between' }}><h2 className="section-title">Not listed yet</h2><span className="chip">{gaps.length} to explore</span></div>
        {gaps.length ? <div style={{ marginTop: 12 }}>{gaps.map((skill) => <div className="skill-item" key={skill} data-testid={`row-gap-skill-${skill.replaceAll(' ', '-')}`}><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><CircleDashed size={15} color="hsl(var(--accent))" />{skill}</span><span className="field-hint">Not listed in your profile</span><span className="small-mono">Explore</span></div>)}</div> : <div className="empty-state" style={{ padding: '24px 5px' }}><CheckCircle2 size={22} /><h3>Every example requirement is listed</h3><p>That is profile overlap, not a measure of readiness.</p></div>}
      </Panel>
    </div>
    <div className="callout" style={{ marginTop: 20 }} data-testid="text-gap-caveat"><strong>How to use this.</strong> Check whether each gap is genuinely new or simply missing from your profile. Add context, practice, or evidence before deciding it is a learning need.</div>
    <SectionHeading title="Build a learning path from the gaps" />
    <Panel className="panel-pad"><p className="field-hint" style={{ lineHeight: 1.7 }}>The next page offers broad practice prompts and official catalog pages. It does not promise a course is available, suitable, or right for your goals.</p><Link href="/roadmap" className="button button-primary" data-testid="link-gap-roadmap">Open your learning roadmap <ArrowRight size={14} /></Link></Panel>
  </div>;
}
