import { useState } from 'react'

const dims = [
  { id: 1,  label: 'Vrijheid',                 short: 'Vrijheid',          dark: false },
  { id: 2,  label: 'Ideesupport',              short: 'Ideesupport',       dark: true  },
  { id: 3,  label: 'Vertrouwen &\nopenheid',   short: 'Vertrouwen',        dark: false },
  { id: 4,  label: 'Dynamiek &\nlevendigheid', short: 'Dynamiek',          dark: true  },
  { id: 5,  label: 'Speelsheid &\n humor',     short: 'Speelsheid',        dark: false },
  { id: 6,  label: 'Dialoog',                  short: 'Dialoog',           dark: true  },
  { id: 7,  label: 'Risico nemen',             short: 'Risico nemen',      dark: false },
  { id: 8,  label: 'Tijd voor\nideeën',        short: 'Tijd voor ideeën',  dark: true  },
  { id: 9,  label: 'Conflict',                 short: 'Conflict',          dark: false },
  { id: 10, label: 'Uitdaging',                short: 'Uitdaging',         dark: true  },
]

const LIGHT = '#B8B4D8'
const DARK = '#7B77A8'
const LIGHT_H = '#A09CC1'
const DARK_H = '#5B5899'

// Logische Tailwind kleurkoppeling via Hex-waarden
const scoreColor = (score: number) => {
  if (score <= 5)  return '#f97316' // Deltion Oranje (Kritiek / Laag)
  if (score <= 10) return '#eab308' // Warm Goudgeel (Matig)
  if (score <= 15) return '#94a3b8' // Rustig Slate-Grijs (Voldoende / Gemiddeld)
  if (score <= 20) return '#2563eb' // Helder Blauw (Goed)
  return '#1e1b4b'                  // Deep Indigo / Marine (Uitstekend)
}

const dCx = 300
const dCy = 300
const dMaxOr = 260 
const dIr = 90
const dPush = 12 
const dN = dims.length
const dStep = (2 * Math.PI) / dN
const gridScores = [5, 10, 15, 20, 25]

const mWidth = 600
const mHeight = 460
const mCx = 300
const mCy = 415  
const mOr = 265  
const mIr = 135  

