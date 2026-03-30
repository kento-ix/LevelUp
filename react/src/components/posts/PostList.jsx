import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../services/postService";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  useEffect(function fetchPosts() {
    getAll()
      .then(res => setPosts(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get posts"));
  }, []);

  return (
    <div>
      <h2>Find a Game Play Partner</h2>
      {fetchError && <p>{fetchError}</p>}
      <div>
        {posts.map((post) => (
          <div
            key={post.PostID}
            onClick={() => navigate(`/posts/community/${post.CommunityID}`)}
            style={{ cursor: "pointer", border: "1px solid #ccc", padding: "12px", marginBottom: "8px" }}
          >
            <strong>{post.Title}</strong>
            <p>{post.Content}</p>
            <small>Community: {post.CommunityID} | Posted: {post.Date_Created}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
