import { useState } from 'react'
import { Link, NavLink } from '../lib/router'
import Icon from './Icon'

const links = [
  ['/', 'Home'],
  ['/', 'Cities'],
  ['/routes', 'Routes'],
  ['/local-walks', 'Local Walks'],
  ['/mood-finder', 'Mood Finder'],
  ['/local-tips', 'Local Tips'],
  ['/about', 'About'],
  ['/admin/login', 'Admin'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="top-rule" />
      <div className="nav-shell">
        <Link className="wordmark" to="/" onClick={() => setOpen(false)}>
          <span>Free Soul Atlas</span>
          <small>City Editions</small>
        </Link>

        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <Icon name="x" /> : <Icon name="menu" />}
        </button>

        <nav className={open ? 'nav-menu open' : 'nav-menu'}>
          {links.map(([path, label]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <Link className="nav-search" to="/" aria-label="Explore cities">
          <Icon name="search" />
        </Link>
      </div>
    </header>
  )
}
