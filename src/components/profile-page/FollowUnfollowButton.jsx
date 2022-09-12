import Button from "react-bootstrap/Button";

function FollowUnfollowButton({ isFollowing, updateFollowStatus }) {
  if (!isFollowing) {
    return (
      <Button variant="success" onClick={updateFollowStatus}>
        Follow
      </Button>
    );
  }
  return (
    <Button variant="danger" onClick={updateFollowStatus}>
      Unfollow
    </Button>
  );
}

export default FollowUnfollowButton;
