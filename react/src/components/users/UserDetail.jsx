import { useState } from "react";
import { getById, searchUsername } from "../../services/userService";

export default function UserDetail() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState('');
  const [username, setUsername]             = useState('');
  const [usernameResult, setUsernameResult] = useState(null);
  const [usernameError, setUsernameError]   = useState('');

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);

    const id = parseInt(searchId); // convert to integer first
    if (!id || id <= 0) {
      setFetchError("input valid ID");
      return;
    }

    getById(id)
      .then(res => {
        setSelectedUser(res.data);
        console.log(res); // debug
      })
      .catch(e => {
        const msg = e.response?.data?.message || "User not found";
        setFetchError(msg);
      });
  };

  const handleClear = () => {
    setSearchId("");
    setSelectedUser(null);
    setFetchError("");
  };

  const getByUsername = async () => {
    setUsernameError('');
    setUsernameResult(null);
    try {
      const data = await searchUsername(username);
      setUsernameResult(data.data);
    } catch (e) {
      setUsernameError('User not found');
    }
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
            <li><strong>UserID:</strong> {selectedUser.UserID}</li>
            <li><strong>UserName:</strong> {selectedUser.Username}</li>
            <li><strong>User Email:</strong> {selectedUser.Email}</li>
            <li><strong>User Datajoined:</strong> {selectedUser.DateJoined}</li>
            <li><strong>User Availability:</strong> {selectedUser.Availability}</li>
          </ul>
        </div>
      )}

      <h3>Search user by username</h3>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={getByUsername}>Search</button>

      {usernameError && <p>{usernameError}</p>}
      {usernameResult && (
        <div>
          <ul>
            <li><strong>UserID:</strong> {usernameResult.UserID}</li>
            <li><strong>UserName:</strong> {usernameResult.Username}</li>
            <li><strong>User Email:</strong> {usernameResult.Email}</li>
            <li><strong>User DateJoined:</strong> {usernameResult.DateJoined}</li>
            <li><strong>User Availability:</strong> {usernameResult.Availability}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
