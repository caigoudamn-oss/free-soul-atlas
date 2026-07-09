import { Link } from '../lib/router'

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Free Soul Atlas</strong>
        <p>A local-curated Dalian atlas for soulful places, quiet routes, city textures, and people who prefer real atmosphere over checklists.</p>
      </div>
      <nav>
        <Link to="/">Cities</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/mood-finder">Mood Finder</Link>
        <Link to="/local-tips">Local Tips</Link>
        <Link to="/about">About</Link>
        <Link to="/admin/login">Admin</Link>
      </nav>
    </footer>
  )
}
