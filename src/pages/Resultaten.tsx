import { Link } from 'react-router'
import Resultaten_Cirkel from '../Components/resultaten_cirkel'

export default function RESULTATEN() {
  return (
<div className='bg-linear-to-b from-orange-400 via-[#DECAB7] to-blue-900'>
  <div className="flex flex-col flex-1 mt-10 border-2 border-blue-900  bg-white rounded-lg mb-15 ml-6 md:ml-10 md:mr-10">
    <div className="flex flex-col p-1.5 md:p-5 min-h-screen text-center w-full gap-6">
      <h1 className="ml-16 text-4xl font-bold">
        Resultaten
      </h1>
      <p className="text-center text-lg max-w-9/10 mx-auto">
        Op basis van jouw antwoorden hebben we een overzicht gemaakt van de sterke punten en ontwikkelpunten binnen jouw team. Door met de muis over deze overizchten te bewegen of door op de overzichten te klikken krijg je de resultaten te zien van jouw team en de gemiddelde resultaten van alle teams die de vragenlijst hebben ingevuld. Deze inzichten kunnen je helpen om te begrijpen waar jullie als team goed in zijn en waar nog ruimte is voor groei en verbetering.
      </p>
      <div className="md:flex md:w-9/10 mx-auto w-full mt-10 p-6 border-2 border-blue-900 bg-blue-50 rounded-lg">
        <div className="flex-1 flex-col gap-6">
         <p className="hidden md:block text-center text-2xl font-bold">Het gemiddelde van jouw team</p>
        <Resultaten_Cirkel />   
        </div>
        <div className="hidden md:block flex-1 flex-col gap-6">
        <p className="hidden md:block text-center text-2xl font-bold">Het gemiddelde van alle teams</p>
        <Resultaten_Cirkel />
        </div>
      </div>
      
      <Link
        to="/"
        className="mt-4 text-lg max-w-xs inline-block text-center bg-orange-400 border-2 border-blue-900 rounded-lg text-white px-5 py-4 transition-colors hover:bg-orange-500"
      >
        Terug naar home
      </Link>
    </div>
  </div>
</div>
  )
}