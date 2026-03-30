import { useState } from "react";
import { getFriendsByUserId } from "../services/friendService";

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState("");

  const handleSearch = () => {
    setFetchError("");
    setFriends([]);

    if (!searchId || searchId <= 0) {
      setFetchError("Input valid ID");
      return;
    }

    getFriendsByUserId(searchId)
      .then(res => setFriends(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get friends"));
  };

  const handleClear = () => {
    setSearchId("");
    setFriends([]);
    setFetchError("");
  };

  return (
    <div>
      <h2>Search your friend</h2>
      <div>
        <input
          type="number"
          placeholder="Search by UserID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {fetchError && <p>{fetchError}</p>}

      {friends.length > 0 && (
        <div>
          <h3>Friends</h3>
          <ul>
            {friends.map((friend) => (
              <li key={friend.UserID}>
                <div><strong>UserID:</strong> {friend.UserID}</div>
                <div><strong>Username:</strong> {friend.Username}</div>
                <div><strong>Availability:</strong> {friend.Availability}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
