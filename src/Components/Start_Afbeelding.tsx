import Cirkel1 from '../images/Cirkel1.jpg'

export default function Start_Afbeelding() {
  return (
    <div className="flex flex-col max-w-100">
      <img src={Cirkel1} alt="Cirkel met alle onderdelen" className="w-65 md:w-full md:max-w-lg rounded-full" />
      <p className="text-[8px] font-medium text-center md:text-[14px] -mt-7 md:-mt-14">
        De werkelijke motor van vooruitgang is de manier waarop we naar verandering kijken. Jeff Gaspersz (professor of Innovation and Business Creativity, Nyenrode Business Universiteit – Erasmus Universiteit Rotterdam)
      </p>
    </div>
  )
}