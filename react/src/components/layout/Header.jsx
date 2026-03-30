import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.4rem', marginRight: 'auto' }}>
          Level Up
        </Link>
        <Link to="/users">Users</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/communities">Communities</Link>
      </nav>
    </header>
  )
}
