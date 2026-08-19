import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen10() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 10
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-orange-50 border-blue-900">
      <VraagRij tekst="1. Ons werk voelt zinvol en belangrijk." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. We streven naar uitdagende en ambitieuze doelen." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Het team is gemotiveerd om resultaten te behalen." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Iedereen voelt een sterke betrokkenheid bij het werk." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. We hebben een duidelijk gevoel van richting." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
