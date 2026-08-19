/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
// @ts-expect-error hij doet het gewoon, maar typescript vindt het niet
import Cookies from 'js-cookie'

// Type voor de antwoorden: { 1: { 0: 4, 1: 5 }, 2: { ... } }
type AntwoordenSessie = Record<number, Record<number, number>>

// Namen van de 10 dimensies uit de afbeelding (inclusief volgorde van de cirkel)
export const DIMENSIES: Record<number, string> = {
  1: "Vrijheid",
  2: "Ideesupport",
  3: "Vertrouwen & openheid",
  4: "Dynamiek & levendigheid",
  5: "Speelsheid & humor",
  6: "Dialoog",
  7: "Risico nemen",
  8: "Tijd voor ideeën",
  9: "Conflict",
  10: "Uitdaging"
}

interface VragenContextType {
  huidig: number
  setHuidig: (n: number) => void
  antwoorden: AntwoordenSessie
  setAntwoord: (vragenSetNummer: number, vraagIndex: number, waarde: number) => void
  wisSessie: () => void
  verstuurNaarBackend: () => Promise<{ succes: boolean; bericht: string }>
}

const VragenContext = createContext<VragenContextType>({
  huidig: 1, // Start direct bij set 1
  setHuidig: () => {},
  antwoorden: {},
  setAntwoord: () => {},
  wisSessie: () => {},
  verstuurNaarBackend: async () => ({ succes: false, bericht: '' })
})

export function VragenProvider({ children }: { children: React.ReactNode }) {
  const [huidig, setHuidig] = useState(1)

  const [antwoorden, setAntwoorden] = useState<AntwoordenSessie>(() => {
    const savedLocal = sessionStorage.getItem('enquete_antwoorden')
    if (savedLocal) return JSON.parse(savedLocal)

    const savedCookie = Cookies.get('enquete_cookies')
    if (savedCookie) return JSON.parse(savedCookie)

    return {}
  })

  useEffect(() => {
    const dataString = JSON.stringify(antwoorden)
    sessionStorage.setItem('enquete_antwoorden', dataString)
    Cookies.set('enquete_cookies', dataString, { secure: true, sameSite: 'strict' })
  }, [antwoorden])

  const setAntwoord = (vragenSetNummer: number, vraagIndex: number, waarde: number) => {
    setAntwoorden((prev) => ({
      ...prev,
      [vragenSetNummer]: {
        ...(prev[vragenSetNummer] || {}),
        [vraagIndex]: waarde,
      },
    }))
  }

  const wisSessie = () => {
    setAntwoorden({})
    sessionStorage.removeItem('enquete_antwoorden')
    Cookies.remove('enquete_cookies')
    setHuidig(1)
  }

  const verstuurNaarBackend = async () => {
    try {
      const response = await fetch('https://jouwwebsite.nl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          antwoorden: antwoorden,
          verzondenOp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Backend fout status.')

      wisSessie()
      return { succes: true, bericht: 'Alle antwoorden zijn succesvol verwerkt!' }
    } catch (error) {
      console.error(error)
      return { succes: false, bericht: 'Er ging iets mis bij het verzenden.' }
    }
  }

  return (
    <VragenContext.Provider value={{ 
      huidig, 
      setHuidig, 
      antwoorden, 
      setAntwoord, 
      wisSessie, 
      verstuurNaarBackend 
    }}>
      {children}
    </VragenContext.Provider>
  )
}

export function useVragen() {
  return useContext(VragenContext)
}
