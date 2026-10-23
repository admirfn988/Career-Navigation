import { Link } from 'wouter';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { careers, scoreCareer } from '../data/careers';
import { useNavigator } from '../state/NavigatorContext';

export default function ReportPage() {
  const { profile, profileReady, selectedCareerId, profileIsSample, databaseStatus } = useNavigator();
  const role = careers.find((career) => career.id === selectedCareerId);
  const match = role ? scoreCareer(profile, role) : null;
  const downloadReport = () => {
    const content = [
      'AI Career Navigator — exploration summary',
      'Sample workspace. This is a local summary, not an AI-generated or labor-market report.',
      `Profile source: ${profileIsSample ? 'fictional synthetic demo profile' : 'user-entered session profile'}`,
      '',
      `Education: ${profile.education || 'Not provided'}`,
      `Skills: ${profile.skills.length ? profile.skills.join(', ') : 'None listed'}`,
      `Interests: ${profile.interests.length ? profile.interests.join(', ') : 'None selected'}`,
      `Experience: ${profile.experience || 'Not provided'}`,
      `Projects: ${profile.projects || 'Not provided'}`,
      `Selected career: ${role?.title ?? 'None selected'}`,
      `Profile overlap score: ${match ? `${match.score}%` : 'Not available'}`,
      `Matched sample skills: ${match?.skillHits.length ? match.skillHits.join(', ') : 'None'}`,
      `Matched sample interests: ${match?.interestHits.length ? match.interestHits.join(', ') : 'None'}`,
      '',
      'Scores reflect profile overlap with sample role skills and interest tags only. No live trend data is connected.',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'career-exploration-summary.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <div className="page">
    <PageIntro eyebrow="Your report" title="A working summary, not a verdict.">Bring your current exploration into one place. Your report reflects the profile loaded for this browser and the sample role data shown in this prototype.</PageIntro>
    <Panel className="panel-pad" style={{ background: 'hsl(166 23% 19%)', color: '#f8f4e8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}><div><div className="hero-kicker">AI Career Navigator · local summary</div><h2 className="section-title" style={{ color: 'inherit', fontSize: 24, margin: '10px 0 6px' }}>Your direction is still yours to choose.</h2><p style={{ color: '#d3ded3', fontSize: 12, margin: 0 }}>{profileIsSample ? 'Fictional demo profile · ' : 'Your session profile · '}No automated decision. No live AI or trend feed.</p></div><button className="button button-primary" type="button" onClick={downloadReport} data-testid="button-download-report"><Download size={15} />Download summary</button></div>
    </Panel>
    <SectionHeading title="Profile snapshot" />
    <div className="grid-2">
      <Panel className="panel-pad"><div className="small-mono">Education / learning</div><p style={{ fontSize: 13 }}>{profile.education || 'Not provided yet'}</p><hr className="divider" /><div className="small-mono">Skills listed</div><div className="chip-row" style={{ marginTop: 9 }}>{profile.skills.length ? profile.skills.map((skill) => <span className="chip" key={skill} data-testid={`report-skill-${skill.replaceAll(' ', '-')}`}>{skill}</span>) : <span className="field-hint">No skills listed.</span>}</div><hr className="divider" /><div className="small-mono">Career interests</div><div className="chip-row" style={{ marginTop: 9 }}>{profile.interests.length ? profile.interests.map((interest) => <span className="chip" key={interest}>{interest}</span>) : <span className="field-hint">No interests selected.</span>}</div></Panel>
      <Panel className="panel-pad"><div className="small-mono">Experience & projects</div><h3 className="section-title" style={{ fontSize: 15, margin: '9px 0 5px' }}>Experience</h3><p className="field-hint" style={{ lineHeight: 1.65 }}>{profile.experience || 'No experience notes provided.'}</p><h3 className="section-title" style={{ fontSize: 15, margin: '18px 0 5px' }}>Projects</h3><p className="field-hint" style={{ lineHeight: 1.65 }}>{profile.projects || 'No project notes provided.'}</p><Link href="/profile" className="resource-link" data-testid="link-report-edit">Edit profile <ArrowRight size={13} /></Link></Panel>
    </div>
    <SectionHeading title="Selected pathway" />
    {role ? <Panel className="panel-pad" data-testid="report-selected-career"><div className="small-mono">Sample role · {role.family}</div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}><h3 className="section-title" style={{ margin: '8px 0' }}>{role.title}</h3><span className="chip chip-selected" data-testid="report-match-score">{match?.score}% profile overlap</span></div><p className="field-hint">{role.summary}</p><div className="career-score-explain"><strong>Matched in your profile</strong><br />Skills: {match?.skillHits.length ? match.skillHits.join(', ') : 'none'}<br />Interests: {match?.interestHits.length ? match.interestHits.join(', ') : 'none'}</div><p className="field-hint" style={{ lineHeight: 1.7 }}><strong>Score meaning:</strong> the career-matching score is profile overlap with sample required skills (70% weight) and interest tags (30% weight). It is not a prediction of success or hiring.</p><Link href="/skills-gap" className="button button-secondary button-small" data-testid="link-report-gap">Review skills gap</Link></Panel> : <Panel className="empty-state"><FileText size={25} /><h3>No career selected</h3><p>Complete your profile and choose a pathway to include a role comparison.</p><Link href={profileReady ? '/careers' : '/profile'} className="button button-primary" data-testid="link-report-careers">{profileReady ? 'Compare careers' : 'Complete profile'}</Link></Panel>}
    <SectionHeading title="Important context" />
    <Panel className="panel-pad"><div className="callout">Role content and scenarios are clearly marked sample data. Trend data is not connected yet. The downloaded report is generated in your browser. Profile and choice data are saved to MySQL only when the header says “MySQL connected” and the save succeeds; they are not evidence of a guaranteed career outcome. Current database status: {databaseStatus}.</div></Panel>
  </div>;
}
