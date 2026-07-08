const paths = {
  arrowLeft: 'M19 12H5m0 0 7-7M5 12l7 7',
  arrowRight: 'M5 12h14m0 0-7-7m7 7-7 7',
  arrowUpRight: 'M7 17 17 7M9 7h8v8',
  bookmark: 'M6 4h12v16l-6-4-6 4V4z',
  externalLink: 'M14 5h5v5M19 5l-9 9M19 14v5H5V5h5',
  mapPin: 'M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z M12 10.5h.01',
  menu: 'M4 7h16M4 12h16M4 17h16',
  search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z M21 21l-4.35-4.35',
  x: 'M6 6l12 12M18 6 6 18',
}

export default function Icon({ name, size = 20, strokeWidth = 2, className = '', ...props }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === 'bookmark' ? 'none' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}
