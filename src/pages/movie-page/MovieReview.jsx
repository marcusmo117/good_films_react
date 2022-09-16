import { useState } from "react";
import Form from "react-bootstrap/Form";
import apis from "../../utils/review";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./MovieReview.scss";
import StarRating from "./StarRating";

function MovieReview() {
  const params = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState({});
  const [review, setReview] = useState({
    text: "",
  });
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const checkReviewExists = async () => {};

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieApiId = params.movieApiId;

    const userReview = { review, rating };

    try {
      const response = await apis.createReview(userReview, token, movieApiId);
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
        {!tokenExists ? (
          "Sign in to rate"
        ) : (
          <div className="container">
            <Form onSubmit={handleSubmit}>
              <StarRating ratingFunction={setRating} rateScore={rating} />
              {/* <Form> */}
              <Form.Group className="mb-3" controlId="review">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="text"
                  placeholder="Leave a review"
                  onChange={handleChange}
                  value={review.text}
                />
              </Form.Group>
              {/* </Form> */}
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
