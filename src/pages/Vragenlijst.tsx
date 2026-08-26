import { useNavigate } from 'react-router'
import Vragen1 from '../Components/vragen1'
import Vragen2 from '../Components/vragen2'
import Vragen3 from '../Components/vragen3'
import Vragen4 from '../Components/vragen4'
import Vragen5 from '../Components/vragen5'
import Vragen6 from '../Components/vragen6'
import Vragen7 from '../Components/vragen7'
import Vragen8 from '../Components/vragen8'
import Vragen9 from '../Components/vragen9'
import Vragen10 from '../Components/vragen10'
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
import { useEffect, useState } from 'react'

const vragen = [Vragen1, Vragen2, Vragen3, Vragen4, Vragen5, Vragen6, Vragen7, Vragen8, Vragen9, Vragen10]
const cirkels = [Cirkelv1, Cirkelv2, Cirkelv3, Cirkelv4, Cirkelv5, Cirkelv6, Cirkelv7, Cirkelv8, Cirkelv9, Cirkelv10]

const uitleg = [
  'Een klimaat met veel vrijheid betekent dat medewerkers de autonomie hebben op hun eigen werk vorm te geven. Ze bepalen zelf wanneer ze wat doen en op welke manier. Ook is er vrijheid om eigen projecten op te pakken, ideeën uit te voeren en op eigen initiatief informatie te verzamelen en te delen.',
  'In een innovatief klimaat worden ideeën positief ontvangen door collega\'s en leidinggevenden. Medewerkers luisteren naar elkaar, er is ruimte voor ideeën en initiatieven worden aangemoedigd. De sfeer rondom nieuwe ideeën is constructief en positief.',
  'Bij vertrouwen en openheid gaat het om de veiligheid die medewerkers ervaren. Durft iedereen, dus zowel introverte als extraverte mensen, ideeën en meningen naar voren te brengen? Kunnen medewerkers initiatief nemen zonder angst dat ze worden gestraft bij mislukking? Durven ze fouten en geleerde lessen te delen?',
  'Een dynamische omgeving en levendige organisatie is een omgeving waarin vaak nieuwe dingen gebeuren. Er is voor iedereen voldoende afwisseling, er gebeuren steeds nieuwe dingen en de sfeer is levendig, energiek en vol positiviteit.',
  'Plezier maken en spelen is van groot belang als het gaat om creativiteit en innovatie. Speelsheid is zowel een manier van ontspannen als een manier om tot resultaat te komen. Een ontspannen sfeer met grappen en gelach kenmerkt veelal een organisatie waar creativiteit hoog in het vaandel staat.',
  'Bij debat gaat het om een constructieve uitwisseling van voorstellen, ideeën en inzichten op basis van ervaring en kennis (onderzoek). In een innovatief klimaat is open en constructief debat belangrijk, omdat het betekent dat er ruimte is voor diversiteit van standpunten.',
  'Innoveren betekent altijd risico\'s nemen want het resultaat is onzeker. Als medewerkers risico\'s durven te nemen en niet bang zijn om te falen, is er meer ruimte voor innovatieve ideeën en oplossingen. Leidinggevenden (top van een organisatie) heeft hierin een belangrijke rol.',
  'In een innovatief klimaat kunnen medewerkers een deel van hun tijd besteden aan het opdoen van inspiratie en het uitwerken van nieuwe ideeën. Voldoende tijd geeft de mogelijkheid om te werken aan oplossingen en ideeën die misschien geen standaard onderdeel zijn van het takenpakket.',
  'Wanneer het conflictniveau hoog is en de context getypeerd wordt door oorlogsvoering, roddels en geruzie, dan is sprake van een onveilige omgeving. Het spreekt voor zich dat dit een innovatiefklimaat compleet blokkeert.',
  'In een klimaat waarin je meer uitgedaagd wordt, zowel bij dagelijkse activiteiten als bij lange termijn doelstellingen, zijn medewerkers intrinsiek gemotiveerd om hieraan bij te dragen. Daarbij vinden ze meer betekenis in hun werk, voelen ze hun eigen meerwaarde en investeren ze meer energie.',
]

const scrollNaarTop = () => {
  setTimeout(() => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
  }, 50)
}

