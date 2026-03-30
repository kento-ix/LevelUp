import UserList from "../components/users/UserList";
import UserDetail from "../components/users/UserDetail";
import UserSearchUsername from '../components/users/UserSearchUsername';

export default function UsersPage() {
  return (
    <>
      <UserList />
      <UserDetail />
      <UserSearchUsername></UserSearchUsername>
    </>
  )
}
