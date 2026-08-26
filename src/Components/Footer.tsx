// Components/Footer.tsx
import DeltionLogo from "../images/Deltion.png";

export default function Footer() {
  return (
      <div className="relative -ml-0.75 mb-1 z-40 bg-orange-400 border-3 border-blue-900 border-l-0 rounded-r-md h-6 flex items-center justify-end pr-3 transition-all duration-600">
        <img
          src={DeltionLogo}
          alt="Deltion logo"
          className="h-full md:h-full pointer-events-auto"
        />
      </div>
  );
}