import { useLocation } from "react-router"; // Of "react-router-dom"
import DeltionLogo from "../images/Deltion.png";

export default function Footer() {
  const location = useLocation();

  const isVragenlijst = location.pathname === "/vragenlijst";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-1 pointer-events-none z-50">
      <div className={`bg-orange-400 border-3 border-blue-900 border-l-0 rounded-r-md h-6 flex items-center justify-end pr-3 transition-all duration-600 ${
        isVragenlijst ? "ml-19.25 bg-orange-400 border-3 border-blue-900 border-l-0 rounded-r-md h-6 flex items-center justify-end pr-3" : "ml-3.25 bg-orange-400 border-3 border-blue-900 border-l-0 rounded-r-md h-6 flex items-center justify-end pr-3"
      }`}>
        <img src={DeltionLogo} alt="Deltion logo" className="h-4 md:h-5 pointer-events-auto" />
      </div>
    </div>
  );
}
