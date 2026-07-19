import { hasSupabaseConfig, requireSupabase } from '../lib/supabase'
import { normalizePlace } from './formatters'

const placeSelect = '*, cities!inner(id, slug, name, status)'

function handleSupabaseError(context, error) {
  if (!error) return
  console.error(`${context}:`, error)
  throw error
}

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

  handleSupabaseError('Failed to load featured published places', error)
  return (data || []).map(normalizePlace)
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

  handleSupabaseError('Failed to load published places by city', error)
  return (data || []).map(normalizePlace)
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

  handleSupabaseError('Failed to load published place', error)
  return normalizePlace(data)
}

export async function getAdminPlaces() {
  const { data, error } = await requireSupabase()
    .from('places')
    .select('*, cities(id, slug, name, status)')
    .order('created_at', { ascending: false })

  handleSupabaseError('Failed to load admin places', error)
  return (data || []).map(normalizePlace)
}

export async function getPendingSubmissions() {
  const { data, error } = await requireSupabase()
    .from('places')
    .select('*, cities(id, slug, name, status)')
    .eq('status', 'draft')
    .eq('submission_status', 'submitted')
    .order('created_at', { ascending: false })

  handleSupabaseError('Failed to load pending submissions', error)
  return (data || []).map(normalizePlace)
}

export async function getAdminPlace(id) {
  const { data, error } = await requireSupabase()
    .from('places')
    .select('*, cities(id, slug, name, status)')
    .eq('id', id)
    .maybeSingle()

  handleSupabaseError('Failed to load admin place', error)
  return normalizePlace(data)
}

export async function savePlace(payload, id) {
  const supabase = requireSupabase()
  const query = id
    ? supabase.from('places').update(payload).eq('id', id).select('*, cities(id, slug, name, status)').single()
    : supabase.from('places').insert(payload).select('*, cities(id, slug, name, status)').single()

  const { data, error } = await query
  handleSupabaseError('Failed to save place', error)
  return normalizePlace(data)
}

export async function deletePlace(id) {
  const { error } = await requireSupabase().from('places').delete().eq('id', id)
  handleSupabaseError('Failed to delete place', error)
}

export async function rejectSubmission(id) {
  const { data, error } = await requireSupabase()
    .from('places')
    .update({
      status: 'draft',
      submission_status: 'rejected',
    })
    .eq('id', id)
    .select('*, cities(id, slug, name, status)')
    .single()

  handleSupabaseError('Failed to reject submission', error)
  return normalizePlace(data)
}
