import { Link } from 'wouter';
import { ArrowRight, BookOpen, Compass, FileText, Sparkles } from 'lucide-react';
import { PageIntro, Panel, SectionHeading } from '../components/Shared';
import { careers } from '../data/careers';
import { useNavigator } from '../state/NavigatorContext';

export default function Dashboard() {
  const { profile, profileReady, selectedCareerId, profileIsSample, databaseStatus, statePersisted } = useNavigator();
  const selectedCareer = careers.find((career) => career.id === selectedCareerId);
  return <div className="page">
    <PageIntro eyebrow="Your starting point" title="Make room for more than one future.">A practical place to connect what you already know with work that may be changing. Start with your real experience; explore the options without treating a match as a promise.</PageIntro>
    <section className="hero-panel" data-testid="panel-dashboard-hero">
      <div className="hero-kicker">AI & work · a guided exploration</div>
      <h2 className="hero-title">Your next step starts with what you already bring.</h2>
      <p className="hero-copy">Build a skills picture, compare sample career paths, and make a learning plan you can adapt. {databaseStatus === 'connected' ? statePersisted ? 'Your profile and choices are saved to MySQL for this browser.' : 'MySQL is connected. Save your profile to store it for this browser.' : databaseStatus === 'saving' ? 'Your changes are being sent to MySQL.' : databaseStatus === 'unavailable' ? 'MySQL is unavailable, so changes cannot be saved or restored yet.' : 'Checking whether MySQL is available.'}</p>
      <div className="hero-actions">
        <Link href={profileReady ? '/careers' : '/profile'} className="button button-primary" data-testid="link-start-exploring">{profileReady ? 'See career matches' : 'Build your profile'}<ArrowRight size={15} /></Link>
        <Link href="/future-skills" className="button button-quiet" data-testid="link-future-skills-hero">Explore future skills</Link>
      </div>
    </section>
    <div className="section-head"><div><h2 className="section-title">Your exploration, at a glance</h2><div className="field-hint" style={{ marginTop: 5 }}>A guided sequence, not a prediction.</div></div><span className="demo-pill">Sample content</span></div>
    <div className="dashboard-grid">
      <Panel className="panel-pad">
        <div className="dashboard-list">
          <div className="dashboard-item"><div><strong>01 — Your profile</strong><span>{profileReady ? `Education, ${profile.skills.length} skills, and ${profile.interests.length} interests added.` : 'Begin with education, one skill, and one career interest.'}</span></div><Link className="button button-quiet button-small" href="/profile" data-testid="link-edit-profile">{profileReady ? 'Edit' : 'Start'}</Link></div>
          <div className="dashboard-item"><div><strong>02 — Career matches</strong><span>{selectedCareer ? `${selectedCareer.title} selected for your comparison.` : 'Compare sample roles using an explainable overlap score.'}</span></div><Link className="button button-quiet button-small" href="/careers" data-testid="link-open-careers">Explore</Link></div>
          <div className="dashboard-item"><div><strong>03 — Skills & next steps</strong><span>{selectedCareer ? 'Review role-specific gaps and a flexible learning path.' : 'Choose a career to unlock a tailored gap view.'}</span></div><Link className="button button-quiet button-small" href={selectedCareer ? '/skills-gap' : '/careers'} data-testid="link-open-gap">View</Link></div>
        </div>
      </Panel>
      <Panel className="panel-pad">
        <div className="small-mono">Current snapshot</div>
        <div style={{ display: 'flex', gap: 22, margin: '16px 0 18px' }}>
          <div><div className="metric" data-testid="text-skills-count">{profile.skills.length}</div><div className="metric-label">skills listed</div></div>
          <div><div className="metric" data-testid="text-interests-count">{profile.interests.length}</div><div className="metric-label">interests listed</div></div>
        </div>
        <div className="status-line" data-testid="status-profile-readiness"><span className={`status-dot ${profileReady ? 'ready' : ''}`} />{profileReady ? profileIsSample ? 'Fictional demo profile · ready to explore' : 'Ready to compare roles' : 'Profile needs a few details'}</div>
        <hr className="divider" />
        <div className="callout"><strong>Keep perspective.</strong> These role descriptions and scenarios are sample material. The tool does not connect to a live job-market or AI-trend dataset.</div>
      </Panel>
    </div>
    <SectionHeading title="A few useful starting points" />
    <div className="grid-3">
      <Link href="/future-skills" className="panel panel-pad" style={{ textDecoration: 'none', color: 'inherit' }} data-testid="card-future-skills"><div className="small-mono">01 / Explore</div><h3 className="section-title" style={{ margin: '12px 0 7px' }}>Skills in context</h3><p className="field-hint">Think about adaptable capabilities alongside tools and technical fluency.</p><span className="resource-link">Open skills radar <ArrowRight size={13} /></span></Link>
      <Link href="/sdg" className="panel panel-pad" style={{ textDecoration: 'none', color: 'inherit' }} data-testid="card-sdg"><div className="small-mono">02 / Connect</div><h3 className="section-title" style={{ margin: '12px 0 7px' }}>Work and wider goals</h3><p className="field-hint">See how learning, decent work, and fair access connect to the UN SDGs.</p><span className="resource-link">Explore the connection <ArrowRight size={13} /></span></Link>
      <Link href="/report" className="panel panel-pad" style={{ textDecoration: 'none', color: 'inherit' }} data-testid="card-report"><div className="small-mono">03 / Reflect</div><h3 className="section-title" style={{ margin: '12px 0 7px' }}>Bring it together</h3><p className="field-hint">Review your current profile, selected role, and suggested next steps.</p><span className="resource-link">View report <ArrowRight size={13} /></span></Link>
    </div>
    <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 24 }}>
      <span className="chip"><Sparkles size={12} /> No automated verdicts</span><span className="chip"><BookOpen size={12} /> Official browse pages</span><span className="chip"><FileText size={12} /> Editable anytime</span><span className="chip"><Compass size={12} /> Your direction, your choice</span>
    </div>
  </div>;
}
