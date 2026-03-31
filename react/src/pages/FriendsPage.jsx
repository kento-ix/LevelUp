// import AddFriendForm from "../components/form/AddFriendForm";
import FriendRanking from "../components/friends/FriendRanking";
import PageHeader from "../components/layout/PageHeader";

export default function FriendsPage() {
  return (
    <>
      <PageHeader title="Friends" />
      <div className="page-content">
        {/* <AddFriendForm /> */}
        <FriendRanking />
      </div>
    </>
  );
}
