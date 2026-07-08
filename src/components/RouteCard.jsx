import { Link } from '../lib/router'
import Icon from './Icon'

export default function RouteCard({ route, index = 0 }) {
  return (
    <Link className="route-card" to={`/routes/${route.id}`}>
      <span className="route-number">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <p className="card-kicker">{route.timeNeeded} / {route.energyLevel}</p>
        <h3>{route.name}</h3>
        <p>{route.whyThisRoute}</p>
        <div className="mini-tags">
          {route.moodTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <Icon name="arrowUpRight" />
    </Link>
  )
}
