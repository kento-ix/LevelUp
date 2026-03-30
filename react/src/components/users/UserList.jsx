import { useState, useEffect } from "react";
import { getAll } from "../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchUsers() {
    getAll()
      .then(res => setUsers(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Fail to get data"));
  }, []);

  return (
    <div>
      <h3>Test:Get all users</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.UserID}>
            <div><strong>UserID:</strong> {user.UserID}</div>
            <div><strong>Username:</strong> {user.Username}</div>
            <div><strong>Email:</strong> {user.Email}</div>
            <div><strong>DateJoined:</strong> {user.DateJoined}</div>
            <div><strong>Availability:</strong> {user.Availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
