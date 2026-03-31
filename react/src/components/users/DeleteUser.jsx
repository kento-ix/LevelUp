import { useState } from "react";
import { deleteUser } from "../../services/userService";

export default function DeleteUser() {
  const [userId, setUserId]     = useState("");
  const [message, setMessage]   = useState("");
  const [fetchError, setFetchError] = useState("");
  const [confirm, setConfirm]   = useState(false);

  const handleDelete = () => {
    if (!userId) return;
    if (!confirm) { setConfirm(true); return; }

    setFetchError("");
    setMessage("");
    setConfirm(false);

    deleteUser(userId)
      .then(() => {
        setMessage(`User ${userId} deleted. Related records removed via CASCADE.`);
        setUserId("");
      })
      .catch(e => setFetchError(e.response?.data?.message || "Delete failed"));
  };

  return (
    <div>
      <h3>7.Delete operation - Delete User</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>DELETE FROM</span> User <span style={{ color:"#89b4fa" }}>WHERE</span> UserID = <span style={{ color:"#a6e3a1" }}>{userId || "?"}</span>{"\n\n"}
        <span style={{ color:"#6c7086" }}>-- ON DELETE CASCADE applies to:{"\n"}-- FriendShip, Post, Admin, Admin_Manages_User</span>
      </div>
      <input
        type="number"
        placeholder="User ID to delete"
        value={userId}
        onChange={e => { setUserId(e.target.value); setConfirm(false); setMessage(""); setFetchError(""); }}
      />
      <button onClick={handleDelete} disabled={!userId}>
        {confirm ? "Confirm Delete" : "Delete User"}
      </button>
      {confirm && <button onClick={() => setConfirm(false)}>Cancel</button>}

      {confirm && <p>This will cascade-delete all related data (FriendShip, Post, Admin).</p>}
      {fetchError && <p>{fetchError}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
