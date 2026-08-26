import { useEffect } from 'react'

const dims = [
  { id: 1,  short: 'Vrijheid' },
  { id: 2,  short: 'Ideesupport' },
  { id: 3,  short: 'Vertrouwen' },
  { id: 4,  short: 'Dynamiek' },
  { id: 5,  short: 'Speelsheid' },
  { id: 6,  short: 'Dialoog' },
  { id: 7,  short: 'Risico nemen' },
  { id: 8,  short: 'Tijd voor ideeën' },
  { id: 9,  short: 'Conflict' },
  { id: 10, short: 'Uitdaging' },
]

const collegeScores = [15, 14, 17, 13, 19, 16, 11, 15, 13, 17]
const MAX_SCORE = 25
const gemiddelde = (collegeScores.reduce((a, b) => a + b, 0) / collegeScores.length).toFixed(1)
const respondenten = 24 // aantal teams dat de vragenlijst heeft ingevuld

const scoreColor = (score: number) => {
  if (score <= 6)  return 'bg-blue-950'
  if (score <= 11) return 'bg-blue-800'
  if (score <= 16) return 'bg-blue-500'
  return 'bg-blue-300'
}

function WindowControls() {
  return (
    <div className="flex items-center h-full select-none">
      <button
        type="button"
        tabIndex={-1}
        className="flex items-center justify-center h-full w-9 text-blue-900/60 hover:bg-blue-900/10 transition-colors cursor-pointer"
        aria-hidden="true"
      >
        <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" /></svg>
      </button>
      <button
        type="button"
        tabIndex={-1}
        className="flex items-center justify-center h-full w-9 text-blue-900/60 hover:bg-blue-900/10 transition-colors cursor-pointer"
        aria-hidden="true"
      >
        <svg width="9" height="9" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
      </button>
      <button
        type="button"
        tabIndex={-1}
        className="flex items-center justify-center h-full w-9 text-blue-900/60 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
        aria-hidden="true"
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="1.2" />
          <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  )
}

