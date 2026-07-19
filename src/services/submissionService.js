import { requireSupabase } from '../lib/supabase'
import { createSlugCode, generateSlug } from './formatters'
import { uploadPlaceImage } from './storageService'

function shortCode() {
  return createSlugCode(8)
}

function clean(value) {
  return String(value || '').trim()
}

function buildRawNote({ reason, nickname, contact }) {
  const lines = [
    clean(reason),
    clean(nickname) ? `\nSubmitted by / 推荐人：${clean(nickname)}` : '',
    clean(contact) ? `Contact / 联系方式：${clean(contact)}` : '',
  ].filter(Boolean)

  return lines.join('\n')
}

function buildShortDescription(type, area) {
  const typeText = clean(type) || 'place'
  const areaText = clean(area) ? ` in ${clean(area)}` : ''
  return `A community-recommended ${typeText}${areaText}, pending Free Soul Atlas editorial review.`
}

async function getDalianCity() {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('cities')
    .select('id, name, slug, status')
    .eq('slug', 'dalian')
    .eq('status', 'published')
    .maybeSingle()

  if (error) throw error
  if (!data) {
    throw new Error('Dalian city edition is not available yet. Please make sure Dalian exists and is published in Supabase.')
  }

  return data
}

export async function submitPublicPlace(form, photoFile) {
  const supabase = requireSupabase()
  const name = clean(form.name)
  const selectedType = form.type === 'other' ? clean(form.customType) || 'other' : clean(form.type)
  const area = clean(form.area)
  const reason = clean(form.reason)

  if (!name) throw new Error('Please enter the place name. / 请填写地点名。')
  if (!selectedType) throw new Error('Please choose a place type. / 请选择类型。')
  if (!reason) throw new Error('Please tell us why you recommend it. / 请写下推荐理由。')

  const city = await getDalianCity()
  const generatedSlug = generateSlug(name, {
    fallbackPrefix: 'place',
    suffix: shortCode(),
    alwaysAppendSuffix: true,
  })

  let uploadedImage = null
  if (photoFile) {
    uploadedImage = await uploadPlaceImage(photoFile, 'submissions')
  }

  const payload = {
    city_id: city.id,
    name,
    slug: generatedSlug,
    type: selectedType,
    area,
    short_description: buildShortDescription(selectedType, area),
    why_soulful: '',
    raw_note: buildRawNote({
      reason,
      nickname: form.nickname,
      contact: form.contact,
    }),
    editorial_summary: '',
    submission_status: 'submitted',
    status: 'draft',
    is_featured: false,
    image_url: uploadedImage?.url || '',
    image_path: uploadedImage?.path || '',
    image_alt: uploadedImage ? name : '',
  }

  const { data, error } = await supabase
    .from('places')
    .insert(payload)
    .select('id, slug, status, submission_status')
    .single()

  if (error) throw error
  return data
}
