import DelftionLogo from '../images/Deltion.png'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-1 pointer-events-none z-50">
      <div className="ml-4 bg-orange-400 border-3 border-blue-900 border-l-0 rounded-r-md h-6 flex items-center justify-end pr-3">
        <img src={DelftionLogo} alt="Deltion logo" className="h-4 md:h-5 pointer-events-auto" />
      </div>
    </footer>
  )
}