export default function Admin() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col items-center pl-6 max-w-29/30 mb-5 lg:px-12 py-2 min-h-dvh md:flex-1 md:min-h-0">
      <div className="relative h-full w-full overflow-hidden border-3 border-blue-900 rounded-lg bg-linear-to-b from-blue-200 via-purple-100 to-white shadow-[-20px_0_70px_rgba(0,0,0,0.4)] flex flex-col p-5">

        {/* subtiele scanline-textuur, easter egg laag 1 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(30,58,138,0.6) 0px, rgba(30,58,138,0.6) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* hoek-accenten, easter egg laag 2 (HUD/terminal-vibe) */}
        <div className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-blue-900/40" />
        <div className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-blue-900/40" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-blue-900/40" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-blue-900/40" />

        {/* statusregel, easter egg laag 3 */}
        <div className="relative flex items-center gap-1 font-mono text-[10px] tracking-wider text-blue-900/50 mb-1 select-none">
          <span>root@deltion-admin:~$ sessie geauthenticeerd</span>
          <span className="animate-pulse">▮</span>
        </div>

        <div className="flex-1 flex flex-col items-center gap-6">
          <h1 className="relative text-4xl font-extrabold mb-3 max-w-9/10 text-center text-blue-950 w-full">
            Admin Dashboard
          </h1>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">

            {/* Teamtoegang: code + QR samen, Windows-venster */}
            <div className="md:col-span-1 relative flex flex-col rounded-lg border border-blue-900/70 bg-white shadow-[0_4px_14px_rgba(30,58,138,0.15)] overflow-hidden">

              {/* titelbalk, Windows-stijl */}
              <div className="relative flex items-center justify-between bg-blue-50 border-b border-blue-900/20 pl-3 h-8">
                <span className="font-mono text-[10px] text-blue-900/50">access.exe</span>
                <WindowControls />
              </div>

              <div className="relative flex flex-col gap-3 p-4">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, rgba(30,58,138,0.6) 0px, rgba(30,58,138,0.6) 1px, transparent 1px, transparent 3px)',
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <h2 className="font-bold text-blue-950 text-shadow-xs">Teamtoegang</h2>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-blue-900/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    actief
                  </span>
                </div>

                <div className="relative font-mono text-[11px] text-blue-900/60 bg-blue-950/5 border border-blue-900/20 rounded px-2 py-1">
                  <span className="text-blue-900/40">$</span> generate --code --qr --team=new
                </div>

                <p className="relative text-sm text-blue-950/70">
                  Genereer een teamcode met bijbehorende QR-code voor snelle toegang.
                </p>

                <div className="relative flex flex-col sm:flex-row md:flex-col gap-4 items-center">
                  <div className="flex items-center justify-center aspect-square w-28 shrink-0 rounded-md border-2 border-dashed border-blue-900/30 bg-blue-950/5">
                    <span className="font-mono text-[10px] text-blue-900/40 text-center px-2">
                      qr verschijnt hier
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between gap-2 rounded-md border border-blue-900/30 bg-blue-950/5 px-3 py-2 font-mono text-sm text-blue-950">
                      <span>XXXX-XXXX</span>
                      <button
                        type="button"
                        className="text-xs text-blue-900/50 hover:text-blue-900 transition-colors cursor-pointer"
                        aria-label="Kopieer teamcode"
                      >
                        copy
                      </button>
                    </div>

                    <div className="flex flex-col gap-1 font-mono text-[10px] text-blue-900/40 px-0.5">
                      <div className="flex items-center justify-between">
                        <span>aangemaakt</span>
                        <span>--:--:--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>vervalt over</span>
                        <span>24u 00m</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-lg border-2 border-blue-900 bg-orange-400 hover:bg-orange-500 transition-colors text-white font-semibold text-sm py-3 cursor-pointer"
                    >
                      Genereer teamtoegang
                    </button>
                  </div>
                </div>

                <p className="relative font-mono text-[9px] text-blue-900/30 text-center select-none">
                  # writes to: teams.access_codes
                </p>
              </div>
            </div>

            {/* Resultaten: diagnostics readout, Windows-venster */}
            <div className="md:col-span-2 relative flex flex-col rounded-lg border border-blue-900/70 bg-white shadow-[0_4px_14px_rgba(30,58,138,0.15)] overflow-hidden">

              {/* titelbalk, Windows-stijl */}
              <div className="relative flex items-center justify-between bg-blue-50 border-b border-blue-900/20 pl-3 h-8">
                <span className="font-mono text-[10px] text-blue-900/50">results.exe</span>
                <WindowControls />
              </div>

              <div className="relative flex flex-col gap-3 p-5">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, rgba(30,58,138,0.6) 0px, rgba(30,58,138,0.6) 1px, transparent 1px, transparent 3px)',
                  }}
                />

                <h2 className="relative font-bold text-blue-950 text-shadow-xs">Resultaten</h2>

                <div className="relative font-mono text-[11px] text-blue-900/60 bg-blue-950/5 border border-blue-900/20 rounded px-2 py-1">
                  <span className="text-blue-900/40">$</span> query --scope=all-teams --metric=avg
                </div>

                <div className="relative flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-blue-900/50">
                  <span className="px-2 py-0.5 rounded-full border border-blue-900/30 bg-blue-950/5">
                    alle teams · gemiddelde
                  </span>
                  <span>respondenten: {respondenten} teams</span>
                  <span>gem. score: {gemiddelde}/{MAX_SCORE}</span>
                </div>

                {/* diagnostics readout */}
                <div className="relative w-full flex flex-col gap-2 py-1">
                  {dims.map((d, i) => {
                    const score = collegeScores[i]
                    const pct = (score / MAX_SCORE) * 100
                    return (
                      <div key={d.id} className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="w-28 shrink-0 text-blue-950/70 truncate">{d.short}</span>
                        <div className="flex-1 h-2 rounded-sm bg-blue-950/10 overflow-hidden">
                          <div
                            className={`h-full rounded-sm ${scoreColor(score)} transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-blue-950/60">{score}/{MAX_SCORE}</span>
                      </div>
                    )
                  })}

                  {/* legenda blauwschaal */}
                  <div className="mt-1 flex items-center gap-2 font-mono text-[9px] text-blue-900/40 select-none">
                    <span>laag</span>
                    <span className="h-2 w-4 rounded-sm bg-blue-950" />
                    <span className="h-2 w-4 rounded-sm bg-blue-800" />
                    <span className="h-2 w-4 rounded-sm bg-blue-500" />
                    <span className="h-2 w-4 rounded-sm bg-blue-300" />
                    <span>hoog</span>
                  </div>

                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-blue-900/40 select-none">
                    <span>scan voltooid · 10/10 dimensies</span>
                    <span className="animate-pulse">●</span>
                  </div>
                </div>

                <div className="relative font-mono text-[9px] text-blue-900/30 text-center select-none">
                  laatst bijgewerkt: --:--:--
                </div>

                <button
                  type="button"
                  className="relative mt-auto flex items-center justify-center gap-2 rounded-lg border-2 border-blue-900 bg-orange-400 hover:bg-orange-500 transition-colors text-white font-semibold text-sm py-3 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 3v12m0 0-4-4m4 4 4-4" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  Download PDF
                </button>
                <p className="relative font-mono text-[9px] text-blue-900/30 text-center select-none">
                  # export --format=pdf --scope=all-teams
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}