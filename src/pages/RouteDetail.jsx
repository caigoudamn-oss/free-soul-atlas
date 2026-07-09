import EmptyState from '../components/EmptyState'

export default function RouteDetail() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Routes</p>
        <h1>内容正在采集中</h1>
        <p>Route details will be available after real city routes are curated.</p>
      </header>
      <EmptyState />
    </div>
  )
}
