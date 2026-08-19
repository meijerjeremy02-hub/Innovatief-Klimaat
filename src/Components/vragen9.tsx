import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen9() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 9
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-gray-50">
      <VraagRij tekst="1. Meningsverschillen worden open besproken." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. Conflicten escaleren zelden." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Het team gaat respectvol met spanningen om." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Verschillen in visie leiden niet tot persoonlijke wrijving." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. We lossen conflicten gezamenlijk op." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
