import Frame from './Frame';
import c from './palette';

// Browser window (sidebar, list, form) wired to a server and a database.
export default function FullStackIllustration() {
  return (
    <Frame title="Illustration of a full stack web app connected to a server and a database">
      {/* connections */}
      <path d="M224 78 H238 V58 H252" fill="none" stroke={c.ink} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M276 84 V128" fill="none" stroke={c.ink} strokeWidth="1.5" strokeDasharray="4 3" />

      {/* browser */}
      <rect x="12" y="14" width="212" height="192" rx="10" fill={c.white} stroke={c.line} strokeWidth="1.5" />
      <path d="M12 24 a10 10 0 0 1 10 -10 h192 a10 10 0 0 1 10 10 v10 h-212 z" fill={c.soft} />
      <circle cx="24" cy="24" r="3.5" fill={c.coral} />
      <circle cx="35" cy="24" r="3.5" fill={c.yellow} />
      <circle cx="46" cy="24" r="3.5" fill={c.mint} />
      <rect x="64" y="19" width="140" height="10" rx="5" fill={c.white} stroke={c.line} />

      {/* sidebar */}
      <rect x="20" y="42" width="40" height="156" rx="6" fill={c.blueSoft} />
      {[54, 68, 82, 96].map((y, i) => (
        <rect key={y} x="27" y={y} width={i === 0 ? 26 : 20} height="6" rx="3" fill={i === 0 ? c.blue : '#BFD6F3'} />
      ))}

      {/* list */}
      {[
        [44, c.coral],
        [66, c.yellow],
        [88, c.mint],
      ].map(([y, dot]) => (
        <g key={y}>
          <rect x="70" y={y} width="144" height="16" rx="4" fill={c.white} stroke={c.line} />
          <circle cx="80" cy={y + 8} r="4" fill={dot} />
          <rect x="90" y={y + 5.5} width="70" height="5" rx="2.5" fill={c.line} />
        </g>
      ))}

      {/* form */}
      <rect x="70" y="116" width="144" height="82" rx="6" fill={c.soft} />
      <rect x="78" y="126" width="128" height="14" rx="4" fill={c.white} stroke={c.line} />
      <rect x="78" y="148" width="128" height="14" rx="4" fill={c.white} stroke={c.line} />
      <rect x="78" y="172" width="56" height="16" rx="8" fill={c.blue} />
      <rect x="88" y="178" width="36" height="4" rx="2" fill={c.white} />

      {/* server */}
      <rect x="252" y="36" width="48" height="48" rx="7" fill={c.white} stroke={c.ink} strokeWidth="1.5" />
      <rect x="259" y="44" width="34" height="12" rx="3" fill={c.coralSoft} stroke={c.coral} />
      <rect x="259" y="62" width="34" height="12" rx="3" fill={c.coralSoft} stroke={c.coral} />
      <circle cx="286" cy="50" r="2" fill={c.mint} />
      <circle cx="286" cy="68" r="2" fill={c.mint} />
      <text x="276" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill={c.ink}>server</text>

      {/* database */}
      <path d="M254 136 v34 a22 7 0 0 0 44 0 v-34" fill={c.yellowSoft} stroke={c.ink} strokeWidth="1.5" />
      <ellipse cx="276" cy="136" rx="22" ry="7" fill={c.yellow} stroke={c.ink} strokeWidth="1.5" />
      <path d="M254 153 a22 7 0 0 0 44 0" fill="none" stroke={c.ink} strokeWidth="1" />
      <text x="276" y="196" textAnchor="middle" fontSize="9" fontWeight="600" fill={c.ink}>database</text>
    </Frame>
  );
}
