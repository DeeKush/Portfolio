import { FileText, GitHub, LinkedIn, Mail } from '../Icons/Icons';
import './SocialPill.css';

const ICONS = { github: GitHub, linkedin: LinkedIn, email: Mail, resume: FileText };

export default function SocialPill({ id, label, href, external, download }) {
  const Icon = ICONS[id];
  return (
    <a
      className="social-pill"
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...(download && { download: true })}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </a>
  );
}
