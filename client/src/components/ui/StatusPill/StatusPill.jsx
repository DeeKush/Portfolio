import './StatusPill.css';

export default function StatusPill({ children, className = '', ...rest }) {
  return (
    <p className={`status-pill ${className}`} {...rest}>
      <span className="status-pill__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
