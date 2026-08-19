const borderKleur = ['border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800']

interface VraagRijProps {
  tekst: string;
  waarde: number | null;
  onAntwoordChange: (n: number) => void;
}

export default function VraagRij({ tekst, waarde, onAntwoordChange }: VraagRijProps) {
  return (
    <div className="border border-blue-950 p-3 text-center bg-white rounded shadow-sm">
      <span className="text-md text-blue-950 font-medium">{tekst}</span>
      <div className="flex items-center gap-1 sm:gap-3 mt-2">
        <h1 className="shrink-0 w-12 sm:w-16 text-blue-400 text-xs sm:text-base text-left">oneens</h1>
        <div className="flex flex-1 justify-between text-center gap-1 sm:gap-3 md:mx-auto">
          {[1, 2, 3, 4, 5].map((n, i) => (
            <button
              key={n}
              type="button"
              onClick={() => onAntwoordChange(n)}
              className={`shrink-0 w-[20%] h-7 sm:w-1/6 sm:h-8 rounded-full border-2 ${borderKleur[i]} text-xs font-medium transition-colors cursor-pointer ${waarde === n ? 'bg-orange-400 text-white border-orange-400' : 'bg-white'}`}
            >
              {n}
            </button>
          ))}
        </div>
        <h1 className="shrink-0 w-12 text-right sm:w-16 text-blue-900 text-xs sm:text-base md:mx-auto">eens</h1>
      </div>
    </div>
  )
}
