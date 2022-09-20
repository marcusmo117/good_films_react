import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import LikesAndCommentsCounter from "./LikesAndCommentsCounter";
// import CommentThread from "./CommentThread";
import CommentBox from "./CommentBox";
import apis from "../../utils/review";
import jwt_decode from "jwt-decode";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

function ReviewCard({ reviewId, page }) {
  const token = "Bearer " + localStorage.getItem("user_token");
  const navigate = useNavigate();
  const currentUserUsername = jwt_decode(token).data.username;
  const [review, setReview] = useState({});
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      const reviewResult = await apis.getReview(reviewId, token);
      setReview(reviewResult.data);
    };

    fetchReview();
  }, []);

  useEffect(() => {
    if (review.authorUserId && page === "review-page") {
      if (review.authorUserId.username === currentUserUsername) {
        setAreButtonsVisible(true);
      }
    }
  }, [review]);

  const deleteReviewBackend = async () => {
    await apis.deleteReview(reviewId, token);
    navigate(`/profiles/${currentUserUsername}`);
  };

  if (!review.authorUserId) {
    console.log("loading");
    return <>Loading...</>;
  }

  const navToEditReview = () => {
    navigate(`/reviews/${params.reviewId}/edit`);
  };

  return (
    <div className="review-card">
      <Card>
        <Card.Body>
          <LinkContainer to={`/movies/${review.movieId && review.movieId.movieApiId}`}>
            <Card.Title>{page === "movie-page" ? "" : review.movieTitle}</Card.Title>
          </LinkContainer>
          <LinkContainer to={`/profiles/${review.authorUserId && review.authorUserId.username}`}>
            <Card.Link>{review.authorUserId && review.authorUserId.username}</Card.Link>
          </LinkContainer>
          {review.reviewText ? <Card.Text>Review: {review.reviewText}</Card.Text> : <></>}
          {review.rating ? <Card.Text>Rating: {review.rating}</Card.Text> : <></>}
          <LikesAndCommentsCounter review={review} />
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
        </Card.Body>
      </Card>
      {areButtonsVisible ? (
        <div className="review-buttons">
          <Button onClick={navToEditReview} className="me-3" variant="primary">
            Edit
          </Button>

          <Button onClick={deleteReviewBackend} variant="danger">
            Delete
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ReviewCard;
