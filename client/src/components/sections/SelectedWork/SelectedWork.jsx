import { useLayoutEffect, useRef, useState } from 'react';
import profile from '../../../data/profile';
import projects from '../../../data/projects';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../../utils/motion';
import PillButton from '../../ui/PillButton/PillButton';
import ProjectCard from '../../ui/ProjectCard/ProjectCard';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import './SelectedWork.css';

export default function SelectedWork() {
  const { work } = profile;
  const [filter, setFilter] = useState('All');
  const [shownFilter, setShownFilter] = useState('All'); // lags behind `filter` while cards animate out
  const [showAll, setShowAll] = useState(false);
  const grid = useRef(null);
  const firstRender = useRef(true);

  const filtered = shownFilter === 'All' ? projects : projects.filter((p) => p.category === shownFilter);
  const visible = showAll ? filtered : filtered.slice(0, work.initialCount);

  const changeFilter = (next) => {
    if (next === filter) return;
    setFilter(next);
    const cards = grid.current?.children;
    if (prefersReducedMotion() || !cards?.length) {
      setShownFilter(next);
      return;
    }
    gsap.to(cards, {
      y: 24,
      opacity: 0,
      duration: 0.25,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => setShownFilter(next),
    });
  };

  // Animate the new set of cards in after a filter / "view all" change.
  useLayoutEffect(() => {
    if (firstRender.current || !grid.current) {
      firstRender.current = false;
      return;
    }
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        grid.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
    }
    ScrollTrigger.refresh();
  }, [shownFilter, showAll]);

  return (
    <section className="section work" id="work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="work-title" label={work.label} watermark={work.watermark} />

        <div className="work__toolbar">
          <div className="work__filters" role="group" aria-label="Filter projects">
            {work.filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`work__filter${filter === f ? ' is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => changeFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          {filtered.length > work.initialCount && (
            <PillButton variant="light" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
              {showAll ? work.showLess : work.viewAll}
            </PillButton>
          )}
        </div>

        <div className="work__grid" ref={grid}>
          {visible.map((p) => (
            // Wrapper takes the filter animation so it doesn't fight the card's hover transform.
            <div className="work__item" key={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        {visible.length === 0 && <p className="notice">{work.empty}</p>}
      </div>
    </section>
  );
}
