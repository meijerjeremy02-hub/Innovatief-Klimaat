import { useState } from 'react'
const borderKleur = ['border-purple-400', 'border-purple-500', 'border-purple-600', 'border-purple-700', 'border-purple-800']
function VraagRij({ tekst }: { tekst: string }) {
  const [waarde, setWaarde] = useState<number | null>(null)
  return (
    <div className="border border-purple-950 p-4 text-center">
      <span className="text-md">{tekst}</span>
      <div className="flex gap-3 mt-2">
        <div className="flex-1"><h1 className="text-purple-400">oneens</h1></div>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <button key={n} onClick={() => setWaarde(n)} className={`flex-2 w-8 h-8 rounded-full border-2 ${borderKleur[i]} text-xs font-medium transition-colors cursor-pointer ${waarde === n ? 'bg-orange-400 text-white' : ''}`}>{n}</button>
        ))}
        <div className="flex-1"><h1 className="text-purple-900">eens</h1></div>
      </div>
    </div>
  )
}
export default function Vragen5() {
  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300">
      <VraagRij tekst="1. Er wordt veel gelachen." />
      <VraagRij tekst="2. We zorgen voor een positieve sfeer." />
      <VraagRij tekst="3. We gebruiken humor om spanning te verminderen." />
      <VraagRij tekst="4. Creatieve werkvormen zijn normaal in ons team." />
      <VraagRij tekst="5. De sfeer is ontspannen en licht." />
    </div>
  )
}