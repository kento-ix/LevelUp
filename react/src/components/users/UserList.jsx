import { useState, useEffect } from "react";
import { getAll } from "../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchUsers() {
    getAll()
      .then(res => {
        setUsers(res.data);
        console.log(res); // debug
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Fail to get data";
        setFetchError(msg);
      });
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
