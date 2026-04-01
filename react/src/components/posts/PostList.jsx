import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../services/postService";
import PostCard from "../card/PostCard";

export default function PostList() {
  const [posts, setPosts]           = useState([]);
  const [fetchError, setFetchError] = useState("");
  const navigate                    = useNavigate();

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

      <button className="btn-primary" onClick={() => navigate('/posts/community')}>
        View Posts by Community
      </button>
    </div>
  );
}