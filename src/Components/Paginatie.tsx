import { useNavigate } from 'react-router'
import { useVragen } from './VragenContext'

const TOTAAL = 10

export default function Paginatie() {
  const { huidig, setHuidig } = useVragen()
  const navigate = useNavigate()

  const visibleOnMobile = (i: number) =>
    i === 0 ||
    i === TOTAAL - 1 ||
    Math.abs(i - huidig) <= 1

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


        <div className="flex flex-col gap-1 md:hidden">
          {Array.from({ length: TOTAAL }, (_, i) => {
            const isCurrent = huidig === i

            if (!visibleOnMobile(i)) {
              const showDots =
                i === huidig - 2 || i === huidig + 2

              if (showDots) {
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
                onClick={() => setHuidig(i)}
                className={`h-8 min-w-8 rounded-md border-2 border-blue-900 text-sm cursor-pointer ${
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