import { useState } from 'react'

const initialForm = {
  name: '',
  type: '',
  area: '',
  why: '',
  bestFor: '',
  mood: '',
  foreignerNotes: '',
  contact: '',
}

export default function Recommend() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function submit(event) {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="success-page">
        <span>Recommendation received</span>
        <h1>Thank you for adding a possible free soul to the atlas.</h1>
        <p>We’ll review it before adding anything to the public atlas.</p>
        <button className="button light" onClick={() => setSent(false)}>Recommend another place</button>
      </div>
    )
  }

  return (
    <div className="page form-page">
      <header className="page-hero">
        <p className="eyebrow">Recommend</p>
        <h1>Recommend a Free Soul Place</h1>
        <p>Know a place in Dalian with personality, atmosphere, stories, or independent taste? Tell us about it.</p>
      </header>

      <form className="editorial-form" onSubmit={submit}>
        <label>Place name<input value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Type<input value={form.type} onChange={(e) => update('type', e.target.value)} /></label>
        <label className="wide">Area / address<input value={form.area} onChange={(e) => update('area', e.target.value)} /></label>
        <label className="wide">Why does it feel soulful?<textarea value={form.why} onChange={(e) => update('why', e.target.value)} /></label>
        <label>Best for<input value={form.bestFor} onChange={(e) => update('bestFor', e.target.value)} /></label>
        <label>Mood<input value={form.mood} onChange={(e) => update('mood', e.target.value)} /></label>
        <label className="wide">Foreigner-friendly notes<textarea value={form.foreignerNotes} onChange={(e) => update('foreignerNotes', e.target.value)} /></label>
        <label className="wide">Your contact optional<input value={form.contact} onChange={(e) => update('contact', e.target.value)} /></label>
        <button className="button dark" type="submit">Submit Recommendation</button>
      </form>
    </div>
  )
}
