import { useState, useEffect } from "react";
import { getAllCommunities } from "../../services/communityService";
import CommunityCard from "../card/CommunityCard";

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [fetchError, setFetchError]   = useState("");

  useEffect(function fetchCommunities() {
    getAllCommunities()
      .then(res => setCommunities(res.data))
      .catch(e => setFetchError(e.response?.data?.message || "Failed to get communities"));
  }, []);

  return (
    <div>
      <h3>Communities</h3>
      {fetchError && <p>{fetchError}</p>}
      <ul>
        {communities.map((community) => (
          <CommunityCard key={community.CommunityID} community={community} />
        ))}
      </ul>
    </div>
  );
}