import { useEffect, useState } from 'react'
import { Link, useParams } from '../lib/router'
import AdminShell from '../components/AdminShell'
import { getAdminCity, saveCity } from '../services/cityService'
import { slugify } from '../services/formatters'
import { uploadPlaceImage } from '../services/storageService'

const initialForm = {
  slug: '',
  name: '',
  country: 'China',
  region: '',
  subtitle: '',
  description: '',
  editorial_note: '',
  status: 'draft',
  sort_order: 0,
  is_featured: false,
  cover_image_url: '',
  cover_image_path: '',
  cover_image_alt: '',
}

const publishedRequiredFields = [
  ['name', 'Name'],
  ['slug', 'Slug'],
  ['country', 'Country'],
  ['status', 'Status'],
  ['subtitle', 'Subtitle'],
]

function requiredLabel(text) {
  return (
    <>
      {text} <span className="field-required">Required</span>
    </>
  )
}

function missingPublishedFields(form) {
  if (form.status !== 'published') return []
  return publishedRequiredFields
    .filter(([field]) => !String(form[field] || '').trim())
    .map(([, label]) => label)
}

export default function AdminCityForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editing) return
    async function load() {
      try {
        const city = await getAdminCity(id)
        if (city) {
          setForm({
            slug: city.slug || '',
            name: city.name || '',
            country: city.country || '',
            region: city.region || '',
            subtitle: city.subtitle || '',
            description: city.description || '',
            editorial_note: city.editorial_note || city.editorialNote || '',
            status: city.status || 'draft',
            sort_order: city.sort_order ?? city.sortOrder ?? 0,
            is_featured: Boolean(city.is_featured ?? city.isFeatured),
            cover_image_url: city.cover_image_url || city.coverImageUrl || '',
            cover_image_path: city.cover_image_path || city.coverImagePath || '',
            cover_image_alt: city.cover_image_alt || city.coverImageAlt || '',
          })
        }
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [editing, id])

  function update(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'name' && !editing && !current.slug) next.slug = slugify(value)
      return next
    })
  }

  async function submit(event) {
    event.preventDefault()
    setError('')

    const missing = missingPublishedFields(form)
    if (missing.length > 0) {
      setError(`To publish this city, complete: ${missing.join(', ')}.`)
      return
    }

    setSaving(true)
    try {
      const payload = {
        ...form,
        sort_order: Number(form.sort_order || 0),
      }
      let saved = await saveCity(payload, id)
      if (file) {
        const uploaded = await uploadPlaceImage(file, `cities/${saved.id}`)
        saved = await saveCity({
          cover_image_url: uploaded.url,
          cover_image_path: uploaded.path,
          cover_image_alt: form.cover_image_alt || form.name,
        }, saved.id)
      }
      window.location.href = '/admin/cities'
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell title={editing ? 'Edit City' : 'New City'}>
      {loading ? <p>Loading...</p> : (
        <form className="editorial-form admin-form structured-form" onSubmit={submit} noValidate>
          <p className="form-intro">Published cities need the basic identity fields. Draft and coming soon cities can be saved with incomplete notes.</p>
          {error && <p className="form-error">{error}</p>}

          <section className="form-section required-section">
            <header>
              <span>A.</span>
              <div>
                <h2>Required / 必填基础信息</h2>
                <p>These fields are required only when status is published.</p>
              </div>
            </header>
            <div className="form-section-grid">
              <label>{requiredLabel('Name')}<input value={form.name} onChange={(event) => update('name', event.target.value)} /></label>
              <label>{requiredLabel('Slug')}<input value={form.slug} onChange={(event) => update('slug', slugify(event.target.value))} /></label>
              <label>{requiredLabel('Country')}<input value={form.country} onChange={(event) => update('country', event.target.value)} /></label>
              <label>{requiredLabel('Status')}<select value={form.status} onChange={(event) => update('status', event.target.value)}><option>draft</option><option>published</option><option>coming_soon</option></select></label>
              <label className="wide">{requiredLabel('Subtitle')}<input value={form.subtitle} onChange={(event) => update('subtitle', event.target.value)} /></label>
            </div>
          </section>

          <details className="form-section">
            <summary>
              <span>B. Optional / 可选信息</span>
              <small>Region, longer copy, cover image, ordering, and feature controls.</small>
            </summary>
            <div className="form-section-grid">
              <label>Region<input value={form.region} onChange={(event) => update('region', event.target.value)} /></label>
              <label className="wide">Description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} /></label>
              <label className="wide">Editorial note<textarea value={form.editorial_note} onChange={(event) => update('editorial_note', event.target.value)} /></label>
              <label>Cover image<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
              <label className="wide">Cover image alt<input value={form.cover_image_alt} onChange={(event) => update('cover_image_alt', event.target.value)} /></label>
              <label>Sort order<input type="number" value={form.sort_order} onChange={(event) => update('sort_order', event.target.value)} /></label>
              <label className="check-label"><input type="checkbox" checked={form.is_featured} onChange={(event) => update('is_featured', event.target.checked)} /> Featured city</label>
              {form.cover_image_url && <p className="form-note">Current image: {form.cover_image_url}</p>}
            </div>
          </details>

          <div className="form-actions">
            <button className="button dark" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save City'}</button>
            <Link className="button light" to="/admin/cities">Cancel</Link>
          </div>
        </form>
      )}
    </AdminShell>
  )
}
