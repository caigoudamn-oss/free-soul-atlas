import { hasSupabaseConfig, requireSupabase, supabase } from '../lib/supabase'

export async function signInAdmin(email, password) {
  const client = requireSupabase()

  await client.auth.signOut()

  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error

  const freshUser = await getCurrentUser()
  const admin = await getAdminProfileForUser(freshUser || data.user)

  if (!admin) {
    await signOut()
    throw new Error('This account does not have admin access.')
  }

  return { ...data, admin }
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getCurrentUser() {
  if (!hasSupabaseConfig) return null
  const client = requireSupabase()

  const { data: sessionData, error: sessionError } = await client.auth.getSession()
  if (sessionError || !sessionData.session) return null

  const { data, error } = await client.auth.getUser()
  if (error) {
    console.error('Failed to refresh Supabase user:', error)
    return sessionData.session.user || null
  }

  return data.user || sessionData.session.user || null
}

export async function getCurrentAdmin() {
  const user = await getCurrentUser()
  if (!user) return null

  return getAdminProfileForUser(user)
}

async function getAdminProfileForUser(user) {
  if (!user?.id) return null

  const client = requireSupabase()
  const { data, error } = await client
    .from('admin_profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle()

  if (error) {
    console.error('Failed to load admin profile:', error)
  }

  if (data) return { user, profile: data }

  const { data: isAdmin, error: rpcError } = await client.rpc('is_admin')
  if (rpcError) {
    console.error('Failed to verify admin access with is_admin():', rpcError)
    return null
  }

  if (!isAdmin) return null

  return {
    user,
    profile: {
      user_id: user.id,
      email: user.email,
      role: 'admin',
    },
  }
}
