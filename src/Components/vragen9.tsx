import { useState } from 'react'
const borderKleur = ['border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800']
function VraagRij({ tekst }: { tekst: string }) {
  const [waarde, setWaarde] = useState<number | null>(null)
  return (
    <div className="border border-blue-950 p-4 text-center">
      <span className="text-md">{tekst}</span>
      <div className="flex gap-3 mt-2">
        <div className="flex-1">
          <h1 className="text-blue-400">
            oneens
          </h1>
        </div>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <button
            key={n}
            onClick={() => setWaarde(n)}
            className={`flex-2 w-8 h-8 rounded-full border-2 ${borderKleur[i]} text-xs font-medium transition-colors cursor-pointer ${waarde === n ? 'bg-orange-400 text-white' : ''}`}
          >
            {n}
          </button>
        ))}
        <div className="flex-1">
          <h1 className="text-blue-900">
            eens
          </h1>
        </div>
      </div>
    </div>
  )
}
export default function Vragen9() {
  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300">
      <VraagRij tekst="1. Meningsverschillen worden open besproken." />
      <VraagRij tekst="2. Conflicten escaleren zelden." />
      <VraagRij tekst="3. Het team gaat respectvol met spanningen om." />
      <VraagRij tekst="4. Verschillen in visie leiden niet tot persoonlijke wrijving." />
      <VraagRij tekst="5. We lossen conflicten gezamenlijk op." />
    </div>
  )
}