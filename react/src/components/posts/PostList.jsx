import { useState, useEffect } from "react";
import { getAll } from "../../services/postService";
import PostCard from "../card/PostCard";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(function fetchPosts() {
    getAll()
      .then(res => setPosts(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get posts"));
  }, []);

  return (
    <div>
      <h3>Posts</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {posts.map((post) => (
          <PostCard key={post.PostID} post={post} />
        ))}
      </ul>
    </div>
  );
}
