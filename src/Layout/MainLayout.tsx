import { Outlet, useLocation } from 'react-router'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'
import Paginatie from '../Components/Paginatie'

export default function MainLayout() {
  const location = useLocation()
  const opVragenlijst = location.pathname === '/vragenlijst'

  return (

  

<main className="flex ">
          <Outlet />
          <Orange_Balk />
          {opVragenlijst && (
            <div className="hidden md:block">
              <Paginatie />
            </div>
          )}



        <Footer />
        </main>
  )
}