import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/users">Users</Link>
        <Link to="/friends">Friends</Link>
      </nav>
    </header>
  )
}
