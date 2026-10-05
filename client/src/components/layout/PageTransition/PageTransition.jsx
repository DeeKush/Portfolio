import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../../utils/motion';
import { useSmoothScroll } from '../SmoothScroll/SmoothScroll';
import './PageTransition.css';

const PageTransitionContext = createContext(() => {});

// go('/work/closet-iq') or go('/', { target: '#work' }) to land on a section.
export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({ children }) {
  const panel = useRef(null);
  const busy = useRef(false);
  const pendingTarget = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  // Every route change (including browser back/forward) starts at the top.
  useEffect(() => {
    scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (pendingTarget.current) {
        scrollTo(pendingTarget.current, { immediate: true });
        pendingTarget.current = null;
      }
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const go = useCallback(
    (to, { target = null } = {}) => {
      if (busy.current) return;
      pendingTarget.current = target;

      if (prefersReducedMotion()) {
        navigate(to);
        return;
      }

      busy.current = true;
      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .set(panel.current, { yPercent: 100, autoAlpha: 1 })
        .to(panel.current, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' })
        .add(() => navigate(to))
        .to(panel.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.25 })
        .set(panel.current, { autoAlpha: 0 });
    },
    [navigate]
  );

  return (
    <PageTransitionContext.Provider value={go}>
      {children}
      <div ref={panel} className="page-transition" aria-hidden="true" />
    </PageTransitionContext.Provider>
  );
}
