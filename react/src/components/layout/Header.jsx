import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const linkClass = (to) => 'nav-link' + (pathname === to ? ' active' : '')

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-top">
          <span className="sidebar-title">LevelUp</span>
        </div>
      </div>

      <nav>
        <p className="section-title">MAIN</p>
        <Link to="/posts" className={linkClass('/posts')}>Posts</Link>
        <Link to="/communities" className={linkClass('/communities')}>Communities</Link>
        <Link to="/games" className={linkClass('/games')}>Games</Link>

        <p className="section-title">SOCIAL</p>
        <Link to="/friends" className={linkClass('/friends')}>Friends</Link>
        <Link to="/users" className={linkClass('/users')}>Users</Link>
      </nav>
    </aside>
  )
}
