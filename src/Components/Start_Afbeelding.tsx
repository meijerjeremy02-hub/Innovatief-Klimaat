import Cirkel1 from '../images/Cirkel1.jpg'

export default function Start_Afbeelding() {
  return (
    <div className="flex flex-col items-center">
      <img src={Cirkel1} alt="Cirkel met alle onderdelen" className="w-65 md:w-full md:max-w-lg rounded-full" />
      <p className="text-[7px] font-medium md:text-[15px] text-center -mt-7 md:-mt-17">
        De werkelijke motor van vooruitgang is de manier waarop we naar verandering kijken. Jeff Gaspersz (professor of Innovation and Business Creativity, Nyenrode Business Universiteit – Erasmus Universiteit Rotterdam)
      </p>
    </div>
  )
}