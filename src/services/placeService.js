import { hasSupabaseConfig, requireSupabase } from '../lib/supabase'
import { normalizePlace } from './formatters'

const placeSelect = '*, cities!inner(id, slug, name, status)'

export async function getFeaturedPublishedPlaces(limit = 6) {
  if (!hasSupabaseConfig) return []
  const { data, error } = await requireSupabase()
    .from('places')
    .select(placeSelect)
    .eq('status', 'published')
    .eq('cities.status', 'published')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data.map(normalizePlace)
}

export async function getPublishedPlacesByCity(cityId) {
  if (!hasSupabaseConfig || !cityId) return []
  const { data, error } = await requireSupabase()
    .from('places')
    .select(placeSelect)
    .eq('city_id', cityId)
    .eq('status', 'published')
    .eq('cities.status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(normalizePlace)
}

export async function getPublishedPlaceByCityAndSlug(citySlug, placeSlug) {
  if (!hasSupabaseConfig) return null
  const { data, error } = await requireSupabase()
    .from('places')
    .select(placeSelect)
    .eq('slug', placeSlug)
    .eq('status', 'published')
    .eq('cities.slug', citySlug)
    .eq('cities.status', 'published')
    .maybeSingle()

  if (error) throw error
  return normalizePlace(data)
}

export async function getAdminPlaces() {
  const { data, error } = await requireSupabase()
    .from('places')
    .select('*, cities(id, slug, name, status)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(normalizePlace)
}

export async function getAdminPlace(id) {
  const { data, error } = await requireSupabase()
    .from('places')
    .select('*, cities(id, slug, name, status)')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return normalizePlace(data)
}

export async function savePlace(payload, id) {
  const supabase = requireSupabase()
  const query = id
    ? supabase.from('places').update(payload).eq('id', id).select('*, cities(id, slug, name, status)').single()
    : supabase.from('places').insert(payload).select('*, cities(id, slug, name, status)').single()

  const { data, error } = await query
  if (error) throw error
  return normalizePlace(data)
}

export async function deletePlace(id) {
  const { error } = await requireSupabase().from('places').delete().eq('id', id)
  if (error) throw error
}
