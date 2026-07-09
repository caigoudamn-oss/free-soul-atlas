import { requireSupabase } from '../lib/supabase'

export async function uploadPlaceImage(file, folder = 'places') {
  if (!file) return null
  const extension = file.name.split('.').pop() || 'jpg'
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const path = `${folder}/${crypto.randomUUID()}-${Date.now()}-${safeName}.${extension}`
  const supabase = requireSupabase()

  const { error } = await supabase.storage
    .from('place-images')
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage.from('place-images').getPublicUrl(path)
  return {
    path,
    url: data.publicUrl,
  }
}
