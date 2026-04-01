import { useNavigate } from "react-router-dom";

export default function PostCard(props) {
  const navigate = useNavigate();
  const post = props.post;

  return (
    <li onClick={() => navigate(`/posts/community/${post.CommunityID}`)} style={{ cursor: "pointer", border: "1px solid #ccc", borderRadius: "6px", padding: "0.75rem", listStyle: "none" }}>
      <div><strong>PostID:</strong> {post.PostID}</div>
      <div><strong>Title:</strong> {post.Title}</div>
      <div><strong>Username:</strong> {post.Username}</div>
      <div><strong>Date:</strong> {post.Date_Created}</div>
      <div><strong>Content:</strong> {post.Content}</div>
      <div><strong>CommunityID:</strong> {post.CommunityID}</div>
    </li>
  );
}
