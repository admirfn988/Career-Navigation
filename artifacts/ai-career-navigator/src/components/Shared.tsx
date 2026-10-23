import { Link, useLocation } from 'wouter';
import type { HTMLAttributes, ReactNode } from 'react';
import { ArrowRight, Compass, LayoutDashboard, UserRound, Radar, BriefcaseBusiness, Waypoints, Map, Globe2, Activity, FileText, Menu, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigator } from '../state/NavigatorContext';

export const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'My profile', icon: UserRound },
  { href: '/future-skills', label: 'Future skills', icon: Radar },
  { href: '/careers', label: 'Career matches', icon: BriefcaseBusiness },
  { href: '/skills-gap', label: 'Skills gap', icon: Waypoints },
  { href: '/roadmap', label: 'Learning roadmap', icon: Map },
  { href: '/sdg', label: 'Work & the SDGs', icon: Globe2 },
  { href: '/disruption', label: 'Change scenarios', icon: Activity },
  { href: '/report', label: 'Your report', icon: FileText },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { profileReady, databaseStatus, databaseMessage } = useNavigator();
  const databaseLabel =
    databaseStatus === 'connected' ? 'MySQL connected' :
    databaseStatus === 'saving' ? 'Saving to MySQL…' :
    databaseStatus === 'checking' ? 'Checking MySQL…' :
    'MySQL unavailable';
  const navLinks = (mobile = false) => navItems.map(({ href, label, icon: Icon }) => (
    <Link href={href} key={href} data-testid={`link-${label.toLowerCase().replaceAll(' ', '-')}${mobile ? '-mobile' : ''}`} className={`nav-link ${location === href ? 'active' : ''}`} onClick={() => setOpen(false)} aria-current={location === href ? 'page' : undefined}>
      <Icon size={16} strokeWidth={1.8} /><span>{label}</span>
    </Link>
  ));
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
      <Link href="/" className="brand" data-testid="link-home-brand" onClick={() => setOpen(false)}>
        <span className="brand-mark"><Compass size={21} /></span>
        <span><span className="brand-title">Career Navigator</span><span className="brand-subtitle">A clearer next step</span></span>
      </Link>
      <div className="nav-label">Explore your direction</div>
      <nav className="nav-list">{navLinks()}</nav>
      <div className="sidebar-foot"><div className="demo-note"><strong><Sparkles size={12} style={{ verticalAlign: '-2px', marginRight: 5 }} />Local demo</strong>Sample role and scenario content only. No live labor-market or AI trend feed is connected.</div></div>
    </aside>
    {open && <button aria-label="Close navigation" className="nav-scrim" onClick={() => setOpen(false)} data-testid="button-close-menu" />}
    <div className="main-column">
      <header className="topbar">
        <div className="topbar-left"><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} data-testid="button-menu"><Menu size={20} /></button><span>Career exploration</span><ArrowRight size={13} /><span style={{ color: 'hsl(var(--foreground))' }}>{navItems.find((item) => item.href === location)?.label ?? 'Page'}</span></div>
        <div className="topbar-right"><span className="topbar-date">{profileReady ? 'Profile ready to explore' : 'Start with your profile'}</span><span className="topbar-date" title={databaseMessage} aria-live="polite" data-testid="status-database">{databaseLabel}</span><span className="demo-pill">Sample workspace</span></div>
      </header>
      <main>{children}</main>
      <nav className="mobile-nav" aria-label="Quick navigation">{navLinks(true).filter((_, index) => [0, 1, 3, 5, 8].includes(index))}</nav>
    </div>
  </div>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <div><div className="eyebrow">{eyebrow}</div><h1 className="page-title">{title}</h1><p className="page-intro">{children}</p></div>;
}

export function Panel({ children, className = '', ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`} {...props}>{children}</section>;
}

export function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return <div className="section-head"><div><h2 className="section-title">{title}</h2>{detail && <div className="field-hint" style={{ marginTop: 5 }}>{detail}</div>}</div></div>;
}

