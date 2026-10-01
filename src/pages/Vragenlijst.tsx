import { useNavigate } from 'react-router'
import { useEffect, useLayoutEffect, useState } from 'react'
import VragenSet from '../Components/VragenSet'
import { useVragen } from '../Components/VragenContext'
import Cirkelv1 from '../images/Foto1.png'
import Cirkelv2 from '../images/Foto2.png'
import Cirkelv3 from '../images/Foto3.png'
import Cirkelv4 from '../images/Foto4.png'
import Cirkelv5 from '../images/Foto5.png'
import Cirkelv6 from '../images/Foto6.png'
import Cirkelv7 from '../images/Foto7.png'
import Cirkelv8 from '../images/Foto8.png'
import Cirkelv9 from '../images/Foto9.png'
import Cirkelv10 from '../images/Foto10.png'

type ApiVraag = {
  id: number
  title: string
}

type ApiDimensie = {
  id: number
  name: string
  questions: ApiVraag[]
}

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const cirkels = [
  Cirkelv1,
  Cirkelv2,
  Cirkelv3,
  Cirkelv4,
  Cirkelv5,
  Cirkelv6,
  Cirkelv7,
  Cirkelv8,
  Cirkelv9,
  Cirkelv10,
]

const uitleg = [
  'Een team waarin voldoende vrijheid wordt ervaren, geeft medewerkers ruimte om zelf keuzes te maken in de uitvoering van hun werk. Teamleden krijgen vertrouwen, nemen initiatief en voelen zich verantwoordelijk voor hun eigen bijdrage. Hierdoor ontstaat ruimte om te experimenteren, ideeën uit te werken en kansen te benutten.',
  'In een innovatief team worden nieuwe ideeën serieus genomen. Teamleden luisteren naar elkaar, bouwen voort op elkaars voorstellen en moedigen initiatief aan. Ideeën hoeven niet direct perfect te zijn; ze krijgen de ruimte om verder ontwikkeld te worden. De sfeer rondom nieuwe ideeën is constructief en positief.',
  'Vertrouwen en openheid vormen de basis voor een innovatief klimaat. Teamleden voelen zich veilig om vragen te stellen, ideeën in te brengen, fouten te bespreken en feedback te geven. Verschillende perspectieven worden gewaardeerd en er is ruimte voor een open gesprek, ook wanneer onderwerpen lastig of spannend zijn.',
  'Een dynamisch en levendig team is voortdurend in beweging. Teamleden signaleren kansen, spelen in op veranderingen en zoeken actief naar manieren om het onderwijs, de samenwerking of de dienstverlening te verbeteren. Er is energie, initiatief en de bereidheid om nieuwe mogelijkheden te verkennen.',
  'Speelsheid en humor zorgen voor ontspanning, verbinding en ruimte om anders te denken. In teams waar gelachen mag worden, ontstaan vaak meer creativiteit en energie. Een positieve sfeer helpt om ideeën te verkennen, samen te leren en uitdagingen met een open blik tegemoet te treden.',
  'Bij een dialoog worden ideeën, inzichten en verschillende perspectieven open uitgewisseld. In een innovatief team is ruimte voor kritische vragen en constructieve discussies. Verschillende meningen worden gezien als een kans om samen tot betere oplossingen en nieuwe inzichten te komen.',
  'Innoveren vraagt om het verkennen van nieuwe mogelijkheden waarvan de uitkomst niet altijd vooraf vaststaat. In een innovatief team krijgen medewerkers ruimte om te experimenteren, van ervaringen te leren en verantwoorde risico’s te nemen. Fouten worden gezien als waardevolle leerervaringen.',
  'In een innovatief team is ruimte om stil te staan, nieuwe inzichten op te doen en ideeën verder uit te werken. Naast de dagelijkse werkzaamheden maken teamleden bewust tijd vrij voor reflectie, onderzoek en ontwikkeling. Hierdoor ontstaan nieuwe kansen en verbeteringen.',
  'Conflicten zijn niet per definitie negatief. Verschillen van inzicht horen bij samenwerken en kunnen leiden tot nieuwe ideeën en betere oplossingen. In een innovatief team worden spanningen tijdig besproken, respectvol aangepakt en gebruikt om van te leren.',
  'In een team waarin mensen worden uitgedaagd, ervaren zij betekenis in hun werk en voelen zij zich betrokken bij de gezamenlijke doelen. Teamleden begrijpen waar zij naartoe werken, nemen verantwoordelijkheid en zetten zich actief in om resultaten te bereiken.',
]

