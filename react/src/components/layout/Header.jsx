import { Link, useLocation } from 'react-router-dom'

const MAIN_NAV = [
  { label: 'Posts',       to: '/posts',       icon: '◈' },
  { label: 'Communities', to: '/communities', icon: '⬡' },
  { label: 'Games',       to: '/games',       icon: '◉' },
]

const SOCIAL_NAV = [
  { label: 'Friends', to: '/friends', icon: '⊕' },
  { label: 'Users',   to: '/users',   icon: '◎' },
]

export default function Header() {
  const { pathname } = useLocation()
  const linkClass = (to) => 'nav-link' + (pathname === to ? ' active' : '')

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-top">
          <span className="sidebar-title">LevelUp</span>
        </div>
        <span className="sidebar-sub">Gaming Community</span>
      </div>

      {/* Nav */}
      <nav>
        <p className="section-title">MAIN</p>
        {MAIN_NAV.map(({ label, to, icon }) => (
          <Link key={to} to={to} className={linkClass(to)}>
            <span className="nav-icon">{icon}</span>
            {label}
          </Link>
        ))}

        <p className="section-title">SOCIAL</p>
        {SOCIAL_NAV.map(({ label, to, icon }) => (
          <Link key={to} to={to} className={linkClass(to)}>
            <span className="nav-icon">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-avatar">U1</div>
        <div className="sidebar-user-info">
          <span className="sidebar-username">User1</span>
          <span className="sidebar-status">
            <span className="status-dot online" />
            online
          </span>
        </div>
      </div>

    </aside>
  )
}
