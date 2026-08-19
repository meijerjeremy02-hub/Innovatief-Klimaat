import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen6() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 6
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-gray-50">
      <VraagRij tekst="1. We bespreken verschillende standpunten grondig." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. Iedereen durft zijn mening te uiten." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Inhoudelijke discussies zijn welkom." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Er wordt actief naar verschillende perspectieven gevraagd." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. Conflicterende ideeën worden onderzocht." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
