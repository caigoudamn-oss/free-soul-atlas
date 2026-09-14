import { createClient } from '@supabase/supabase-js'

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function parseSupabaseUrl(value) {
  if (!value) return null
  try {
    return new URL(value)
  } catch {
    return null
  }
}

const parsedSupabaseUrl = parseSupabaseUrl(configuredSupabaseUrl)

// Some visitor networks cannot establish a TLS connection to *.supabase.co.
// In production, keep browser traffic on the Vercel origin and let the rewrite
// in vercel.json forward it to Supabase from Vercel's network.
const supabaseUrl = import.meta.env.PROD && typeof window !== 'undefined'
  ? `${window.location.origin}/supabase`
  : configuredSupabaseUrl

export const supabaseConfigStatus = {
  hasUrl: Boolean(configuredSupabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  hasValidUrl: Boolean(parsedSupabaseUrl),
  hostname: parsedSupabaseUrl?.hostname || '',
}

export const hasSupabaseConfig = Boolean(
  supabaseConfigStatus.hasValidUrl && supabaseConfigStatus.hasAnonKey,
)

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function requireSupabase() {
  if (!supabase) {
    throw new Error('Authentication service is not configured correctly.')
  }
  return supabase
}
