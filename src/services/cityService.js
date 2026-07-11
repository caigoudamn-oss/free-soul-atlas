import { hasSupabaseConfig, requireSupabase } from '../lib/supabase'
import { normalizeCity } from './formatters'

const cityColumns = '*'

function handleSupabaseError(context, error) {
  if (!error) return
  console.error(`${context}:`, error)
  throw error
}

export async function getPublishedCities() {
  if (!hasSupabaseConfig) return []
  const { data, error } = await requireSupabase()
    .from('cities')
    .select(cityColumns)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  handleSupabaseError('Failed to load published cities', error)
  return (data || []).map(normalizeCity)
}

export async function getPublishedCityBySlug(slug) {
  if (!hasSupabaseConfig) return null
  const { data, error } = await requireSupabase()
    .from('cities')
    .select(cityColumns)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  handleSupabaseError('Failed to load published city', error)
  return normalizeCity(data)
}

export async function getAdminCities() {
  const { data, error } = await requireSupabase()
    .from('cities')
    .select(cityColumns)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  handleSupabaseError('Failed to load admin cities', error)
  return (data || []).map(normalizeCity)
}

export async function getAdminCity(id) {
  const { data, error } = await requireSupabase()
    .from('cities')
    .select(cityColumns)
    .eq('id', id)
    .maybeSingle()

  handleSupabaseError('Failed to load admin city', error)
  return normalizeCity(data)
}

export async function saveCity(payload, id) {
  const supabase = requireSupabase()
  const query = id
    ? supabase.from('cities').update(payload).eq('id', id).select(cityColumns).single()
    : supabase.from('cities').insert(payload).select(cityColumns).single()

  const { data, error } = await query
  handleSupabaseError('Failed to save city', error)
  return normalizeCity(data)
}

export async function deleteCity(id) {
  const { error } = await requireSupabase().from('cities').delete().eq('id', id)
  handleSupabaseError('Failed to delete city', error)
}
