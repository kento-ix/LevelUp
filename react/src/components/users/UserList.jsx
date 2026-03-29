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
            {user.UserID}/
            {user.Username}/
            {user.Email}/
            {user.DateJoined}/
            {user.Availability}
          </li>
        ))}
      </ul>
    </div>
  );
}
