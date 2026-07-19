import { useEffect, useState } from 'react'
import { Link, useParams } from '../lib/router'
import AdminShell from '../components/AdminShell'
import { getAdminCities } from '../services/cityService'
import { getAdminPlace, savePlace } from '../services/placeService'
import { generateSlug, listToText, slugify, toArray } from '../services/formatters'
import { uploadPlaceImage } from '../services/storageService'
import { getAmapConfigMessage, hasAmapConfig, searchAmapPlaces } from '../services/mapService'

const initialForm = {
  city_id: '',
  slug: '',
  name: '',
  type: '',
  area: '',
  address: '',
  location_privacy: 'area_only',
  short_description: '',
  why_soulful: '',
  raw_note: '',
  editorial_summary: '',
  submission_status: 'editorial',
  curator_note: '',
  price_range: '',
  best_time: '',
  foreigner_friendly: 'Medium',
  language_note: '',
  payment_note: '',
  reservation_note: '',
  map_link: '',
  latitude: '',
  longitude: '',
  map_provider: 'amap',
  map_place_id: '',
  map_name: '',
  map_address: '',
  map_city: '',
  map_district: '',
  mood_tags: '',
  free_soul_tags: '',
  best_for: '',
  good_for: '',
  not_for: '',
  practical_tips: '',
  nearby_spots: '',
  image_url: '',
  image_path: '',
  image_alt: '',
  visual_tone: 'paper',
  is_featured: false,
  status: 'draft',
  sort_order: 0,
}

const publishedRequiredFields = [
  ['city_id', 'City'],
  ['name', 'Name'],
  ['type', 'Type'],
  ['area', 'Area'],
  ['short_description', 'Short description'],
  ['why_soulful', 'Why soulful'],
  ['status', 'Status'],
]

const placeTypeOptions = [
  'cafe',
  'bar',
  'record store',
  'vintage',
  'bookstore',
  'gallery',
  'restaurant',
  'livehouse',
  'studio',
  'shop',
  'street spot',
  'other',
]

const dalianAreaOptions = [
  'Zhongshan / 中山',
  'Xigang / 西岗',
  'Shahekou / 沙河口',
  'Ganjingzi / 甘井子',
  'High-tech Zone / 高新区',
  'Lushunkou / 旅顺口',
  'Kaifaqu / 开发区',
]

function placeToForm(place) {
  return {
    city_id: place.city_id || '',
    slug: place.slug || '',
    name: place.name || '',
    type: place.type || '',
    area: place.area || '',
    address: place.address || '',
    location_privacy: place.location_privacy || 'area_only',
    short_description: place.short_description || place.shortDescription || '',
    why_soulful: place.why_soulful || place.whySoulful || '',
    raw_note: place.raw_note || place.rawNote || '',
    editorial_summary: place.editorial_summary || place.editorialSummary || '',
    submission_status: place.submission_status || place.submissionStatus || 'editorial',
    curator_note: place.curator_note || place.curatorNote || '',
    price_range: place.price_range || place.priceRange || '',
    best_time: place.best_time || place.bestTime || '',
    foreigner_friendly: place.foreigner_friendly || place.foreignerFriendly || 'Medium',
    language_note: place.language_note || place.languageNote || '',
    payment_note: place.payment_note || place.paymentNote || '',
    reservation_note: place.reservation_note || place.reservationNote || '',
    map_link: place.map_link || place.mapLink || '',
    latitude: place.latitude ?? '',
    longitude: place.longitude ?? '',
    map_provider: place.map_provider || place.mapProvider || 'amap',
    map_place_id: place.map_place_id || place.mapPlaceId || '',
    map_name: place.map_name || place.mapName || '',
    map_address: place.map_address || place.mapAddress || '',
    map_city: place.map_city || place.mapCity || '',
    map_district: place.map_district || place.mapDistrict || '',
    mood_tags: listToText(place.mood_tags || place.moodTags),
    free_soul_tags: listToText(place.free_soul_tags || place.freeSoulTags),
    best_for: listToText(place.best_for || place.bestFor),
    good_for: listToText(place.good_for || place.goodFor),
    not_for: listToText(place.not_for || place.notFor),
    practical_tips: listToText(place.practical_tips || place.practicalTips),
    nearby_spots: listToText(place.nearby_spots || place.nearbySpots),
    image_url: place.image_url || place.imageUrl || '',
    image_path: place.image_path || place.imagePath || '',
    image_alt: place.image_alt || place.imageAlt || '',
    visual_tone: place.visual_tone || place.visualTone || 'paper',
    is_featured: Boolean(place.is_featured ?? place.isFeatured),
    status: place.status || 'draft',
    sort_order: place.sort_order ?? place.sortOrder ?? 0,
  }
}

