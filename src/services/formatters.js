export function toArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []
  return String(value)
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function listToText(value) {
  return Array.isArray(value) ? value.join('\n') : ''
}

export function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalizeCity(row) {
  if (!row) return null
  return {
    ...row,
    coverImageUrl: row.cover_image_url,
    coverImagePath: row.cover_image_path,
    coverImageAlt: row.cover_image_alt,
    editorialNote: row.editorial_note,
    sortOrder: row.sort_order,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function normalizePlace(row) {
  if (!row) return null
  const city = row.cities || row.city || null
  return {
    ...row,
    city,
    citySlug: city?.slug || row.city_slug || row.citySlug,
    cityName: city?.name || row.city || row.cityName,
    shortDescription: row.short_description,
    whySoulful: row.why_soulful,
    curatorNote: row.curator_note,
    priceRange: row.price_range,
    bestTime: row.best_time,
    foreignerFriendly: row.foreigner_friendly,
    languageNote: row.language_note,
    paymentNote: row.payment_note,
    reservationNote: row.reservation_note,
    mapLink: row.map_link,
    mapProvider: row.map_provider,
    mapPlaceId: row.map_place_id,
    mapName: row.map_name,
    mapAddress: row.map_address,
    mapCity: row.map_city,
    mapDistrict: row.map_district,
    moodTags: row.mood_tags || [],
    freeSoulTags: row.free_soul_tags || [],
    bestFor: row.best_for || [],
    goodFor: row.good_for || [],
    notFor: row.not_for || [],
    practicalTips: row.practical_tips || [],
    nearbySpots: row.nearby_spots || [],
    imageUrl: row.image_url,
    imagePath: row.image_path,
    imageAlt: row.image_alt,
    visualTone: row.visual_tone || 'paper',
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
