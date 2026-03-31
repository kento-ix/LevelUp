import { useState, useEffect } from "react";
import { getAllGames, getGameCount, getRecentlyPublished } from "../../services/gameService";

export default function GameList() {
  const [games, setGames]               = useState([]);
  const [fetchError, setFetchError]     = useState('');
  const [gameCount, setGameCount]       = useState(null);
  const [countError, setCountError]     = useState('');
  const [recentGame, setRecentGame]     = useState(null);
  const [recentError, setRecentError]   = useState('');

  // fetch all games on page load
  useEffect(() => {
    getAllGames()
      .then(res => {
        setGames(res.data);
        console.log(res);
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Failed to get games";
        setFetchError(msg);
      });
  }, []);

  // get total game count
  const handleGameCount = async () => {
    setCountError('');
    setGameCount(null);
    try {
      const data = await getGameCount();
      setGameCount(data.data);
    } catch (e) {
      setCountError('Failed to get game count');
    }
  };

  // get most recently published game
  const handleRecentlyPublished = async () => {
    setRecentError('');
    setRecentGame(null);
    try {
      const data = await getRecentlyPublished();
      setRecentGame(data.data);
    } catch (e) {
      setRecentError('Failed to get recently published game');
    }
  };

  return (
    <div>
      <h3>All Games</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {games.map((game) => (
          <li key={game.GameID}>
            {game.GameID}/
            {game.Title}/
            {game.Genre}/
            {game.PublishedDate}
          </li>
        ))}
      </ul>

      <h3>Total Game Count in Database: </h3>
      <button onClick={handleGameCount}>Get Count</button>
      {countError && <p>{countError}</p>}
      {gameCount && (
        <p><strong>Total Games:</strong> {gameCount.total_games}</p>
      )}

      <h3>Most Recently Published Game: </h3>
      <button onClick={handleRecentlyPublished}>Get Recent</button>
      {recentError && <p>{recentError}</p>}
      {recentGame && (
        <ul>
          <li><strong>GameID:</strong> {recentGame.GameID}</li>
          <li><strong>Title:</strong> {recentGame.Title}</li>
          <li><strong>Genre:</strong> {recentGame.Genre}</li>
          <li><strong>Published:</strong> {recentGame.PublishedDate}</li>
        </ul>
      )}
    </div>
  );
}