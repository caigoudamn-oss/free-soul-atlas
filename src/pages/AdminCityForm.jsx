import { useEffect, useState } from 'react'
import { Link, useParams } from '../lib/router'
import AdminShell from '../components/AdminShell'
import { getAdminCity, saveCity } from '../services/cityService'
import { slugify } from '../services/formatters'
import { uploadPlaceImage } from '../services/storageService'

const initialForm = {
  slug: '',
  name: '',
  country: 'China',
  region: '',
  subtitle: '',
  description: '',
  editorial_note: '',
  status: 'draft',
  sort_order: 0,
  is_featured: false,
  cover_image_url: '',
  cover_image_path: '',
  cover_image_alt: '',
}

const publishedRequiredFields = [
  ['name', 'Name'],
  ['country', 'Country'],
  ['status', 'Status'],
  ['subtitle', 'Subtitle'],
]

function requiredLabel(text) {
  return (
    <>
      {text} <span className="field-required">Required</span>
    </>
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

export default function AdminCityForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const [form, setForm] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [saveFeedback, setSaveFeedback] = useState(null)

  useEffect(() => {
    if (!editing) return
    async function load() {
      try {
        const city = await getAdminCity(id)
        if (city) {
          const nextForm = {
            slug: city.slug || '',
            name: city.name || '',
            country: city.country || '',
            region: city.region || '',
            subtitle: city.subtitle || '',
            description: city.description || '',
            editorial_note: city.editorial_note || city.editorialNote || '',
            status: city.status || 'draft',
            sort_order: city.sort_order ?? city.sortOrder ?? 0,
            is_featured: Boolean(city.is_featured ?? city.isFeatured),
            cover_image_url: city.cover_image_url || city.coverImageUrl || '',
            cover_image_path: city.cover_image_path || city.coverImagePath || '',
            cover_image_alt: city.cover_image_alt || city.coverImageAlt || '',
          }
          setForm(nextForm)
          setSlugTouched(Boolean(nextForm.slug))
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

  const citySlug = form.slug || slugify(form.name)
  const cityUrlPreview = `/cities/${citySlug || '{citySlug}'}`

  async function submit(event) {
    event.preventDefault()
    setError('')
    setSaveFeedback(null)

    const generatedSlug = form.slug || slugify(form.name)

    if (form.status === 'published' && !generatedSlug) {
      setError('The system could not generate a URL slug. Please edit the city name or open Advanced URL Settings and enter one manually.\n系统没有成功生成网址短链接，请修改城市名称或打开高级设置手动填写。')
      return
    }

    const missing = missingPublishedFields(form)
    if (missing.length > 0) {
      setError(`To publish this city, please complete: ${missing.join(', ')}.\n发布城市前请补全这些必填项。你也可以先保存为 draft 草稿或 coming_soon。`)
      return
    }

    setSaving(true)
    try {
      const payload = {
        ...form,
        slug: generatedSlug,
        sort_order: Number(form.sort_order || 0),
      }
      let saved = await saveCity(payload, id)
      if (file) {
        const uploaded = await uploadPlaceImage(file, `cities/${saved.id}`)
        saved = await saveCity({
          cover_image_url: uploaded.url,
          cover_image_path: uploaded.path,
          cover_image_alt: form.cover_image_alt || form.name,
        }, saved.id)
      }
      setForm({
        slug: saved.slug || '',
        name: saved.name || '',
        country: saved.country || '',
        region: saved.region || '',
        subtitle: saved.subtitle || '',
        description: saved.description || '',
        editorial_note: saved.editorial_note || saved.editorialNote || '',
        status: saved.status || 'draft',
        sort_order: saved.sort_order ?? saved.sortOrder ?? 0,
        is_featured: Boolean(saved.is_featured ?? saved.isFeatured),
        cover_image_url: saved.cover_image_url || saved.coverImageUrl || '',
        cover_image_path: saved.cover_image_path || saved.coverImagePath || '',
        cover_image_alt: saved.cover_image_alt || saved.coverImageAlt || '',
      })
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

  return (
    <AdminShell title={editing ? 'Edit City' : 'New City'}>
      {loading ? <p>Loading...</p> : (
        <form className="editorial-form admin-form structured-form" onSubmit={submit} noValidate>
          <p className="form-intro">Create a city edition first, then add places under that city.<br />先创建城市专区，再在这个城市下面添加地点。</p>
          {error && <p className="form-error">{error}</p>}
          {saveFeedback && (
            <section className="save-feedback">
              <p>{saveFeedback.message}</p>
              <div>
                <Link className="button light" to="/admin/cities">Back to cities / 返回城市列表</Link>
                {saveFeedback.record?.id && <Link className="button light" to={`/admin/cities/${saveFeedback.record.id}/edit`}>Continue editing / 继续编辑</Link>}
                {saveFeedback.record?.status === 'published' && saveFeedback.record?.slug && (
                  <Link className="button dark" to={`/cities/${saveFeedback.record.slug}`}>View city / 查看前台页面</Link>
                )}
              </div>
            </section>
          )}

          <section className="form-section required-section">
            <header>
              <span>A.</span>
              <div>
                <h2>Required / 必填基础信息</h2>
                <p>These fields are required only when status is published.</p>
              </div>
            </header>
            <div className="form-section-grid">
              <label>{requiredLabel('Name')}<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Dalian" /><span className="field-help">城市显示名称，例如 Dalian。</span></label>
              <label>{requiredLabel('Country')}<input value={form.country} onChange={(event) => update('country', event.target.value)} placeholder="China" /><span className="field-help">国家名称，用于城市档案展示。</span></label>
              <label>{requiredLabel('Status')}<select value={form.status} onChange={(event) => update('status', event.target.value)}><option>draft</option><option>published</option><option>coming_soon</option></select><span className="field-help">draft 不显示；published 前台可访问；coming_soon 可作为即将开放城市。</span></label>
              <label className="wide">{requiredLabel('Subtitle')}<input value={form.subtitle} onChange={(event) => update('subtitle', event.target.value)} placeholder="A coastal city for quiet rooms, independent shops, and soulful corners." /><span className="field-help">一句话城市气质说明，会用于城市卡片和城市页开头。</span></label>
            </div>
          </section>

          <details className="form-section">
            <summary>
              <span>Advanced URL Settings / 高级网址设置</span>
              <small>Most creators can ignore this. The city URL slug is generated from the city name.</small>
            </summary>
            <div className="form-section-grid">
              <label className="wide">URL preview
                <input value={cityUrlPreview} readOnly />
                <span className="field-help">城市前台访问路径预览。系统会根据城市名称自动生成。</span>
              </label>
              <label className="wide">Slug<input value={form.slug} onChange={(event) => updateSlug(event.target.value)} placeholder="dalian" /><span className="field-help">默认自动生成。只有需要自定义 URL 时才修改。</span></label>
              {slugTouched && <p className="form-note">Custom URL slug / 已手动自定义网址短链接</p>}
            </div>
          </details>

          <details className="form-section">
            <summary>
              <span>B. Optional / 可选信息</span>
              <small>Region, longer copy, cover image, ordering, and feature controls.</small>
            </summary>
            <div className="form-section-grid">
              <label>Region<input value={form.region} onChange={(event) => update('region', event.target.value)} placeholder="Liaoning" /><span className="field-help">省份、地区或城市所属区域，可选。</span></label>
              <label className="wide">Description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="A short editorial introduction to this city edition." /><span className="field-help">城市专区介绍，可以写这个城市为什么适合成为 Free Soul Atlas 的一站。</span></label>
              <label className="wide">Editorial note<textarea value={form.editorial_note} onChange={(event) => update('editorial_note', event.target.value)} placeholder="What kind of places, people, and textures are we looking for here?" /><span className="field-help">编辑备注，写城市气质、收录标准或策展方向。</span></label>
              <label>Cover image<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /><span className="field-help">城市封面图，可选。没有图片时前台继续使用视觉占位。</span></label>
              <label className="wide">Cover image alt<input value={form.cover_image_alt} onChange={(event) => update('cover_image_alt', event.target.value)} placeholder="Dalian coastline in soft evening light" /><span className="field-help">封面图替代文字，用一句话描述画面。</span></label>
              <label>Sort order<input type="number" value={form.sort_order} onChange={(event) => update('sort_order', event.target.value)} placeholder="0" /><span className="field-help">排序数字，数字越小越靠前。</span></label>
              <label className="check-label"><input type="checkbox" checked={form.is_featured} onChange={(event) => update('is_featured', event.target.checked)} /> Featured city<span className="field-help">勾选后可作为首页重点城市展示。</span></label>
              {form.cover_image_url && <p className="form-note">Current image: {form.cover_image_url}</p>}
            </div>
          </details>

          <div className="form-actions">
            <button className="button dark" type="submit" disabled={saving}>{saving ? 'Saving...' : statusActionLabel(form.status, editing)}</button>
            <Link className="button light" to="/admin/cities">Cancel</Link>
          </div>
        </form>
      )}
    </AdminShell>
  )
}