function requiredLabel(text) {
  return (
    <>
      {text} <span className="field-required">Required</span>
    </>
  )
}

function optionalSection(title, note, children) {
  return (
    <details className="form-section">
      <summary>
        <span>{title}</span>
        <small>{note}</small>
      </summary>
      <div className="form-section-grid">{children}</div>
    </details>
  )
}

function missingPublishedFields(form) {
  if (form.status !== 'published') return []
  return publishedRequiredFields
    .filter(([field]) => !String(form[field] || '').trim())
    .map(([, label]) => label)
}

function statusActionLabel(status, editing) {
  if (editing) return 'Save Changes / 保存修改'
  if (status === 'published') return 'Publish / 发布'
  return 'Save Draft / 保存草稿'
}

function successMessage(status, editing) {
  if (editing) return 'Changes saved.\n修改已保存。'
  if (status === 'published') return 'Published successfully.\n已发布。'
  return 'Saved as draft.\n草稿已保存。'
}

export default function AdminPlaceForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const [cities, setCities] = useState([])
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [customType, setCustomType] = useState('')
  const [saveFeedback, setSaveFeedback] = useState(null)
  const [mapQuery, setMapQuery] = useState('')
  const [mapResults, setMapResults] = useState([])
  const [mapSearching, setMapSearching] = useState(false)
  const [mapMessage, setMapMessage] = useState(getAmapConfigMessage())

  useEffect(() => {
    if (!file) {
      setImagePreviewUrl('')
      return undefined
    }
    const objectUrl = URL.createObjectURL(file)
    setImagePreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  useEffect(() => {
    async function load() {
      try {
        const cityData = await getAdminCities()
        setCities(cityData)
        if (!editing && cityData[0]) setForm((current) => ({ ...current, city_id: cityData[0].id }))
        if (editing) {
          const place = await getAdminPlace(id)
          if (place) {
            const nextForm = placeToForm(place)
            setForm(nextForm)
            setSlugTouched(Boolean(nextForm.slug))
            if (nextForm.type && !placeTypeOptions.includes(nextForm.type)) setCustomType(nextForm.type)
          }
        }
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [editing, id])

  function update(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'name' && !slugTouched) next.slug = slugify(value)
      return next
    })
  }

  function updateSlug(value) {
    setSlugTouched(true)
    update('slug', slugify(value))
  }

  function updateType(value) {
    if (value === 'other') {
      setCustomType('')
      update('type', '')
      return
    }
    setCustomType('')
    update('type', value)
  }

  function updateCustomType(value) {
    setCustomType(value)
    update('type', value)
  }

  function removeImage() {
    setFile(null)
    setForm((current) => ({
      ...current,
      image_url: '',
      image_path: '',
    }))
  }

  const selectedCity = cities.find((city) => city.id === form.city_id)
  const placeSlug = form.slug || generateSlug(form.name, { fallbackPrefix: 'place' })
  const placeUrlPreview = `/cities/${selectedCity?.slug || '{citySlug}'}/places/${placeSlug || '{placeSlug}'}`
  const typeSelectValue = placeTypeOptions.includes(form.type) ? form.type : form.type ? 'other' : ''

  async function searchMap(event) {
    event.preventDefault()
    setMapMessage('')
    setMapResults([])

    if (!hasAmapConfig) {
      setMapMessage(getAmapConfigMessage())
      return
    }

    if (!mapQuery.trim()) {
      setMapMessage('Please enter a place name, address, or keyword.\n请输入店名、地址或关键词。')
      return
    }

    setMapSearching(true)
    try {
      const results = await searchAmapPlaces(mapQuery, selectedCity?.name || '')
      setMapResults(results)
      if (results.length === 0) {
        setMapMessage('No map result found. You can fill address manually.\n没有找到地图结果，你仍然可以手动填写地址。')
      }
    } catch (searchError) {
      setMapMessage(`${searchError.message}\n地图搜索失败。你仍然可以手动填写地址。`)
    } finally {
      setMapSearching(false)
    }
  }

  function chooseMapPlace(place) {
    setForm((current) => ({
      ...current,
      name: current.name || place.name,
      slug: current.slug || (!slugTouched && !current.name ? slugify(place.name) : current.slug),
      address: place.address || current.address,
      area: place.district || current.area,
      latitude: place.latitude ?? current.latitude,
      longitude: place.longitude ?? current.longitude,
      map_link: place.map_link || current.map_link,
      map_provider: place.map_provider || 'amap',
      map_place_id: place.map_place_id,
      map_name: place.map_name,
      map_address: place.map_address,
      map_city: place.map_city,
      map_district: place.map_district,
    }))
    setMapMessage('')
  }

  function buildPayload(extra = {}, source = form) {
    return {
      city_id: source.city_id || null,
      slug: source.slug || generateSlug(source.name, { fallbackPrefix: 'place' }),
      name: source.name,
      type: source.type,
      area: source.area,
      address: source.address,
      location_privacy: source.location_privacy,
      short_description: source.short_description,
      why_soulful: source.why_soulful,
      raw_note: source.raw_note,
      editorial_summary: source.editorial_summary,
      submission_status: source.submission_status || 'editorial',
      curator_note: source.curator_note,
      price_range: source.price_range,
      best_time: source.best_time,
      foreigner_friendly: source.foreigner_friendly,
      language_note: source.language_note,
      payment_note: source.payment_note,
      reservation_note: source.reservation_note,
      map_link: source.map_link,
      latitude: source.latitude === '' ? null : Number(source.latitude),
      longitude: source.longitude === '' ? null : Number(source.longitude),
      map_provider: source.map_provider || 'amap',
      map_place_id: source.map_place_id,
      map_name: source.map_name,
      map_address: source.map_address,
      map_city: source.map_city,
      map_district: source.map_district,
      mood_tags: toArray(source.mood_tags),
      free_soul_tags: toArray(source.free_soul_tags),
      best_for: toArray(source.best_for),
      good_for: toArray(source.good_for),
      not_for: toArray(source.not_for),
      practical_tips: toArray(source.practical_tips),
      nearby_spots: toArray(source.nearby_spots),
      image_url: source.image_url,
      image_path: source.image_path,
      image_alt: source.image_alt,
      visual_tone: source.visual_tone,
      is_featured: Boolean(source.is_featured),
      status: source.status,
      sort_order: Number(source.sort_order || 0),
      ...extra,
    }
  }

  async function saveWithStatus(nextStatus) {
    setError('')
    setSaveFeedback(null)

    const formToSave = { ...form, status: nextStatus }
    const generatedSlug = formToSave.slug || generateSlug(formToSave.name, { fallbackPrefix: 'place' })

    if (formToSave.status === 'published' && !generatedSlug) {
      setError('The system could not generate a URL slug. Please edit the name or open Advanced URL Settings and enter one manually.\n系统没有成功生成网址短链接，请修改名称或打开高级设置手动填写。')
      return
    }

    const missing = missingPublishedFields(formToSave)
    if (missing.length > 0) {
      setError(`To publish this place, please complete: ${missing.join(', ')}.\n发布前请补全这些必填项。你也可以先保存为 draft 草稿。`)
      return
    }

    setSaving(true)
    try {
      let saved = await savePlace(buildPayload({ slug: generatedSlug, status: nextStatus }, formToSave), id)
      if (file) {
        const uploaded = await uploadPlaceImage(file, `places/${saved.id}`)
        saved = await savePlace(buildPayload({
          slug: generatedSlug,
          status: nextStatus,
          image_url: uploaded.url,
          image_path: uploaded.path,
          image_alt: formToSave.image_alt || formToSave.name,
        }, formToSave), saved.id)
      }
      setForm(placeToForm(saved))
      setSlugTouched(Boolean(saved.slug))
      setFile(null)
      setSaveFeedback({
        message: successMessage(saved.status, editing),
        record: saved,
      })
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  function submit(event) {
    event.preventDefault()
    saveWithStatus(form.status)
  }

  return (
    <AdminShell title={editing ? 'Edit Place' : 'New Place'}>
      {loading ? <p>Loading...</p> : (
        <form className="editorial-form admin-form structured-form" onSubmit={submit} noValidate>
          <p className="form-intro">Start with the required fields. Optional sections can stay empty and be completed later.<br />先填必填项就可以保存。可选信息可以以后慢慢补。</p>
          <div className="status-toolbar">
            <span>Status</span>
            <select value={form.status} onChange={(event) => update('status', event.target.value)}>
              <option>draft</option>
              <option>published</option>
            </select>
            <small>draft = 草稿，不显示到前台；published = 发布，显示到前台。</small>
          </div>
          {error && <p className="form-error">{error}</p>}
          {saveFeedback && (
            <section className="save-feedback">
              <p>{saveFeedback.message}</p>
              <div>
                <Link className="button light" to="/admin/places">Back to places / 返回地点列表</Link>
                {saveFeedback.record?.id && <Link className="button light" to={`/admin/places/${saveFeedback.record.id}/edit`}>Continue editing / 继续编辑</Link>}
                {saveFeedback.record?.status === 'published' && selectedCity?.slug && saveFeedback.record?.slug && (
                  <Link className="button dark" to={`/cities/${selectedCity.slug}/places/${saveFeedback.record.slug}`}>View place / 查看前台页面</Link>
                )}
              </div>
            </section>
          )}

          <section className="form-section required-section">
            <header>
              <span>A.</span>
              <div>
                <h2>Required / 必填基础信息</h2>
                <p>These fields are required only when status is published. Drafts can stay loose while you collect details.</p>
              </div>
            </header>
            <div className="form-section-grid">
              <label>{requiredLabel('City')}<select value={form.city_id} onChange={(event) => update('city_id', event.target.value)}><option value="">Choose city</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select><span className="field-help">选择这个地点所属的城市专区。发布前必须选择城市。</span></label>
              <label>{requiredLabel('Name')}<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Example: Wave Records" /><span className="field-help">地点名称，系统会自动生成网址短链接。</span></label>
              <label>{requiredLabel('Type')}<select value={typeSelectValue} onChange={(event) => updateType(event.target.value)}><option value="">Choose type</option>{placeTypeOptions.map((type) => <option key={type} value={type}>{type}</option>)}</select><span className="field-help">选择最接近的地点类型；如果没有合适的，选择 other 后手动填写。</span></label>
              {typeSelectValue === 'other' && <label>Custom type<input value={customType} onChange={(event) => updateCustomType(event.target.value)} placeholder="listening room / tattoo studio" /><span className="field-help">自定义类型会保存为这个地点的 type。</span></label>}
              <label className="wide">{requiredLabel('Area')}<div className="quick-options">{dalianAreaOptions.map((area) => <button type="button" key={area} onClick={() => update('area', area)} className={form.area === area ? 'active' : ''}>{area}</button>)}</div><input value={form.area} onChange={(event) => update('area', event.target.value)} placeholder="Choose above or type manually" /><span className="field-help">可以点击常用区域，也可以手动输入其他街区。</span></label>
              <label className="wide">{requiredLabel('Short description')}<textarea value={form.short_description} onChange={(event) => update('short_description', event.target.value)} placeholder="A quiet record room for people who still listen slowly." /><span className="field-help">一句话介绍，前台卡片会显示。不要写太长。</span></label>
              <label className="wide">{requiredLabel('Why soulful')}<textarea value={form.why_soulful} onChange={(event) => update('why_soulful', event.target.value)} placeholder="What makes this place worth keeping in the atlas?" /><span className="field-help">这是前台核心段落。不要直接堆原始感受，尽量写成完整段落。</span></label>
            </div>
          </section>

          <section className="form-section required-section">
            <header>
              <span>Story</span>
              <div>
                <h2>Editorial Content / 编辑内容</h2>
                <p>Separate rough field notes from the edited public-facing copy.</p>
              </div>
            </header>
            <div className="form-section-grid">
              <label className="wide">Raw Notes / 原始观察<textarea value={form.raw_note} onChange={(event) => update('raw_note', event.target.value)} placeholder="First impression, friend's recommendation, messy field notes..." /><span className="field-help">这里可以写很随意的第一印象、个人观察、朋友推荐理由，不一定直接显示到前台。</span></label>
              <label className="wide">Editorial Summary / 编辑摘要<textarea value={form.editorial_summary} onChange={(event) => update('editorial_summary', event.target.value)} placeholder="A calmer edited summary in Free Soul Atlas tone." /><span className="field-help">这里是前台更正式展示的摘要，建议用统一、克制、有编辑感的语言。</span></label>
              <label>Submission status<select value={form.submission_status} onChange={(event) => update('submission_status', event.target.value)}><option>editorial</option><option>submitted</option><option>reviewed</option></select><span className="field-help">editorial = 管理员编辑内容；submitted = 用户投稿，待整理；reviewed = 已审核整理。</span></label>
            </div>
          </section>

          <details className="form-section">
            <summary>
              <span>Advanced URL Settings / 高级网址设置</span>
              <small>Most creators can ignore this. The URL slug is generated from the place name.</small>
            </summary>
            <div className="form-section-grid">
              <label className="wide">URL preview
                <input value={placeUrlPreview} readOnly />
                <span className="field-help">前台访问路径预览。系统会根据城市和地点名称自动生成。</span>
              </label>
              <label className="wide">Slug<input value={form.slug} onChange={(event) => updateSlug(event.target.value)} placeholder="wave-records" /><span className="field-help">默认自动生成。只有需要自定义 URL 时才修改。</span></label>
              {slugTouched && <p className="form-note">Custom URL slug / 已手动自定义网址短链接</p>}
            </div>
          </details>

          <section className="form-section map-location-section">
            <header>
              <span>Map</span>
              <div>
                <h2>Map Location / 地图位置</h2>
                <p>Search AMap by place name, address, or keyword. Choose a result to fill address and coordinates automatically.</p>
              </div>
            </header>
            <div className="map-search-panel">
              {!hasAmapConfig ? (
                <p className="form-note map-warning compact">{getAmapConfigMessage()}</p>
              ) : (
                <>
                  <label className="wide">Search place on AMap / 搜索高德地点
                    <input value={mapQuery} onChange={(event) => setMapQuery(event.target.value)} placeholder="店名、地址或关键词，例如 大连 咖啡 书店" />
                    <span className="field-help">建议先选择城市，再搜索店名或地址。搜索不到也可以继续手动填写 address / map link。</span>
                  </label>
                  <button className="button light" type="button" onClick={searchMap} disabled={mapSearching}>{mapSearching ? 'Searching...' : 'Search AMap'}</button>
                  {mapMessage && <p className="form-note map-message">{mapMessage}</p>}
                  {mapResults.length > 0 && (
                    <div className="map-result-list">
                      {mapResults.map((place) => (
                        <button type="button" key={`${place.provider}-${place.id}-${place.longitude}-${place.latitude}`} onClick={() => chooseMapPlace(place)}>
                          <strong>{place.name}</strong>
                          <span>{place.address || 'No address'} · {place.district || place.city || 'Unknown district'}</span>
                          {place.longitude && place.latitude && <small>{place.latitude}, {place.longitude}</small>}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              {(form.map_place_id || form.latitude || form.longitude || form.map_address) && (
                <div className="selected-map-place">
                  <span>Selected Map Location / 已选择地图位置</span>
                  <strong>{form.map_name || form.name || 'Unnamed place'}</strong>
                  <p>{form.map_address || form.address || 'No address yet'}</p>
                  <p>{form.map_district || form.area || 'No district'} · {form.latitude || '—'} / {form.longitude || '—'}</p>
                </div>
              )}
            </div>
          </section>

          {optionalSection('B. Optional Practical Info / 可选实用信息', 'Address, map, price, timing, and visitor notes.', (
            <>
              <label className="wide">Address<input value={form.address} onChange={(event) => update('address', event.target.value)} placeholder="Street address or nearby landmark" /><span className="field-help">具体地址或附近地标。可根据隐私设置决定前台展示精确位置或区域。</span></label>
              <label>Location privacy<select value={form.location_privacy} onChange={(event) => update('location_privacy', event.target.value)}><option value="exact">exact</option><option value="area_only">area_only</option><option value="city_only">city_only</option></select><span className="field-help">exact 显示具体地址；area_only 只显示区域；city_only 只显示城市。</span></label>
              <label className="wide">Map link<input value={form.map_link} onChange={(event) => update('map_link', event.target.value)} placeholder="https://maps..." /><span className="field-help">地图链接，可选。前台只作为轻量位置线索，不作为主导航。</span></label>
              <label>Price range<input value={form.price_range} onChange={(event) => update('price_range', event.target.value)} placeholder="¥ / ¥¥ / Free / Depends" /><span className="field-help">价格感受或消费区间，可以写 ¥、¥¥、Free 或按情况说明。</span></label>
              <label>Best time<input value={form.best_time} onChange={(event) => update('best_time', event.target.value)} placeholder="Weekday afternoon / After 8pm" /><span className="field-help">推荐到访时间，例如工作日下午、夜晚、演出前后。</span></label>
              <label>Foreigner friendly<select value={form.foreigner_friendly} onChange={(event) => update('foreigner_friendly', event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select><span className="field-help">给非本地/外国访客的友好程度参考，不是评分。</span></label>
              <label className="wide">Language note<textarea value={form.language_note} onChange={(event) => update('language_note', event.target.value)} placeholder="Chinese only, but staff are patient." /><span className="field-help">语言沟通提示，例如是否需要中文、是否容易交流。</span></label>
              <label className="wide">Payment note<textarea value={form.payment_note} onChange={(event) => update('payment_note', event.target.value)} placeholder="WeChat Pay / Alipay / cash..." /><span className="field-help">支付方式提示，例如微信、支付宝、现金或是否需要提前购票。</span></label>
              <label className="wide">Reservation note<textarea value={form.reservation_note} onChange={(event) => update('reservation_note', event.target.value)} placeholder="Reservation recommended on weekends." /><span className="field-help">预约或排队说明，例如周末是否建议预约、活动是否需要报名。</span></label>
            </>
          ))}

          {optionalSection('C. Optional Editorial Info / 可选策展信息', 'Tags, lists, nearby places, display order, and feature controls.', (
            <>
              <label className="wide">Curator note<textarea value={form.curator_note} onChange={(event) => update('curator_note', event.target.value)} placeholder="A small editorial note about atmosphere, people, texture, or memory." /><span className="field-help">策展人备注，可以写更主观的观察、氛围和细节。</span></label>
              <label>Mood tags<textarea value={form.mood_tags} onChange={(event) => update('mood_tags', event.target.value)} placeholder="quiet&#10;independent&#10;coastal" /><span className="field-help">气质标签，一行一个或用逗号分隔，例如 quiet、independent、coastal。</span></label>
              <label>Free soul tags<textarea value={form.free_soul_tags} onChange={(event) => update('free_soul_tags', event.target.value)} placeholder="owner-run&#10;non-touristy" /><span className="field-help">自由灵魂标签，描述它为什么不是普通地点。</span></label>
              <label>Best for<textarea value={form.best_for} onChange={(event) => update('best_for', event.target.value)} placeholder="solo afternoon&#10;slow browsing" /><span className="field-help">适合谁或适合什么场景，例如一个人去、慢慢逛、听音乐。</span></label>
              <label>Good for<textarea value={form.good_for} onChange={(event) => update('good_for', event.target.value)} placeholder="coffee&#10;records&#10;people watching" /><span className="field-help">适合做什么，可写 coffee、records、people watching 等。</span></label>
              <label>Not for<textarea value={form.not_for} onChange={(event) => update('not_for', event.target.value)} placeholder="large groups&#10;quick check-ins" /><span className="field-help">不适合谁或不适合什么期待，帮助前台用户判断。</span></label>
              <label>Practical tips<textarea value={form.practical_tips} onChange={(event) => update('practical_tips', event.target.value)} placeholder="Go before sunset.&#10;Ask before taking photos." /><span className="field-help">实用小提示，一行一个，例如最佳时间、拍照礼貌、隐藏入口。</span></label>
              <label>Nearby spots<textarea value={form.nearby_spots} onChange={(event) => update('nearby_spots', event.target.value)} placeholder="Old tram stop&#10;Small bookstore nearby" /><span className="field-help">附近可以顺路看的地方，可写地点名或简单线索。</span></label>
              <label>Sort order<input type="number" value={form.sort_order} onChange={(event) => update('sort_order', event.target.value)} placeholder="0" /><span className="field-help">排序数字，数字越小越靠前。</span></label>
              <label className="check-label"><input type="checkbox" checked={form.is_featured} onChange={(event) => update('is_featured', event.target.checked)} /> Featured place<span className="field-help">勾选后可作为首页或城市页精选内容展示。</span></label>
            </>
          ))}

          {optionalSection('D. Optional Image / 可选图片', 'Upload an image now, or leave it empty and use the existing placeholder.', (
            <>
              <div className="image-preview-panel">
                <span>Current cover image / 当前封面图</span>
                {(imagePreviewUrl || form.image_url) ? (
                  <img src={imagePreviewUrl || form.image_url} alt={form.image_alt || form.name || 'Place cover preview'} />
                ) : (
                  <div className="image-preview-empty">No cover image yet / 还没有封面图</div>
                )}
                <div className="image-actions">
                  <label className="button light">Replace image / 替换图片<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
                  {(imagePreviewUrl || form.image_url) && <button className="button light" type="button" onClick={removeImage}>Remove image / 移除图片</button>}
                </div>
                <p>上传后会立即预览。没有图片也可以保存，前台会继续使用现有视觉占位。</p>
              </div>
              <label className="wide">Image alt<input value={form.image_alt} onChange={(event) => update('image_alt', event.target.value)} placeholder="Interior corner with records and warm light" /><span className="field-help">图片替代文字，用一句话描述画面，利于可访问性和 SEO。</span></label>
              <label>Visual tone<input value={form.visual_tone} onChange={(event) => update('visual_tone', event.target.value)} placeholder="paper / charcoal / warm" /><span className="field-help">视觉色调标记，可用于以后控制卡片气质；不知道就保留 paper。</span></label>
              {form.image_url && (
                <details className="debug-details">
                  <summary>Advanced / Debug image URL</summary>
                  <p>{form.image_url}</p>
                </details>
              )}
            </>
          ))}

          <div className="sticky-save-bar">
            <div>
              <span>{editing ? 'Editing place' : 'New place'}</span>
              {saveFeedback && <p>{saveFeedback.message}</p>}
              {error && <p className="sticky-error">{error}</p>}
            </div>
            <nav>
              <button className="button light" type="button" disabled={saving} onClick={() => saveWithStatus('draft')}>{saving ? 'Saving...' : 'Save Draft / 保存草稿'}</button>
              <button className="button dark" type="button" disabled={saving} onClick={() => saveWithStatus('published')}>{saving ? 'Saving...' : 'Publish / 发布'}</button>
              <Link className="button light" to="/admin/places">Cancel / 取消</Link>
            </nav>
          </div>
        </form>
      )}
    </AdminShell>
  )
}
