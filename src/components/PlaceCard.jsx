import { useState } from 'react'
import { Link } from '../lib/router'
import Icon from './Icon'
import VisualBlock from './VisualBlock'

export default function PlaceCard({ place, index = 0 }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="place-card">
      <Link to={`/places/${place.id}`} aria-label={`Open ${place.name}`}>
        <VisualBlock tone={place.visualTone} label={place.type} meta={`DALIAN / ${String(index + 1).padStart(2, '0')}`} />
      </Link>
      <div className="place-card-copy">
        <div className="card-kicker">
          <span>{place.type}</span>
          <span>{place.foreignerFriendly} friendly</span>
        </div>
        <div className="card-title-row">
          <Link to={`/places/${place.id}`}>
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
        <p>{place.shortDescription}</p>
        <div className="mini-tags">
          {place.moodTags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
