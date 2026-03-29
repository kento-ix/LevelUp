import { useState } from "react";
import { getById, createUser } from "../../services/userService";

export default function UserDetail() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState('');
    const [newEmail, setNewEmail]             = useState('');
  const [newUsername, setNewUsername]       = useState('');
  const [newPassword, setNewPassword]       = useState('');
  const [createMessage, setCreateMessage]   = useState('');
  const [createError, setCreateError]       = useState('');

  const handleSearch = () => {
    setFetchError("");
    setSelectedUser(null);

    const id = parseInt(searchId);
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

  const handleCreateUser = async () => {
    setCreateError('');
    setCreateMessage('');
    try {
      const data = await createUser(newEmail, newUsername, newPassword);
      setCreateMessage(data.message);
      setNewEmail('');
      setNewUsername('');
      setNewPassword('');
    } catch (e) {
      setCreateError(e.response?.data?.message || 'Failed to create user');
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

      <h3>Create new user</h3>
      <input
        type="text"
        placeholder="Enter email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>

      {createError   && <p>{createError}</p>}
      {createMessage && <p>{createMessage}</p>}
    </div>
  );
}
