import Frame from './Frame';
import c from './palette';

const CODE = [
  [{ t: 'vector', k: 'type' }, { t: '<int> adj[N];' }],
  [{ t: 'void', k: 'kw' }, { t: ' ' }, { t: 'dfs', k: 'fn' }, { t: '(int u) {' }],
  [{ t: '  seen[u] = ' }, { t: 'true', k: 'kw' }, { t: ';' }],
  [{ t: '  for', k: 'kw' }, { t: ' (int v : adj[u])' }],
  [{ t: '    if', k: 'kw' }, { t: ' (!seen[v]) ' }, { t: 'dfs', k: 'fn' }, { t: '(v);' }],
  [{ t: '}' }],
];
const TOKEN = { kw: '#3B7DD8', fn: '#D9603F', type: '#2E9C76' };

const NODES = [
  [234, 58, c.blue],
  [288, 50, c.coral],
  [262, 108, c.yellow],
  [226, 160, c.mint],
  [290, 164, c.blue],
];
const EDGES = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 4],
];

// A C++ editor running DFS next to the graph it walks.
export default function ProblemSolvingIllustration() {
  return (
    <Frame title="Illustration of a C++ depth-first search next to a graph of connected nodes">
      {/* editor */}
      <rect x="12" y="14" width="186" height="192" rx="10" fill={c.white} stroke={c.line} strokeWidth="1.5" />
      <path d="M12 24 a10 10 0 0 1 10 -10 h166 a10 10 0 0 1 10 10 v10 h-186 z" fill={c.soft} />
      <circle cx="24" cy="24" r="3.5" fill={c.coral} />
      <circle cx="35" cy="24" r="3.5" fill={c.yellow} />
      <circle cx="46" cy="24" r="3.5" fill={c.mint} />
      <text x="105" y="27" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={c.ink} opacity="0.6">
        dfs.cpp
      </text>

      {/* highlighted current line */}
      <rect x="13" y="82" width="184" height="16" fill={c.yellowSoft} />

      <g fontFamily="ui-monospace, Consolas, 'Courier New', monospace" fontSize="9.5">
        {CODE.map((line, i) => (
          <g key={i}>
            <text x="22" y={52 + i * 18} fill="#B0B0B0">
              {i + 1}
            </text>
            <text x="36" y={52 + i * 18} fill={c.ink} xmlSpace="preserve">
              {line.map((tok, j) => (
                <tspan key={j} fill={TOKEN[tok.k] ?? c.ink} fontWeight={tok.k ? 700 : 400}>
                  {tok.t}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </g>
      <rect x="22" y="168" width="64" height="16" rx="8" fill={c.mintSoft} />
      <text x="54" y="179" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#2E9C76">
        ✓ Accepted
      </text>

      {/* graph */}
      {EDGES.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke={c.ink} strokeWidth="1.5" opacity="0.55" />
      ))}
      {NODES.map(([x, y, fill], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="13" fill={fill} stroke={c.ink} strokeWidth="1.5" />
          <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill={c.ink}>
            {i + 1}
          </text>
        </g>
      ))}
    </Frame>
  );
}
