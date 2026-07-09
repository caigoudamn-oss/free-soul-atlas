import { useEffect, useState } from 'react'
import { hasSupabaseConfig } from '../lib/supabase'
import { getCurrentAdmin, signOut } from '../services/authService'

export function useAdminGuard() {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!hasSupabaseConfig) {
        setError('Missing Supabase environment variables.')
        setLoading(false)
        return
      }
      try {
        const data = await getCurrentAdmin()
        if (!mounted) return
        if (!data) setError('Please log in with an admin account.')
        setAdmin(data)
      } catch (loadError) {
        if (mounted) setError(loadError.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  async function logout() {
    await signOut()
    window.location.href = '/admin/login'
  }

  return { admin, loading, error, logout }
}
