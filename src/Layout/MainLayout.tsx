import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'

export default function MainLayout() {
  return (
    <main className="min-h-screen bg-linear-to-b from-orange-400 via-[#DECAB7] to-blue-900 overflow-x-hidden">
      <Orange_Balk/>
      <Outlet />
      <Footer />
    </main>
  )
}