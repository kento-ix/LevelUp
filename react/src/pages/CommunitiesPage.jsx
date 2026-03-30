import CommunityList from "../components/communities/CommunityList";
import PageHeader from "../components/layout/PageHeader";

export default function CommunitiesPage() {
  return (
    <>
      <PageHeader title="Communities" />
      <CommunityList />
    </>
  );
}
