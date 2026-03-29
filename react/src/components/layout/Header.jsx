import { NavLink } from 'react-router-dom'

export default function Header() {
  const navClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

  return (
    <aside className="sidebar">
      <nav>
        <span className="sidebar-title">Level Up</span>
        <p className="section-title">MAIN</p>
        <NavLink to="/posts" className={navClass}>Posts</NavLink>
        <NavLink to="/communities" className={navClass}>Communities</NavLink>
        <NavLink to="/games" className={navClass}>Games</NavLink>

        <p className="section-title">SOCIAL</p>
        <NavLink to="/users" className={navClass}>Users</NavLink>
        <NavLink to="/friends" className={navClass}>Friends</NavLink>
      </nav>
    </aside>
  )
}
