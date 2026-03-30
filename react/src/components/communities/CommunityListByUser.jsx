import { useState, useEffect } from "react";
import { getCommunitiesByUserId } from "../../services/communityService";

export default function CommunityListByUser({ userID }) {
  const [communities, setCommunities] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchCommunities() {
    getCommunitiesByUserId(userID)
      .then(res => setCommunities(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Fail to get data"));
  }, [userID]);

  return (
    <div>
      <h3>Communities</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {communities.map((community) => (
          <li key={community.CommunityID}>
            <div><strong>Community ID:</strong> {community.CommunityID}</div>
            <div><strong>Name:</strong> {community.Name}</div>
            <div><strong>Description:</strong> {community.Description}</div>
            <div><strong>GameTitle:</strong> {community.GameTitle}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
