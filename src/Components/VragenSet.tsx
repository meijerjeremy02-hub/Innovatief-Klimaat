import VraagRij from './VraagRij'
import { useVragen } from './VragenContext'

type Vraag = {
  id: number
  title: string
}

type Props = {
  vragen: Vraag[]
  setNummer: number
}

export default function VragenSet({ vragen, setNummer }: Props) {
  const { antwoorden, setAntwoord } = useVragen()
  const paginaAntwoorden = antwoorden[setNummer] || {}

  return (
    <div className="flex flex-col mx-auto max-w-300 gap-3 rounded-lg border-2 border-blue-900 bg-orange-50 p-1 md:p-2">
      {vragen.map((vraag, index) => (
        <VraagRij
          key={vraag.id}
          tekst={`${index + 1}. ${vraag.title}`}
          waarde={paginaAntwoorden[index] || null}
          onAntwoordChange={(waarde) =>
            setAntwoord(setNummer, index, waarde)
          }
        />
      ))}
    </div>
  )
}