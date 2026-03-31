import FriendList from "../components/FriendList";
import AddFriendForm from "../components/form/AddFriendForm";
import PageHeader from "../components/layout/PageHeader";

export default function FriendsPage() {
  return (
    <>
      <PageHeader title="Friends" />
      <AddFriendForm />
      <FriendList />
    </>
  );
}
