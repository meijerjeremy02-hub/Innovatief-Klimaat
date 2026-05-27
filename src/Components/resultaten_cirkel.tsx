import { useState } from 'react'

const dims = [
  { label: 'Vrijheid',                 short: 'Vrijheid',         dark: false },
  { label: 'Ideesupport',              short: 'Ideesupport',      dark: true  },
  { label: 'Vertrouwen &\nopenheid',   short: 'Vertrouwen',       dark: false },
  { label: 'Dynamiek &\nlevendigheid', short: 'Dynamiek',         dark: true  },
  { label: 'Speelsheid &\n humor',     short: 'Speelsheid',       dark: false },
  { label: 'Dialoog',                  short: 'Dialoog',          dark: true  },
  { label: 'Risico nemen',             short: 'Risico nemen',     dark: false },
  { label: 'Tijd voor\nideeën',        short: 'Tijd voor ideeën', dark: true  },
  { label: 'Conflict',                 short: 'Conflict',         dark: false },
  { label: 'Uitdaging',                short: 'Uitdaging',        dark: true  },
]

const LIGHT = '#B8B4D8'
const DARK = '#7B77A8'
const LIGHT_H = '#A09CC8'
const DARK_H = '#5B5790'

const cx = 300
const cy = 300

const OR = 235
const IR = 90

const PUSH = 26
const N = dims.length
const STEP = (2 * Math.PI) / N

function pt(r: number, a: number): [number, number] {
  return [
    cx + r * Math.cos(a),
    cy + r * Math.sin(a),
  ]
}

function arc(sa: number, ea: number, r1: number, r2: number) {
  const [x1, y1] = pt(r2, sa)
  const [x2, y2] = pt(r2, ea)
  const [x3, y3] = pt(r1, ea)
  const [x4, y4] = pt(r1, sa)
  const lg = ea - sa > Math.PI ? 1 : 0

  return `
    M ${x1} ${y1}
    A ${r2} ${r2} 0 ${lg} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${r1} ${r1} 0 ${lg} 0 ${x4} ${y4}
    Z
  `
}

function scoreCol(score: number) {
  if (score >= 21) return '#16a34a'
  if (score >= 16) return '#65a30d'
  if (score >= 11) return '#ca8a04'
  if (score >= 6) return '#ea580c'
  return '#dc2626'
}

interface Props {
  scores?: number[]
}

export default function InnovatieCircel({
  scores = [18, 15, 20, 12, 22, 17, 8, 19, 14, 21],
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  const labelR = (IR + OR) / 2

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <svg
        viewBox="0 0 600 600"
        className="w-162.5 max-w-full overflow-visible"
      >
        {dims.map((d, i) => {
          const sa = i * STEP - Math.PI / 2
          const ea = (i + 1) * STEP - Math.PI / 2
          const ma = (sa + ea) / 2

          const tx = Math.cos(ma) * PUSH
          const ty = Math.sin(ma) * PUSH

          const isHovered = hovered === i

          const base = d.dark ? DARK : LIGHT
          const hover = d.dark ? DARK_H : LIGHT_H

          const [lx, ly] = pt(labelR, ma)
          const lines = d.label.split('\n')

          return (
            <g
              key={i}
              transform={`translate(${isHovered ? tx : 0} ${isHovered ? ty : 0})`}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <path
                d={arc(sa, ea, IR, OR)}
                fill={isHovered ? hover : base}
                stroke="white"
                strokeWidth={3}
              />

              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={d.dark ? '#2e2a5e' : '#3c3889'}
                className="select-none pointer-events-none"
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {lines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={lx}
                    dy={
                      lineIndex === 0
                        ? `${-(lines.length - 1) * 0.6}em`
                        : '1.25em'
                    }
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}

        <circle
          cx={cx}
          cy={cy}
          r={IR - 2}
          fill="white"
        />

        {hovered !== null ? (
          <>
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: '48px',
                fontWeight: 800,
                fill: scoreCol(scores[hovered]),
              }}
            >
              {scores[hovered]}
            </text>

            <text
              x={cx}
              y={cy + 28}
              textAnchor="middle"
              style={{
                fontSize: '13px',
                fill: '#555',
                fontWeight: 600,
              }}
            >
              {dims[hovered].short}
            </text>

            <text
              x={cx}
              y={cy + 46}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#1f2937',
              }}
            >
              /25
            </text>
          </>
        ) : (
          <>
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: '48px',
                fontWeight: 800,
                fill: '#f97316',
              }}
            >
              10
            </text>

            <text
              x={cx}
              y={cy + 24}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#1f2937',
              }}
            >
              Dimensies van
            </text>

            <text
              x={cx}
              y={cy + 42}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#1f2937',
              }}
            >
              een innovatief
            </text>

            <text
              x={cx}
              y={cy + 60}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fill: '#1f2937',
              }}
            >
              klimaat
            </text>
          </>
        )}
      </svg>

      <p className="mt-4 min-h-6 text-base font-medium text-gray-900">
        {hovered !== null
          ? `${dims[hovered].short}: ${scores[hovered]}/25`
          : ''}
      </p>
    </div>
  )
}