import Frame from './Frame';
import c from './palette';

// Natural-language search with result cards and an API-key fallback badge.
export default function AISearchIllustration() {
  const cards = [
    { x: 16, fill: c.blue, soft: c.blueSoft },
    { x: 117, fill: c.coral, soft: c.coralSoft },
    { x: 218, fill: c.mint, soft: c.mintSoft },
  ];

  return (
    <Frame title="Illustration of AI search finding results from a natural-language query, with an API fallback">
      {/* search bar */}
      <rect x="16" y="14" width="288" height="36" rx="18" fill={c.white} stroke={c.ink} strokeWidth="1.5" />
      <circle cx="37" cy="30" r="6" fill="none" stroke={c.ink} strokeWidth="1.8" />
      <path d="M41.5 34.5 L46 39" stroke={c.ink} strokeWidth="1.8" strokeLinecap="round" />
      <text x="54" y="36" fontSize="12" fontWeight="500" fill={c.ink}>
        that reel with the pasta recipe
      </text>
      <rect x="235" y="25" width="1.5" height="14" fill={c.ink} />
      <rect x="258" y="22" width="36" height="16" rx="8" fill={c.yellow} />
      <text x="276" y="33.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={c.ink}>AI</text>

      {/* result cards */}
      {cards.map(({ x, fill, soft }, i) => (
        <g key={x}>
          <rect x={x} y="64" width="86" height="104" rx="8" fill={soft} stroke={i === 0 ? c.ink : 'none'} strokeWidth="1.5" />
          <rect x={x + 7} y="71" width="72" height="54" rx="5" fill={fill} />
          {/* play glyph: these are reels */}
          <path d={`M${x + 38} ${88} l12 10 l-12 10 z`} fill={c.white} />
          <rect x={x + 7} y="134" width="58" height="6" rx="3" fill={c.ink} opacity="0.75" />
          <rect x={x + 7} y="146" width="40" height="5" rx="2.5" fill={c.line} />
          <text x={x + 79} y="160" textAnchor="end" fontSize="8" fontWeight="700" fill={c.ink} opacity="0.6">
            {['98%', '91%', '84%'][i]}
          </text>
        </g>
      ))}

      {/* fallback badge */}
      <rect x="16" y="180" width="196" height="26" rx="13" fill={c.white} stroke={c.line} strokeWidth="1.5" />
      <text x="28" y="197" fontSize="9.5" fontWeight="700" fill={c.ink}>fallback</text>
      <rect x="74" y="186" width="44" height="14" rx="7" fill={c.soft} />
      <text x="96" y="196" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#9A9A9A" textDecoration="line-through">
        key 1
      </text>
      <path d="M124 193 h14 m-4 -4 l4 4 l-4 4" fill="none" stroke={c.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="144" y="186" width="58" height="14" rx="7" fill={c.mint} />
      <text x="173" y="196" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={c.ink}>key 2 ✓</text>
    </Frame>
  );
}
