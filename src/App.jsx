import { Route, Routes, useLocation } from './lib/router'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Places from './pages/Places'
import CityPage from './pages/CityPage'
import PlaceDetail from './pages/PlaceDetail'
import RoutesPage from './pages/Routes'
import RouteDetail from './pages/RouteDetail'
import MoodFinder from './pages/MoodFinder'
import LocalTips from './pages/LocalTips'
import CustomPlan from './pages/CustomPlan'
import About from './pages/About'
import Recommend from './pages/Recommend'
import Submit from './pages/Submit'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCities from './pages/AdminCities'
import AdminCityForm from './pages/AdminCityForm'
import AdminPlaces from './pages/AdminPlaces'
import AdminPlaceForm from './pages/AdminPlaceForm'

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
          <Route path="/cities/:citySlug" element={<CityPage />} />
          <Route path="/cities/:citySlug/places/:placeSlug" element={<PlaceDetail />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:id" element={<RouteDetail />} />
          <Route path="/mood-finder" element={<MoodFinder />} />
          <Route path="/local-tips" element={<LocalTips />} />
          <Route path="/custom-plan" element={<CustomPlan />} />
          <Route path="/about" element={<About />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cities" element={<AdminCities />} />
          <Route path="/admin/cities/new" element={<AdminCityForm />} />
          <Route path="/admin/cities/:id/edit" element={<AdminCityForm />} />
          <Route path="/admin/places" element={<AdminPlaces />} />
          <Route path="/admin/places/new" element={<AdminPlaceForm />} />
          <Route path="/admin/places/:id/edit" element={<AdminPlaceForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
