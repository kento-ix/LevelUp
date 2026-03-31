import { useState } from "react";
import { getById, createUser, projection } from "../../services/userService";

export default function UserDetail() {
  const userId = 1;
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState('');
    const [newEmail, setNewEmail]             = useState('');
  const [newUsername, setNewUsername]       = useState('');
  const [newPassword, setNewPassword]       = useState('');
  const [createMessage, setCreateMessage]   = useState('');
  const [createError, setCreateError]       = useState('');
  const [projectionResult, setProjectionResult] = useState([]);
  const [projectionError, setProjectionError]   = useState('');
  const [selectedFields, setSelectedFields]     = useState([]);
  const availableFields = ['UserID', 'Email', 'Username', 'DateJoined', 'Availability'];

  useEffect(() => {
    setFetchError('');
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

  const handleFieldToggle = (field) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field) // uncheck - remove from array
        : [...prev, field]              // check - add to array
    );
  };

  const handleProjection = async () => {
    setProjectionError('');
    setProjectionResult([]);
    try {
      const data = await projection(selectedFields);
      setProjectionResult(data.data);
    } catch (e) {
      setProjectionError('Failed to fetch projection');
    }
  };

  return (
    <div>
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

      <h3>Projection: Select fields to display</h3>
      {availableFields.map(field => (
        <label key={field}>
          <input
            type="checkbox"
            checked={selectedFields.includes(field)}
            onChange={() => handleFieldToggle(field)}
          />
          {field}
        </label>
      ))}
      <button onClick={handleProjection}>Get Fields</button>

      {projectionError && <p>{projectionError}</p>}
      {projectionResult.length > 0 && (
        <ul>
          {projectionResult.map((user, index) => (
            <li key={index}>
              {Object.entries(user).map(([key, value]) => (
                <span key={key}><strong>{key}:</strong> {value} </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
