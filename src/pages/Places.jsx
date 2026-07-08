import { useMemo, useState } from 'react'
import PlaceCard from '../components/PlaceCard'
import { allBestFor, allMoodTags, places, placeTypes } from '../data/places'

const friendlyLevels = ['All', 'High', 'Medium', 'Low']

function matches(value, active) {
  return active === 'All' || value === active
}

export default function Places() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [mood, setMood] = useState('All')
  const [bestFor, setBestFor] = useState('All')
  const [friendly, setFriendly] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return places.filter((place) => {
      const text = [
        place.name,
        place.type,
        place.area,
        place.shortDescription,
        place.whySoulful,
        ...place.moodTags,
        ...place.freeSoulTags,
        ...place.bestFor,
      ].join(' ').toLowerCase()

      return (
        (!q || text.includes(q)) &&
        matches(place.type, type) &&
        (mood === 'All' || place.moodTags.includes(mood)) &&
        (bestFor === 'All' || place.bestFor.includes(bestFor)) &&
        matches(place.foreignerFriendly, friendly)
      )
    })
  }, [query, type, mood, bestFor, friendly])

  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Places</p>
        <h1>Free Soul Places in Dalian</h1>
        <p>Browse local-curated shops, record corners, bars, sea walks, book rooms, food spots, creative spaces, and small places with real atmosphere.</p>
      </header>

      <section className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records, sea walks, vintage rooms, quiet bars..." />
        <div className="filter-row">
          <span>Type</span>
          {['All', ...placeTypes].map((item) => <button key={item} className={type === item ? 'active' : ''} onClick={() => setType(item)}>{item}</button>)}
        </div>
        <div className="filter-row">
          <span>Mood</span>
          {['All', ...allMoodTags].map((item) => <button key={item} className={mood === item ? 'active' : ''} onClick={() => setMood(item)}>{item}</button>)}
        </div>
        <div className="filter-row">
          <span>Best for</span>
          {['All', ...allBestFor.slice(0, 18)].map((item) => <button key={item} className={bestFor === item ? 'active' : ''} onClick={() => setBestFor(item)}>{item}</button>)}
        </div>
        <div className="filter-row">
          <span>Foreigner</span>
          {friendlyLevels.map((item) => <button key={item} className={friendly === item ? 'active' : ''} onClick={() => setFriendly(item)}>{item}</button>)}
        </div>
      </section>

      <p className="result-line">{filtered.length} places found / Dalian first edition</p>
      {filtered.length ? (
        <section className="section-shell">
          <div className="masonry-grid">
            {filtered.map((place, index) => <PlaceCard key={place.id} place={place} index={index} />)}
          </div>
        </section>
      ) : (
        <section className="empty-state">
          <h2>This street has not been recorded yet.</h2>
          <p>Try another mood, type, or keyword.</p>
        </section>
      )}
    </div>
  )
}
