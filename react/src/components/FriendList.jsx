import { useState } from "react";
import { getFriendsByUserId } from "../services/friendService";

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState("");

  const handleSearch = () => {
    setFetchError("");
    setFriends([]);

    const id = searchId;
    if (!id || id <= 0) {
      setFetchError("Input valid ID");
      return;
    }

    getFriendsByUserId(id)
      .then(res => {
        setFriends(res.data);
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Failed to get friends";
        setFetchError(msg);
      });
  };

  const handleClear = () => {
    setSearchId("");
    setFriends([]);
    setFetchError("");
  };

  return (
    <>
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
          {friends.map((friend) => (
          <ul key={friend.UserID}>
            <li><strong>Your friend userID:</strong> {friend.UserID}</li>
            <li><strong>Your friend user name:</strong> {friend.Username}</li>
            <li><strong>Your friend Availability:</strong> {friend.Availability}</li>
          </ul>
          ))}
        </div>
      )}
    </>
  );
}
