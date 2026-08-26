import { Outlet, useNavigate } from 'react-router'
import { useEffect, useRef } from 'react'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'

export default function MainLayout() {
  const navigate = useNavigate()
  const pressCount = useRef(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // negeer als je in een input/textarea/select typt
      const target = e.target as HTMLElement
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
      if (isTyping) return

      if (e.code === 'Space' && e.shiftKey) {
        e.preventDefault() // voorkomt scrollen bij spatie
        pressCount.current += 1

        if (resetTimer.current) clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => {
          pressCount.current = 0
        }, 1500) // reset als je te langzaam drukt

        if (pressCount.current >= 5) {
          pressCount.current = 0
          navigate('/admin')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [navigate])

  return (
    <main className="relative min-h-dvh grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] bg-linear-to-b from-orange-400 via-[#DECAB7] to-blue-900 overflow-x-hidden md:scrollbar-thumb-blue-900 md:scrollbar-track-gray-200">
      <div className="absolute top-0" id="top"></div>
      <Orange_Balk />
      <div className="col-start-2 row-start-2 flex flex-row">
        <Outlet />
      </div>
      <div className="col-start-2 col-span-2 row-start-3">
        <Footer />
      </div>
    </main>
  )
}