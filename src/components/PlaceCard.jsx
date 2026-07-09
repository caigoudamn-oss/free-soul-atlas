import { useState } from 'react'
import { Link } from '../lib/router'
import Icon from './Icon'
import VisualBlock from './VisualBlock'

export default function PlaceCard({ place, index = 0 }) {
  const [saved, setSaved] = useState(false)
  const citySlug = place.citySlug || place.city?.slug || 'dalian'
  const placeSlug = place.slug || place.id
  const url = `/cities/${citySlug}/places/${placeSlug}`
  const tags = place.moodTags || []

  return (
    <article className="place-card">
      <Link to={url} aria-label={`Open ${place.name}`}>
        <VisualBlock
          tone={place.visualTone}
          label={place.type || 'Place'}
          meta={`${place.cityName || 'Free Soul'} / ${String(index + 1).padStart(2, '0')}`}
          imageUrl={place.imageUrl}
          imageAlt={place.imageAlt || place.name}
        />
      </Link>
      <div className="place-card-copy">
        <div className="card-kicker">
          <span>{place.type || 'Place'}</span>
          {place.foreignerFriendly && <span>{place.foreignerFriendly} friendly</span>}
        </div>
        <div className="card-title-row">
          <Link to={url}>
            <h3>{place.name}</h3>
          </Link>
          <button className={saved ? 'save-min saved' : 'save-min'} onClick={() => setSaved(!saved)} aria-label="Save place">
            <Icon name="bookmark" />
          </button>
        </div>
        <p className="place-area">
          <Icon name="mapPin" />
          {place.area}
        </p>
        <p>{place.shortDescription || place.description}</p>
        <div className="mini-tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
