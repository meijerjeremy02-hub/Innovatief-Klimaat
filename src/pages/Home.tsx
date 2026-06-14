import { Link } from 'react-router'
import Start_Afbeelding from '../Components/Start_Afbeelding'

export default function Home() {
  return (
    <div className="px-6 md:px-10 pt-6">
      <div className="min-h-[calc(100vh-70px)] border-2 border-blue-900 bg-linear-to-r from-gray-300 via-white to-white rounded-lg">
        <div className="ml-4 flex flex-col gap-2 p-3">
          <div className="flex-1 md:max-w-1/2">
            <h1 className="text-4xl font-bold mb-5 md:max-w-2/3">
              Innovatief Vermogen binnen Deltion College
            </h1>
          </div>
        <div className="flex flex-col md:flex-row">
          <div className="gap-4 flex flex-col w-2/3">
            <p className="text-xl md:max-w-9/10">
              Binnen het Deltion College zien we innovatie als het resultaat van samenspel tussen verschillende kapitalen, waarbij het sociaal kapitaal een belangrijke motor is. Geen budget, uren of roadmap weegt op tegen de manier waarop teams samen beweging creëren (Gaspersz, 2026).
            </p>
            <p className="text-xl md:max-w-9/10">
              De innovatiescan, ontwikkeld binnen het programma Innovatieve Omgeving, helpt teams inzicht te krijgen op tien dimensies (Ekvall, 2016) die van invloed zijn op het innovatief vermogen en hierop taal te ontwikkelen. Daarom is de scan daarmee niet alleen een meetinstrument, maar vooral het startpunt voor een open gesprek om tot concrete acties en gedeeld eigenaarschap te komen.
            </p>
            <p className="text-xl md:max-w-9/10">
              Zo kan men samen bouwen aan het innovatief vermogen van het team en daarbij ook die van heel het Deltion.
            </p>
            <h2 className="text-3xl font-bold my-20">
              Docententeam:(docententeam)
            </h2>
          </div>
          <Start_Afbeelding />
        </div>
      </div>
        <div className="flex-1 mx-20 mb-6">
          <Link
            to="/vragenlijst"
            className="mt-4 text-md md:text-3xl max-w-md inline-block text-center bg-orange-400 border-2 border-blue-900 rounded-lg text-white px-5 py-4 transition-colors hover:bg-orange-500"
          >
            Start de vragenlijst
          </Link>
          </div>
        </div>
      </div>
  )
}