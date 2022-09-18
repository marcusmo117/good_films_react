import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import apis from "../../utils/review";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieReview.scss";
import StarRating from "./StarRating";

function MovieReview(props) {
  const params = useParams();
  const movieApiId = params.movieApiId;
  const navigate = useNavigate();
  const [newRating, setNewRating] = useState({});
  const [newReview, setNewReview] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   const fetchReview = async () => {
  //     const reviewResult = await apis.getReviewFromMovieAndUser(movieApiId, token)
  //     setExistingReview(reviewResult);
  //   };
  //   fetchReview();
  // }, [])
  // console.log("Review results:", existingReview)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userNewReview = { newReview, newRating };

    try {
      const response = await apis.createReview(userNewReview, props.token, movieApiId);
      const reviewId = response.data._id;
      navigate(`/reviews/${reviewId}`);
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <div className="review">
      <h3>Rate and review this movie</h3>

      <div>
        {!props.tokenExists ? (
          "Sign in to rate"
        ) : (
          <div className="container">
            <Form onSubmit={handleSubmit}>
              <StarRating ratingFunction={setNewRating} rateScore={newRating} />
              <Form.Group className="mb-3" controlId="review">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="text"
                  placeholder="Leave a review"
                  onChange={handleChange}
                  value={newReview.text}
                />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form> 
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieReview;
