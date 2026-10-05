import './Media.css';

// An image, or a neutral grey placeholder when there is no src yet.
export default function Media({ src, alt, className = '', fit, bg }) {
  if (src) {
    const style = fit || bg ? { objectFit: fit, background: bg } : undefined;
    return <img className={`media ${className}`} src={src} alt={alt} loading="lazy" style={style} />;
  }
  return (
    <div className={`media media--placeholder ${className}`} role="img" aria-label={`${alt} (image coming soon)`}>
      <span aria-hidden="true">Image coming soon</span>
    </div>
  );
}
