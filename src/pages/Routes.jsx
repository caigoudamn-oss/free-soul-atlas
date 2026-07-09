import EmptyState from '../components/EmptyState'

export default function RoutesPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Routes</p>
        <h1>City routes are being edited.</h1>
        <p>Routes will return after the CMS contains enough real places for each city.</p>
      </header>
      <EmptyState />
    </div>
  )
}
