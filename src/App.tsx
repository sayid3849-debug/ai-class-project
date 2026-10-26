import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  CircleHelp,
  Footprints,
  ScanLine,
  ChartNoAxesCombined,
  Trophy,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { useProgress, xpTotal } from './progress';
import { CountUp } from './components/UI';
import { Ball } from './components/Art';
const navigation = [
  ['/', 'Home', Home],
  ['/academy', 'Learn Soccer', BookOpen],
  ['/quizzes', 'Quizzes', CircleHelp],
  ['/training', 'Train Your Skills', Footprints],
  ['/coach', 'AI Soccer Coach', ScanLine],
  ['/progress', 'My Progress', ChartNoAxesCombined],
  ['/achievements', 'Achievements', Trophy],
  ['/parents', 'Parent Area', ShieldCheck],
] as const;
export default function App() {
  const { progress, notice, storageError } = useProgress();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  useEffect(() => {
    document.title = `${navigation.find(([path]) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)))?.[1] ?? 'Academy'} — SKILL & LEARN`;
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Skill and Learn home">
          <span className="brand-mark">
            <Zap size={23} fill="currentColor" />
          </span>
          <span>
            SKILL<span className="amp">&</span>LEARN<small>THE NEXT GENERATION ACADEMY</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.slice(0, 5).map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label === 'Learn Soccer'
                ? 'The Academy'
                : label === 'Train Your Skills'
                  ? 'Training'
                  : label === 'AI Soccer Coach'
                    ? 'AI Coach'
                    : label}
              {to === '/coach' && <span className="tiny-tag">AI</span>}
            </NavLink>
          ))}
        </nav>
        <div className="header-right">
          <Link className="xp-pill" to="/progress">
            <Zap size={15} fill="currentColor" />
            <CountUp value={xpTotal(progress)} /> <span>XP</span>
          </Link>
          <Link to="/progress" className="avatar" aria-label="My progress">
            S<span />
          </Link>
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-nav" aria-label="All pages">
          {navigation.map(([to, label, Icon]) => (
            <NavLink to={to} key={to} end={to === '/'}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Zap fill="currentColor" size={22} />
            </span>
            <span>
              SKILL<span className="amp">&</span>LEARN<small>SMALL STEPS. BIG DREAMS.</small>
            </span>
          </Link>
          <p>
            Learn the Game. Master Your Skills.
            <br />
            Become a Champion.
          </p>
          <Link to="/academy">
            Your next chapter <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Skill & Learn. Made for the love of the game.</span>
          <div>
            <Link to="/achievements">Achievements</Link>
            <Link to="/parents">Parent Area & Privacy</Link>
            <span>Ages 6–10</span>
          </div>
        </div>
      </footer>
      {storageError && (
        <div className="storage-warning" role="status">
          Browser storage is unavailable. Progress lasts only for this session.
        </div>
      )}
      {notice && (
        <div className="achievement-toast" role="status">
          <CheckCircle2 size={23} />
          {notice}
          <Link to="/achievements">
            View <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
      <div className="ball-corner" aria-hidden="true">
        <Ball />
      </div>
    </>
  );
}
