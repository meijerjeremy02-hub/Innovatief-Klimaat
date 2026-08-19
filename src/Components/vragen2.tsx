import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen2() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 2
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-orange-50 border-blue-900">
      <VraagRij tekst="1. Ideeën worden niet snel afgewezen." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. Collega's luisteren met interesse naar nieuwe voorstellen." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Er is een constructieve houding tegenover verandering." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Ideeën worden vaak verder ontwikkeld door anderen." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. Leidinggevenden staan open voor creatieve voorstellen." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
