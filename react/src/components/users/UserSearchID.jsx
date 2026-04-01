import { useState } from 'react';
import { getById } from '../../services/userService';

export default function UserSearchID() {
  const [searchID, setSearchID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);

    if (searchID && searchID <= 0) {
      setFetchError("invalid user ID");
      return;
    }

    getById(searchID)
      .then(res => setSelectedUser(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "User not found"));
  };

  const handleClear = () => {
    setSearchID(null);
    setSelectedUser(null);
    setFetchError("");
  };

  return (
    <div>
      <h3>3. Selection Query - Find User by ID</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>SELECT</span> UserName, Email, UserID, DateJoined, Availability{"\n"}
        <span style={{ color:"#89b4fa" }}>FROM</span> User{"\n"}
        <span style={{ color:"#89b4fa" }}>WHERE</span> UserID = <span style={{ color:"#a6e3a1" }}>'{searchID || "?"}'</span>
      </div>
      <div className="search-row">
        <input
          className="search-input"
          type="number"
          placeholder="Search by user ID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn-primary" onClick={handleSearch}>Search</button>
        <button className="btn-secondary" onClick={handleClear}>Clear</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}

      {selectedUser && (
        <div className="result-card">
          <table className="result-table">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Username</th>
                <th>Email</th>
                <th>DateJoined</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedUser.UserID}</td>
                <td>{selectedUser.UserID}</td>
                <td>{selectedUser.Email}</td>
                <td>{selectedUser.DateJoined}</td>
                <td>{selectedUser.Availability}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
