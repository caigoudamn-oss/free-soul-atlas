import { useState } from 'react'
import { hasSupabaseConfig } from '../lib/supabase'
import { signInAdmin } from '../services/authService'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInAdmin(email, password)
      window.location.href = '/admin'
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page form-page">
      <header className="page-hero">
        <p className="eyebrow">Admin</p>
        <h1>Atlas CMS Login</h1>
        <p>Only approved administrators can manage cities and places.</p>
      </header>

      {!hasSupabaseConfig && (
        <section className="empty-state">
          <h2>Missing Supabase config</h2>
          <p>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.</p>
        </section>
      )}

      <form className="editorial-form admin-form" onSubmit={submit}>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="button dark" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  )
}
