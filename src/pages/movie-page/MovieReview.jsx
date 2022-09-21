import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import apis from "../../utils/review";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./MovieReview.scss";
import StarRating from "./StarRating";

function MovieReview(props) {
  const params = useParams();
  const movieApiId = params.movieApiId;
  const navigate = useNavigate();
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

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
      <div>
        {props.existingReview === null ? 
        (
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
        )
        :
        (
          <p>You reviewed this movie on {props.reviewDate}. Click here to see your{" "}
          <Link to={`/reviews/${props.existingReview._id}`}>review</Link>.{" "}</p>
        )
      }
      </div>
    </div>
  );
}

export default MovieReview;
