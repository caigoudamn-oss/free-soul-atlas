import { useState } from 'react'
import { Link, NavLink } from '../lib/router'
import Icon from './Icon'

const links = [
  { path: '/', label: 'Home' },
  { path: '/#cities', label: 'Cities', anchor: true },
  { path: '/local-walks', label: 'Local Walks' },
  { path: '/submit', label: 'Contribute' },
  { path: '/about', label: 'About' },
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
          {links.map((link) => (
            link.anchor ? (
              <a key={link.label} href={link.path} onClick={() => setOpen(false)}>{link.label}</a>
            ) : (
              <NavLink key={link.label} to={link.path} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            )
          ))}
        </nav>

        <Link className="nav-search" to="/" aria-label="Explore cities">
          <Icon name="search" />
        </Link>
      </div>
    </header>
  )
}