function scrollNaarTop() {
  window.setTimeout(() => {
    document.getElementById('top')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, 50)
}

export default function Vragenlijst() {
  const {
    huidig,
    setHuidig,
    antwoorden,
    verstuurNaarBackend,
    wisSessie,
  } = useVragen()

  const [dimensies, setDimensies] = useState<ApiDimensie[]>([])
  const [laadFout, setLaadFout] = useState<string | null>(null)
  const [laadStatus, setLaadStatus] = useState<string | null>(null)

  const navigate = useNavigate()
  const huidigeDimensie = dimensies[huidig]

  useLayoutEffect(() => {
    setHuidig(0)
  }, [setHuidig])

  useEffect(() => {
    const controller = new AbortController()

    async function laadVragen() {
      try {
        setLaadFout(null)

        const response = await fetch(`${API_URL}/questions`, {
          headers: {
            Accept: 'application/json',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Vragen laden is mislukt (${response.status}).`)
        }

        const data: { dimensions?: ApiDimensie[] } = await response.json()

        if (!Array.isArray(data.dimensions) || data.dimensions.length === 0) {
          throw new Error('De API heeft geen dimensies met vragen teruggegeven.')
        }

        setDimensies(data.dimensions)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setLaadFout(error.message)
        }
      }
    }

    void laadVragen()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    scrollNaarTop()
  }, [huidig])

  const actieveSetNummer = huidig + 1
  const antwoordenVoorSet = antwoorden[actieveSetNummer] || {}
  const aantalBeantwoord = Object.keys(antwoordenVoorSet).length

  const magNaarVolgende =
    huidigeDimensie !== undefined &&
    aantalBeantwoord === huidigeDimensie.questions.length

  const laatsteDimensie =
    dimensies.length > 0 && huidig === dimensies.length - 1

  const handleWisSessie = () => {
    wisSessie()
    setHuidig(0)
    navigate('/vragenlijst')
  }

  const spreekTekst = (tekst: string) => {
    if (!('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()

    const spraak = new SpeechSynthesisUtterance(tekst)
    spraak.lang = 'nl-NL'
    spraak.rate = 1
    spraak.pitch = 1

    window.speechSynthesis.speak(spraak)
  }

  const hanteerVersturen = async () => {
    setLaadStatus('Verzenden...')

    try {
      const resultaat = await verstuurNaarBackend()

      if (resultaat.succes) {
        setLaadStatus(null)
        navigate('/resultaten')
      } else {
        setLaadStatus(resultaat.bericht)
      }
    } catch {
      setLaadStatus('Verzenden is mislukt. Probeer het opnieuw.')
    }
  }

  if (laadFout) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-center text-red-700 sm:px-6">
        <h1 className="text-xl font-bold">De vragen konden niet laden</h1>
        <p className="mt-3">{laadFout}</p>
        <p className="mt-2 break-all text-sm">
          Controleer of de backend draait op {API_URL}.
        </p>
      </main>
    )
  }

  if (!huidigeDimensie) {
    return (
      <main className="px-4 py-10 text-center text-gray-700">
        Vragen laden...
      </main>
    )
  }

  const huidigeUitleg = uitleg[huidig] ?? huidigeDimensie.name
  const afbeelding = cirkels[huidig]

  return (
    <main
      id="top"
      className="min-h-dvh w-full overflow-x-hidden bg-none px-3 py-4 sm:px-6 sm:py-8 lg:px-8"
    >
      <section className="mx-auto w-full max-w-6xl rounded-xl border-2 bg-white border-blue-950 bg-none p-4 shadow-xl sm:p-6 lg:p-8">
        <header className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => spreekTekst(huidigeUitleg)}
            className="w-full cursor-pointer rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
          >
            🔊 Voorlezen
          </button>

          <button
            type="button"
            onClick={handleWisSessie}
            className="w-full cursor-pointer rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-blue-100 sm:w-auto"
          >
            Sessie wissen
          </button>
        </header>

        <div className="mb-5 grid items-center gap-5 lg:mb-8 lg:grid-cols-2 lg:gap-8">
          <section className="rounded-lg border-2 border-blue-900 bg-blue-50 p-4 sm:p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-800">
              Dimensie {huidig + 1} van {dimensies.length}
            </p>

            <h1 className="mb-3 text-2xl font-bold text-blue-950 sm:text-3xl">
              {huidigeDimensie.name}
            </h1>

            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              {huidigeUitleg}
            </p>
          </section>

          {afbeelding && (
            <div className="flex min-h-56 items-center justify-center rounded-lg border-2 border-blue-900 bg-white p-4 sm:min-h-72 lg:border-0 lg:bg-transparent">
              <img
                src={afbeelding}
                alt={`Cirkel: ${huidigeDimensie.name}`}
                className="max-h-72 w-full max-w-sm object-contain sm:max-h-96 lg:max-w-md"
              />
            </div>
          )}
        </div>

        <section aria-label={`Vragen over ${huidigeDimensie.name}`}>
          <div className="mb-3 flex items-center justify-between text-sm font-semibold sm:hidden">
            <span className="text-blue-500">Oneens</span>
            <span className="text-blue-900">Eens</span>
          </div>

          <VragenSet
            vragen={huidigeDimensie.questions}
            setNummer={actieveSetNummer}
          />
        </section>

        {laadStatus && (
          <p
            role="status"
            className="mt-4 text-center text-sm font-semibold text-blue-900"
          >
            {laadStatus}
          </p>
        )}

        <footer className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5">
          <button
            type="button"
            onClick={() => setHuidig(huidig - 1)}
            disabled={huidig === 0 || laadStatus === 'Verzenden...'}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-900 bg-orange-400 px-4 py-3 font-bold text-blue-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40 sm:py-4 sm:text-lg"
          >
            Vorige
          </button>

          <button
            type="button"
            onClick={() => {
              if (laatsteDimensie) {
                void hanteerVersturen()
              } else {
                setHuidig(huidig + 1)
              }
            }}
            disabled={!magNaarVolgende || laadStatus === 'Verzenden...'}
            className="w-full cursor-pointer rounded-lg border-2 border-blue-900 bg-orange-400 px-4 py-3 font-bold text-blue-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40 sm:py-4 sm:text-lg"
          >
            {laatsteDimensie ? 'Verstuur' : 'Volgende'}
          </button>
        </footer>
      </section>
    </main>
  )
}