export default function Vragenlijst() {
  const { huidig, setHuidig, antwoorden, verstuurNaarBackend, wisSessie } = useVragen()
  const [laadStatus, setLaadStatus] = useState<string | null>(null)
  const navigate = useNavigate()
  const HuidigeVraag = vragen[huidig]

  useEffect(() => {
  setHuidig(0)
}, [setHuidig])

useEffect(() => {
  scrollNaarTop()
}, [huidig])
  const handleWisSessie = () => {
    wisSessie()
    setHuidig(0)
    navigate('/vragenlijst')
  }

  useEffect(() => {
    scrollNaarTop()
  }, [huidig])
  
  useEffect(() => {
    scrollNaarTop()
  }, [huidig])

  const actieveSetNummer = huidig + 1
  const aantalBeantwoord = Object.keys(antwoorden[actieveSetNummer] || {}).length
  const magNaarVolgende = aantalBeantwoord === 5

  const spreekTekst = (tekst: string) => {
    window.speechSynthesis.cancel()
    const spraak = new SpeechSynthesisUtterance(tekst)
    spraak.lang = 'nl-NL'
    spraak.rate = 1
    spraak.pitch = 1
    window.speechSynthesis.speak(spraak)
  }

  const hanteerVersturen = async () => {
    setLaadStatus('Verzenden...')
    const resultaat = await verstuurNaarBackend()
    if (resultaat.succes) {
      setLaadStatus(null)
      navigate('/resultaten')
    } else {
      setLaadStatus(resultaat.bericht)
    }
  }

  return (
    <div id="top" className="min-h-dvh w-full overflow-x-hidden">
      <div className="mt-[3%] ml-17 mr-[1%] mb-8 md:p-5 md:mx-auto md:mb-10 md:mt-10 md:w-2/3 bg-white border-3 border-blue-950 rounded-lg shadow-xl/50">
        <div className="p-1 text-center"></div>

        <div className="md:px-[5%] px-[4%] flex justify-between items-center">
          <button
            onClick={() => spreekTekst(uitleg[huidig])}
            className="flex bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800 cursor-pointer mb-1 text-sm font-medium"
          >
            🔊 Voorlezen
          </button>
          <button
            onClick={handleWisSessie}
            className="text-xs text-red-500 hover:underline cursor-pointer"
          >
            Sessie wissen
          </button>
        </div>

        <div className="flex flex-col-reverse md:flex-row [@media(max-height:500px)]:flex-col-reverse! my-auto md:mx-10 max-w-[90%] mx-auto items-center gap-3 mt-3">
          <div className="bg-blue-100 mx-[1%] border-2 border-blue-900 shadow-xl/40 w-full h-full pt-[2%] pb-[10%] rounded-lg p-2 mb-4">
            <p className="md:text-lg text-sm md:text-left text-center text-gray-700">{uitleg[huidig]}</p>
          </div>
          <div className="w-full flex items-center justify-center bg-white border-2 border-blue-900 rounded-lg p-4 md:bg-transparent md:border-0 md:p-0 mb-4">
            <img
              src={cirkels[huidig]}
              alt="Cirkel"
              className="md:w-5/9 w-3/4 [@media(max-height:500px)]:w-1/2! mx-auto object-contain"
            />
          </div>
        </div>

        <div className="md:px-[5%] px-[4%]">
          {HuidigeVraag && <HuidigeVraag />}
        </div>

        {laadStatus && (
          <p className="text-center text-sm font-semibold text-red-600 mt-2">{laadStatus}</p>
        )}

        <div className="px-10 mt-6">
          <div className="flex mx-auto mb-10 gap-5 justify-center">
            <button
              onClick={() => setHuidig(huidig - 1)}
              disabled={huidig === 0}
              className="flex-1 bg-orange-400 border-3 opacity-100 border-blue-900 rounded-lg text-blue-950 mt-3 px-[15%] py-[2%] xl:px-30 xl:py-5 hover:bg-orange-300 disabled:bg-orange-400 disabled:border-blue-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-bold text-center"
            >
              Vorige
            </button>
            <button
              onClick={() => {
                if (huidig === 9) {
                  hanteerVersturen()
                } else {
                  setHuidig(huidig + 1)
                }
              }}
              disabled={!magNaarVolgende}
              className={`flex-1 border-3 rounded-lg text-blue-950 mt-3 px-[15%] py-[2%] xl:px-30 xl:py-5 font-bold text-center transition-all ${
                magNaarVolgende
                  ? 'bg-orange-400 hover:bg-orange-300 opacity-100 border-blue-900 cursor-pointer'
                  : 'bg-orange-400 border-blue-900 opacity-30 cursor-not-allowed'
              }`}
            >
              {huidig === 9 ? 'Verstuur' : 'Volgende'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}