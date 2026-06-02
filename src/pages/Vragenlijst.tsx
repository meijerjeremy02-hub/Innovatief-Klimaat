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
import Paginatie from '../Components/Paginatie'
import { useVragen } from '../Components/VragenContext'
import Cirkelv1 from '../images/Cirkelv1.jpg'
import Cirkelv2 from '../images/Cirkelv2.jpg'
import Cirkelv3 from '../images/Cirkelv3.jpg'
import Cirkelv4 from '../images/Cirkelv4.jpg'
import Cirkelv5 from '../images/Cirkelv5.jpg'
import Cirkelv6 from '../images/Cirkelv6.jpg'
import Cirkelv7 from '../images/Cirkelv7.jpg'
import Cirkelv8 from '../images/Cirkelv8.jpg'
import Cirkelv9 from '../images/Cirkelv9.jpg'
import Cirkelv10 from '../images/Cirkelv10.jpg'

const vragen = [Vragen1, Vragen2, Vragen3, Vragen4, Vragen5, Vragen6, Vragen7, Vragen8, Vragen9, Vragen10]
const cirkels = [Cirkelv1, Cirkelv2, Cirkelv3, Cirkelv4, Cirkelv5, Cirkelv6, Cirkelv7, Cirkelv8, Cirkelv9, Cirkelv10]
const onderwerpen = ['Vrijheid', 'Ideesupport', 'Vertrouwen en openheid', 'Dynamiek en levendigheid', 'Speelsheid en humor', 'Dialoog', 'Risico nemen', 'Tijd voor ideen', 'Conflict', 'Uitdaging']

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

export default function Vragenlijst() {
  const { huidig, setHuidig } = useVragen()
  const navigate = useNavigate()
  const HuidigeVraag = vragen[huidig]

  return (
    <main className='min-w-full bg-linear-to-b from-orange-400 via-[#DECAB7] to-blue-900'>
      <div>
        <div className="ml-6.5 mr-4.5 mt-4 px-2 md:p-5 md:mx-auto md:mb-10 md:mt-25 md:w-2/3 bg-white border-3 border-blue-950 rounded-lg shadow-xl/50">
          <div className="p-1 text-center">
            <h1 className="text-6xl font-bold pb-8 pl-3">{onderwerpen[huidig]}</h1>
          </div>
          <div className="flex md:ml-25 my-auto mx-auto items-center gap-5">
            <div className="bg-blue-100 border-2 border-grey-500 shadow-xl/40 w-5/9 h-full pt-[2%] pb-[10%] rounded-lg p-3 mb-4">
              <p className="text-sm text-grey-700">{uitleg[huidig]}</p>
            </div>
            <img src={cirkels[huidig]} alt="Cirkel" className="w-5/9 mx-auto mb-4 object-contain" />
          </div>

          <div className="md:px-[15%]">
            <HuidigeVraag />
          </div>

          <div className="px-10 mt-6">
            <Paginatie />
            <div className="flex mx-auto mb-10 gap-5 justify-center">
              <button
                onClick={() => setHuidig(huidig - 1)}
                disabled={huidig === 0}
                className="flex-1 bg-orange-400 border-3 border-blue-900 rounded-lg text-blue-950 mt-3 px-[15%] py-[2%] xl:px-30 xl:py-5 hover:bg-orange-300 disabled:opacity-30 cursor-pointer"
              >
                Vorige
              </button>
              <button
                onClick={() => huidig === 9 ? navigate('/resultaten') : setHuidig(huidig + 1)}
                className="flex-1 bg-orange-400 border-3 border-blue-900 rounded-lg text-blue-950 mt-3 px-[15%] py-[2%] xl:px-30 xl:py-5 hover:bg-orange-300 cursor-pointer"
              >
                {huidig === 9 ? 'Verstuur' : 'Volgende'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}