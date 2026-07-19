import { useEffect, useMemo, useState } from 'react'
import { Link } from '../lib/router'
import { submitPublicPlace } from '../services/submissionService'

const placeTypes = [
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

const initialForm = {
  name: '',
  type: 'cafe',
  customType: '',
  area: '',
  reason: '',
  nickname: '',
  contact: '',
}

export default function Submit() {
  const [form, setForm] = useState(initialForm)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = useMemo(() => {
    const hasType = form.type === 'other' ? form.customType.trim() : form.type
    return form.name.trim() && hasType && form.reason.trim()
  }, [form])

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview('')
      return undefined
    }
    const previewUrl = URL.createObjectURL(photoFile)
    setPhotoPreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [photoFile])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function resetForm() {
    setForm(initialForm)
    setPhotoFile(null)
    setError('')
    setSubmitted(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!canSubmit) {
      setError('Please complete Place name, Type, and Recommendation reason. / 请补全地点名、类型和推荐理由。')
      return
    }

    setSaving(true)
    try {
      await submitPublicPlace(form, photoFile)
      setSubmitted(true)
    } catch (submitError) {
      console.error('Public submission failed:', submitError)
      setError('Submission failed. Please try again or use a shorter place name.\n提交失败，请重试，或尝试使用更短的地点名称。')
    } finally {
      setSaving(false)
    }
  }

  if (submitted) {
    return (
      <section className="success-page submission-success">
        <span>Submission Received</span>
        <h1>Thank you for the recommendation.</h1>
        <p>
          Your submission has been received and will be reviewed by Free Soul Atlas.
          <br />
          感谢你的推荐。这条内容已经收到，会由 Free Soul Atlas 审核和编辑后再发布。
        </p>
        <div className="success-actions">
          <button className="button dark" type="button" onClick={resetForm}>Submit another place / 继续推荐</button>
          <Link className="button light" to="/">Back to home / 回到首页</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="submission-page">
      <div className="submission-hero">
        <p className="eyebrow">Public Submission / Community Field Notes</p>
        <h1>Recommend a soulful place</h1>
        <h2>推荐一个有灵魂的地方</h2>
        <p>
          Free Soul Atlas collects independent spaces, local corners, and cultural places with personality.
          Every submission will be reviewed and edited before publishing.
        </p>
        <p>
          Free Soul Atlas 收集有个性、有审美、有本地气质的独立空间和城市角落。
          每一条推荐都会经过审核和编辑后再发布。
        </p>
      </div>

      <form className="editorial-form submission-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <label>
          Place name / 地点名 <span className="field-required">Required</span>
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Echo Records"
          />
        </label>

        <label>
          City / 城市
          <input value="Dalian" readOnly />
          <small className="field-help">第一阶段先收集 Dalian / 大连。系统会自动关联 Dalian city edition。</small>
        </label>

        <label>
          Type / 类型 <span className="field-required">Required</span>
          <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
            {placeTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>

        {form.type === 'other' && (
          <label>
            Custom type / 自定义类型 <span className="field-required">Required</span>
            <input
              value={form.customType}
              onChange={(event) => updateField('customType', event.target.value)}
              placeholder="listening room / independent space"
            />
          </label>
        )}

        <label>
          Area / 大概区域
          <input
            value={form.area}
            onChange={(event) => updateField('area', event.target.value)}
            placeholder="Zhongshan / 中山"
          />
        </label>

        <label className="wide">
          Why do you recommend it? / 为什么推荐它？ <span className="field-required">Required</span>
          <textarea
            value={form.reason}
            onChange={(event) => updateField('reason', event.target.value)}
            placeholder="Tell us what makes this place feel alive, personal, strange, quiet, independent, or worth remembering. / 写下它为什么有灵魂，不用像广告文案。"
          />
          <small className="field-help">
            This becomes raw editor notes first, not public copy. It will be reviewed and rewritten before publishing.
            这里会先作为原始观察保存，不会直接发布到前台。
          </small>
        </label>

        <label>
          Your name or nickname / 你的署名，可选
          <input
            value={form.nickname}
            onChange={(event) => updateField('nickname', event.target.value)}
            placeholder="Your nickname"
          />
        </label>

        <label>
          Contact / 联系方式，可选
          <input
            value={form.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            placeholder="Email / Instagram / WeChat"
          />
          <small className="field-help">Only for editorial follow-up. It will not be displayed publicly. 仅供编辑联系，不会公开展示。</small>
        </label>

        <label className="wide">
          Photo upload / 图片，可选
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setPhotoFile(event.target.files?.[0] || null)}
          />
        </label>

        {(photoPreview || photoFile) && (
          <div className="submission-photo-preview">
            <span>Selected photo / 已选择图片</span>
            {photoPreview && <img src={photoPreview} alt="Selected place preview" />}
            <button className="button light" type="button" onClick={() => setPhotoFile(null)}>Remove image / 移除图片</button>
          </div>
        )}

        <div className="submission-submit-bar">
          <div>
            <span>Review before publishing</span>
            <p>Submissions are saved as draft + submitted. They will not appear on the public site until reviewed.</p>
          </div>
          <button className="button dark" type="submit" disabled={saving || !canSubmit}>
            {saving ? 'Submitting...' : 'Submit recommendation / 提交推荐'}
          </button>
        </div>
      </form>
    </section>
  )
}
