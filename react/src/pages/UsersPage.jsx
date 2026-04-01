import UserSearchUsername from '../components/users/UserSearchUsername';
import ProjectionQuery from '../components/users/ProjectionQuery';
import UpdateUser from '../components/users/UpdateUser';
import DeleteUser from '../components/users/DeleteUser';
import PageHeader from "../components/layout/PageHeader";
import UserSearchID from '../components/users/UserSearchID';

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" />
      <div className="page-content">
        <UserSearchUsername />
        <UserSearchID />
        <ProjectionQuery />
        <UpdateUser />
        <DeleteUser />
      </div>
    </>
  )
}
