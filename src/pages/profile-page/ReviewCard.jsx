import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import LikesAndCommentsCounter from "./LikesAndCommentsCounter";
import movieApis from "../../utils/movie";
import StarRating from "../movie-page/StarRating";

// import CommentThread from "./CommentThread";
import CommentBox from "./CommentBox";
import apis from "../../utils/review";
import jwt_decode from "jwt-decode";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import datetimeToRelativeTime from "../../utils/datetime/relativeCalendar";
import styles from "./ReviewCard.scss";
import { CardHeader } from "@mui/material";
import Image from "react-bootstrap/Image";

function ReviewCard({ reviewId, page }) {
  const token = "Bearer " + localStorage.getItem("user_token");
  const navigate = useNavigate();
  const currentUserUsername = jwt_decode(token).data.username;
  const [review, setReview] = useState({});
  const [movie, setMovie] = useState({});
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
    const fetchMovie = async () => {
      try {
        const movieResult = await movieApis.getMovie(review.movieId.movieApiId);
        setMovie(movieResult.data);
      } catch (err) {}
    };
    if (review.authorUserId && page === "review-page") {
      if (review.authorUserId.username === currentUserUsername) {
        setAreButtonsVisible(true);
      }
    }
    fetchMovie();
  }, [review]);

  const deleteReviewBackend = async () => {
    await apis.deleteReview(reviewId, token);
    navigate(`/profiles/${currentUserUsername}`);
  };

  // if (!review.authorUserId) {
  //   console.log("loading");
  //   return <>Loading...</>;
  // }

  const navToEditReview = () => {
    navigate(`/reviews/${params.reviewId}/edit`);
  };

  return (
    <div className="review-card">
      <Card className="my-5">
        <Card.Header>
          <h3>
            <LinkContainer
              to={`/profiles/${review.authorUserId && review.authorUserId.username}`}>
              <Card.Link>{review.authorUserId && review.authorUserId.username}</Card.Link>
            </LinkContainer>
            {" rated "} 
          </h3>
          {review.rating ? (
              <StarRating rateScore={review.rating} component="review-card"></StarRating>
            ) : (
              <></>
          )}
        </Card.Header>
        <Card.Body>
          <Row>
            {page === "movie-page" ? (
              <></>
            ) : (
              <Col md={3}>
                <div class="movie">
                  <Image className="img-thumbnail" width="250"
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}></Image>
                </div>
              </Col>
            )}

            <Col>
              <LinkContainer to={`/movies/${review.movieId && review.movieId.movieApiId}`}>
                {page === "movie-page" ? (
                  <></>
                ) : (
                  <h1>
                    <Card.Title className="movie-title">{review.movieTitle}</Card.Title>
                  </h1>
                )}
              </LinkContainer>

              {review.createdAt ? (
                <Card.Text>{datetimeToRelativeTime(review.createdAt)}</Card.Text>
              ) : (
                <></>
              )}

              
              {review.reviewText ? <Card.Text>Review: {review.reviewText}</Card.Text> : <></>}
              

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
              {page === "review-page" ? (
                <></>
              ) : (
                <LinkContainer to={"/reviews/" + review._id}>
                  <Card.Link>See review</Card.Link>
                </LinkContainer>
              )}

              <Collapse in={openCommentBox}>
                <div>
                  <CommentBox review={review} setReview={setReview} />
                </div>
              </Collapse>
            </Col>
          </Row>
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
