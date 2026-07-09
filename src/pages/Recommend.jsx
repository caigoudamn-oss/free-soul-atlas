import EmptyState from '../components/EmptyState'

export default function Recommend() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Recommend</p>
        <h1>Public submission is not open yet.</h1>
        <p>For the first CMS stage, only administrators can add places.</p>
      </header>
      <EmptyState />
    </div>
  )
}
