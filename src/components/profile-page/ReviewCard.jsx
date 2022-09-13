import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import LikeButton from "./LikeButton";
import apis from "../../utils/review";
import jwt_decode from "jwt-decode";

function ReviewCard({ reviewDetails }) {
  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;
  const reviewId = reviewDetails._id;

  const [reviewIsLiked, setReviewIsLiked] = useState(false);

  useEffect(() => {
    const usernamesWhoLiked = reviewDetails.userIdsWhoLiked.map((user) => user.username);
    if (usernamesWhoLiked.includes(currentUserUsername)) {
      setReviewIsLiked(true);
    }
  }, [reviewDetails]);

  const updateLikesBackend = async (type) => {
    try {
      await apis.updateLikes(reviewId, token, type);
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };
  const updateLikes = (ev) => {
    if (ev.target.checked) {
      updateLikesBackend("like");
      setReviewIsLiked(true);
    } else {
      updateLikesBackend("unlike");
      setReviewIsLiked(false);
    }
  };

  return (
    <div className="review-card">
      <Card>
        <Card.Body>
          <Card.Title>{reviewDetails.movieTitle}</Card.Title>
          {/* {isCurrentUser && <Card.Link href="#">Edit Review</Card.Link>} */}
          <Card.Text>Review: {reviewDetails.reviewText}</Card.Text>
          <Card.Text>Rating: {reviewDetails.rating}</Card.Text>
          {/* to do: number of likes */}
          <LikeButton reviewIsLiked={reviewIsLiked} updateLikes={updateLikes} />
          <Card.Link>Comment</Card.Link>
          <Card.Link>See review</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewCard;
