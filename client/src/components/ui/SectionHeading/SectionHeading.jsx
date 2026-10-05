import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../../utils/motion';
import './SectionHeading.css';

export default function SectionHeading({ label, watermark, aside, id }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const section = root.current.closest('section') ?? root.current;

    const ctx = gsap.context(() => {
      const reveal = { trigger: root.current, start: 'top 85%' };
      gsap.fromTo('.section-heading__mark', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: reveal });
      gsap.fromTo('.section-heading__title, .section-heading__aside', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: reveal,
      });
      // Drifts down while the page scrolls up, so it reads slower than the content.
      gsap.to('.section-heading__mark-inner', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header className="section-heading" ref={root}>
      <p className="section-heading__mark" aria-hidden="true">
        <span className="section-heading__mark-inner">{watermark}</span>
      </p>
      <h2 className="section-heading__title" id={id}>
        {label}
      </h2>
      {aside && <p className="section-heading__aside">{aside}</p>}
    </header>
  );
}
