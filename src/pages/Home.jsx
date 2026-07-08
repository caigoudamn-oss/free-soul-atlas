import { Link } from '../lib/router'
import Icon from '../components/Icon'
import PlaceCard from '../components/PlaceCard'
import RouteCard from '../components/RouteCard'
import VisualBlock from '../components/VisualBlock'
import { places } from '../data/places'
import { localRoutes } from '../data/routes'

export default function Home() {
  const featured = places.slice(0, 6)

  return (
    <div className="home-page">
      <section className="home-cover">
        <div className="cover-masthead">
          <span>Free Soul Atlas — Dalian</span>
          <span>Local-curated guides to soulful places beyond tourist spots.</span>
        </div>

        <div className="cover-grid">
          <div className="cover-copy">
            <p className="eyebrow">Dalian / First Edition</p>
            <h1>Discover Dalian Beyond Tourist Spots</h1>
            <p className="cover-subtitle">
              A local-curated atlas of soulful places, hidden shops, vintage stores, record spots, bars, creative spaces, local food, sea walks, and real local routes.
            </p>
            <div className="cover-actions">
              <Link className="button dark" to="/places">Explore Places</Link>
              <Link className="button light" to="/routes">Find Your Route</Link>
              <Link className="button text" to="/custom-plan">Get a Custom Local Plan <Icon name="arrowRight" /></Link>
            </div>
          </div>

          <div className="cover-feature">
            <VisualBlock tone="sea" label="Featured Mood" meta="Sea / Records / Slow Local Life" />
            <div className="feature-note">
              <span>Editorial Note</span>
              <p>Not a checklist. Not a ranking. A soft map of places that make Dalian feel more human, more local, and more alive.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-title">
          <span>01 / Places</span>
          <h2>Featured Places</h2>
          <Link to="/places">View all places <Icon name="arrowRight" /></Link>
        </div>
        <div className="masonry-grid">
          {featured.map((place, index) => (
            <PlaceCard key={place.id} place={place} index={index} />
          ))}
        </div>
      </section>

      <section className="routes-strip">
        <div className="section-title">
          <span>02 / Local Routes</span>
          <h2>Routes shaped by the rhythm of the city.</h2>
        </div>
        <div className="route-list">
          {localRoutes.slice(0, 3).map((route, index) => (
            <RouteCard key={route.id} route={route} index={index} />
          ))}
        </div>
      </section>

      <section className="criteria-section">
        <div>
          <p className="eyebrow">Free Soul Criteria</p>
          <h2>What makes a place “Free Soul”?</h2>
        </div>
        <div className="criteria-copy">
          <p>It does not have to be famous, expensive, or perfectly designed.</p>
          <p>We look for places with personal expression, independent taste, emotional atmosphere, and a real sense of local life.</p>
          <p>A Free Soul place is not just made for photos. It has a reason to exist.</p>
          <p>It may be small, quiet, strange, imperfect, or hard to categorize. But it makes the city feel more human, more diverse, and more alive.</p>
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <span>Mood Finder</span>
          <h2>Not sure where to start?</h2>
          <p>Answer three simple questions and get a route or places that match your current energy.</p>
        </div>
        <Link className="button dark" to="/mood-finder">Find My Mood</Link>
      </section>

      <section className="custom-cta">
        <span>Custom Local Plan</span>
        <h2>Want Dalian through local eyes?</h2>
        <p>Tell us your dates, interests, budget, and vibe. We’ll help design a route beyond tourist spots.</p>
        <Link className="button light" to="/custom-plan">Request My Local Plan</Link>
      </section>
    </div>
  )
}
