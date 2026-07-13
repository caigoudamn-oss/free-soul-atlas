const amapKey = import.meta.env.VITE_AMAP_KEY
const amapSecurityJsCode = import.meta.env.VITE_AMAP_SECURITY_JS_CODE

let amapLoaderPromise

export const hasAmapConfig = Boolean(amapKey && amapSecurityJsCode)

function getLngLat(location) {
  if (!location) return { longitude: null, latitude: null }
  const longitude = typeof location.getLng === 'function' ? location.getLng() : location.lng
  const latitude = typeof location.getLat === 'function' ? location.getLat() : location.lat
  return {
    longitude: longitude == null ? null : Number(longitude),
    latitude: latitude == null ? null : Number(latitude),
  }
}

function asText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ')
  return value == null ? '' : String(value)
}

function buildAmapLink(place) {
  if (!place.longitude || !place.latitude) return ''
  const position = `${place.longitude},${place.latitude}`
  const name = encodeURIComponent(place.map_name || place.name || 'Free Soul Atlas location')
  return `https://uri.amap.com/marker?position=${position}&name=${name}&coordinate=gaode&callnative=0`
}

function normalizeAmapPoi(poi) {
  const { longitude, latitude } = getLngLat(poi.location)
  const mapName = asText(poi.name)
  const normalized = {
    provider: 'amap',
    id: asText(poi.id),
    name: mapName,
    address: asText(poi.address || poi.pname),
    city: asText(poi.cityname),
    district: asText(poi.adname),
    type: asText(poi.type),
    latitude,
    longitude,
    map_provider: 'amap',
    map_place_id: asText(poi.id),
    map_name: mapName,
    map_address: asText(poi.address || poi.pname),
    map_city: asText(poi.cityname),
    map_district: asText(poi.adname),
  }
  normalized.map_link = buildAmapLink(normalized)
  return normalized
}

export function getAmapConfigMessage() {
  if (hasAmapConfig) return ''
  return 'AMap key is not configured yet.\n高德地图 Key 还没有配置。'
}

export async function loadAmap() {
  if (!hasAmapConfig) {
    throw new Error(getAmapConfigMessage())
  }

  if (window.AMap?.PlaceSearch) return window.AMap

  if (!amapLoaderPromise) {
    window._AMapSecurityConfig = {
      securityJsCode: amapSecurityJsCode,
    }

    amapLoaderPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-free-soul-amap="true"]')
      if (existing) {
        existing.addEventListener('load', () => resolve(window.AMap))
        existing.addEventListener('error', () => reject(new Error('Failed to load AMap script.')))
        return
      }

      const script = document.createElement('script')
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(amapKey)}&plugin=AMap.PlaceSearch`
      script.async = true
      script.defer = true
      script.dataset.freeSoulAmap = 'true'
      script.onload = () => resolve(window.AMap)
      script.onerror = () => reject(new Error('Failed to load AMap script.'))
      document.head.appendChild(script)
    })
  }

  const AMap = await amapLoaderPromise

  if (!AMap?.PlaceSearch) {
    await new Promise((resolve, reject) => {
      AMap.plugin('AMap.PlaceSearch', () => resolve())
      setTimeout(() => reject(new Error('AMap PlaceSearch plugin failed to load.')), 8000)
    })
  }

  return AMap
}

export async function searchAmapPlaces(keyword, cityName = '') {
  const query = String(keyword || '').trim()
  if (!query) return []

  const AMap = await loadAmap()
  const placeSearch = new AMap.PlaceSearch({
    city: cityName || '全国',
    citylimit: Boolean(cityName),
    pageSize: 10,
    pageIndex: 1,
    extensions: 'base',
  })

  return new Promise((resolve, reject) => {
    placeSearch.search(query, (status, result) => {
      if (status === 'complete') {
        resolve((result?.poiList?.pois || []).map(normalizeAmapPoi))
        return
      }
      if (status === 'no_data') {
        resolve([])
        return
      }
      reject(new Error(result?.info || 'AMap search failed.'))
    })
  })
}
