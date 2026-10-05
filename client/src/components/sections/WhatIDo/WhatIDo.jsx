import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import profile from '../../../data/profile';
import { imageUrl } from '../../../utils/images';
import { gsap, prefersReducedMotion } from '../../../utils/motion';
import { useSmoothScroll } from '../../layout/SmoothScroll/SmoothScroll';
import { ArrowUpRight, Close } from '../../ui/Icons/Icons';
import illustrations from '../../illustrations';
import Media from '../../ui/Media/Media';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';
import './WhatIDo.css';

const HOVER_DELAY = 120; // ms the mouse must rest on a heading before it opens

export default function WhatIDo() {
  const { label, watermark, items, close } = profile.whatIDo;
  const [openIndex, setOpenIndex] = useState(null);
  const list = useRef(null);
  const images = useRef([]);
  const prevOpen = useRef(null);

  const [instantClose, setInstantClose] = useState(null); // row collapsing without animation
  const hoverTimer = useRef(0);
  const openRef = useRef(null);
  const anchor = useRef(null); // { index, top } of the heading that must stay under the cursor
  const { scrollTo } = useSmoothScroll();
  openRef.current = openIndex;

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i));

  // Mouse only: hovering a heading opens its row; leaving the row (heading + open panel)
  // closes it. Touch and keyboard keep using click / Enter.
  // Events only record where the mouse is; `settle` decides once it has rested for HOVER_DELAY,
  // so sweeping across rows doesn't open each one, and leaving always closes.
  const hoveredRow = useRef(null); // row (li) under the mouse
  const wantsOpen = useRef(null); // row whose heading the mouse entered

  const settle = () => {
    const row = hoveredRow.current;
    const prev = openRef.current;
    if (row === null) {
      setOpenIndex(null);
      return;
    }
    const target = wantsOpen.current;
    if (target !== row || target === prev) return; // e.g. reading an open row's panel
    if (prev !== null && prev < target) {
      // An open row above is about to collapse and pull this heading upwards. Collapse it
      // instantly and scroll back by the same amount so the heading stays under the cursor.
      const trigger = document.getElementById(`service-trigger-${target}`);
      anchor.current = { index: target, top: trigger.getBoundingClientRect().top };
      setInstantClose(prev);
    }
    setOpenIndex(target);
  };

  const schedule = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(settle, HOVER_DELAY);
  };

  const rowEnter = (i) => (e) => {
    if (e.pointerType === 'mouse') hoveredRow.current = i;
  };
  const rowLeave = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    if (hoveredRow.current === i) hoveredRow.current = null;
    if (wantsOpen.current === i) wantsOpen.current = null;
    schedule();
  };
  const headingEnter = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    hoveredRow.current = i;
    wantsOpen.current = i;
    schedule();
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  useLayoutEffect(() => {
    const a = anchor.current;
    if (!a || a.index !== openIndex) return;
    anchor.current = null;
    const top = document.getElementById(`service-trigger-${a.index}`).getBoundingClientRect().top;
    const shift = top - a.top;
    if (Math.abs(shift) > 1) scrollTo(window.scrollY + shift, { immediate: true });
    const id = requestAnimationFrame(() => setInstantClose(null));
    return () => cancelAnimationFrame(id);
  }, [openIndex, scrollTo]);

  // Rows slide in from the left as the section enters.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.service', { x: -120, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: list.current, start: 'top 80%' },
      });
    }, list);
    return () => ctx.revert();
  }, []);

  // Spring the open row's image card up out of the panel; drop the previous one.
  useEffect(() => {
    const prev = prevOpen.current;
    prevOpen.current = openIndex;
    if (prefersReducedMotion()) return;

    if (prev !== null && prev !== openIndex) {
      gsap.to(images.current[prev], { autoAlpha: 0, scale: 0.6, rotate: 0, duration: 0.25, ease: 'power2.in', overwrite: true });
    }
    if (openIndex !== null) {
      gsap.fromTo(
        images.current[openIndex],
        { autoAlpha: 0, yPercent: 10, scale: 0.4, rotate: -6 },
        { autoAlpha: 1, yPercent: -55, scale: 1, rotate: 8, duration: 1.1, delay: 0.15, ease: 'elastic.out(1, 0.55)', overwrite: true }
      );
    }
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => e.key === 'Escape' && setOpenIndex(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  return (
    <section className="section services" id="what-i-do" aria-labelledby="services-title" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="services-title" label={label} watermark={watermark} />

        <ul className="services__list" ref={list}>
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <li
                key={item.title}
                className={`service${open ? ' is-open' : ''}${instantClose === i ? ' is-instant' : ''}`}
                onPointerEnter={rowEnter(i)}
                onPointerLeave={rowLeave(i)}
              >
                <div className="service__image" ref={(el) => (images.current[i] = el)}>
                  {item.image ? (
                    <Media src={imageUrl('services', item.image)} alt={`Example of ${item.title.toLowerCase()} work`} />
                  ) : (
                    (() => {
                      const Illustration = illustrations[item.illustration];
                      return Illustration ? <Illustration /> : null;
                    })()
                  )}
                </div>

                <h3 className="service__heading" onPointerEnter={headingEnter(i)}>
                  <button
                    type="button"
                    className="service__trigger"
                    id={`service-trigger-${i}`}
                    aria-expanded={open}
                    aria-controls={`service-panel-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="service__title">{item.title}</span>
                    <span className="service__icon" aria-hidden="true">
                      {open ? <Close size={18} /> : <ArrowUpRight size={30} />}
                    </span>
                    {open && <span className="sr-only">({close})</span>}
                  </button>
                </h3>

                <div className="service__panel" id={`service-panel-${i}`} role="region" aria-labelledby={`service-trigger-${i}`}>
                  <div className="service__panel-inner">
                    <p className="service__desc">{item.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
