import { Route, Routes, useLocation } from './lib/router'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Places from './pages/Places'
import PlaceDetail from './pages/PlaceDetail'
import RoutesPage from './pages/Routes'
import RouteDetail from './pages/RouteDetail'
import MoodFinder from './pages/MoodFinder'
import LocalTips from './pages/LocalTips'
import CustomPlan from './pages/CustomPlan'
import About from './pages/About'
import Recommend from './pages/Recommend'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:id" element={<RouteDetail />} />
          <Route path="/mood-finder" element={<MoodFinder />} />
          <Route path="/local-tips" element={<LocalTips />} />
          <Route path="/custom-plan" element={<CustomPlan />} />
          <Route path="/about" element={<About />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
