// import CommunityList from "../components/communities/CommunityList";
import DivisionQuery from "../components/communities/DivisionQuery";
import PageHeader from "../components/layout/PageHeader";

export default function CommunitiesPage() {
  return (
    <>
      <PageHeader title="Communities" />
      <div className="page-content">
        {/* <CommunityList /> */}
        <DivisionQuery />
      </div>
    </>
  );
}
