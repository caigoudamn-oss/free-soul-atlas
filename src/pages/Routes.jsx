import RouteCard from '../components/RouteCard'
import { localRoutes } from '../data/routes'

export default function RoutesPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Local Routes</p>
        <h1>Dalian routes for different moods.</h1>
        <p>Soft routes for sea air, local food, records, vintage rooms, quiet books, small bars, and low-pressure city days.</p>
      </header>

      <section className="routes-strip">
        <div className="route-list large">
          {localRoutes.map((route, index) => <RouteCard key={route.id} route={route} index={index} />)}
        </div>
      </section>
    </div>
  )
}
