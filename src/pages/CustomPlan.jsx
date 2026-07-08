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
        <span>Request received</span>
        <h1>We’ll shape a local Dalian plan around your mood.</h1>
        <p>Your request has been received. We’ll review your details and prepare a local plan direction.</p>
        <button className="button light" onClick={() => setSent(false)}>Edit request</button>
      </div>
    )
  }

  return (
    <div className="page form-page">
      <header className="page-hero">
        <p className="eyebrow">Custom Local Plan</p>
        <h1>Get a Custom Local Plan</h1>
        <p>Want to experience Dalian through local eyes? Tell us your travel dates, interests, budget, and vibe. We’ll help design a route beyond tourist spots.</p>
      </header>

      <form className="editorial-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Email / Instagram / WhatsApp / WeChat<input value={form.contact} onChange={(e) => update('contact', e.target.value)} /></label>
        <label>Travel dates<input value={form.dates} onChange={(e) => update('dates', e.target.value)} /></label>
        <label>Number of people<input value={form.people} onChange={(e) => update('people', e.target.value)} /></label>
        <label>Interests<textarea value={form.interests} onChange={(e) => update('interests', e.target.value)} /></label>
        <label>Budget<input value={form.budget} onChange={(e) => update('budget', e.target.value)} /></label>
        <label>Energy level<input value={form.energy} onChange={(e) => update('energy', e.target.value)} /></label>
        <label className="wide">What kind of Dalian do you want to experience?<textarea value={form.experience} onChange={(e) => update('experience', e.target.value)} /></label>
        <label className="wide">Additional notes<textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} /></label>
        <button className="button dark" type="submit">Request My Local Plan</button>
      </form>
    </div>
  )
}
