import { ArrowUpRight } from '../Icons/Icons';
import './PillButton.css';

// Renders an <a> when given href, otherwise a <button>.
export default function PillButton({
  href,
  variant = 'dark',
  arrow = true,
  icon = null,
  external = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button';
  const props = href
    ? { href, ...(external && { target: '_blank', rel: 'noopener noreferrer' }) }
    : { type: 'button' };

  return (
    <Tag className={`pill-button pill-button--${variant} ${className}`} {...props} {...rest}>
      {icon}
      <span>{children}</span>
      {arrow && (
        <span className="pill-button__arrow">
          <ArrowUpRight />
        </span>
      )}
    </Tag>
  );
}
