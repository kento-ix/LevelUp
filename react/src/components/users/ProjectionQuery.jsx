import { useState } from "react";
import { getProjection } from "../../services/userService";

const ALL_FIELDS = ["UserID", "Email", "Username", "DateJoined", "Availability"];

export default function ProjectionQuery() {
  const [selected, setSelected] = useState([...ALL_FIELDS]);
  const [results, setResults]   = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [ran, setRan] = useState(false);

  const toggle = (field) => {
    setSelected(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSearch = () => {
    setFetchError("");
    setRan(false);
    const fields = selected.length > 0 ? selected : ALL_FIELDS;
    getProjection(fields)
      .then(res => { setResults(res.data); setRan(true); })
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get data"));
  };

  return (
    <div>
      <h3>1. Projection Query - Select Fields to Return</h3>
      <div className="sql-block">
        <span style={{ color:"#89b4fa" }}>SELECT</span> <span style={{ color:"#a6e3a1" }}>{selected.length ? selected.join(", ") : "*"}</span>{"\n"}
        <span style={{ color:"#89b4fa" }}>FROM</span> User{"\n"}
        <span style={{ color:"#89b4fa" }}>ORDER BY</span> UserID
      </div>
      <div className="checkbox-row">
        {ALL_FIELDS.map(f => (
          <label key={f}>
            <input
              type="checkbox"
              checked={selected.includes(f)}
              onChange={() => toggle(f)}
            />
            {f}
          </label>
        ))}
      </div>
      <div className="search-row">
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {fetchError && <p className="error-text">{fetchError}</p>}

      {ran && (
        <div className="result-card">
          <table className="result-table">
            <thead>
              <tr>
                {selected.map(f => <th key={f}>{f}</th>)}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {selected.map(f => <td key={f}>{row[f] ?? "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
