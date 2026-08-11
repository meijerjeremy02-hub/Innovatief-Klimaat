import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function MainLayout() {

  const {pathname} = useLocation();

  useEffect(() => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'instant' })
  }, [pathname]);

  return (
    <main className="min-h-dvh bg-linear-to-b from-orange-400 via-[#DECAB7] to-blue-900 overflow-x-hidden">
      <div className="anchor top-0" id="top"></div>
      <Orange_Balk/>
      <Outlet />
      <Footer />
    </main>
  )
}