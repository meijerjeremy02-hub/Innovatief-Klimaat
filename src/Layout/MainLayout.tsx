// Layout/MainLayout.tsx
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'

export default function MainLayout() {
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