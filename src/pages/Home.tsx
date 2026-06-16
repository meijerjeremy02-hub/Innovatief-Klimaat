import { Link } from 'react-router'
import Start_Afbeelding from '../Components/Start_Afbeelding'

export default function Home() {
  return (
    <div className="px-3 sm:px-6 lg:px-12 py-3 h-[calc(100vh-40px)] overflow-hidden">
      <div className="h-full border-2 border-blue-900 rounded-lg bg-linear-to-r from-transparent via-white to-white shadow-[-20px_0_70px_rgba(0,0,0,0.4)] flex flex-col">
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-4 max-w-3xl">
            Innovatief Vermogen binnen Deltion College
          </h1>
          <div className="flex flex-1 flex-col lg:flex-row gap-6 items-center lg:items-start">
            <div className="flex flex-col flex-1 justify-between">
              <div className="space-y-4">
                <p className="text-base md:text-lg xl:text-xl leading-relaxed">
                  Binnen het Deltion College zien we innovatie als het resultaat
                  van samenspel tussen verschillende kapitalen, waarbij het
                  sociaal kapitaal een belangrijke motor is. Geen budget, uren
                  of roadmap weegt op tegen de manier waarop teams samen
                  beweging creëren (Gaspersz, 2026).
                </p>
                <p className="text-base md:text-lg xl:text-xl leading-relaxed">
                  De innovatiescan, ontwikkeld binnen het programma Innovatieve
                  Omgeving, helpt teams inzicht te krijgen op tien dimensies
                  (Ekvall, 2016) die van invloed zijn op het innovatief vermogen
                  en hierop taal te ontwikkelen. Daarom is de scan daarmee niet
                  alleen een meetinstrument, maar vooral het startpunt voor een
                  open gesprek om tot concrete acties en gedeeld eigenaarschap
                  te komen.
                </p>
                <p className="text-base md:text-lg xl:text-xl leading-relaxed">
                  Zo kan men samen bouwen aan het innovatief vermogen van het
                  team en daarbij ook die van heel het Deltion.
                </p>
              </div>

              <h2 className="text-xl md:text-2xl xl:text-3xl font-bold mt-8">
                Docententeam: (docententeam)
              </h2>
            </div>
            <div className="flex justify-center items-center shrink-0 w-full lg:w-auto">
              <div className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                <Start_Afbeelding />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-10 pb-10">
          <Link
            to="/vragenlijst"
            className="inline-block rounded-lg border-2 border-blue-900 bg-orange-400 px-6 py-3 text-lg md:text-4xl text-white transition-colors hover:bg-orange-500"
          >
            Start de vragenlijst
          </Link>
        </div>
      </div>
    </div>
  )
}