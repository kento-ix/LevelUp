import UserList from "../components/users/UserList";
import UserDetail from "../components/users/UserDetail";
import PageHeader from "../components/layout/PageHeader";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" />
      <UserList />
    </>
  )
}
