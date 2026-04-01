import { useState } from "react";
import { getDivisionUsers } from "../../services/communityService";

export default function DivisionQuery() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [ran, setRan] = useState(false);

  const handleSearch = () => {
    setFetchError("");
    setRan(false);
    getDivisionUsers()
      .then(res => { setUsers(res.data); setRan(true); })
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get data"));
  };

  return (
    <div>
      <h3>4. Division Query - Users in All Communities</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>SELECT</span> U.UserID, U.Username{"\n"}
        <span style={{ color:"#89b4fa" }}>FROM</span> User U{"\n"}
        <span style={{ color:"#89b4fa" }}>WHERE NOT EXISTS</span> ({"\n"}
        {"    "}<span style={{ color:"#89b4fa" }}>SELECT</span> C.CommunityID <span style={{ color:"#89b4fa" }}>FROM</span> Community C{"\n"}
        {"    "}<span style={{ color:"#89b4fa" }}>WHERE NOT EXISTS</span> ({"\n"}
        {"        "}<span style={{ color:"#89b4fa" }}>SELECT</span> UGC.CommunityID <span style={{ color:"#89b4fa" }}>FROM</span> User_Game_Has_Community UGC{"\n"}
        {"        "}<span style={{ color:"#89b4fa" }}>WHERE</span> UGC.UserID = U.UserID <span style={{ color:"#89b4fa" }}>AND</span> UGC.CommunityID = C.CommunityID{"\n"}
        {"    "}){")"}{"\n"}
        )
      </div>
      <div className="search-row">
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}

      {ran && (
        <div className="result-card">
          <p style={{ marginBottom: "0.5rem" }}>{users.length} user(s) have joined every community</p>
          <ul>
            {users.map(user => (
              <li key={user.UserID} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                <div><strong>UserID:</strong> {user.UserID}</div>
                <div><strong>Username:</strong> {user.Username}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
