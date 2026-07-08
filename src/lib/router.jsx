import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext({ pathname: '/', params: {} })

function normalize(path) {
  if (!path) return '/'
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

function push(path) {
  const target = normalize(path)
  if (target !== window.location.pathname) {
    window.history.pushState({}, '', target)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}

function matchPath(pattern, pathname) {
  const current = normalize(pathname).split('/').filter(Boolean)
  const expected = normalize(pattern).split('/').filter(Boolean)

  if (pattern === '/' && pathname === '/') return {}
  if (expected.length !== current.length) return null

  const params = {}
  for (let index = 0; index < expected.length; index += 1) {
    const token = expected[index]
    const value = current[index]
    if (token.startsWith(':')) {
      params[token.slice(1)] = decodeURIComponent(value)
    } else if (token !== value) {
      return null
    }
  }
  return params
}

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(() => normalize(window.location.pathname))

  useEffect(() => {
    const update = () => setPathname(normalize(window.location.pathname))
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  const value = useMemo(() => ({ pathname, params: {} }), [pathname])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext)
  let fallback = null

  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) continue
    const { path, element } = child.props
    const params = matchPath(path, pathname)
    if (params) {
      return <RouterContext.Provider value={{ pathname, params }}>{element}</RouterContext.Provider>
    }
    if (path === '*') fallback = element
  }

  return fallback
}

export function Route() {
  return null
}

export function Link({ to, children, onClick, ...props }) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return
        }
        event.preventDefault()
        push(to)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function NavLink({ to, children, className = '', ...props }) {
  const { pathname } = useContext(RouterContext)
  const active = to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)
  const resolvedClassName = [className, active ? 'active' : ''].filter(Boolean).join(' ')
  return (
    <Link to={to} className={resolvedClassName} {...props}>
      {children}
    </Link>
  )
}

export function useParams() {
  return useContext(RouterContext).params
}

export function useLocation() {
  const { pathname } = useContext(RouterContext)
  return { pathname }
}
