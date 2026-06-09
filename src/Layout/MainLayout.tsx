import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Orange_Balk from '../Components/Oranje_Balk'

export default function MainLayout() {
  return (

<main className="flex ">
          <Outlet />
          <Orange_Balk />
          )



        <Footer />
        </main>
  )
}