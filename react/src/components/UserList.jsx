// Sample component to display User.php data
import { useState, useEffect } from "react";
import { getAll } from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchUsers() {
    getAll()
      .then(res => {
        setUsers(res.data);
        console.log(res);
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Fail to get data";
        setFetchError(msg);
      });
  }, []);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      <div>
          <ul>
              {users.map((user) => (
                  <li key={user.id}>
                      {user.id} | {user.name} | {user.email}               
                  </li>
              ))}
          </ul>
      </div>
    </>
  );
}
