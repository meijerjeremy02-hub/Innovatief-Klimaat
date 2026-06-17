import { useState } from 'react'
const borderKleur = ['border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800']
function VraagRij({ tekst }: { tekst: string }) {
  const [waarde, setWaarde] = useState<number | null>(null)
  return (
    <div className="border border-blue-950 p-3 text-center">
      <span className="text-md">{tekst}</span>
      <div className="flex items-center gap-1 sm:gap-3 mt-2">
        <h1 className="shrink-0 w-12 sm:w-16 text-blue-400 text-xs sm:text-base text-left">
          oneens
        </h1>

        <div className="flex flex-1 justify-between text-center gap-1 sm:gap-3 md:mx-auto">
          {[1, 2, 3, 4, 5].map((n, i) => (
            <button
              key={n}
              onClick={() => setWaarde(n)}
              className={`shrink-0 w-[20%] h-7 sm:w-1/6 sm:h-8 rounded-full border-2 ${borderKleur[i]} text-xs font-medium transition-colors cursor-pointer ${waarde === n ? 'bg-orange-400 text-white' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>

        <h1 className="shrink-0 w-12 text-right sm:w-16 text-blue-900 text-xs sm:text-base md:mx-auto">
          eens
        </h1>
      </div>
    </div>
  )
}
export default function Vragen6() {
  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300">
      <VraagRij tekst="1. We bespreken verschillende standpunten grondig." />
      <VraagRij tekst="2. Iedereen durft zijn mening te uiten." />
      <VraagRij tekst="3. Inhoudelijke discussies zijn welkom." />
      <VraagRij tekst="4. Er wordt actief naar verschillende perspectieven gevraagd." />
      <VraagRij tekst="5. Conflicterende ideeën worden onderzocht." />
    </div>
  )
}