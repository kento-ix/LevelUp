import './App.css'
import UserList from './components/UserList'
import FriendList from './components/FriendList'
import AddFriendForm from './components/form/AddFriendForm'

function App() {
  return (
    <>
      <h1>User info</h1>   
      {/* <UserList /> */}
      <FriendList />
      <AddFriendForm />
    </>
  )
}

export default App
