import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import UsersPage from './pages/UsersPage'
import FriendsPage from './pages/FriendsPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
