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
          <Link to="/admin/submissions">Submissions / 投稿审核</Link>
          <button onClick={logout}>Sign out</button>
        </nav>
      </header>
      <p className="admin-security-note">
        For public projects, use a strong unique password and avoid sharing admin credentials.
        公开项目请使用强且唯一的管理员密码，不要共享后台账号。
      </p>
      {children}
    </div>
  )
}
