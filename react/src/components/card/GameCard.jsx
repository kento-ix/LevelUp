export default function GameCard(props) {
  return (
    <div className="result-card">
      <table className="result-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Publish Date</th>
          </tr>
        </thead>
        <tbody>
          {props.games.map((game) => (
            <tr key={game.GameID}>
              <td>{game.Title}</td>
              <td>{game.Genre}</td>
              <td>{game.PublishedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
