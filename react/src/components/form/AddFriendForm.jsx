// import { useState } from "react";
// import { addFriendship } from "../../services/friendService";

// export default function AddFriendForm() {
//   const [userId, setUserId] = useState(1);
//   const [friendId, setFriendId] = useState("");
//   const [message, setMessage] = useState("");
//   const [fetchError, setFetchError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setFetchError("");

//     addFriendship(Number(userId), Number(friendId))
//       .then(res => {
//         setMessage(res.message);
//         setUserId("");
//         setFriendId("");
//       })
//       .catch(e => {
//         const msg = e.response?.data?.message || "Failed to add friendship";
//         setFetchError(msg);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Friend</h3>
//       <div>
//         <label>Friend ID</label>
//         <input
//           type="number"
//           value={friendId}
//           onChange={(e) => setFriendId(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Add Friends</button>

//       {message && <p>{message}</p>}
//       {fetchError && <p>{fetchError}</p>}
//     </form>
//   );
// }
