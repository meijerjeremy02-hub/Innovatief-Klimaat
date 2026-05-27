import { Link } from 'react-router'
import Start_Afbeelding from '../Components/Start_Afbeelding'

export default function Home() {
  return (
    <div className="flex flex-wrap items-start ml-7">
      <div className="pr-3 w-full md:w-1/2">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl font-bold">
          Klimaat innovatie binnen het Deltion College
        </h1>
        <p className="text-sm font-medium mt-3 md:text-xl md:mt-6">
          Naast externe factoren is ook het klimaat binnen het Deltion College van invloed op de mate van succes bij innovatie.
          De Zweedse onderzoeker Göran Ekvall onderscheidt 10 dimensies van invloed zijn op het organisatieklimaat waarin innovatie plaats vindt.
          In deze vragenlijst ga je vragen beantwoorden om te zien hoe het binnen je groepje gaat maar ook hoe het bij andere groepjes gaat.
        </p>
        <p className="text-sm font-medium mt-4">
          De resultaten van deze vragenlijst worden anoniem verwerkt en kunnen gebruikt worden om het innovatieklimaat binnen het Deltion College te verbeteren.
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <Start_Afbeelding />
      </div>
      <div className="w-full md:w-1/2 flex justify-center mb-10">
        <Link
          to="/vragenlijst"
          className="block w-fit mx-auto mt-10 md:mt-40 md:ml-10 md:2xl lg:text-4xl xl:text-5xl md:px md:px-25 md:py-5 bg-orange-500 border-3 border-blue-900 rounded-lg text-white px-4 py-2 hover:bg-orange-800"
        >
          Start vragenlijst
        </Link>
      </div>
    </div>
  )
}