import UserDetail from "../components/users/UserDetail";
import PageHeader from "../components/layout/PageHeader";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" />
      <UserDetail />
    </>
  )
}