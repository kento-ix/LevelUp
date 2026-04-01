import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getByCommunityID } from "../../services/postService";
import PostCard from "../card/PostCard";

export default function PostsByCommunity() {
  const navigate = useNavigate();
  const [communityId, setCommunityId] = useState('');
  const [posts, setPosts]             = useState([]);
  const [fetchError, setFetchError]   = useState("");

  const handleSearch = async () => {
    setFetchError('');
    setPosts([]);
    const id = parseInt(communityId);
    if (!id || id <= 0) {
      setFetchError("Please enter a valid Community ID");
      return;
    }
    try {
      const data = await getByCommunityID(id);
      console.log(data);
      if (data.data.length === 0) {
        setFetchError("Community ID does not exist or has no posts");
        return;
      }
      setPosts(data.data);
    } catch (e) {
      setFetchError(e.response?.data?.message || "Failed to get posts");
    }
  };

  const handleClear = () => {
    setCommunityId('');
    setPosts([]);
    setFetchError('');
  };

  return (
    <div>
      <button className="btn-primary" onClick={() => navigate(-1)}>← Back</button>

      <h2>3. Join Query - Community Posts</h2>

      <h3>Search posts by Community ID</h3>
      <div className="search-row">
      <input
        className="search-input"
        type="number"
        placeholder="Enter Community ID"
        value={communityId}
        onChange={(e) => setCommunityId(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="btn-primary" onClick={handleSearch}>Search</button>
      <button className="btn-secondary" onClick={handleClear}>Clear</button>
    </div>
      <div className="sql-block">
        <span style={{ color: "#89b4fa" }}>SELECT</span>{"\n"}
        U.Username, P.PostID, P.Date_Created, P.Title, P.Content, P.CommunityID{"\n"}
        <span style={{ color: "#89b4fa" }}>FROM</span> Post P{"\n"}
        <span style={{ color: "#89b4fa" }}>LEFT JOIN</span> User U <span style={{ color: "#89b4fa" }}>ON</span> P.UserID = U.UserID{"\n"}
        <span style={{ color: "#89b4fa" }}>WHERE</span> P.CommunityID = <span style={{ color: "#a6e3a1" }}>{communityId}</span>{"\n"}
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