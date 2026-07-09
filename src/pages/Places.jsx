import EmptyState from '../components/EmptyState'

export default function Places() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Places</p>
        <h1>Choose a city first.</h1>
        <p>Free Soul Atlas now organizes places by city edition.</p>
      </header>
      <EmptyState title="内容正在采集中" note="Please enter from the city selection on the homepage." />
    </div>
  )
}
