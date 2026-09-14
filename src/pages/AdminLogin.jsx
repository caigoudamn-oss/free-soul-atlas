import { useState } from 'react'
import { hasSupabaseConfig, supabaseConfigStatus } from '../lib/supabase'
import { getSafeAuthErrorMessage, signInAdmin } from '../services/authService'

const authConfigErrorMessage = 'Authentication service is not configured correctly.'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (!hasSupabaseConfig) {
      setError(authConfigErrorMessage)
      return
    }
    setLoading(true)
    setError('')
    try {
      await signInAdmin(email, password)
      window.location.href = '/admin'
    } catch (loginError) {
      console.error('Admin sign-in failed:', loginError)
      setError(getSafeAuthErrorMessage(loginError))
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
          <h2>{authConfigErrorMessage}</h2>
          <p>
            Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Production environment variables.
            {supabaseConfigStatus.hasUrl && !supabaseConfigStatus.hasValidUrl ? ' The Supabase URL is not a valid URL.' : ''}
          </p>
        </section>
      )}

      <form className="editorial-form admin-form" onSubmit={submit}>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="button dark" type="submit" disabled={loading || !hasSupabaseConfig}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  )
}
