import { Link } from '../lib/router'
import EmptyState from '../components/EmptyState'

export default function Recommend() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Contribute</p>
        <h1>Public contribution is open.</h1>
        <p>
          Contribute a soulful place, suggest a correction, or share local context. Every submission is reviewed and edited before publishing.
        </p>
        <div className="cover-actions">
          <Link className="button dark" to="/submit">Go to submission form / 前往投稿表单</Link>
          <Link className="button light" to="/">Back to Atlas</Link>
        </div>
      </header>
      <EmptyState title="Use /submit for public contributions." note="投稿、修正和补充信息请使用 /submit。" />
    </div>
  )
}
