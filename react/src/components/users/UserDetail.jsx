import { useState } from "react";
import { getById } from "../../services/userService";
import CommunityListForUser from "../communities/CommunityListByUser";

export default function UserDetail() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState("");

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);

    if (!searchId || searchId <= 0) {
      setFetchError("input valid ID");
      return;
    }

    getById(searchId)
      .then(res => setSelectedUser(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "User not found"));
  };

  const handleClear = () => {
    setSearchId("");
    setSelectedUser(null);
    setFetchError("");
  };

  return (
    <div>
      <h3>Try to find user by id</h3>
      <input
        type="number"
        placeholder="Search by UserID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {fetchError && <p>{fetchError}</p>}

      {selectedUser && (
        <div>
          <h3>Test:Get user by id</h3>
          <ul>
            <li><div><strong>UserID:</strong> {selectedUser.UserID}</div></li>
            <li><div><strong>Username:</strong> {selectedUser.Username}</div></li>
            <li><div><strong>Email:</strong> {selectedUser.Email}</div></li>
            <li><div><strong>DateJoined:</strong> {selectedUser.DateJoined}</div></li>
            <li><div><strong>Availability:</strong> {selectedUser.Availability}</div></li>
          </ul>
          <CommunityListForUser userID={selectedUser.UserID} />
        </div>
      )}
    </div>
  );
}
