import { useState, useEffect } from "react";
import { getAllCommunities } from "../../services/communityService";

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(function fetchCommunities() {
    getAllCommunities()
      .then(res => setCommunities(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Fail to get data"));
  }, []);

  return (
    <>
      <h3>Communities</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {communities.map((community) => (
            <li key={community.CommunityID}>
              <div><strong>Your community ID:</strong> {community.CommunityID}</div>
              <div><strong>Your community Name:</strong> {community.Name}</div>
              <div><strong>Your community Description:</strong> {community.Description}</div>
              <div><strong>Your community GameTitle:</strong> {community.GameTitle}</div>
            </li>
        ))}
      </ul>
    </>
  );
}
