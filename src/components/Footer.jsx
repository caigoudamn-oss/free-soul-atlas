import { Link } from '../lib/router'

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Free Soul Atlas</strong>
        <p>An open city atlas for soulful places, local walks, city textures, and people who prefer real atmosphere over checklists.</p>
      </div>
      <nav>
        <a href="/#cities">Cities</a>
        <Link to="/local-walks">Local Walks</Link>
        <Link to="/submit">Contribute</Link>
        <Link to="/about">About</Link>
      </nav>
    </footer>
  )
}
