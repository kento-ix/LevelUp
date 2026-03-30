import { useState, useEffect } from "react";
import { getById } from "../../services/userService";
import CommunityListForUser from "../communities/CommunityListByUser";

export default function UserDetail() {
  const userId = 1;
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchError, setFetchError] = useState("");

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
            <li><div><strong>UserID:</strong> {selectedUser.UserID}</div></li>
            <li><div><strong>Username:</strong> {selectedUser.Username}</div></li>
            <li><div><strong>Email:</strong> {selectedUser.Email}</div></li>
            <li><div><strong>DateJoined:</strong> {selectedUser.DateJoined}</div></li>
            <li><div><strong>Availability:</strong> {selectedUser.Availability}</div></li>
          </ul>
          <CommunityListForUser userID={selectedUser.UserID} />
        </div>
      )}
    </div>
  );
}
