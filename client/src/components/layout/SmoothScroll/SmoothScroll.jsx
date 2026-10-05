import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../../utils/motion';

const SmoothScrollContext = createContext({ lenis: null, scrollTo: () => {} });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  // Content that loads late (projects, images) changes the page height; keep trigger positions in sync.
  useEffect(() => {
    let timer;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis();
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // target: a number (px), a selector string or an element.
  const scrollTo = useCallback(
    (target, { immediate = false } = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { immediate, force: true });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'instant' });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'instant' : 'smooth' });
    },
    [lenis]
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
