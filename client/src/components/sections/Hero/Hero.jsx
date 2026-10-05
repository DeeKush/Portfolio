import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import profile from '../../../data/profile';
import photo from '../../../assets/images/deepak.png';
import { canHover, gsap, prefersReducedMotion } from '../../../utils/motion';
import { useSmoothScroll } from '../../layout/SmoothScroll/SmoothScroll';
import PillButton from '../../ui/PillButton/PillButton';
import SocialPill from '../../ui/SocialPill/SocialPill';
import './Hero.css';

let introPlayed = false; // the white overlay only runs on the very first load

function Letters({ text }) {
  return [...text].map((ch, i) => (
    <span className="hero__letter" key={i} aria-hidden="true">
      {ch}
    </span>
  ));
}

// Colour spotlight that follows the cursor over the photo. Writes CSS variables
// straight onto the frame (no React state per move): --x/--y in px, --s from 0 to 1.
function useSpotlight(frameRef) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !canHover()) return; // touch: photo stays greyscale

    const reduce = prefersReducedMotion();
    const LERP = 0.15;
    const GROW_MS = 300;
    const p = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };
    let raf = 0;
    let last = 0;

    const render = () => {
      const eased = p.s * p.s * (3 - 2 * p.s); // smoothstep
      frame.style.setProperty('--x', `${p.x}px`);
      frame.style.setProperty('--y', `${p.y}px`);
      frame.style.setProperty('--s', eased.toFixed(3));
    };

    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (reduce) {
        p.x = p.tx;
        p.y = p.ty;
        p.s = p.ts;
      } else {
        p.x += (p.tx - p.x) * LERP;
        p.y += (p.ty - p.y) * LERP;
        const step = dt / GROW_MS;
        p.s = p.ts > p.s ? Math.min(p.ts, p.s + step) : Math.max(p.ts, p.s - step);
      }
      render();
      const settled = Math.abs(p.tx - p.x) < 0.1 && Math.abs(p.ty - p.y) < 0.1 && p.s === p.ts;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const aim = (e) => {
      const r = frame.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
    };

    const enter = (e) => {
      if (e.pointerType === 'touch') return;
      aim(e);
      if (p.s === 0) {
        // Grow from the cursor instead of gliding in from the last spot.
        p.x = p.tx;
        p.y = p.ty;
      }
      p.ts = 1;
      start();
    };
    const move = (e) => {
      if (e.pointerType === 'touch') return;
      aim(e);
      start();
    };
    const leave = () => {
      p.ts = 0;
      start();
    };

    frame.addEventListener('pointerenter', enter);
    frame.addEventListener('pointermove', move);
    frame.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('pointerenter', enter);
      frame.removeEventListener('pointermove', move);
      frame.removeEventListener('pointerleave', leave);
    };
  }, [frameRef]);
}

export default function Hero() {
  const root = useRef(null);
  const frame = useRef(null);
  const [showIntro] = useState(() => !introPlayed && !prefersReducedMotion());
  const { scrollTo } = useSmoothScroll();
  const { name, role, tagline, socials, cta } = profile;
  useSpotlight(frame);

  useLayoutEffect(() => {
    introPlayed = true;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Coming from another page the transition panel is still covering the screen.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: showIntro ? 0.1 : 0.7 });
      if (showIntro) tl.to('.hero__intro-overlay', { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' });
      tl.fromTo('.hero__letter', { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045 }, showIntro ? '-=0.2' : 0)
        .fromTo('.hero__photo-frame', { yPercent: 25, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1 }, '-=0.55')
        .fromTo('[data-hero-fade]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 }, '-=0.6');
    });
    return () => ctx.revert();
  }, [showIntro]);

  const jump = (target) => (e) => {
    e.preventDefault();
    scrollTo(`#${target}`);
  };

  return (
    <section className="hero" ref={root} aria-labelledby="hero-name">
      {showIntro && <div className="hero__intro-overlay" aria-hidden="true" />}

      <h1 className="hero__name" id="hero-name" aria-label={`${name.first} ${name.last}`}>
        <span className="hero__first">
          <Letters text={name.first.toUpperCase()} />
        </span>
        <span className="hero__last">
          <Letters text={name.last.toUpperCase()} />
        </span>
      </h1>

      <div className="hero__photo-wrap">
        <div className="hero__photo-frame" ref={frame}>
          <img className="hero__photo" src={photo} alt={profile.photo.alt} fetchpriority="high" />
          <img className="hero__photo hero__photo--color" src={photo} alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="hero__intro" data-hero-fade>
        <h2 className="hero__role">{role}</h2>
        <p className="hero__tagline">{tagline}</p>
        <PillButton href={`#${cta.hero.target}`} onClick={jump(cta.hero.target)}>
          {cta.hero.label}
        </PillButton>
      </div>

      <ul className="hero__socials" aria-label="Links">
        {socials.map((s) => (
          <li key={s.id} data-hero-fade>
            <SocialPill {...s} />
          </li>
        ))}
      </ul>
    </section>
  );
}
