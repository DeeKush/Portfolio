import './TagPill.css';

export default function TagPill({ children, tone = 'grey' }) {
  return <span className={`tag-pill tag-pill--${tone}`}>{children}</span>;
}
