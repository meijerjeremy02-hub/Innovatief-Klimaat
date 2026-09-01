// Components/Oranje_Balk.tsx
import { useLocation } from "react-router";
import Paginatie from "./Paginatie";

export default function Oranje_Balk() {
  const location = useLocation();
  const isVragenlijst = location.pathname === "/vragenlijst";

  return (
    <div className="grid row-start-1 row-span-3 pl-1 py-1 z-20 scrollbar-thumb-blue-900 scrollbar-track-orange-400 scrollbar-thin">
      <div
        className={`bg-orange-400 border-3 border-blue-900 h-full rounded-t-md rounded-bl-xl md:rounded-bl-lg rounded-br-0 p-1 transition-all duration-300 overflow-y-auto ${
          isVragenlijst ? "w-12 md:w-20" : "w-4"
        }`}
      >
        {isVragenlijst && <Paginatie />}
      </div>
    </div>
  );
}