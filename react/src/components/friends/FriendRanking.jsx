import { useState } from "react";
import { getFriendCount } from "../../services/friendService";
import FriendCard from "../card/FriendCard";

export default function FriendRanking() {
  const [rows, setRows] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [ran, setRan] = useState(false);

  const handleSearch = () => {
    setFetchError("");
    setRan(false);
    getFriendCount()
      .then(res => { setRows(res); setRan(true);})
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get data"));
  };

  return (
    <div>
      <h3>6. Nested Aggregation with Group-By - Friend Ranking</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>SELECT</span> U.UserID, U.Username, <span style={{ color:"#a6e3a1" }}>COUNT(*)</span> <span style={{ color:"#89b4fa" }}>AS</span> TotalFriends{"\n"}
        <span style={{ color:"#89b4fa" }}>FROM</span> User U{"\n"}
        <span style={{ color:"#89b4fa" }}>JOIN</span> ({"\n"}
        {"    "}<span style={{ color:"#89b4fa" }}>SELECT</span> <span style={{ color:"#a6e3a1" }}>LEAST</span>(UserID, FriendID) <span style={{ color:"#89b4fa" }}>AS</span> UserA,{"\n"}
        {"           "}<span style={{ color:"#a6e3a1" }}>GREATEST</span>(UserID, FriendID) <span style={{ color:"#89b4fa" }}>AS</span> UserB{"\n"}
        {"    "}<span style={{ color:"#89b4fa" }}>FROM</span> FriendShip{"\n"}
        {"    "}<span style={{ color:"#89b4fa" }}>GROUP BY</span> UserA, UserB{"\n"}
        ) <span style={{ color:"#89b4fa" }}>AS</span> UniquePairs <span style={{ color:"#89b4fa" }}>ON</span> U.UserID = UniquePairs.UserA <span style={{ color:"#89b4fa" }}>OR</span> U.UserID = UniquePairs.UserB{"\n"}
        <span style={{ color:"#89b4fa" }}>GROUP BY</span> U.UserID, U.Username{"\n"}
        <span style={{ color:"#89b4fa" }}>ORDER BY</span> TotalFriends <span style={{ color:"#89b4fa" }}>DESC</span>
      </div>
      <div className="search-row">
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}

      {ran && <FriendCard friends={rows} />}
    </div>
  );
}
