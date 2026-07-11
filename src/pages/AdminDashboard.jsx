import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import AdminShell from '../components/AdminShell'
import EmptyState from '../components/EmptyState'
import { getAdminCities } from '../services/cityService'
import { getAdminPlaces } from '../services/placeService'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ cities: 0, places: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setError('')
        const [cities, places] = await Promise.all([getAdminCities(), getAdminPlaces()])
        if (!mounted) return
        setCounts({ cities: cities.length, places: places.length })
      } catch (loadError) {
        console.error('Failed to load admin dashboard:', loadError)
        if (mounted) setError(loadError.message || 'Failed to load CMS data.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <AdminShell title="Free Soul Atlas CMS">
      {loading && <EmptyState title="Loading CMS data" note="Checking cities and places..." />}
      {error && <p className="form-error">{error}</p>}
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
