import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByCommunityID } from "../../services/postService";

export default function PostsByCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(function fetchCommunityPosts() {
    getByCommunityID(id)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        const msg = e.response?.data?.message || "Failed to get posts";
        setFetchError(msg);
      });
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Community Posts</h2>
      {fetchError && <p>{fetchError}</p>}
      <div>
        {posts.map((post) => (
          <div
            key={post.PostID}
            style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "8px" }}
          >
            <strong>{post.Title}</strong>
            <p>{post.Content}</p>
            <small>Posted by: {post.Username} | {post.Date_Created}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
