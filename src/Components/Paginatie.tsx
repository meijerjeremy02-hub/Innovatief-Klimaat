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
    <div className="lg:fixed lg:top-4 lg:right-0 flex flex-col gap-2 bg-transparent border-2 md:mr-0 border-blue-900 rounded-md -mt-4.5 md:px-4 px-3 py-3 -mx-11 md:border-transparent">
      <div className="flex gap-1 flex-nowrap items-center justify-center">
        <button
          onClick={() => setHuidig(huidig - 1)}
          disabled={huidig === 0}
          className="px-2 py-1 text-sm md:h-10 md:w-10 md:text-lg border-3 bg-white border-blue-900 rounded-md disabled:opacity-30 cursor-pointer"
        >
          ←
        </button>

        {Array.from({ length: TOTAAL }, (_, i) => {
          const isCurrent = huidig === i

          if (!visibleOnMobile(i)) {
            const showDotsLeft = i === huidig - 2
            const showDotsRight = i === huidig + 2

            if (showDotsLeft || showDotsRight) {
              return (
                <span
                  key={`dots-${i}`}
                  className="md:hidden flex items-center px-1 text-sm font-bold"
                >
                  ...
                </span>
              )
            }

            return (
              <button
                key={i}
                onClick={() => setHuidig(i)}
                className={`hidden md:block h-10 w-10 rounded-md border-2 border-blue-900 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#DECAB7] text-orange-800'
                    : 'bg-white text-black'
                }`}
              >
                {i + 1}
              </button>
            )
          }

          return (
            <button
              key={i}
              onClick={() => setHuidig(i)}
              className={`text-sm px-2 py-1 md:h-10 md:w-10 md:text-lg rounded-md border-2 border-blue-900 cursor-pointer ${
                isCurrent
                  ? 'bg-[#DECAB7] text-orange-800'
                  : 'bg-white text-black'
              }`}
            >
              {i + 1}
            </button>
          )
        })}

        <button
          onClick={() => setHuidig(huidig + 1)}
          disabled={huidig === TOTAAL - 1}
          className="px-2 py-1 text-sm md:h-10 md:w-10 md:text-lg border-3 bg-white border-blue-900 rounded-md disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>

      <div>
        <div className="flex justify-between text-[9px] md:text-sm text-gray-800 mb-1">
          <span>Voortgang</span>
          <span>
            {huidig + 1} / {TOTAAL}
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-700 rounded-full transition-all duration-300"
            style={{
              width: `${((huidig + 1) / TOTAAL) * 100}%`,
            }}
          />
        </div>
      </div>

      {huidig === TOTAAL - 1 && (
        <button
          onClick={() => navigate('/resultaten')}
          className="min-w-full mr md:max-w-[80%] text-sm md:mt-1 md:text-lg border-3 border-blue-900 rounded-md bg-orange-200 text-orange-900 cursor-pointer"
        >
          Verstuur ✓
        </button>
      )}
    </div>
  )
}