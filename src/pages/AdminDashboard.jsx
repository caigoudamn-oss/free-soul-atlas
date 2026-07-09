import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import AdminShell from '../components/AdminShell'
import { getAdminCities } from '../services/cityService'
import { getAdminPlaces } from '../services/placeService'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ cities: 0, places: 0 })

  useEffect(() => {
    async function load() {
      const [cities, places] = await Promise.all([getAdminCities(), getAdminPlaces()])
      setCounts({ cities: cities.length, places: places.length })
    }
    load().catch(() => {})
  }, [])

  return (
    <AdminShell title="Free Soul Atlas CMS">
      <section className="admin-stats">
        <div><span>Cities</span><strong>{counts.cities}</strong></div>
        <div><span>Places</span><strong>{counts.places}</strong></div>
      </section>
      <section className="admin-actions">
        <Link className="button dark" to="/admin/cities/new">New City</Link>
        <Link className="button light" to="/admin/places/new">New Place</Link>
      </section>
    </AdminShell>
  )
}
