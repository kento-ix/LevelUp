// Sample component to display User.php data
import { useState, useEffect } from "react";
import { getAll } from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAll();
        setUsers(res.data);
      } catch (err) {
        console.error("fail api connection", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.id} | {user.name} | {user.email}               
                </li>
            ))}
        </ul>
    </div>
  );
}
