export default function VisualBlock({ tone = 'paper', label, meta, className = '' }) {
  return (
    <div className={`visual-block tone-${tone} ${className}`}>
      <div className="visual-grain" />
      <span>{label}</span>
      {meta && <small>{meta}</small>}
    </div>
  )
}
