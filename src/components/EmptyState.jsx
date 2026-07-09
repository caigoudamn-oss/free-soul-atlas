export default function EmptyState({ title = '内容正在采集中', note = 'Free Soul Atlas is preparing this archive. Please check back soon.' }) {
  return (
    <section className="empty-state editorial-empty">
      <p className="eyebrow">Archive in progress</p>
      <h2>{title}</h2>
      <p>{note}</p>
    </section>
  )
}
