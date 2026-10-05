import { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import profile from '../data/profile';
import projects from '../data/projects';
import toolIcons from '../data/toolIcons';
import { projectImage } from '../utils/images';
import { gsap, prefersReducedMotion } from '../utils/motion';
import { usePageTransition } from '../components/layout/PageTransition/PageTransition';
import ContactCTA from '../components/sections/ContactCTA/ContactCTA';
import { ArrowLeft, GitHub } from '../components/ui/Icons/Icons';
import Media from '../components/ui/Media/Media';
import PillButton from '../components/ui/PillButton/PillButton';
import ProjectCard from '../components/ui/ProjectCard/ProjectCard';
import StatusPill from '../components/ui/StatusPill/StatusPill';
import TagPill from '../components/ui/TagPill/TagPill';
import NotFound from './NotFound';
import './ProjectDetail.css';

function Detail({ project }) {
  const t = profile.project;
  const root = useRef(null);
  const { title, category, tags = [], description, details, role, timeline, tools = [], liveUrl, githubUrl, codeNote } = project;
  // Always show at least two frames so the layout reads right before screenshots exist.
  const images = project.images?.length ? project.images : [null, null];

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.6, defaults: { ease: 'power3.out' } })
        .fromTo('.detail__letter', { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.035 })
        .fromTo('[data-detail-fade]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.5');

      gsap.utils.toArray('.detail__frame, .detail__text-card').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    }, root);
    return () => ctx.revert();
  }, [project.slug]);

  return (
    <article ref={root}>
      <div className="container detail__intro">
        <div className="detail__main">
          {tags.length > 0 && (
            <ul className="detail__tags" aria-label="Tags" data-detail-fade>
              {tags.map((tag) => (
                <li key={tag}>
                  <TagPill tone="white">{tag}</TagPill>
                </li>
              ))}
            </ul>
          )}
          <h1 className="detail__title">
            <span className="sr-only">{title}</span>
            <span className="detail__title-text" aria-hidden="true">
              {[...title].map((ch, i) => (
                <span className="detail__letter" key={i}>
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
            <span className="detail__category">/{category}</span>
          </h1>
          <p className="detail__desc" data-detail-fade>
            {description}
          </p>
          <div className="detail__actions" data-detail-fade>
            {liveUrl && (
              <PillButton href={liveUrl} external>
                {t.live}
              </PillButton>
            )}
            {githubUrl && (
              <PillButton href={githubUrl} external variant="light" arrow={false} icon={<GitHub />}>
                {t.code}
              </PillButton>
            )}
            {!githubUrl && codeNote && <span className="detail__code-note">{codeNote}</span>}
          </div>
        </div>

        <dl className="detail__meta" data-detail-fade>
          <div>
            <dt>{t.role}</dt>
            <dd>{role || '—'}</dd>
          </div>
          <div>
            <dt>{t.timeline}</dt>
            <dd>{timeline || '—'}</dd>
          </div>
          <div>
            <dt>{t.tools}</dt>
            <dd>
              {tools.length ? (
                <ul className="detail__tools">
                  {tools.map((tool) => {
                    const icon = toolIcons[tool];
                    return (
                      <li key={tool} title={tool} className={icon ? '' : 'detail__tool--text'}>
                        {icon ? (
                          <>
                            <icon.Icon aria-hidden="true" color={icon.color} size={20} />
                            <span className="sr-only">{tool}</span>
                          </>
                        ) : (
                          tool
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                '—'
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="container detail__gallery">
        {images.map((img, i) => (
          <div key={i} className="detail__gallery-item">
            <figure className="detail__frame">
              <Media {...projectImage(img)} alt={`${title} screenshot ${i + 1} of ${images.length}`} />
            </figure>
            {i === 0 && details && (
              <div className="detail__text-card">
                <h2>{t.about}</h2>
                <p>{details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const go = usePageTransition();
  const { work, project: t } = profile;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (project) document.title = `${project.title} | ${profile.name.first} ${profile.name.last}`;
  }, [project]);

  if (!project) return <NotFound />;

  // The next two projects after this one, wrapping around.
  const more = [1, 2].map((k) => projects[(index + k) % projects.length]).filter((p) => p.slug !== slug);

  const back = (e) => {
    e.preventDefault();
    go('/', { target: '#work' });
  };

  return (
    <div className="detail-page">
      <header className="detail-topbar">
        <PillButton href="/" onClick={back} variant="light" arrow={false} icon={<ArrowLeft />}>
          {t.back}
        </PillButton>
        <StatusPill>{profile.status}</StatusPill>
      </header>

      <main id="main">
        {/* key restarts the entrance animation when moving between projects */}
        <Detail project={project} key={project.slug} />

        {more.length > 0 && (
          <section className="detail__more" aria-labelledby="more-title">
            <div className="container">
              <h2 className="detail__more-title" id="more-title">
                {work.more}
              </h2>
              <div className="work__grid">
                {more.map((p) => (
                  <div className="work__item" key={p.slug}>
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactCTA />
      </main>
    </div>
  );
}
