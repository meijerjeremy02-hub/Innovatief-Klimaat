import { useVragen } from './VragenContext'
import VraagRij from './VraagRij'

export default function Vragen1() {
  const { antwoorden, setAntwoord } = useVragen()
  const setNummer = 1
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex rounded-lg flex-col border-2 mx-auto max-w-300 gap-3 p-2 bg-gray-50">
      <VraagRij tekst="1. Ik beslis zelf hoe ik mijn werk aanpak." waarde={paginaAntwoorden[0] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 0, n)} />
      <VraagRij tekst="2. Ik heb ruimte om nieuwe ideeën uit te proberen." waarde={paginaAntwoorden[1] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 1, n)} />
      <VraagRij tekst="3. Procedurele regels beperken ons niet overdreven." waarde={paginaAntwoorden[2] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 2, n)} />
      <VraagRij tekst="4. Ik kan alternatieve manieren van werken verkennen." waarde={paginaAntwoorden[3] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 3, n)} />
      <VraagRij tekst="5. Ik kan mijn eigen tijd grotendeels zelf indelen." waarde={paginaAntwoorden[4] || null} onAntwoordChange={(n) => setAntwoord(setNummer, 4, n)} />
    </div>
  )
}
