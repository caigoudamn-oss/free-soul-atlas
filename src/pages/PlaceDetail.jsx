import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from '../lib/router'
import Icon from '../components/Icon'
import VisualBlock from '../components/VisualBlock'
import EmptyState from '../components/EmptyState'
import { getPublishedPlaceByCityAndSlug } from '../services/placeService'

function hasText(value) {
  return String(value || '').trim().length > 0
}

function hasList(value) {
  return Array.isArray(value) && value.filter(Boolean).length > 0
}

function textBlock(value) {
  if (!hasText(value)) return null
  return String(value)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => <p key={part}>{part}</p>)
}

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

  const summary = place?.editorialSummary || place?.shortDescription || ''

  const factItems = useMemo(() => {
    if (!place) return []
    return [
      ['City', place.cityName],
      ['Area', place.area],
      ['Address', place.address],
      ['Price range', place.priceRange],
      ['Best time', place.bestTime],
      ['Best for', hasList(place.bestFor) ? place.bestFor.join(' / ') : ''],
      ['Language', place.languageNote],
      ['Payment', place.paymentNote],
      ['Reservation', place.reservationNote],
    ].filter(([, value]) => hasText(value))
  }, [place])

  if (loading) return <div className="page"><EmptyState title="内容正在采集中" note="Loading this place..." /></div>
  if (error) return <div className="page"><EmptyState title="内容正在采集中" note={error} /></div>
  if (!place) return <div className="page"><EmptyState /></div>

  const showMap = hasText(place.address) || hasText(place.mapLink) || hasText(place.area)
  const tags = (place.moodTags || []).concat(place.freeSoulTags || []).filter(Boolean).slice(0, 6)

  return (
    <article className="detail-page place-editorial-detail">
      <div className="detail-nav">
        <Link to={`/cities/${citySlug}`}><Icon name="arrowLeft" /> Back to {place.cityName || 'city'}</Link>
        <span>Free Soul Atlas — {place.cityName || 'City'}</span>
      </div>

      <header className="place-detail-hero editorial-place-hero">
        <div className="detail-intro">
          <p className="eyebrow">{[place.type, place.area].filter(Boolean).join(' / ') || 'Place'}</p>
          <h1>{place.name}</h1>
          {hasText(summary) && <p className="editorial-summary">{summary}</p>}
          {tags.length > 0 && (
            <div className="mini-tags">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
        </div>
        <VisualBlock
          tone={place.visualTone}
          label={place.type || 'Place'}
          meta={place.area}
          imageUrl={place.imageUrl}
          imageAlt={place.imageAlt || place.name}
        />
      </header>

      <section className="detail-layout editorial-detail-layout">
        <div className="story-column editorial-story-column">
          {hasText(place.whySoulful) && (
            <section className="soulful-essay">
              <span>01</span>
              <div>
                <h2>Why it feels soulful</h2>
                {textBlock(place.whySoulful)}
              </div>
            </section>
          )}

          {hasText(place.curatorNote) && (
            <section>
              <span>02</span>
              <div>
                <h2>Local curator note</h2>
                {textBlock(place.curatorNote)}
              </div>
            </section>
          )}

          {(hasList(place.goodFor) || hasList(place.notFor)) && (
            <section className="two-column-note">
              {hasList(place.goodFor) && (
                <div>
                  <h3>Good for</h3>
                  <ul>{place.goodFor.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              {hasList(place.notFor) && (
                <div>
                  <h3>Not for</h3>
                  <ul>{place.notFor.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
            </section>
          )}

          {hasList(place.practicalTips) && (
            <section>
              <span>03</span>
              <div>
                <h2>Practical tips</h2>
                <ul>{place.practicalTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
              </div>
            </section>
          )}
        </div>

        {factItems.length > 0 && (
          <aside className="fact-sheet">
            {factItems.map(([label, value]) => (
              <div key={label}><small>{label}</small><strong>{value}</strong></div>
            ))}
          </aside>
        )}
      </section>

      {showMap && (
        <section className="map-placeholder">
          <div>
            <p className="eyebrow">Location clue</p>
            <h2><Icon name="mapPin" /> {place.area || place.cityName}</h2>
            {hasText(place.address) && <p>{place.address}</p>}
            {place.mapLink && <a href={place.mapLink} target="_blank" rel="noreferrer">Open map <Icon name="externalLink" /></a>}
          </div>
          <div className="mini-map">
            <span />
            <span />
            <span />
            <b>{place.cityName || 'CITY'}</b>
          </div>
        </section>
      )}

      {hasList(place.nearbySpots) && (
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
