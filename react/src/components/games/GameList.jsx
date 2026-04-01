import { useState, useEffect } from "react";
import { getAll } from "../../services/gameService";
import GameCard from "../card/GameCard";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(function fetchGames() {
    getAll()
      .then(res => setGames(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get games"));
  }, []);

  return (
    <div>
      <h3>Games</h3>
      {fetchError && <p className="error-text">{fetchError}</p>}
      {games.length > 0 && <GameCard games={games} />}
    </div>
  );
}
