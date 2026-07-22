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

const fieldLimits = {
  name: 80,
  area: 80,
  reason: 1000,
  nickname: 50,
  contact: 120,
}

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxImageSize = 5 * 1024 * 1024

const initialForm = {
  name: '',
  type: 'cafe',
  customType: '',
  area: '',
  reason: '',
  nickname: '',
  contact: '',
  website: '',
}

export default function Submit() {
  const [form, setForm] = useState(initialForm)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [responsibilityConfirmed, setResponsibilityConfirmed] = useState(false)

  const canSubmit = useMemo(() => {
    const hasType = form.type === 'other' ? form.customType.trim() : form.type
    return form.name.trim() && hasType && form.reason.trim() && responsibilityConfirmed
  }, [form, responsibilityConfirmed])

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

  function isTooLong() {
    return (
      form.name.length > fieldLimits.name ||
      form.area.length > fieldLimits.area ||
      form.reason.length > fieldLimits.reason ||
      form.nickname.length > fieldLimits.nickname ||
      form.contact.length > fieldLimits.contact
    )
  }

  function handlePhotoChange(file) {
    setError('')
    if (!file) {
      setPhotoFile(null)
      return
    }

    if (!allowedImageTypes.includes(file.type) || file.size > maxImageSize) {
      setPhotoFile(null)
      setError('Please upload a JPG, PNG, or WebP image under 5MB.\n请上传 5MB 以内的 JPG、PNG 或 WebP 图片。')
      return
    }

    setPhotoFile(file)
  }

  function resetForm() {
    setForm(initialForm)
    setPhotoFile(null)
    setError('')
    setResponsibilityConfirmed(false)
    setSubmitted(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.website.trim()) {
      setSubmitted(true)
      return
    }

    if (isTooLong()) {
      setError('Please keep your submission shorter.\n请精简你的投稿内容。')
      return
    }

    if (!canSubmit) {
      if (!form.name.trim() || !form.reason.trim() || (form.type === 'other' && !form.customType.trim())) {
        setError('Please complete Place name, Type, and Recommendation reason. / 请补全地点名、类型和推荐理由。')
      } else {
        setError('Please confirm the content responsibility before submitting. / 提交前请确认内容责任说明。')
      }
      return
    }

    setSaving(true)
    try {
      await submitPublicPlace(form, photoFile)
      setSubmitted(true)
    } catch (submitError) {
      console.error('Public submission failed:', submitError)
      setError('Submission failed. Please try again later.\n提交失败，请稍后重试。')
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

      <section className="submission-notice">
        <div>
          <span>Open Submission Notice</span>
          <h2>开放投稿说明</h2>
        </div>
        <div className="submission-note-copy">
          <p>
            Free Soul Atlas is an open cultural atlas built with community submissions.
            <br />
            Free Soul Atlas 是一个开放的城市文化地图，欢迎来自不同地区和文化背景的人提交推荐。
          </p>
          <p>
            Submissions reflect the contributor’s personal experience and opinion. They do not represent the official position of Free Soul Atlas.
            <br />
            投稿内容仅代表投稿人的个人经历与个人意见，不代表 Free Soul Atlas 的官方立场。
          </p>
          <p>
            Free Soul Atlas is an independent cultural project, not an official tourism authority.
            <br />
            Free Soul Atlas 是一个独立文化项目，并非官方旅游机构。
          </p>
          <p>
            Every submission will be reviewed and edited before publishing.
            <br />
            每条投稿都会在发布前经过审核和编辑。
          </p>
          <p>
            We may adjust wording, structure, translation, and presentation to keep the platform consistent, accurate, and respectful.
            <br />
            为了保持平台内容的一致性、准确性与尊重性，我们可能会对文案结构、表达方式、翻译和展示形式进行编辑。
          </p>
          <p>
            Submissions are reviewed before publishing and may be edited for clarity, privacy, safety, and tone.
            <br />
            投稿会在发布前审核，并可能出于清晰度、隐私、安全和语气一致性进行编辑。
          </p>
        </div>
      </section>

      <section className="submission-notice recommendation-guide">
        <div>
          <span>What makes a good recommendation?</span>
          <h2>什么样的地方适合推荐？</h2>
        </div>
        <div className="submission-guide-grid">
          <div>
            <h3>Good examples / 适合推荐</h3>
            <ul>
              <li>Independent cafés / 独立咖啡店</li>
              <li>Record stores / 唱片店</li>
              <li>Vintage shops / 古着店</li>
              <li>Small bars / 小酒吧</li>
              <li>Livehouses / 现场音乐空间</li>
              <li>Bookstores / 书店</li>
              <li>Galleries / 画廊</li>
              <li>Street corners with local character / 有本地气质的街角</li>
              <li>Creative spaces / 创意空间</li>
            </ul>
          </div>
          <div>
            <h3>Not ideal / 不太适合</h3>
            <ul>
              <li>Chain stores / 连锁店</li>
              <li>Pure advertisements / 纯广告</li>
              <li>Places you have never visited / 你没去过或不了解的地方</li>
              <li>Private homes or private gatherings without permission / 未经允许的私人住址或私人聚会</li>
              <li>Offensive or false claims / 攻击性或虚假内容</li>
            </ul>
          </div>
          <p className="submission-guide-note">
            Submission does not guarantee publication.
            <br />
            投稿不代表一定会被发布。
          </p>
        </div>
      </section>

      <form className="editorial-form submission-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <label className="honeypot-field" aria-hidden="true">
          Website
          <input
            tabIndex="-1"
            autoComplete="off"
            value={form.website}
            onChange={(event) => updateField('website', event.target.value)}
          />
        </label>

        <label>
          Place name / 地点名 <span className="field-required">Required</span>
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Echo Records"
            maxLength={fieldLimits.name}
          />
          <small className="field-help">Maximum {fieldLimits.name} characters / 最多 {fieldLimits.name} 字符。</small>
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
            maxLength={fieldLimits.area}
          />
          <small className="field-help">Maximum {fieldLimits.area} characters / 最多 {fieldLimits.area} 字符。</small>
        </label>

        <label className="wide">
          Why do you recommend it? / 为什么推荐它？ <span className="field-required">Required</span>
          <textarea
            value={form.reason}
            onChange={(event) => updateField('reason', event.target.value)}
            placeholder="Tell us what makes this place feel alive, personal, strange, quiet, independent, or worth remembering. / 写下它为什么有灵魂，不用像广告文案。"
            maxLength={fieldLimits.reason}
          />
          <small className="field-help">
            This becomes raw editor notes first, not public copy. It will be reviewed and rewritten before publishing.
            这里会先作为原始观察保存，不会直接发布到前台。Maximum {fieldLimits.reason} characters / 最多 {fieldLimits.reason} 字符。
          </small>
        </label>

        <label>
          Your name or nickname / 你的署名，可选
          <input
            value={form.nickname}
            onChange={(event) => updateField('nickname', event.target.value)}
            placeholder="Optional nickname"
            maxLength={fieldLimits.nickname}
          />
          <small className="field-help">Optional. Do not use your real name unless you want to. 可选，不要求真实姓名。</small>
        </label>

        <label>
          Contact / 联系方式，可选
          <input
            value={form.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            placeholder="Optional contact for editorial follow-up"
            maxLength={fieldLimits.contact}
          />
          <small className="field-help">Only for editorial follow-up. It will not be displayed publicly. 仅供编辑联系，不会公开展示。</small>
        </label>

        <section className="submission-inline-note wide">
          <span>Privacy Note</span>
          <h3>隐私说明</h3>
          <p>
            Your nickname and contact information are optional.
            <br />
            你的署名和联系方式均为可选填写。
          </p>
          <p>
            We only collect the information needed to review your submission.
            <br />
            我们只收集审核投稿所必要的信息。
          </p>
          <p>
            Contact information is used only for editorial follow-up and will not be displayed publicly.
            <br />
            联系方式仅用于编辑沟通，不会公开展示。
          </p>
          <p>
            We do not intentionally collect sensitive personal information. Please do not submit private information about yourself or others.
            <br />
            我们不会主动收集敏感个人信息。请不要提交你本人或他人的隐私信息。
          </p>
        </section>

        <label className="wide">
          Photo upload / 图片，可选
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handlePhotoChange(event.target.files?.[0] || null)}
          />
          <small className="field-help">JPG, PNG, or WebP only. Maximum 5MB. 仅支持 JPG、PNG 或 WebP，最大 5MB。</small>
        </label>

        {(photoPreview || photoFile) && (
          <div className="submission-photo-preview">
            <span>Selected photo / 已选择图片</span>
            {photoPreview && <img src={photoPreview} alt="Selected place preview" />}
            <button className="button light" type="button" onClick={() => setPhotoFile(null)}>Remove image / 移除图片</button>
          </div>
        )}

        <section className="submission-inline-note responsibility-note wide">
          <span>Content Responsibility</span>
          <h3>内容责任</h3>
          <p>
            Please submit only genuine recommendations based on your own knowledge or experience.
            <br />
            请只提交基于你本人了解或经历的真实推荐。
          </p>
          <p>
            Do not submit spam, advertisements, offensive content, false information, or content that infringes others’ rights.
            <br />
            请不要提交垃圾信息、广告、攻击性内容、虚假信息或侵犯他人权益的内容。
          </p>
          <p>
            Please upload only photos you took yourself or have permission to use.
            <br />
            请只上传你本人拍摄或已获得授权使用的图片。
          </p>
          <p>
            Please do not submit private addresses, private gatherings, or sensitive locations without permission.
            <br />
            未经许可，请不要提交私人住址、私人聚会地点或敏感位置。
          </p>
        </section>

        <label className="consent-checkbox wide">
          <input
            type="checkbox"
            checked={responsibilityConfirmed}
            onChange={(event) => setResponsibilityConfirmed(event.target.checked)}
          />
          <span>
            I confirm that this submission reflects my personal opinion, that I have the right to share the content and any uploaded photo, and that I understand it may be reviewed and edited before publishing.
            <br />
            我确认这条投稿仅代表我的个人意见；我有权分享所提交的文字内容和上传图片；我理解内容发布前可能会经过审核与编辑。
          </span>
        </label>

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

      <section className="submission-footer-note">
        <span>Correction, removal, or privacy request</span>
        <h2>修改、删除或隐私请求</h2>
        <p>
          If you want to correct or remove a submission, or if you have a privacy concern, please contact us.
          <br />
          如需修改或删除投稿，或处理隐私相关问题，请联系我们。
        </p>
        <p>Contact: freesoulatlas@outlook.com</p>
      </section>
    </section>
  )
}
