import Frame from './Frame';
import c from './palette';

function Phone({ x, children }) {
  return (
    <g>
      <rect x={x} y="10" width="100" height="200" rx="18" fill={c.ink} />
      <rect x={x + 5} y="15" width="90" height="190" rx="14" fill={c.white} />
      <rect x={x + 36} y="20" width="28" height="7" rx="3.5" fill={c.ink} />
      {children}
    </g>
  );
}

// Two phones: a chat screen and a list screen.
export default function MobileIllustration() {
  const a = 52; // left phone x
  const b = 168; // right phone x

  return (
    <Frame title="Illustration of a cross-platform mobile app with a chat screen and a list screen">
      <Phone x={a}>
        <rect x={a + 5} y="32" width="90" height="20" fill={c.blueSoft} />
        <circle cx={a + 18} cy="42" r="6" fill={c.blue} />
        <rect x={a + 28} y="39" width="36" height="6" rx="3" fill={c.ink} opacity="0.7" />
        {/* chat bubbles */}
        <rect x={a + 12} y="62" width="52" height="18" rx="9" fill={c.soft} />
        <rect x={a + 36} y="86" width="52" height="18" rx="9" fill={c.blue} />
        <rect x={a + 12} y="110" width="62" height="26" rx="10" fill={c.soft} />
        <rect x={a + 44} y="142" width="44" height="18" rx="9" fill={c.blue} />
        {/* composer */}
        <rect x={a + 11} y="176" width="64" height="18" rx="9" fill={c.white} stroke={c.line} />
        <circle cx={a + 84} cy="185" r="8" fill={c.coral} />
        <path d={`M${a + 81} 185 h6 m-2.5 -2.5 l2.5 2.5 l-2.5 2.5`} stroke={c.white} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </Phone>

      <Phone x={b}>
        <rect x={b + 5} y="32" width="90" height="26" fill={c.coral} />
        <rect x={b + 13} y="42" width="44" height="7" rx="3.5" fill={c.white} />
        {[
          [68, c.yellow],
          [98, c.mint],
          [128, c.blue],
          [158, c.coral],
        ].map(([y, fill]) => (
          <g key={y}>
            <rect x={b + 11} y={y} width="78" height="24" rx="6" fill={c.white} stroke={c.line} />
            <circle cx={b + 23} cy={y + 12} r="7" fill={fill} />
            <rect x={b + 35} y={y + 6} width="40" height="5" rx="2.5" fill={c.ink} opacity="0.7" />
            <rect x={b + 35} y={y + 14} width="26" height="4" rx="2" fill={c.line} />
          </g>
        ))}
        <rect x={b + 34} y="194" width="32" height="3" rx="1.5" fill={c.ink} opacity="0.4" />
      </Phone>
    </Frame>
  );
}
