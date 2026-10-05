import { usePageTransition } from '../../layout/PageTransition/PageTransition';
import { projectImage } from '../../../utils/images';
import { ArrowUpRight } from '../Icons/Icons';
import Media from '../Media/Media';
import TagPill from '../TagPill/TagPill';
import './ProjectCard.css';

export default function ProjectCard({ project, headingLevel = 3 }) {
  const go = usePageTransition();
  const { slug, title, summary, category, tags = [], images = [] } = project;
  const href = `/work/${slug}`;
  const Heading = `h${headingLevel}`;

  const open = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow "open in new tab"
    e.preventDefault();
    go(href);
  };

  return (
    <article className="project-card">
      <a className="project-card__link" href={href} onClick={open}>
        <div className="project-card__media">
          <Media {...projectImage(images[0])} alt={`Preview of the ${title} project`} className="project-card__img" />
          <span className="project-card__badge">{category}</span>
          <span className="project-card__go" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <Heading className="project-card__title">
          {title}
          {summary && <span className="project-card__summary"> — {summary}</span>}
        </Heading>
      </a>
      {tags.length > 0 && (
        <ul className="project-card__tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>
              <TagPill>{tag}</TagPill>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
