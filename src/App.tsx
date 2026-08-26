import { Routes, Route } from 'react-router'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home'
import Vragenlijst from './pages/Vragenlijst'
import Resultaten from './pages/Resultaten'
import { VragenProvider } from './Components/VragenContext'
import Admin from './pages/admin'

export default function App() {
  return (
    <VragenProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vragenlijst" element={<Vragenlijst />} />
          <Route path="/resultaten" element={<Resultaten />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </VragenProvider>
  )
}