import EmptyState from '../components/EmptyState'

export default function MoodFinder() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Mood Finder</p>
        <h1>内容正在采集中</h1>
        <p>Mood matching will return after the atlas has enough real city data.</p>
      </header>
      <EmptyState />
    </div>
  )
}
