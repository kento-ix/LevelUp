import { useState, useEffect } from "react";
import { getAllCommunities,  getCommunitiesByUserId} from "../services/communityService";

export default function CommunityList({userID}) {
  const [communities, setCommunities] = useState([]);

  useEffect(function fetchCommunities() {

    if(!userID){
      getAllCommunities()
        .then(res => {
          setCommunities(res.data);
        })
        .catch(e => {
          const msg = e.response?.data?.message || "Fail to get data";
          setFetchError(msg);
        });
    } 
    else{
      getCommunitiesByUserId(userID)
        .then(res => {
          setCommunities(res.data);
        })
        .catch(e => {
          const msg = e.response?.data?.message || "Fail to get data";
          setFetchError(msg);
        });
    }
  }, []);


  return (
    <>
      <h3>Communities</h3>
      {communities.length > 0 && (
        <div>
          {communities.map((community) => (
          <ul key={community.CommunityID}>
            <li><strong>Your community ID:</strong> {community.CommunityID}</li>
            <li><strong>Your community Name:</strong> {community.Name}</li>
            <li><strong>Your community Description:</strong> {community.Description}</li>
            <li><strong>Your community GamaTitle:</strong> {community.GameTitle}</li>
          </ul>
          ))}
        </div>
      )}
    </>
  );
}
