import { useNavigate } from 'react-router'
import { useVragen } from './VragenContext'

const TOTAAL = 10

export default function Paginatie() {
  const { huidig, setHuidig } = useVragen()
  const navigate = useNavigate()

  return (
    <div className="lg:fixed lg:top-4 lg:right-0 flex flex-col gap-2 bg-transparent">
      <div className="flex gap-1 flex-nowrap items-center justify-center md:pr-15">
        <button
          onClick={() => setHuidig(huidig - 1)}
          disabled={huidig === 0}
          className="px-1 py-0 text-3xs md:h-10 md:w-10 md:text-lg border-3 bg-white border-blue-900 rounded-md disabled:opacity-30 cursor-pointer"
        >
          ←
        </button>

        {Array.from({ length: TOTAAL }, (_, i) => (
          <button
            key={i}
            onClick={() => setHuidig(i)}
            className={`px-1 py-0 text-3xs md:h-10 md:w-10 md:text-lg rounded-md border-2 border-blue-900 cursor-pointer ${huidig === i ? 'bg-[#DECAB7] text-orange-800' : 'bg-white text-black'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setHuidig(huidig + 1)}
          disabled={huidig === TOTAAL - 1}
          className="px-1 py-0 text-3xs md:h-10 md:w-10 md:text-lg border-3 bg-white border-blue-900 rounded-md disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>

      <div className="md:pr-15">
        <div className="flex justify-between text-[9px] md:text-xs text-gray-800 mb-1">
          <span>Voortgang</span>
          <span>{huidig + 1} / {TOTAAL}</span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-700 rounded-full transition-all"
            style={{ width: `${((huidig + 1) / TOTAAL) * 100}%` }}
          />
        </div>
      </div>

      {huidig === TOTAAL - 1 && (
        <button
          onClick={() => navigate('/resultaten')}
          className="w-full max-w-9/10 md:pr-1 px-1 text-sm md:mt-1 md:text-lg border-3 border-blue-900 rounded-md bg-orange-200 text-orange-900 cursor-pointer"
        >
          Verstuur ✓
        </button>
      )}
    </div>
  )
}