export default function VisualBlock({ tone = 'paper', label, meta, imageUrl, imageAlt = '', className = '' }) {
  return (
    <div className={`visual-block tone-${tone} ${className}`}>
      {imageUrl && <img src={imageUrl} alt={imageAlt || label || ''} loading="lazy" />}
      <div className="visual-grain" />
      <span>{label}</span>
      {meta && <small>{meta}</small>}
    </div>
  )
}
