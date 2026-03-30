import UserList from "../components/users/UserList";
import UserSearchUsername from '../components/users/UserSearchUsername';
import PageHeader from "../components/layout/PageHeader";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" />
      <UserList />
      <UserSearchUsername />
    </>
  )
}
