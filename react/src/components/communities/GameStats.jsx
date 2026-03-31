import { useState } from "react";
import { getGameStats } from "../../services/gameService";

export default function GameStats() {
  const [stats, setStats]       = useState(null);
  const [fetchError, setFetchError] = useState("");

  const handleSearch = () => {
    setFetchError("");
    getGameStats()
      .then(res => setStats(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get data"));
  };

  return (
    <div>
      <h3>5. Aggregation Query - Game Information</h3>
      <div className="sql-block">
        <span style={{ color:"#6c7086" }}>{/* Query 1 — COUNT */}</span>
        <span style={{ color:"#89b4fa" }}>SELECT</span> <span style={{ color:"#a6e3a1" }}>COUNT(*)</span> <span style={{ color:"#89b4fa" }}>AS</span> total_games <span style={{ color:"#89b4fa" }}>FROM</span> Game{"\n\n"}
        <span style={{ color:"#6c7086" }}>{/* Query 2 — MAX */}</span>
        <span style={{ color:"#89b4fa" }}>SELECT</span> <span style={{ color:"#a6e3a1" }}>MAX</span>(PublishedDate) <span style={{ color:"#89b4fa" }}>FROM</span> Game
      </div>
      <div className="search-row">
        <button className="btn-primary" onClick={handleSearch}>Get Stats</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}

      {stats && (
        <div className="result-card">
          <ul>
            <li><div><strong>Total Games:</strong> {stats.total_games}</div></li>
            <li><div><strong>Most Recently Published:</strong> {stats.recently_published}</div></li>
          </ul>
        </div>
      )}
    </div>
  );
}
