import { useEffect, useMemo, useState } from 'react'
import { Link } from '../lib/router'
import AdminShell from '../components/AdminShell'
import EmptyState from '../components/EmptyState'
import { getAdminCities } from '../services/cityService'
import { deletePlace, getAdminPlaces } from '../services/placeService'

export default function AdminPlaces() {
  const [places, setPlaces] = useState([])
  const [cities, setCities] = useState([])
  const [cityId, setCityId] = useState('All')
  const [error, setError] = useState('')

  async function load() {
    try {
      const [placeData, cityData] = await Promise.all([getAdminPlaces(), getAdminCities()])
      setPlaces(placeData)
      setCities(cityData)
    } catch (loadError) {
      setError(loadError.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return cityId === 'All' ? places : places.filter((place) => place.city_id === cityId)
  }, [places, cityId])

  async function remove(id) {
    if (!window.confirm('Delete this place?')) return
    try {
      await deletePlace(id)
      await load()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <AdminShell title="Places">
      <section className="admin-actions">
        <Link className="button dark" to="/admin/places/new">New Place</Link>
        <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
          <option value="All">All cities</option>
          {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
        </select>
      </section>
      {error && <p className="form-error">{error}</p>}
      {filtered.length === 0 ? (
        <EmptyState title="No places yet" note="Create real places from the CMS." />
      ) : (
        <section className="admin-table">
          {filtered.map((place) => (
            <article key={place.id}>
              <div>
                <div className="admin-badges">
                  <span>{place.status}</span>
                  <span>{place.submissionStatus || 'editorial'}</span>
                  <span>{place.cityName || place.city?.name || 'No city'}</span>
                </div>
                <h2>{place.name}</h2>
                <p>{place.slug} / {place.type || '—'} / {place.area || '—'}</p>
              </div>
              <div className="admin-row-actions">
                <Link to={`/admin/places/${place.id}/edit`}>Edit</Link>
                <button onClick={() => remove(place.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </AdminShell>
  )
}
