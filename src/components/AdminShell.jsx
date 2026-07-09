import { Link } from '../lib/router'
import EmptyState from './EmptyState'
import { useAdminGuard } from '../hooks/useAdminGuard'

export default function AdminShell({ title, eyebrow = 'Admin', children }) {
  const { admin, loading, error, logout } = useAdminGuard()

  if (loading) {
    return <div className="page"><EmptyState title="Checking admin access" note="Please wait..." /></div>
  }

  if (error || !admin) {
    return (
      <div className="page">
        <EmptyState title="Admin access required" note={error || 'Please log in.'} />
        <div className="admin-actions center">
          <Link className="button dark" to="/admin/login">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{admin.profile.email || admin.user.email}</p>
        </div>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/cities">Cities</Link>
          <Link to="/admin/places">Places</Link>
          <button onClick={logout}>Sign out</button>
        </nav>
      </header>
      {children}
    </div>
  )
}
