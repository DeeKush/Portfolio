import { useEffect, useState } from 'react';
import profile from '../../../data/profile';
import { useSmoothScroll } from '../SmoothScroll/SmoothScroll';
import PillButton from '../../ui/PillButton/PillButton';
import StatusPill from '../../ui/StatusPill/StatusPill';
import './Navbar.css';

// counts: { projects, whatIDo, journey } - numbers shown as "[n]" after each link.
export default function Navbar({ counts = {} }) {
  const [open, setOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const jump = (target) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(`#${target}`);
  };

  return (
    <header className="navbar">
      <StatusPill className="navbar__status" data-hero-fade>
        {profile.status}
      </StatusPill>

      <nav id="primary-nav" className={`navbar__links${open ? ' is-open' : ''}`} aria-label="Primary" data-hero-fade>
        <ul>
          {profile.nav.map(({ label, target, count }) => (
            <li key={target}>
              <a href={`#${target}`} onClick={jump(target)}>
                {label}
                {Number.isFinite(counts[count]) && (
                  <span className="navbar__count">
                    <span aria-hidden="true">[{counts[count]}]</span>
                    <span className="sr-only">({counts[count]} items)</span>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar__actions" data-hero-fade>
        <button
          type="button"
          className="navbar__menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? profile.menu.close : profile.menu.open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`navbar__burger${open ? ' is-open' : ''}`} aria-hidden="true" />
          {profile.menu.label}
        </button>
        <PillButton href={`#${profile.cta.nav.target}`} onClick={jump(profile.cta.nav.target)} className="navbar__cta">
          {profile.cta.nav.label}
        </PillButton>
      </div>
    </header>
  );
}
