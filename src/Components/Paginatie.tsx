import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useVragen } from './VragenContext'

const TOTAAL = 10

export default function Paginatie() {
  const { huidig, setHuidig } = useVragen()
  const navigate = useNavigate()
  const huidigRef = useRef<HTMLButtonElement>(null)

  // Toon altijd: eerste, laatste, en de buren van de huidige pagina
  const visibleOnMobile = (i: number) =>
    i === 0 ||
    i === TOTAAL - 1 ||
    Math.abs(i - huidig) <= 1

  // Bepaal of er een "..." nodig is vóór/na een gat (i.e. er wordt
  // meer dan 1 pagina overgeslagen tussen twee zichtbare items)
  const needsDotsBefore = (i: number) => {
    if (visibleOnMobile(i)) return false
    // alleen tonen op de eerste "onzichtbare" positie na een zichtbaar item
    return visibleOnMobile(i - 1)
  }

  // Scroll de huidige pagina automatisch in beeld op mobiel
  useEffect(() => {
    huidigRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [huidig])

  return (
    <div className="flex flex-col gap-2 bg-transparent border-2 border-blue-900 rounded-md md:border-transparent">
      <div className="flex flex-col items-center justify-center gap-1">

        <button
          onClick={() => setHuidig(huidig - 1)}
          disabled={huidig === 0}
          className="h-10 w-10 rounded-md border-2 border-blue-900 bg-white text-lg disabled:opacity-30 cursor-pointer"
        >
          ←
        </button>

        {/* Mobiel: beperkte hoogte + scroll, met 1 2 3 ... 9 10 stijl */}
        <div className="flex max-h-40 flex-col gap-1 overflow-y-auto md:hidden">
          {Array.from({ length: TOTAAL }, (_, i) => {
            const isCurrent = huidig === i

            if (!visibleOnMobile(i)) {
              if (needsDotsBefore(i)) {
                return (
                  <span
                    key={`dots-${i}`}
                    className="flex items-center justify-center h-8 text-sm font-bold"
                  >
                    ...
                  </span>
                )
              }
              return null
            }

            return (
              <button
                key={i}
                ref={isCurrent ? huidigRef : null}
                onClick={() => setHuidig(i)}
                className={`h-8 min-w-8 shrink-0 rounded-md border-2 border-blue-900 text-sm cursor-pointer ${
                  isCurrent
                    ? 'bg-[#DECAB7] text-orange-800'
                    : 'bg-white text-black'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {/* Laptop/desktop: ongewijzigd, toont alle paginanummers */}
        <div className="hidden md:flex md:flex-col gap-1">
          {Array.from({ length: TOTAAL }, (_, i) => {
            const isCurrent = huidig === i

            return (
              <button
                key={i}
                onClick={() => setHuidig(i)}
                className={`h-10 w-10 rounded-md border-2 border-blue-900 text-lg cursor-pointer ${
                  isCurrent
                    ? 'bg-[#DECAB7] text-orange-800'
                    : 'bg-white text-black'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setHuidig(huidig + 1)}
          disabled={huidig === TOTAAL - 1}
          className="h-10 w-10 rounded-md border-2 border-blue-900 bg-white text-lg disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-[9px] md:text-xl text-gray-800">
          <span className="md:hidden">Voortgang</span>
          <span>
            {huidig + 1} / {TOTAAL}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-orange-700 transition-all duration-300"
            style={{
              width: `${((huidig + 1) / TOTAAL) * 100}%`,
            }}
          />
        </div>
      </div>

      {huidig === TOTAAL - 1 && (
        <button
          onClick={() => navigate('/resultaten')}
          className="w-full rounded-md border-2 border-blue-900 bg-orange-200 py-2 text-sm text-orange-900 cursor-pointer md:text-lg"
        >
          Send ✓
        </button>
      )}
    </div>
  )
}