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
      <h3>Try to find user by name</h3>
      <input
        type="text"
        placeholder="Search by user name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {fetchError && <p>{fetchError}</p>}

      {selectedUser && (
        <div>
          <h3>Test:Get user by name</h3>
          <ul>
            <li><div><strong>UserID:</strong> {selectedUser.UserID}</div></li>
            <li><div><strong>Username:</strong> {selectedUser.Username}</div></li>
            <li><div><strong>Email:</strong> {selectedUser.Email}</div></li>
            <li><div><strong>DateJoined:</strong> {selectedUser.DateJoined}</div></li>
            <li><div><strong>Availability:</strong> {selectedUser.Availability}</div></li>
          </ul>
        </div>
      )}
    </div>
  );
}
