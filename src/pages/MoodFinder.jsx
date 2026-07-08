import { useMemo, useState } from 'react'
import PlaceCard from '../components/PlaceCard'
import RouteCard from '../components/RouteCard'
import { places } from '../data/places'
import { localRoutes } from '../data/routes'

const energyOptions = ['quiet', 'curious', 'night', 'sea', 'warm', 'raw']
const planOptions = ['solo browsing', 'music discovery', 'walking alone', 'local dinner', 'visual references', 'quiet drinks']

export default function MoodFinder() {
  const [energy, setEnergy] = useState('quiet')
  const [plan, setPlan] = useState('solo browsing')

  const matchedPlaces = useMemo(() => {
    return places
      .filter((place) => place.moodTags.includes(energy) || place.bestFor.includes(plan))
      .slice(0, 6)
  }, [energy, plan])

  const matchedRoutes = useMemo(() => {
    return localRoutes
      .filter((route) => route.moodTags.includes(energy) || route.bestFor.includes(plan))
      .slice(0, 2)
  }, [energy, plan])

  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Mood Finder</p>
        <h1>Find a route by mood, not by checklist.</h1>
        <p>Choose the energy you have today. Free Soul Atlas will suggest places and routes that match your pace.</p>
      </header>

      <section className="mood-form">
        <div className="choice-group">
          <h2>What kind of energy do you want?</h2>
          <div>
            {energyOptions.map((option) => (
              <button key={option} className={energy === option ? 'active' : ''} onClick={() => setEnergy(option)}>{option}</button>
            ))}
          </div>
        </div>
        <div className="choice-group">
          <h2>What do you feel like doing?</h2>
          <div>
            {planOptions.map((option) => (
              <button key={option} className={plan === option ? 'active' : ''} onClick={() => setPlan(option)}>{option}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="mood-result">
        <div className="result-explainer">
          <div>
            <span>Current mood</span>
            <p>{energy} / {plan}</p>
          </div>
          <div>
            <span>How it works</span>
            <p>Simple mock matching by mood tags and best-for tags. Ready to migrate into Supabase later.</p>
          </div>
        </div>

        {matchedRoutes.length > 0 && (
          <div className="route-list">
            {matchedRoutes.map((route, index) => <RouteCard key={route.id} route={route} index={index} />)}
          </div>
        )}

        <div className="masonry-grid">
          {matchedPlaces.map((place, index) => <PlaceCard key={place.id} place={place} index={index} />)}
        </div>
      </section>
    </div>
  )
}
