import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByCommunityID } from "../../services/postService";
import PostCard from "../card/PostCard";

export default function PostsByCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(function fetchCommunityPosts() {
    getByCommunityID(id)
      .then(res => setPosts(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get posts"));
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Community Posts</h2>
      {fetchError && <p>{fetchError}</p>}
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.PostID} post={post}/>
        ))}
      </div>
    </div>
  );
}
