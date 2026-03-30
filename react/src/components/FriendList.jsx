import { useState } from "react";
import { getFriendsByUserId,addFriend,countFriends } from "../services/friendService";

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [friendId, setFriendId]         = useState('');
  const [addMessage, setAddMessage]     = useState('');
  const [addError, setAddError]         = useState('');
  const [countResult, setCountResult]   = useState([]);
  const [countError, setCountError]     = useState('');

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

  const handleAddFriend = async () => {
    setAddError('');
    setAddMessage('');
    try {
      const data = await addFriend(searchId, friendId);
      setAddMessage(data.message);
      setFriendId('');
    } catch (e) {
      setAddError(e.response?.data?.message || 'Failed to add friend');
    }
  };

  const handleCountFriends = async () => {
    setCountError('');
    setCountResult([]);
    try {
      const data = await countFriends();
      setCountResult(data.data);
    } catch (e) {
      setCountError('Failed to get friend count');
    }
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

      <h2>Add Friend</h2>
      <div>
        <input
          type="number"
          placeholder="Enter your UserID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Friend UserID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>

      {addError   && <p>{addError}</p>}
      {addMessage && <p>{addMessage}</p>}

      <h2>Friend Count Per User</h2>
      <button onClick={handleCountFriends}>Get Count</button>

      {countError && <p>{countError}</p>}
      {countResult.length > 0 && (
        <ul>
          {countResult.map((user) => (
            <li key={user.UserID}>
              <strong>{user.Username}</strong>: {user.TotalFriends} friends
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
