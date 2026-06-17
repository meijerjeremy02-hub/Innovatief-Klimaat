import { useLocation } from "react-router"; // Of "react-router-dom"
import Paginatie from "./Paginatie";

export default function Oranje_Balk() {
  const location = useLocation();

  const isVragenlijst = location.pathname === "/vragenlijst";

  return (
    <div className="fixed top-0 left-0 h-full pl-1 py-1 z-40">
      <div className={`bg-orange-400 border-3 border-blue-900 h-full rounded-t-md rounded-bl-xl md:rounded-bl-lg rounded-br-0 p-1 transition-all duration-300 ${
        isVragenlijst ? "w-15 md:w-20" : "w-4"
      }`}>
        {isVragenlijst && <Paginatie />}
      </div>
    </div>
  );
}
