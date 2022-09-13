import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import LikeButton from "./LikeButton";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import apis from "../../utils/review";
import jwt_decode from "jwt-decode";

import Collapse from "react-bootstrap/Collapse";

function ReviewCard({ reviewDetails, fetchProfile }) {
  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  const [reviewIsLiked, setReviewIsLiked] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);

  if (reviewDetails) {
    console.log("reviewdetails", reviewDetails);
  }
  useEffect(() => {
    const usernamesWhoLiked = reviewDetails.userIdsWhoLiked.map((user) => user.username);
    if (usernamesWhoLiked.includes(currentUserUsername)) {
      setReviewIsLiked(true);
    }
  }, [reviewDetails]);

  const updateLikesBackend = async (type) => {
    try {
      await apis.updateLikes(reviewDetails._id, token, type);
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
          <Card.Text>Review: {reviewDetails.reviewText}</Card.Text>
          <Card.Text>Rating: {reviewDetails.rating}</Card.Text>
          <LikeButton reviewIsLiked={reviewIsLiked} updateLikes={updateLikes} />
          <Card.Link onClick={() => setOpenCommentBox(!openCommentBox)}>Comment</Card.Link>
          <Card.Link>See review</Card.Link>
          <Collapse in={openCommentBox}>
            <div>
              <CommentBox reviewId={reviewDetails._id} fetchProfile={fetchProfile} />
            </div>
          </Collapse>
          <div className="comments">
            {reviewDetails.commentIds.map((comment) => (
              <Comment key={comment._id} commentDetails={comment} />
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewCard;
