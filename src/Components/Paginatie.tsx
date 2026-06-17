import { useNavigate } from 'react-router'
import { useVragen } from './VragenContext'

const TOTAAL = 10

export default function Paginatie() {
  const { huidig, setHuidig } = useVragen()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 pb-1 bg-transparent md:w-full border-2 border-blue-900 rounded-md md:border-transparent">
      <div className="flex flex-col w-full items-center justify-center gap-3">

        <button
          onClick={() => setHuidig(huidig - 1)}
          disabled={huidig === 0}
          className="h-8 w-8 md:h-10 md:w-10 rounded-md border-2 border-blue-900 bg-white text-base md:text-lg disabled:opacity-30 cursor-pointer"
        >
          ←
        </button>

        <div className="flex flex-col gap-2">
          {Array.from({ length: TOTAAL }, (_, i) => {
            const isCurrent = huidig === i

            return (
              <button
                key={i}
                onClick={() => setHuidig(i)}
                className={`h-8 w-8 md:h-10 md:w-10 rounded-md border-2 border-blue-900 text-sm md:text-lg cursor-pointer ${
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
          className="h-8 w-8 md:h-10 md:w-10 rounded-md border-2 border-blue-900 bg-white text-base md:text-lg disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>
      <div>
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