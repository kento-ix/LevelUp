export default function FriendCard(props) {
  const friends = props.friends || [];

  return (
    <div className="result-card">
      <table className="result-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserID</th>
            <th>Username</th>
            <th>TotalFriends</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, i) => (
            <tr key={friend.UserID}>
              <td>{i + 1}</td>
              <td>{friend.UserID}</td>
              <td>{friend.Username}</td>
              <td>{friend.TotalFriends}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
