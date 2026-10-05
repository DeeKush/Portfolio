import { useId } from 'react';

// Common 320x220 canvas with an accessible title.
export default function Frame({ title, children }) {
  const id = useId();
  return (
    <svg viewBox="0 0 320 220" width="100%" role="img" aria-labelledby={id} style={{ display: 'block' }}>
      <title id={id}>{title}</title>
      <rect width="320" height="220" fill="#fff" />
      {children}
    </svg>
  );
}
