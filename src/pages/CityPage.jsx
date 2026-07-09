import { useEffect, useMemo, useState } from 'react'
import { useParams } from '../lib/router'
import EmptyState from '../components/EmptyState'
import PlaceCard from '../components/PlaceCard'
import VisualBlock from '../components/VisualBlock'
import { getPublishedCityBySlug } from '../services/cityService'
import { getPublishedPlacesByCity } from '../services/placeService'

function uniqueFromPlaces(places, key) {
  return [...new Set(places.flatMap((place) => place[key] || []))].filter(Boolean)
}

export default function CityPage() {
  const { citySlug } = useParams()
  const [city, setCity] = useState(null)
  const [places, setPlaces] = useState([])
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [mood, setMood] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const cityData = await getPublishedCityBySlug(citySlug)
        if (!cityData) {
          if (mounted) {
            setCity(null)
            setPlaces([])
          }
          return
        }
        const placeData = await getPublishedPlacesByCity(cityData.id)
        if (mounted) {
          setCity(cityData)
          setPlaces(placeData)
        }
      } catch (loadError) {
        if (mounted) setError(loadError.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [citySlug])

  const placeTypes = useMemo(() => [...new Set(places.map((place) => place.type).filter(Boolean))], [places])
  const moodTags = useMemo(() => uniqueFromPlaces(places, 'moodTags'), [places])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return places.filter((place) => {
      const text = [
        place.name,
        place.type,
        place.area,
        place.shortDescription,
        place.whySoulful,
        ...(place.moodTags || []),
        ...(place.freeSoulTags || []),
        ...(place.bestFor || []),
      ].join(' ').toLowerCase()

      return (
        (!q || text.includes(q)) &&
        (type === 'All' || place.type === type) &&
        (mood === 'All' || (place.moodTags || []).includes(mood))
      )
    })
  }, [places, query, type, mood])

  if (loading) return <div className="page"><EmptyState title="内容正在采集中" note="Loading this city edition..." /></div>
  if (error) return <div className="page"><EmptyState title="内容正在采集中" note={error} /></div>
  if (!city) return <div className="page"><EmptyState title="内容正在采集中" note="This city edition is not published yet." /></div>

  return (
    <div className="page city-page">
      <header className="place-detail-hero city-hero">
        <VisualBlock
          tone="paper"
          label="City Edition"
          meta={city.country || 'Free Soul Atlas'}
          imageUrl={city.coverImageUrl}
          imageAlt={city.coverImageAlt || city.name}
        />
        <div className="detail-intro">
          <p className="eyebrow">{city.region || city.country || 'City'} / {city.status}</p>
          <h1>{city.name}</h1>
          <p>{city.subtitle || city.description}</p>
          {city.editorialNote && <p>{city.editorialNote}</p>}
        </div>
      </header>

      <section className="filters city-filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${city.name} places...`} />
        <div className="filter-row">
          <span>Type</span>
          {['All', ...placeTypes].map((item) => <button key={item} className={type === item ? 'active' : ''} onClick={() => setType(item)}>{item}</button>)}
        </div>
        <div className="filter-row">
          <span>Mood</span>
          {['All', ...moodTags].map((item) => <button key={item} className={mood === item ? 'active' : ''} onClick={() => setMood(item)}>{item}</button>)}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-title">
          <span>{String(filtered.length).padStart(2, '0')} / Places</span>
          <h2>{city.name} archive</h2>
        </div>
        {places.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <EmptyState title="内容正在采集中" note="No published place matches this filter yet." />
        ) : (
          <div className="masonry-grid">
            {filtered.map((place, index) => <PlaceCard key={place.id} place={place} index={index} />)}
          </div>
        )}
      </section>
    </div>
  )
}
