import { hasSupabaseConfig, requireSupabase, supabase } from '../lib/supabase'

export async function signInAdmin(email, password) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw error
  const admin = await getCurrentAdmin()
  if (!admin) {
    await signOut()
    throw new Error('This account does not have admin access.')
  }
  return data
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getCurrentUser() {
  if (!hasSupabaseConfig) return null
  const { data, error } = await requireSupabase().auth.getUser()
  if (error) return null
  return data.user
}

export async function getCurrentAdmin() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await requireSupabase()
    .from('admin_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error || !data) return null
  return { user, profile: data }
}
