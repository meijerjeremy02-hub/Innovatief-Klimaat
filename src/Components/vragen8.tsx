import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen8() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 8
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-orange-50 border-blue-900">
      <VraagRij tekst="1. Ik heb tijd om aan nieuwe ideeën te werken." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. We plannen regelmatig momenten voor reflectie." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Creatieve ideeën krijgen aandacht, ook als het druk is." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Er is ruimte om te onderzoeken en te experimenteren." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. We maken tijd vrij om ideeën verder vorm te geven." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
