import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import AdminShell from '../components/AdminShell'
import EmptyState from '../components/EmptyState'
import { getPendingSubmissions, rejectSubmission } from '../services/placeService'

function excerpt(value, max = 260) {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max)}...`
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setError('')
    try {
      const data = await getPendingSubmissions()
      setSubmissions(data)
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function reject(id) {
    const confirmed = window.confirm(
      'Reject this submission?\nThis will keep it as draft and mark it as rejected.\n\n确认拒绝这条投稿？\n它会保留为草稿，并标记为 rejected。',
    )
    if (!confirmed) return

    setError('')
    try {
      await rejectSubmission(id)
      await load()
    } catch (rejectError) {
      setError(rejectError.message)
    }
  }

  return (
    <AdminShell title="Submissions" eyebrow="Admin / Review">
      <section className="admin-actions">
        <Link className="button light" to="/admin/places">All Places</Link>
      </section>

      {error && <p className="form-error">{error}</p>}
      {loading ? (
        <EmptyState title="Loading submissions" note="Checking draft + submitted places..." />
      ) : submissions.length === 0 ? (
        <EmptyState title="No pending submissions" note="All public submissions have been reviewed." />
      ) : (
        <section className="submission-review-list">
          {submissions.map((place) => (
            <article key={place.id} className="submission-review-card">
              {place.imageUrl ? (
                <img src={place.imageUrl} alt={place.imageAlt || place.name} />
              ) : (
                <div className="submission-review-placeholder">No image</div>
              )}
              <div>
                <div className="admin-badges">
                  <span>{place.status}</span>
                  <span>{place.submissionStatus || 'submitted'}</span>
                  <span>{place.cityName || place.city?.name || 'No city'}</span>
                </div>
                <h2>{place.name}</h2>
                <p className="submission-review-meta">
                  {[place.type, place.area, place.createdAt ? new Date(place.createdAt).toLocaleString() : 'No created time'].filter(Boolean).join(' / ')}
                </p>
                <p>{excerpt(place.rawNote) || 'No raw note provided.'}</p>
              </div>
              <nav className="admin-row-actions">
                <Link to={`/admin/places/${place.id}/edit`}>Edit</Link>
                <button type="button" onClick={() => reject(place.id)}>Reject / 拒绝</button>
              </nav>
            </article>
          ))}
        </section>
      )}
    </AdminShell>
  )
}
