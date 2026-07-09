import { useEffect, useState } from 'react'
import { Link, useParams } from '../lib/router'
import Icon from '../components/Icon'
import VisualBlock from '../components/VisualBlock'
import EmptyState from '../components/EmptyState'
import { getPublishedPlaceByCityAndSlug } from '../services/placeService'

export default function PlaceDetail() {
  const { citySlug, placeSlug } = useParams()
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getPublishedPlaceByCityAndSlug(citySlug, placeSlug)
        if (mounted) setPlace(data)
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
  }, [citySlug, placeSlug])

  if (loading) return <div className="page"><EmptyState title="内容正在采集中" note="Loading this place..." /></div>
  if (error) return <div className="page"><EmptyState title="内容正在采集中" note={error} /></div>
  if (!place) return <div className="page"><EmptyState /></div>

  return (
    <article className="detail-page">
      <div className="detail-nav">
        <Link to={`/cities/${citySlug}`}><Icon name="arrowLeft" /> Back to {place.cityName || 'city'}</Link>
        <span>Free Soul Atlas — {place.cityName || 'City'}</span>
      </div>

      <header className="place-detail-hero">
        <VisualBlock
          tone={place.visualTone}
          label={place.type || 'Place'}
          meta={place.area}
          imageUrl={place.imageUrl}
          imageAlt={place.imageAlt || place.name}
        />
        <div className="detail-intro">
          <p className="eyebrow">{place.type || 'Place'} / {place.foreignerFriendly || 'Local'} friendly</p>
          <h1>{place.name}</h1>
          <p>{place.shortDescription}</p>
          <div className="mini-tags">
            {(place.moodTags || []).concat(place.freeSoulTags || []).slice(0, 6).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="detail-layout">
        <div className="story-column">
          <section>
            <span>01</span>
            <h2>Why it feels soulful</h2>
            <p>{place.whySoulful || 'This note is being edited.'}</p>
          </section>
          <section>
            <span>02</span>
            <h2>Local curator note</h2>
            <p>{place.curatorNote || 'More field notes are coming soon.'}</p>
          </section>
          <section className="two-column-note">
            <div>
              <h3>Good for</h3>
              <ul>{(place.goodFor || []).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Not for</h3>
              <ul>{(place.notFor || []).map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>
          <section>
            <span>03</span>
            <h2>Practical tips</h2>
            <ul>{(place.practicalTips || []).map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </section>
        </div>

        <aside className="fact-sheet">
          <div><small>City</small><strong>{place.cityName}</strong></div>
          <div><small>Area</small><strong>{place.area || '—'}</strong></div>
          <div><small>Address</small><strong>{place.address || '—'}</strong></div>
          <div><small>Price range</small><strong>{place.priceRange || '—'}</strong></div>
          <div><small>Best time</small><strong>{place.bestTime || '—'}</strong></div>
          <div><small>Best for</small><strong>{(place.bestFor || []).join(' / ') || '—'}</strong></div>
          <div><small>Language</small><strong>{place.languageNote || '—'}</strong></div>
          <div><small>Payment</small><strong>{place.paymentNote || '—'}</strong></div>
        </aside>
      </section>

      <section className="map-placeholder">
        <div>
          <p className="eyebrow">Location clue</p>
          <h2><Icon name="mapPin" /> {place.area || place.cityName}</h2>
          <p>{place.address || 'Exact location is kept light for this archive.'}</p>
          {place.mapLink && <a href={place.mapLink} target="_blank" rel="noreferrer">Open map <Icon name="externalLink" /></a>}
        </div>
        <div className="mini-map">
          <span />
          <span />
          <span />
          <b>{place.cityName || 'CITY'}</b>
        </div>
      </section>

      {(place.nearbySpots || []).length > 0 && (
        <section className="nearby-section">
          <div className="section-title">
            <span>Nearby spots</span>
            <h2>Small things around it</h2>
          </div>
          <div className="nearby-list">
            {place.nearbySpots.map((spot) => <span key={spot}>{spot}</span>)}
          </div>
        </section>
      )}
    </article>
  )
}
