import { useId, useState } from 'react';
export function Ball({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="#f5f2e7" stroke="#163b30" strokeWidth="2" />
      <path
        d="m50 30 19 14-7 23H38l-7-23zM21 13l6 18-20 9M79 13l-6 18 20 9M4 64l20-1 7 23M96 64l-20-1-7 23M35 94l15-14 15 14"
        fill="#163b30"
      />
      <path
        d="M50 30V3M31 44 12 32M38 67 25 86M62 67l13 19M69 44l19-12"
        stroke="#163b30"
        strokeWidth="2"
      />
    </svg>
  );
}
export function Stadium() {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className="stadium-art"
      viewBox="0 0 760 670"
      role="img"
      aria-label="An original illustrated soccer stadium under the floodlights"
    >
      <defs>
        <linearGradient id={`${id}pitch`} x2="0" y2="1">
          <stop stopColor="#5e9671" />
          <stop offset="1" stopColor="#2f674b" />
        </linearGradient>
        <radialGradient id={`${id}light`}>
          <stop stopColor="#e1ffc0" stopOpacity=".55" />
          <stop offset="1" stopColor="#e1ffc0" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}seats`} width="15" height="13" patternUnits="userSpaceOnUse">
          <rect width="7" height="4" rx="1" fill="#8bad79" opacity=".45" />
        </pattern>
      </defs>
      <ellipse cx="418" cy="468" rx="308" ry="151" fill="#071d18" opacity=".4" />
      <path d="m62 359 351-204 304 176v71L365 608 62 432Z" fill="#1a3d32" />
      <path d="m62 359 351-204 304 176-352 205Z" fill="#41614b" />
      <path d="m78 350 335-193 286 166-335 194Z" fill={`url(#${id}seats)`} />
      <path d="m122 362 289-168 247 144-290 168Z" fill="#0f3429" />
      <path d="m146 365 265-153 223 129-267 155Z" fill={`url(#${id}pitch)`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`m${146 + i * 44} ${365 - i * 25.5} 22-12.75 223 129-22 12.75Z`}
          fill="#a9cb88"
          opacity=".12"
        />
      ))}
      <g fill="none" stroke="#d9e6bb" strokeWidth="1.5" opacity=".85">
        <path d="m164 365 247-142 205 119-249 143Z" />
        <path d="m287 294 205 119" />
        <ellipse cx="390" cy="354" rx="46" ry="26" transform="rotate(30 390 354)" />
        <path d="m185 353 56 32 68-39-56-33M470 256l-56 32 68 39 56-33M210 339l26 15 22-13-26-15M489 270l-26 15 22 13 26-15" />
      </g>
      <g fill="#d9e6bb">
        <circle cx="390" cy="354" r="3" />
        <circle cx="264" cy="365" r="2" />
        <circle cx="516" cy="342" r="2" />
      </g>
      <g stroke="#e8ebd6" fill="none" strokeWidth="3">
        <path d="m184 353-1-31 45-26 1 31M183 322l-12-7 1 31 12 7M228 296l-12-7-45 26M216 289v30" />
        <path d="m552 323 1-31-45-26-1 31M553 292l12-7-1 31-12 7M508 266l12-7 45 26M520 259v30" />
      </g>
      {[
        [297, 359],
        [351, 320],
        [413, 395],
        [462, 344],
        [398, 292],
      ].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x + 1} cy={y + 16} rx="11" ry="5" fill="#102e23" opacity=".5" />
          <circle cx={x} cy={y - 6} r="6" fill="#efc4a0" />
          <path d={`m${x - 7} ${y + 1} 14 0-2 17-10 0Z`} fill={i % 2 ? '#f4e9cb' : '#c9f271'} />
          <path d={`m${x - 3} ${y + 18}-1 8m8-8 1 8`} stroke="#16362a" strokeWidth="4" />
        </g>
      ))}
      <circle cx="363" cy="368" r="5" fill="#f3f0dd" />
      <g stroke="#819b80" strokeWidth="5">
        <path d="M109 356V171M656 369V160M384 182V45" />
      </g>
      {[
        [109, 171],
        [656, 160],
        [384, 45],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`m${x - 34} ${y - 11} 60-16 11 24-59 16Z`} fill="#b6c5a2" />
          <path d={`m${x - 28} ${y - 7} 49-13 5 12-49 13Z`} fill="#f5ffd4" />
          <ellipse cx={x} cy={y + 15} rx="130" ry="95" fill={`url(#${id}light)`} />
        </g>
      ))}
      <path d="m97 437 265 152 344-199" stroke="#7a9a62" strokeWidth="2" fill="none" />
      <g fill="#c3e496" opacity=".5">
        <circle cx="537" cy="113" r="2" />
        <circle cx="629" cy="249" r="3" />
        <circle cx="203" cy="215" r="2" />
        <circle cx="313" cy="96" r="2" />
      </g>
    </svg>
  );
}
const spots = [
  {
    name: 'Center spot',
    x: 50,
    y: 50,
    text: 'Kick-offs start each half and restart play after a goal.',
  },
  {
    name: 'Penalty area',
    x: 50,
    y: 83,
    text: 'The goalkeeper may handle the ball in their own penalty area, with special restrictions.',
  },
  {
    name: 'Goal line',
    x: 73,
    y: 95,
    text: 'A goal counts when the whole ball crosses this line between the posts and under the crossbar.',
  },
  {
    name: 'Sideline',
    x: 4,
    y: 38,
    text: 'When the whole ball crosses a sideline, play restarts with a throw-in.',
  },
];
const players = [
  {
    name: 'Goalkeeper',
    x: 50,
    y: 87,
    text: 'Protects the goal. Can handle the ball in their own penalty area.',
  },
  { name: 'Defender', x: 28, y: 68, text: 'Protects space and helps stop the other team scoring.' },
  {
    name: 'Midfielder',
    x: 60,
    y: 46,
    text: 'Connects defense and attack with movement and passes.',
  },
  { name: 'Forward', x: 40, y: 21, text: 'Finds space, creates chances, and tries to score.' },
];
export function Field({ positions = false }: { positions?: boolean }) {
  const [active, setActive] = useState(0);
  const points = positions ? players : spots;
  return (
    <div className="field-widget">
      <div
        className="field"
        aria-label={positions ? 'Interactive soccer positions' : 'Interactive field diagram'}
      >
        <div className="field-lines">
          <i className="half-line" />
          <i className="center-circle" />
          <i className="box top" />
          <i className="box bottom" />
          <i className="goal top" />
          <i className="goal bottom" />
        </div>
        <span className="attack-label">ATTACK ↑</span>
        {points.map((p, i) => (
          <button
            key={p.name}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`field-dot ${i === active ? 'selected' : ''}`}
            onClick={() => setActive(i)}
            aria-label={p.name}
            aria-pressed={active === i}
          >
            {positions ? ['1', '4', '8', '9'][i] : '+'}
          </button>
        ))}
      </div>
      <div className="field-caption" aria-live="polite">
        <strong>{points[active].name}</strong>
        <p>{points[active].text}</p>
      </div>
    </div>
  );
}
export function SkillArt({
  kind = 'dribble',
  animated = false,
}: {
  kind?: string;
  animated?: boolean;
}) {
  return (
    <svg
      className={`skill-art ${animated ? 'animated' : ''}`}
      viewBox="0 0 500 310"
      role="img"
      aria-label={`Original illustrated ${kind} movement sequence`}
    >
      <defs>
        <pattern id={`grid-${kind}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="currentColor" strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="500" height="310" fill={`url(#grid-${kind})`} />
      <ellipse cx="260" cy="242" rx="155" ry="24" fill="#173b2e" opacity=".12" />
      <path
        d="M65 258Q230 120 420 209"
        stroke="#7e9e68"
        strokeWidth="2"
        strokeDasharray="7 8"
        fill="none"
      />
      {kind === 'dribble' ? (
        [105, 180, 330, 405].map((x, i) => (
          <g key={x} transform={`translate(${x} ${215 - (i % 2) * 32})`}>
            <ellipse cy="8" rx="18" ry="5" fill="#bc8860" opacity=".3" />
            <path d="m0-27-12 33h24Z" fill="#e9ac6d" />
            <path d="m-6-9 12 0" stroke="#fff0d7" strokeWidth="5" />
          </g>
        ))
      ) : kind === 'shoot' ? (
        <g stroke="#c1cfb6" fill="none">
          <path d="M350 100h110v118H350Z" strokeWidth="5" />
          {[370, 390, 410, 430, 450].map((x) => (
            <path key={x} d={`M${x} 100v118`} />
          ))}
          {[120, 140, 160, 180, 200].map((y) => (
            <path key={y} d={`M350 ${y}h110`} />
          ))}
        </g>
      ) : (
        <g fill="none" stroke="#8fa77e" strokeWidth="2">
          <circle cx="397" cy="204" r="38" />
          <circle cx="397" cy="204" r="24" />
          <circle cx="397" cy="204" r="9" />
        </g>
      )}
      <g className="illustrated-player">
        <path
          d="m241 161-24 43-43 16"
          stroke="#cb956d"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="m258 162 23 36 37 22"
          stroke="#e8b58c"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="m217 201-10 18-30 7"
          stroke="#163c30"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="m283 200 27 18 18 0"
          stroke="#163c30"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="m229 99-16 29-26 7m79-34 19 20 25-9"
          fill="none"
          stroke="#e8b58c"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path d="m230 92 35 1 9 69-51 0Z" fill="#c5ed79" />
        <path d="m223 154 51 0-4 24-24-3-25-1Z" fill="#153c30" />
        <text x="246" y="132" textAnchor="middle" fill="#204631" fontSize="25" fontWeight="900">
          10
        </text>
        <circle cx="247" cy="70" r="21" fill="#e8b58c" />
        <path d="M227 68q-1-27 23-22 23 1 18 23l-10-13-12 4-14-3Z" fill="#17372c" />
      </g>
      <g className={`demo-ball ${kind}`} transform="translate(320 231)">
        <circle r="17" fill="#f6f3e5" stroke="#234b38" strokeWidth="1.5" />
        <path d="m0-9 8 6-3 10H-5L-8-3Z" fill="#234b38" />
        <path
          d="m0-17 0 8m17 9-9-3M-17 0l9-3m-2 17 5-7m15 7L5 7"
          stroke="#234b38"
          strokeWidth="2"
        />
      </g>
      <text x="29" y="32" fill="currentColor" opacity=".5" fontSize="11" letterSpacing="2">
        SKILL LAB / {kind.toUpperCase()}
      </text>
    </svg>
  );
}
