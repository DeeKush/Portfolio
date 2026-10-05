import { useLayoutEffect, useRef, useState } from 'react';
import profile from '../../../data/profile';
import { gsap, prefersReducedMotion } from '../../../utils/motion';
import PillButton from '../../ui/PillButton/PillButton';
import StatusPill from '../../ui/StatusPill/StatusPill';
import ContactModal from './ContactModal';
import './ContactCTA.css';

export default function ContactCTA() {
  const { contact, status } = profile;
  const [open, setOpen] = useState(false);
  const inner = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current.children, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform', // lets the button's hover lift work afterwards
        scrollTrigger: { trigger: inner.current, start: 'top 85%' },
      });
    }, inner);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact-cta" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact-cta__inner" ref={inner}>
        <StatusPill>{status}</StatusPill>
        <h2 className="contact-cta__title" id="contact-title">
          {contact.heading}
        </h2>
        <p className="contact-cta__text">{contact.text}</p>
        <PillButton onClick={() => setOpen(true)} aria-haspopup="dialog">
          {contact.button}
        </PillButton>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
