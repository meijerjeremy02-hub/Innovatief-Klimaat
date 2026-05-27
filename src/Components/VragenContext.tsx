/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
const VragenContext = createContext<{ huidig: number; setHuidig: (n: number) => void }>({
  huidig: 0,
  setHuidig: () => {},
})
export function VragenProvider({ children }: { children: React.ReactNode }) {
  const [huidig, setHuidig] = useState(0)
  return (
    <VragenContext.Provider value={{ huidig, setHuidig }}>
      {children}
    </VragenContext.Provider>
  )
}
export function useVragen() {
  return useContext(VragenContext)
}