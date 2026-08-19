import { useNavigate } from 'react-router'
import { useVragen } from './VragenContext'

const TOTAAL = 10

export default function Paginatie() {
  const { huidig, setHuidig, antwoorden } = useVragen()
  const navigate = useNavigate()

  const isBeantwoord = (i: number) => Object.keys(antwoorden[i + 1] || {}).length === 5
  const magNaar = (i: number) => {
    if (i <= huidig) return true
    for (let j = huidig; j < i; j++) {
      if (!isBeantwoord(j)) return false
    }
    return true
  }

  return (
    <div className="flex flex-col gap-3 pb-1 bg-transparent md:w-full border-2 border-blue-900 rounded-md md:border-transparent">
      <div className="flex flex-col w-full items-center justify-center gap-3">

        <button
          onClick={() => setHuidig(huidig - 1)}
          disabled={huidig === 0}
          className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-md border-2 border-blue-900 bg-white text-base md:text-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ←
        </button>

        <div className="flex flex-col gap-2">
          {Array.from({ length: TOTAAL }, (_, i) => {
            const isCurrent = huidig === i
            const beantwoord = isBeantwoord(i)
            const toegestaan = magNaar(i)

            return (
              <button
                key={i}
                onClick={() => toegestaan && setHuidig(i)}
                disabled={!toegestaan}
                className={`h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-md border-2 text-sm md:text-lg transition-colors ${
                  isCurrent
                    ? 'border-blue-900 bg-[#DECAB7] text-orange-800 cursor-pointer'
                    : beantwoord
                    ? 'border-green-700 bg-green-100 text-green-800 cursor-pointer'
                    : toegestaan
                    ? 'border-blue-900 bg-white text-black cursor-pointer'
                    : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setHuidig(huidig + 1)}
          disabled={huidig === TOTAAL - 1 || !isBeantwoord(huidig)}
          className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-md border-2 border-blue-900 bg-white text-base md:text-lg disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>

      <div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-orange-700 transition-all duration-300"
            style={{ width: `${((huidig + 1) / TOTAAL) * 100}%` }}
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