import { useEffect, useState } from 'react'
import { Link, useParams } from '../lib/router'
import AdminShell from '../components/AdminShell'
import { getAdminCities } from '../services/cityService'
import { getAdminPlace, savePlace } from '../services/placeService'
import { listToText, slugify, toArray } from '../services/formatters'
import { uploadPlaceImage } from '../services/storageService'

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
  curator_note: '',
  price_range: '',
  best_time: '',
  foreigner_friendly: 'Medium',
  language_note: '',
  payment_note: '',
  reservation_note: '',
  map_link: '',
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
  ['slug', 'Slug'],
  ['type', 'Type'],
  ['area', 'Area'],
  ['short_description', 'Short description'],
  ['why_soulful', 'Why soulful'],
  ['status', 'Status'],
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
    curator_note: place.curator_note || place.curatorNote || '',
    price_range: place.price_range || place.priceRange || '',
    best_time: place.best_time || place.bestTime || '',
    foreigner_friendly: place.foreigner_friendly || place.foreignerFriendly || 'Medium',
    language_note: place.language_note || place.languageNote || '',
    payment_note: place.payment_note || place.paymentNote || '',
    reservation_note: place.reservation_note || place.reservationNote || '',
    map_link: place.map_link || place.mapLink || '',
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

export default function AdminPlaceForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const [cities, setCities] = useState([])
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const cityData = await getAdminCities()
        setCities(cityData)
        if (!editing && cityData[0]) setForm((current) => ({ ...current, city_id: cityData[0].id }))
        if (editing) {
          const place = await getAdminPlace(id)
          if (place) setForm(placeToForm(place))
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
      if (field === 'name' && !editing && !current.slug) next.slug = slugify(value)
      return next
    })
  }

  function buildPayload(extra = {}) {
    return {
      city_id: form.city_id || null,
      slug: form.slug,
      name: form.name,
      type: form.type,
      area: form.area,
      address: form.address,
      location_privacy: form.location_privacy,
      short_description: form.short_description,
      why_soulful: form.why_soulful,
      curator_note: form.curator_note,
      price_range: form.price_range,
      best_time: form.best_time,
      foreigner_friendly: form.foreigner_friendly,
      language_note: form.language_note,
      payment_note: form.payment_note,
      reservation_note: form.reservation_note,
      map_link: form.map_link,
      mood_tags: toArray(form.mood_tags),
      free_soul_tags: toArray(form.free_soul_tags),
      best_for: toArray(form.best_for),
      good_for: toArray(form.good_for),
      not_for: toArray(form.not_for),
      practical_tips: toArray(form.practical_tips),
      nearby_spots: toArray(form.nearby_spots),
      image_url: form.image_url,
      image_path: form.image_path,
      image_alt: form.image_alt,
      visual_tone: form.visual_tone,
      is_featured: Boolean(form.is_featured),
      status: form.status,
      sort_order: Number(form.sort_order || 0),
      ...extra,
    }
  }

  async function submit(event) {
    event.preventDefault()
    setError('')

    const missing = missingPublishedFields(form)
    if (missing.length > 0) {
      setError(`To publish this place, please complete: ${missing.join(', ')}.\n发布前请补全这些必填项。你也可以先保存为 draft 草稿。`)
      return
    }

    setSaving(true)
    try {
      let saved = await savePlace(buildPayload(), id)
      if (file) {
        const uploaded = await uploadPlaceImage(file, `places/${saved.id}`)
        saved = await savePlace(buildPayload({
          image_url: uploaded.url,
          image_path: uploaded.path,
          image_alt: form.image_alt || form.name,
        }), saved.id)
      }
      window.location.href = '/admin/places'
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell title={editing ? 'Edit Place' : 'New Place'}>
      {loading ? <p>Loading...</p> : (
        <form className="editorial-form admin-form structured-form" onSubmit={submit} noValidate>
          <p className="form-intro">Start with the required fields. Optional sections can stay empty and be completed later.<br />先填必填项就可以保存。可选信息可以以后慢慢补。</p>
          {error && <p className="form-error">{error}</p>}

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
              <label>{requiredLabel('Status')}<select value={form.status} onChange={(event) => update('status', event.target.value)}><option>draft</option><option>published</option></select><span className="field-help">draft 不显示到前台；published 会显示到前台。</span></label>
              <label>{requiredLabel('Name')}<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Example: Wave Records" /><span className="field-help">地点名称，建议使用真实店名或空间名称。</span></label>
              <label>{requiredLabel('Slug')}<input value={form.slug} onChange={(event) => update('slug', slugify(event.target.value))} placeholder="wave-records" /><span className="field-help">网址短链接，只能用英文小写、数字和横杠。</span></label>
              <label>{requiredLabel('Type')}<input value={form.type} onChange={(event) => update('type', event.target.value)} placeholder="cafe / bar / record store / vintage" /><span className="field-help">地点类型，例如 cafe / bar / record store / vintage。</span></label>
              <label>{requiredLabel('Area')}<input value={form.area} onChange={(event) => update('area', event.target.value)} placeholder="Zhongshan / Xigang / Shahekou" /><span className="field-help">城市区域或街区名称，方便前台展示位置线索。</span></label>
              <label className="wide">{requiredLabel('Short description')}<textarea value={form.short_description} onChange={(event) => update('short_description', event.target.value)} placeholder="A quiet record room for people who still listen slowly." /><span className="field-help">一句话介绍，前台卡片会显示。不要写太长。</span></label>
              <label className="wide">{requiredLabel('Why soulful')}<textarea value={form.why_soulful} onChange={(event) => update('why_soulful', event.target.value)} placeholder="What makes this place worth keeping in the atlas?" /><span className="field-help">为什么值得收录。写真实的气质、细节和原因，不要写普通广告文案。</span></label>
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
              <label>Image<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /><span className="field-help">上传地点主图。没有图片也可以保存，前台会继续使用现有视觉占位。</span></label>
              <label className="wide">Image alt<input value={form.image_alt} onChange={(event) => update('image_alt', event.target.value)} placeholder="Interior corner with records and warm light" /><span className="field-help">图片替代文字，用一句话描述画面，利于可访问性和 SEO。</span></label>
              <label>Visual tone<input value={form.visual_tone} onChange={(event) => update('visual_tone', event.target.value)} placeholder="paper / charcoal / warm" /><span className="field-help">视觉色调标记，可用于以后控制卡片气质；不知道就保留 paper。</span></label>
              {form.image_url && <p className="form-note">Current image: {form.image_url}</p>}
            </>
          ))}

          <div className="form-actions">
            <button className="button dark" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Place'}</button>
            <Link className="button light" to="/admin/places">Cancel</Link>
          </div>
        </form>
      )}
    </AdminShell>
  )
}
