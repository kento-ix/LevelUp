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
      <button className="btn-primary" onClick={() => navigate(-1)}>← Back</button>
      <h2>3. Join Query - Community Posts</h2>
      <div className="sql-block">
        <span style={{ color: "#89b4fa" }}>SELECT</span>{"\n"}
        P.PostID, P.CommunityID, P.Title, P.Content, P.Date_Created,{"\n"}
        U.Username, G.Title <span style={{ color: "#89b4fa" }}>AS</span> GameTitle,{"\n"}
        G.Genre, UPG.Device,
        C.Name <span style={{ color: "#89b4fa" }}>AS</span> CommunityName{"\n"}
        <span style={{ color: "#89b4fa" }}>FROM</span> Post P{"\n"}
        <span style={{ color: "#89b4fa" }}>LEFT JOIN</span> User U <span style={{ color: "#89b4fa" }}>ON</span> P.UserID = U.UserID{"\n"}
        <span style={{ color: "#89b4fa" }}>LEFT JOIN</span> Community C <span style={{ color: "#89b4fa" }}>ON</span> P.CommunityID = C.CommunityID{"\n"}
        <span style={{ color: "#89b4fa" }}>LEFT JOIN</span> Game G <span style={{ color: "#89b4fa" }}>ON</span> C.GameID = G.GameID{"\n"}
        <span style={{ color: "#89b4fa" }}>LEFT JOIN</span> User_Plays_Game UPG <span style={{ color: "#89b4fa" }}>ON</span> P.UserID = UPG.UserID <span style={{ color: "#89b4fa" }}>AND</span> G.GameID = UPG.GameID{"\n"}
        <span style={{ color: "#89b4fa" }}>WHERE</span> P.CommunityID = <span style={{ color: "#a6e3a1" }}>{id}</span>{"\n"}
        <span style={{ color: "#89b4fa" }}>ORDER BY</span> P.PostID
      </div>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {posts.map((post) => (
          <PostCard key={post.PostID} post={post}/>
        ))}
      </ul>
    </div>
  );
}
