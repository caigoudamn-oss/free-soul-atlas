import EmptyState from '../components/EmptyState'

export default function LocalTips() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Local Tips</p>
        <h1>内容正在采集中</h1>
        <p>Local tips will be published after they are verified in the CMS.</p>
      </header>
      <EmptyState />
    </div>
  )
}
