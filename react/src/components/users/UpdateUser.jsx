import { useState } from "react";
import { updateUser } from "../../services/userService";

export default function UpdateUser() {
  const [userId, setUserId]             = useState("");
  const [username, setUsername]         = useState("");
  const [availability, setAvailability] = useState("online");
  const [message, setMessage]           = useState("");
  const [fetchError, setFetchError]     = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchError("");
    setMessage("");

    if (!userId || !username.trim()) {
      setFetchError("User ID and Username are required");
      return;
    }

    updateUser(userId, username.trim(), availability)
      .then(() => {
        setMessage(`User ${userId} updated successfully.`);
        setUserId("");
        setUsername("");
      })
      .catch(e => setFetchError(e.response?.data?.message || "Update failed"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>8.Update Operation - Update User</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>UPDATE</span> User{"\n"}
        <span style={{ color:"#89b4fa" }}>SET</span> Username = <span style={{ color:"#a6e3a1" }}>'{username || "?"}'</span>,{"\n"}
        {"    "}Availability = <span style={{ color:"#a6e3a1" }}>'{availability}'</span>{"\n"}
        <span style={{ color:"#89b4fa" }}>WHERE</span> UserID = <span style={{ color:"#a6e3a1" }}>{userId || "?"}</span>
      </div>
      <div className="form-rows">
        <div className="form-row">
          <label>User ID</label>
          <input
            className="search-input"
            type="number"
            placeholder="e.g. 1"
            value={userId}
            onChange={e => { setUserId(e.target.value); setMessage(""); setFetchError(""); }}
            required
          />
        </div>
        <div className="form-row">
          <label>New Username</label>
          <input
            className="search-input"
            type="text"
            placeholder="New username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Availability</label>
          <select className="form-select" value={availability} onChange={e => setAvailability(e.target.value)}>
            <option value="online">online</option>
            <option value="offline">offline</option>
            <option value="busy">busy</option>
          </select>
        </div>
      </div>
      <div className="search-row">
        <button className="btn-primary" type="submit">Update</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}
      {message && <p className="success-text">{message}</p>}
    </form>
  );
}
