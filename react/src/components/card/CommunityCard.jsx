export default function CommunityCard(props) {
  const community = props.community;
  
  return (
    <li style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "0.75rem", listStyle: "none" }}>
      <div><strong>CommunityID:</strong> {community.CommunityID}</div>
      <div><strong>Name:</strong> {community.Name}</div>
      <div><strong>Description:</strong> {community.Description}</div>
      <div><strong>Game:</strong> {community.GameTitle}</div>
    </li>
  );
}