import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen3() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 3
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-orange-50 border-blue-900">
      <VraagRij tekst="1. Iedereen kan vrijuit spreken zonder angst." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. Er is een sfeer of vertrouwen." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Fouten worden gezien als onderdeel van leren." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Feedback wordt eerlijk en respectvol gegeven." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. Iedereen kan open aangeven wat er speelt." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
