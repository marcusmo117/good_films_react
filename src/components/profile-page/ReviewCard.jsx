import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LikeButton from "./LikeButton";
import CommentThread from "./CommentThread";
import CommentBox from "./CommentBox";
import apis from "../../utils/review";
import jwt_decode from "jwt-decode";
import Collapse from "react-bootstrap/Collapse";

function ReviewCard({ reviewId }) {
  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  const [review, setReview] = useState({});
  const [openCommentBox, setOpenCommentBox] = useState(false);

  // if (reviewDetails) {
  //   console.log("reviewdetails", reviewDetails);
  // }
  useEffect(() => {
    const fetchReview = async () => {
      const reviewResult = await apis.getReview(reviewId, token);
      setReview(reviewResult.data);
    };

    fetchReview();
  }, []);

  if (!review.authorUserId) {
    console.log("loading");
    return <>Loading...</>;
  }

  return (
    <div className="review-card">
      <Card>
        <Card.Body>
          <Card.Title>{review.movieTitle}</Card.Title>
          <LinkContainer to={"/profiles/" + review.authorUserId && review.authorUserId.username}>
            <Card.Link>{review.authorUserId && review.authorUserId.username}</Card.Link>
          </LinkContainer>
          {review.reviewText ? <Card.Text>Review: {review.reviewText}</Card.Text> : <></>}
          {review.rating ? <Card.Text>Rating: {review.rating}</Card.Text> : <></>}

          <LikeButton
            review={review}
            setReview={setReview}
            currentUserUsername={currentUserUsername}
          />
          <Card.Link
            style={{ cursor: "pointer" }}
            onClick={() => setOpenCommentBox(!openCommentBox)}>
            Comment
          </Card.Link>
          <LinkContainer to={"/reviews/" + review._id}>
            <Card.Link>See review</Card.Link>
          </LinkContainer>
          <Collapse in={openCommentBox}>
            <div>
              <CommentBox review={review} setReview={setReview} />
            </div>
          </Collapse>
          <CommentThread review={review} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewCard;
