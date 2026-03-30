import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { getById } from "../../services/userService";
import { currentUserIdAtom } from "../../atoms/userAtom";

export default function UserDetail() {
  // const [userId] = useAtom(currentUserIdAtom);
  const userId = 1;
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setFetchError('');
    setSelectedUser(null);
    getById(userId)
      .then(res => setSelectedUser(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "User not found"));
  }, [userId]);

  return (
    <div>
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
    </div>
  );
}
