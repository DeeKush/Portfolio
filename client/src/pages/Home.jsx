import { useEffect } from 'react';
import profile from '../data/profile';
import projects from '../data/projects';
import Navbar from '../components/layout/Navbar/Navbar';
import Hero from '../components/sections/Hero/Hero';
import SelectedWork from '../components/sections/SelectedWork/SelectedWork';
import WhatIDo from '../components/sections/WhatIDo/WhatIDo';
import Journey from '../components/sections/Journey/Journey';
import ContactCTA from '../components/sections/ContactCTA/ContactCTA';

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name.first} ${profile.name.last} | ${profile.role}`;
  }, []);

  const counts = {
    projects: projects.length,
    whatIDo: profile.whatIDo.items.length,
    journey: profile.journey.items.length,
  };

  return (
    <>
      <Navbar counts={counts} />
      <main id="main">
        <Hero />
        <SelectedWork />
        <WhatIDo />
        <Journey />
        <ContactCTA />
      </main>
    </>
  );
}
