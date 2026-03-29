import PostsByCommunity from "../components/posts/PostsByCommunity";
import PageHeader from "../components/layout/PageHeader";

export default function PostsByCommunityPage() {
  return (
    <>
      <PageHeader title="Community Posts" />
      <PostsByCommunity />
    </>
  );
}