function pt(cx: number, cy: number, r: number, a: number): [number, number] {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function arc(cx: number, cy: number, sa: number, ea: number, r1: number, r2: number) {
  const [x1, y1] = pt(cx, cy, r2, sa)
  const [x2, y2] = pt(cx, cy, r2, ea)
  const [x3, y3] = pt(cx, cy, r1, ea)
  const [x4, y4] = pt(cx, cy, r1, sa)
  const lg = ea - sa > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r2} ${r2} 0 ${lg} 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 ${lg} 0 ${x4} ${y4} Z`
}

interface InnovatieKlimaatProps {
  personalScores?: number[]
  teamScores?: number[]
  collegeScores?: number[]
  showIntro?: boolean
}

export default function InnovatieKlimaatWidget({
  personalScores = [19, 16, 22, 14, 24, 18, 9, 20, 15, 22],
  teamScores = [18, 15, 20, 12, 22, 17, 8, 19, 14, 21],
  collegeScores = [15, 14, 17, 13, 19, 16, 11, 15, 13, 17],
}: InnovatieKlimaatProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'team' | 'college'>('team')

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? dims.length - 1 : prev - 1))
  const handleNext = () => setActiveIndex((prev) => (prev === dims.length - 1 ? 0 : prev + 1))

  const visiblePositions = [
    { dIndex: (activeIndex - 1 + dims.length) % dims.length, pos: 0 },
    { dIndex: activeIndex, pos: 1 },
    { dIndex: (activeIndex + 1) % dims.length, pos: 2 }
  ]

  const segmentDegrees = 42 
  const segmentWidth = (segmentDegrees * Math.PI) / 180
  const mStartAngle = -Math.PI / 2 - (segmentWidth * 1.5)

  const rightScoreLabel = viewMode === 'team' ? 'JOUW TEAM' : 'COLLEGE-WIJD'
  const rightScoreValue = viewMode === 'team' ? teamScores[activeIndex] : collegeScores[activeIndex]

  return (
    <>
      {/* LAPTOP LAYOUT */}
      <div className="hidden md:flex flex-col items-center justify-center py-10">
        <svg viewBox="0 0 600 600" className="w-162.5 max-w-full overflow-visible">
          <g opacity="0.35">
            {gridScores.map((gScore) => {
              const r = dIr + ((dMaxOr - dIr) * gScore) / 25
              return (
                <circle
                  key={gScore}
                  cx={dCx}
                  cy={dCy}
                  r={r}
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  strokeDasharray={gScore === 25 ? '0' : '4 4'}
                />
              )
            })}
            {dims.map((_, i) => {
              const angle = i * dStep - Math.PI / 2
              const [xLink, yLink] = pt(dCx, dCy, dMaxOr, angle)
              return (
                <line key={i} x1={dCx} y1={dCy} x2={xLink} y2={yLink} stroke="#9ca3af" strokeWidth={1} />
              )
            })}
          </g>

          {dims.map((d, i) => {
            const score = teamScores[i] ?? 0
            const currentOR = dIr + ((dMaxOr - dIr) * score) / 25
            const sa = i * dStep - Math.PI / 2
            const ea = (i + 1) * dStep - Math.PI / 2
            const ma = (sa + ea) / 2

            const tx = Math.cos(ma) * dPush
            const ty = Math.sin(ma) * dPush
            const isHovered = hovered === i

            const base = d.dark ? DARK : LIGHT
            const hoverColor = d.dark ? DARK_H : LIGHT_H
            const segmentColor = isHovered ? hoverColor : base

            const labelR = (dIr + currentOR) / 2
            const [lx, ly] = pt(dCx, dCy, labelR, ma)
            const lines = d.label.split('\n')

            return (
              <g
                key={i}
                transform={`translate(${isHovered ? tx : 0} ${isHovered ? ty : 0})`}
                className="cursor-pointer transition-all duration-500"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <path d={arc(dCx, dCy, sa, ea, dIr, currentOR)} fill={segmentColor} stroke="white" strokeWidth={2} />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  className="select-none pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] font-bold text-[11px]"
                >
                  {lines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={lx} dy={lineIndex === 0 ? `${-(lines.length - 1) * 0.6}em` : '1.25em'}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          })}

          <circle cx={dCx} cy={dCy} r={dIr - 2} fill="white" />

          {hovered !== null ? (
            <>
              <text 
                x={dCx} 
                y={dCy - 8} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="font-extrabold text-[48px]"
                style={{ fill: scoreColor(teamScores[hovered]) }}
              >
                {teamScores[hovered]}
              </text>
              <text x={dCx} y={dCy + 28} textAnchor="middle" className="text-base font-semibold fill-gray-600">
                {dims[hovered].short}
              </text>
              <text x={dCx} y={dCy + 46} textAnchor="middle" className="text-base fill-gray-800">/25</text>
            </>
          ) : (
            <>
              <text x={dCx} y={dCy - 8} textAnchor="middle" dominantBaseline="middle" className="font-extrabold text-[48px] fill-orange-500">10</text>
              <text x={dCx} y={dCy + 24} textAnchor="middle" className="text-[15px] fill-gray-800 font-semibold">Dimensies van</text>
              <text x={dCx} y={dCy + 42} textAnchor="middle" className="text-[15px] fill-gray-800 font-semibold">een innovatief</text>
              <text x={dCx} y={dCy + 60} textAnchor="middle" className="text-[15px] fill-gray-800 font-semibold">klimaat</text>
            </>
          )}
        </svg>
        <p className="mt-4 min-h-6 text-base font-bold text-gray-900">
          {hovered !== null ? `${dims[hovered].short}: ${teamScores[hovered]}/25` : ''}
        </p>
      </div>

      {/* MOBIEL LAYOUT */}
      <div className="flex md:hidden w-full max-w-md mx-auto flex-col justify-between bg-[#F8FAFC] font-sans text-[#1E254C] relative overflow-hidden select-none rounded-[40px] shadow-2xl border border-slate-100">
        <div className="text-center my-10 p-4 m-10 bg-white border border-gray-200 rounded-4xl shadow-2xl">
          <p className="text-purple-600 font-bold text-sm tracking-widest uppercase">Dimensie {dims[activeIndex].id} van {dims.length}</p>
          <h4 className="text-2xl font-black mt-1 text-[#1E254C] tracking-tight">{dims[activeIndex].label.replace('\n', ' ')}</h4>
        </div>

        <div className="relative w-full flex flex-col justify-end mt-2">
          <div className="absolute top-[10%] left-4 z-30">
            <button onClick={handlePrev} className="bg-white text-gray-700 shadow-lg rounded-full p-4 border border-slate-100 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
          </div>
          <div className="absolute top-[10%] right-4 z-30">
            <button onClick={handleNext} className="bg-white text-gray-700 shadow-lg rounded-full p-4 border border-slate-100 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          <div className="w-full relative z-0 -mb-24 transform translate-y-4 overflow-visible">
            <svg viewBox={`0 0 ${mWidth} ${mHeight}`} className="w-full overflow-visible">
              {visiblePositions.map(({ dIndex, pos }) => {
                const sa = mStartAngle + pos * segmentWidth
                const ea = sa + segmentWidth
                const midAngleDeg = ((sa + ea) / 2 * 180) / Math.PI
                const isActive = pos === 1
                const baseColor = isActive ? '#D9D6EF' : '#EDEBF7'
                const textRadius = (mIr + mOr) / 2

                return (
                  <g key={dIndex} className="transition-all duration-500 ease-out">
                    <path d={arc(mCx, mCy, sa, ea, mIr, mOr)} fill={baseColor} stroke="#F8FAFC" strokeWidth={4} />
                    <g transform={`translate(${mCx}, ${mCy}) rotate(${midAngleDeg + 90}) translate(0, ${-textRadius})`}>
                      <text textAnchor="middle" dominantBaseline="middle" className={`font-black fill-[#1E254C] select-none pointer-events-none ${isActive ? 'text-[15px]' : 'text-[13px]'}`} opacity={isActive ? 1 : 0.4}>
                        {dims[dIndex].short}
                      </text>
                    </g>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="w-full bg-white rounded-t-[120px] rounded-b-xl shadow-[0_-10px_40px_rgba(148,163,184,0.24)] px-8 pt-20 pb-8 relative z-10 flex flex-col items-center border-t border-slate-100/60">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6 shadow-inner w-60 border border-slate-200/30">
              <button onClick={() => setViewMode('team')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'team' ? 'bg-white text-[#1E254C] shadow-sm' : 'text-gray-400'}`}>Jouw team</button>
              <button onClick={() => setViewMode('college')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'college' ? 'bg-white text-[#1E254C] shadow-sm' : 'text-gray-400'}`}>College-wijd</button>
            </div>

            <div className="w-full flex justify-between items-center text-center px-4 mb-6">
              <div className="flex-1">
                <p className="text-purple-600 text-[10px] font-black tracking-widest uppercase">JOUW RESULTAAT</p>
                <p className="text-5xl font-black mt-1.5 tracking-tighter" style={{ color: scoreColor(personalScores[activeIndex]) }}>
                  {personalScores[activeIndex]}
                </p>
                <p className="text-gray-400 text-xs font-bold mt-0.5">/25</p>
              </div>
              <div className="h-12 w-px bg-slate-100" />
              <div className="flex-1">
                <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">{rightScoreLabel}</p>
                <p className="text-5xl font-black mt-1.5 tracking-tighter" style={{ color: scoreColor(rightScoreValue) }}>
                  {rightScoreValue}
                </p>
                <p className="text-gray-400 text-xs font-bold mt-0.5">/25</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-2">
              {dims.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-[#7B77A8]' : 'w-1.5 bg-slate-200'}`} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}