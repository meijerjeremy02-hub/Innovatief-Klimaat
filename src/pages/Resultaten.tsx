import { Link } from 'react-router'
import Resultaten_Cirkel from '../Components/resultaten_cirkel'

export default function RESULTATEN() {
  return (
  <div className="flex flex-col flex-1 mt-10 border-2 border-blue-900  bg-white rounded-lg mb-15 ml-6 md:ml-10 md:mr-10">
    <div className="flex flex-col p-1.5 md:p-5 min-h-screen text-center w-full gap-6">
      <h1 className="text-4xl font-bold">
        resultaten
      </h1>
      <p className="text-center text-lg w-full max-w-6/8 mx-auto">
        Op basis van jouw antwoorden hebben we een overzicht gemaakt van de sterke punten en ontwikkelpunten binnen jouw team. Door met de muis over deze overizchten te bewegen of door op de overzichten te klikken krijg je de resultaten te zien van jouw team en de gemiddelde resultaten van alle teams die de vragenlijst hebben ingevuld. Deze inzichten kunnen je helpen om te begrijpen waar jullie als team goed in zijn en waar nog ruimte is voor groei en verbetering.
      </p>
      <div className="md:flex mx-auto w-full mt-10">
        <div className="flex-1 flex-col gap-6">
        <Resultaten_Cirkel />   
        </div>
      </div>
      
      <Link
        to="/"
        className="mt-4 w-3/5 text-lg mx-auto inline-block text-center bg-orange-400 border-2 border-blue-900 rounded-lg text-white px-5 py-4 transition-colors hover:bg-orange-500"
      >
        Terug naar home
      </Link>
    </div>
  </div>
  )
}