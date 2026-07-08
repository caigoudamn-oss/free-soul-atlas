import { Link, useParams } from '../lib/router'
import Icon from '../components/Icon'
import { places } from '../data/places'
import { localRoutes } from '../data/routes'

export default function RouteDetail() {
  const { id } = useParams()
  const route = localRoutes.find((item) => item.id === id) || localRoutes[0]

  return (
    <article className="page route-detail-page">
      <div className="detail-nav">
        <Link to="/routes"><Icon name="arrowLeft" /> Back to routes</Link>
        <span>{route.timeNeeded} / {route.budget}</span>
      </div>

      <header className="page-hero route-hero">
        <p className="eyebrow">Route / {route.energyLevel}</p>
        <h1>{route.name}</h1>
        <p>{route.whyThisRoute}</p>
        <div className="mini-tags">
          {route.bestFor.concat(route.moodTags).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <section className="route-timeline">
        {route.stops.map((stop, index) => {
          const place = places.find((item) => item.id === stop.placeId)
          return (
            <Link key={`${stop.time}-${stop.title}`} className="timeline-stop" to={place ? `/places/${place.id}` : '/places'}>
              <span>{stop.time}</span>
              <div>
                <small>Stop {String(index + 1).padStart(2, '0')}</small>
                <h2>{stop.title}</h2>
                <p>{stop.note}</p>
                {place && <em>{place.type} / {place.area}</em>}
              </div>
            </Link>
          )
        })}
      </section>

      <section className="route-notes">
        <div>
          <span>Practical notes</span>
          <p>{route.practicalNotes}</p>
        </div>
        <div>
          <span>Transportation tips</span>
          <p>{route.transportationTips}</p>
        </div>
        <div>
          <span>Payment / language tips</span>
          <p>{route.paymentLanguageTips}</p>
        </div>
      </section>
    </article>
  )
}
