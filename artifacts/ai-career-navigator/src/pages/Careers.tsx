import { useMemo, type CSSProperties } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Info, UserRound } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { careers, scoreCareer } from '../data/careers';
import { useNavigator } from '../state/NavigatorContext';

export default function Careers() {
  const {
    profile,
    profileReady,
    profileIsSample,
    selectedCareerId,
    scenario,
    setSelectedCareerId,
    persistState,
  } = useNavigator();
  const ranked = useMemo(() => careers.map((role) => ({ role, ...scoreCareer(profile, role) })).sort((a, b) => b.score - a.score || a.role.title.localeCompare(b.role.title)), [profile]);
  if (!profileReady) return <div className="page"><PageIntro eyebrow="02 / Career matching" title="First, add your context.">Career matching compares your profile with each sample role. It needs education, at least one skill, and at least one career interest to give you a useful starting point.</PageIntro><Panel className="empty-state"><UserRound size={28} /><h3>Your profile is not ready yet</h3><p>Add the required profile details before viewing a score.</p><Link href="/profile" className="button button-primary" data-testid="link-complete-profile">Complete profile <ArrowRight size={14} /></Link></Panel></div>;
  return <div className="page">
    <PageIntro eyebrow="02 / Career matching" title="Options, with the reasoning visible.">These are sample pathways—not recommendations from a live vacancy feed. Compare each score with its skill and interest overlap, then choose one role to explore further.</PageIntro>
    <Panel className="panel-pad" style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><Info size={19} color="hsl(var(--primary))" /><div><strong style={{ fontSize: 13 }}>How the repeatable score works</strong><p className="field-hint" style={{ lineHeight: 1.7, marginBottom: 0 }}>Each role has a fixed sample list of required skills and interest tags. Score = (matched required skills ÷ listed skills × 70%) + (matched interest tags ÷ listed tags × 30%), rounded to a whole percent. Same profile and sample data produce the same score. It measures overlap only; it does not measure ability, eligibility, job availability, or likelihood of success.</p></div></div>
    </Panel>
    <SectionHeading title="Sample role pathways" detail="Select a role to unlock its skills-gap view and learning roadmap." />
    <div className="grid-3">{ranked.map(({ role, score, skillHits, interestHits, skillScore, interestScore }) => {
      const selected = selectedCareerId === role.id;
      return <article className={`panel career-card ${selected ? 'selected' : ''}`} key={role.id} data-testid={`card-career-${role.id}`}>
        <div className="career-top"><span className="chip">{role.family}</span><div className="score-ring" style={{ '--score': `${score * 3.6}deg` } as CSSProperties} role="img" aria-label={`Overlap score ${score} percent`}><span>{score}%</span></div></div>
        <h3>{role.title}</h3><div className="career-meta">Illustrative role profile · sample data</div>
        <p className="field-hint" style={{ minHeight: 53, lineHeight: 1.6 }}>{role.summary}</p>
        <div className="career-score-explain" data-testid={`text-score-explanation-${role.id}`}><strong>Score breakdown</strong><br />Skills: {skillHits.length}/{role.requiredSkills.length} matched ({Math.round(skillScore * 100)}% of 70%)<br />Interests: {interestHits.length}/{role.interestTags.length} matched ({Math.round(interestScore * 100)}% of 30%)<br /><span>Skill overlap: {skillHits.length ? skillHits.join(', ') : 'none yet'}. Interest overlap: {interestHits.length ? interestHits.join(', ') : 'none yet'}.</span></div>
        <div className="small-mono">Role outlook · sample framing</div><p className="field-hint" style={{ marginTop: 5, lineHeight: 1.55 }}>{role.outlook}</p>
         <button className={`button ${selected ? 'button-secondary' : 'button-primary'}`} style={{ width: '100%', marginTop: 8 }} onClick={() => { setSelectedCareerId(role.id); void persistState({ profile, profileIsSample, selectedCareerId: role.id, scenario }).catch(() => undefined); }} aria-pressed={selected} data-testid={`button-select-career-${role.id}`}>{selected ? <><Check size={14} />Selected</> : 'Explore this path'}</button>
      </article>;
    })}</div>
    {selectedCareerId && <Panel className="panel-pad" style={{ marginTop: 22 }} data-testid="status-career-selected"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}><div><div className="small-mono">Selected pathway</div><strong>{careers.find((item) => item.id === selectedCareerId)?.title}</strong><p className="field-hint" style={{ margin: '5px 0 0' }}>You can change this selection at any time.</p></div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Link href="/skills-gap" className="button button-primary" data-testid="link-selected-career-gap">View skills gap <ArrowRight size={14} /></Link><Link href="/roadmap" className="button button-secondary" data-testid="link-selected-career-roadmap">Open roadmap</Link></div></div></Panel>}
  </div>;
}
