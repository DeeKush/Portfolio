import { useEffect } from 'react';
import profile from '../data/profile';
import { usePageTransition } from '../components/layout/PageTransition/PageTransition';
import PillButton from '../components/ui/PillButton/PillButton';
import StatusPill from '../components/ui/StatusPill/StatusPill';
import './NotFound.css';

export default function NotFound() {
  const go = usePageTransition();
  const { errors } = profile;

  useEffect(() => {
    document.title = `404 | ${profile.name.first} ${profile.name.last}`;
  }, []);

  return (
    <main id="main" className="not-found">
      <StatusPill>{profile.status}</StatusPill>
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">{errors.notFound}</p>
      <PillButton
        href="/"
        onClick={(e) => {
          e.preventDefault();
          go('/');
        }}
      >
        {errors.home}
      </PillButton>
    </main>
  );
}
