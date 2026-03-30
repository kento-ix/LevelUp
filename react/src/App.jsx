import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import PostsPage from './pages/PostsPage'
import PostsByCommunityPage from './pages/PostsByCommunityPage'
import UsersPage from './pages/UsersPage'
import FriendsPage from './pages/FriendsPage'
import CommunitiesPage from './pages/CommunitiesPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/community/:id" element={<PostsByCommunityPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
