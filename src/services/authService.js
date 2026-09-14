import { hasSupabaseConfig, requireSupabase, supabase } from '../lib/supabase'

const authConfigErrorMessage = 'Authentication service is not configured correctly.'

function isFetchFailure(error) {
  const message = String(error?.message || error || '').toLowerCase()
  return (
    message.includes('failed to fetch') ||
    message.includes('networkerror') ||
    message.includes('network request failed') ||
    message.includes('load failed') ||
    message.includes('err_name_not_resolved') ||
    message.includes('err_blocked_by_client') ||
    message.includes('err_internet_disconnected') ||
    message.includes('err_connection')
  )
}

export function getSafeAuthErrorMessage(error) {
  if (!hasSupabaseConfig || isFetchFailure(error)) return authConfigErrorMessage
  return error?.message || 'Unable to sign in.'
}

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
