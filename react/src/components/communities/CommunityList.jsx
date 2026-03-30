import { useState, useEffect } from "react";
import { getAllCommunities, getCommunitiesByUser, division } from "../../services/communityService";

export default function CommunityList() {
  const [communities, setCommunities]       = useState([]);
  const [fetchError, setFetchError]         = useState('');
  const [userId, setUserId]                 = useState('');
  const [userCommunities, setUserCommunities] = useState([]);
  const [userError, setUserError]           = useState('');
  const [divisionResult, setDivisionResult] = useState([]);
  const [divisionError, setDivisionError]   = useState('');

  // fetch all communities on page load
  useEffect(() => {
    getAllCommunities()
      .then(res => {
        setCommunities(res.data);
        console.log(res);
      })
      .catch(e => {
        const msg = e.response?.data?.message || "Failed to get communities";
        setFetchError(msg);
      });
  }, []);

  // get communities by user ID
  const handleGetByUser = async () => {
    setUserError('');
    setUserCommunities([]);
    try {
      const data = await getCommunitiesByUser(userId);
      setUserCommunities(data.data);
    } catch (e) {
      setUserError('No communities found for this user');
    }
  };

  // division query - find users in all communities
  const handleDivision = async () => {
    setDivisionError('');
    setDivisionResult([]);
    try {
      const data = await division();
      setDivisionResult(data.data);
    } catch (e) {
      setDivisionError('Failed to fetch division query');
    }
  };

  return (
    <div>
      <h3>All Communities</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {communities.map((community) => (
          <li key={community.CommunityID}>
            {community.CommunityID}/
            {community.Name}/
            {community.Description}/
            {community.GameTitle}
          </li>
        ))}
      </ul>

      <h3>Get Communities by User ID</h3>
      <input
        type="number"
        placeholder="Enter UserID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleGetByUser}>Search</button>

      {userError && <p>{userError}</p>}
      {userCommunities.length > 0 && (
        <ul>
          {userCommunities.map((community) => (
            <li key={community.CommunityID}>
              {community.CommunityID}/
              {community.Name}/
              {community.Description}
            </li>
          ))}
        </ul>
      )}

      <h3>Division: UserID and usernames of users in all communities</h3>
      <button onClick={handleDivision}>Run Query</button>

      {divisionError && <p>{divisionError}</p>}
      {divisionResult.length > 0 && (
        <ul>
          {divisionResult.map((user) => (
            <li key={user.UserID}>
              {user.UserID}/
              {user.Username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}