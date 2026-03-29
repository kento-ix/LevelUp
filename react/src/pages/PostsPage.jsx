import PostList from "../components/posts/PostList";
import PageHeader from "../components/layout/PageHeader";

export default function PostsPage() {
  return (
    <>
      <PageHeader title="Posts" />
      <PostList />
    </>
  );
}
