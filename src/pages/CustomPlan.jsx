import { useState } from 'react'

const initialForm = {
  name: '',
  contact: '',
  dates: '',
  people: '',
  interests: '',
  budget: '',
  energy: '',
  experience: '',
  notes: '',
}

export default function CustomPlan() {
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
        <span>Interest received</span>
        <h1>Thank you for sharing a future city experience idea.</h1>
        <p>This note helps Free Soul Atlas understand what kinds of local perspectives may matter as the archive grows.</p>
        <button className="button light" onClick={() => setSent(false)}>Edit note</button>
      </div>
    )
  }

  return (
    <div className="page form-page">
      <header className="page-hero">
        <p className="eyebrow">Future Local Experiences</p>
        <h1>Share a city experience idea</h1>
        <p>Local experiences are a future direction of Free Soul Atlas. For now, the archive comes first: places, memories, perspectives, and local knowledge that help people understand a city.</p>
      </header>

      <form className="editorial-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Email / Instagram / WhatsApp / WeChat<input value={form.contact} onChange={(e) => update('contact', e.target.value)} /></label>
        <label>Possible time or season<input value={form.dates} onChange={(e) => update('dates', e.target.value)} /></label>
        <label>Number of people<input value={form.people} onChange={(e) => update('people', e.target.value)} /></label>
        <label>Interests<textarea value={form.interests} onChange={(e) => update('interests', e.target.value)} /></label>
        <label>Context or constraints<input value={form.budget} onChange={(e) => update('budget', e.target.value)} /></label>
        <label>Energy level<input value={form.energy} onChange={(e) => update('energy', e.target.value)} /></label>
        <label className="wide">What kind of city perspective are you interested in?<textarea value={form.experience} onChange={(e) => update('experience', e.target.value)} /></label>
        <label className="wide">Additional notes<textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} /></label>
        <button className="button dark" type="submit">Share idea</button>
      </form>
    </div>
  )
}
