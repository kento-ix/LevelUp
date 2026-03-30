import { useNavigate } from "react-router-dom";

export default function PostCard(props) {
  const navigate = useNavigate();
  const post = props.post;

  return (
    <div onClick={() => navigate(`/posts/community/${post.CommunityID}`)} className="post-card">
      <strong>{post.Title}</strong>
      <p>{post.Username} · {post.CommunityName} · {post.Date_Created}</p>
      <p>{post.Content}</p>
      <p>Genre:{post.Genre}</p>
    </div>
  );
}
