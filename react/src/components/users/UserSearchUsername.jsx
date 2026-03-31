import { useState } from 'react';
import { getByName } from "../../services/userService";

export default function UserSearchUsername() {
  const [searchName, setSearchName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);

    if (searchName === "") {
      setFetchError("user name cannot be empty");
      return;
    }

    getByName(searchName)
      .then(res => setSelectedUser(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "User not found"));
  };

  const handleClear = () => {
    setSearchName("");
    setSelectedUser(null);
    setFetchError("");
  };

  return (
    <div>
      <h3>2. Selection Query - Find User by Name</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>SELECT</span> UserID, Email, Username, DateJoined, Availability{"\n"}
        <span style={{ color:"#89b4fa" }}>FROM</span> User{"\n"}
        <span style={{ color:"#89b4fa" }}>WHERE</span> Username = <span style={{ color:"#a6e3a1" }}>'{searchName || "?"}'</span>
      </div>
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Search by user name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
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
                <td>{selectedUser.Username}</td>
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
