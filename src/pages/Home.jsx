import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import Icon from '../components/Icon'
import CityCard from '../components/CityCard'
import PlaceCard from '../components/PlaceCard'
import VisualBlock from '../components/VisualBlock'
import EmptyState from '../components/EmptyState'
import { getPublishedCities } from '../services/cityService'
import { getFeaturedPublishedPlaces } from '../services/placeService'

export default function Home() {
  const [cities, setCities] = useState([])
  const [featuredPlaces, setFeaturedPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [cityData, placeData] = await Promise.all([
          getPublishedCities(),
          getFeaturedPublishedPlaces(6),
        ])
        if (!mounted) return
        setCities(cityData)
        setFeaturedPlaces(placeData)
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
  }, [])

  const hasContent = cities.length > 0 || featuredPlaces.length > 0

  return (
    <div className="home-page">
      <section className="home-cover">
        <div className="cover-masthead">
          <span>Free Soul Atlas</span>
          <span>City archives for soulful places, local rooms, and quiet routes.</span>
        </div>

        <div className="cover-grid">
          <div className="cover-copy">
            <p className="eyebrow">Global Index / City Editions</p>
            <h1>Find free souls across cities.</h1>
            <p className="cover-subtitle">
              An editorial atlas of real places with atmosphere, independent taste, local rhythm, and a reason to exist beyond tourist checklists.
            </p>
            <div className="cover-actions">
              <a className="button dark" href="#cities">Choose a City</a>
              <Link className="button light" to="/submit">Recommend a place / 推荐地点</Link>
              <Link className="button light" to="/local-walks">Local Walks / 本地慢逛</Link>
              <Link className="button light" to="/about">About the Atlas</Link>
              <Link className="button text" to="/admin/login">Admin Login <Icon name="arrowRight" /></Link>
            </div>
          </div>

          <div className="cover-feature">
            <VisualBlock tone="paper" label="Free Soul Atlas" meta="Cities / Places / Field Notes" />
            <div className="feature-note">
              <span>Editorial Note</span>
              <p>Not a ranking. Not a travel checklist. A quieter index of cities through the people and places that make them feel alive.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell" id="cities">
        <div className="section-title">
          <span>01 / City Editions</span>
          <h2>Choose a city.</h2>
        </div>
        {loading && <EmptyState title="内容正在采集中" note="Loading the city archive..." />}
        {!loading && error && <EmptyState title="内容正在采集中" note={error} />}
        {!loading && !error && cities.length === 0 && <EmptyState />}
        {!loading && !error && cities.length > 0 && (
          <div className="city-grid">
            {cities.map((city, index) => <CityCard key={city.id} city={city} index={index} />)}
          </div>
        )}
      </section>

      {hasContent && featuredPlaces.length > 0 && (
        <section className="section-shell">
          <div className="section-title">
            <span>02 / Featured Places</span>
            <h2>Across the atlas</h2>
          </div>
          <div className="masonry-grid">
            {featuredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        </section>
      )}

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
    </div>
  )
}
