import { Link } from '../lib/router'
import VisualBlock from './VisualBlock'

export default function CityCard({ city, index = 0 }) {
  return (
    <Link className="city-card" to={`/cities/${city.slug}`}>
      <VisualBlock
        tone="paper"
        label={city.status === 'coming_soon' ? 'Coming Soon' : 'City Edition'}
        meta={`FS / ${String(index + 1).padStart(2, '0')}`}
        imageUrl={city.coverImageUrl}
        imageAlt={city.coverImageAlt || city.name}
      />
      <div>
        <p className="card-kicker">{city.country || 'Free Soul Atlas'} / {city.region || 'City'}</p>
        <h3>{city.name}</h3>
        <p>{city.subtitle || city.description || 'A city archive is being prepared.'}</p>
        <div className="mini-tags">
          <span>{city.status}</span>
          {city.isFeatured && <span>featured</span>}
        </div>
      </div>
    </Link>
  )
}
