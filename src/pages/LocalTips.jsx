import { places } from '../data/places'

const editorialTips = [
  {
    number: '01',
    title: 'Go earlier than social media tells you to.',
    copy: 'Small Dalian rooms feel better before peak hours. Afternoon light, fewer people, and unhurried owners change the whole experience.',
  },
  {
    number: '02',
    title: 'Treat “hard to find” as part of the texture.',
    copy: 'Many soulful places are upstairs, behind main streets, or inside ordinary residential blocks. Look slowly and keep addresses flexible.',
  },
  {
    number: '03',
    title: 'Ask what locals actually like nearby.',
    copy: 'A good route often opens from one small question: where do you go after closing, after class, after work, after the wind gets too strong?',
  },
  {
    number: '04',
    title: 'Let the sea interrupt your plan.',
    copy: 'Dalian is not only places. Sometimes the best part is a bench, a windy road, or the moment you decide to walk one more stop.',
  },
]

export default function LocalTips() {
  const practical = places.slice(0, 8)

  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Local Tips</p>
        <h1>Small notes for moving through Dalian.</h1>
        <p>Not hacks. Not a tourist manual. Just quiet, practical ways to make the city feel less generic and more open.</p>
      </header>

      <section className="tips-list">
        {editorialTips.map((tip) => (
          <article key={tip.number}>
            <span>{tip.number}</span>
            <h2>{tip.title}</h2>
            <p>{tip.copy}</p>
          </article>
        ))}
      </section>

      <section className="section-shell">
        <div className="section-title">
          <span>From the atlas</span>
          <h2>Practical notes by place</h2>
        </div>
        <div className="tips-list">
          {practical.map((place, index) => (
            <article key={place.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{place.name}</h2>
              <p>{place.practicalTips[0]}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
