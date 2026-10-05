import { useLayoutEffect, useRef } from 'react';
import profile from '../../../data/profile';
import { gsap, prefersReducedMotion } from '../../../utils/motion';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import './Journey.css';

export default function Journey() {
  const { label, watermark, aside, items } = profile.journey;
  const list = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.journey__row', { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: list.current, start: 'top 80%' },
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section--dark journey" id="journey" aria-labelledby="journey-title" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="journey-title" label={label} watermark={watermark} aside={aside} />

        <ol className="journey__list" ref={list}>
          {items.map((item) => (
            <li key={item.title} className="journey__row">
              <div>
                <h3 className="journey__title">{item.title}</h3>
                <p className="journey__subtitle">{item.subtitle}</p>
              </div>
              <p className="journey__date">{item.date}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
