import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import AdminShell from '../components/AdminShell'
import EmptyState from '../components/EmptyState'
import { deleteCity, getAdminCities } from '../services/cityService'

export default function AdminCities() {
  const [cities, setCities] = useState([])
  const [error, setError] = useState('')

  async function load() {
    try {
      setCities(await getAdminCities())
    } catch (loadError) {
      setError(loadError.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id) {
    if (!window.confirm('Delete this city? Places linked to this city may block deletion.')) return
    try {
      await deleteCity(id)
      await load()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <AdminShell title="Cities">
      <section className="admin-actions">
        <Link className="button dark" to="/admin/cities/new">New City</Link>
      </section>
      {error && <p className="form-error">{error}</p>}
      {cities.length === 0 ? (
        <EmptyState title="No cities yet" note="Create the first city edition." />
      ) : (
        <section className="admin-table">
          {cities.map((city) => (
            <article key={city.id}>
              <div>
                <span>{city.status}</span>
                <h2>{city.name}</h2>
                <p>{city.slug} / {city.country || '—'} / {city.region || '—'}</p>
              </div>
              <div className="admin-row-actions">
                <Link to={`/admin/cities/${city.id}/edit`}>Edit</Link>
                <button onClick={() => remove(city.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </AdminShell>
  )
}
