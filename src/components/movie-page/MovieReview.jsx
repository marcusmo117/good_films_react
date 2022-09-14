import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import apis from "../../utils/rating";
import { useParams } from "react-router-dom";
import styles from "./MovieReview.scss"

function MovieRating() {
  const params = useParams();
  const [review, setReview] = useState({
    text: "",
  });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieApiId = params.movieApiId;

    const userReview = {review, rating};
    console.log(userReview)
    
    try {
      apis.rating(userReview, token, movieApiId);
      return;
    } catch (error) {
      return(error.response.data);
    }
  }

  return(
    <div className="review">
      <h3>Rate and review this movie</h3>

      <div>
        {!tokenExists? 
          "You must be logged in to rate"
        :
        <div className="container">
        <form onSubmit={handleSubmit}>
          
        <div className="star-rating">
          {[...Array(10)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star"><i class="fa fa-star fa-2x"></i></span>
              </button>
        );
      })}
    </div>
        
          <Form>
            <Form.Group className="mb-3" controlId="review">
              <Form.Control as="textarea" rows={3} name="text" placeholder="Leave a review" onChange={handleChange} value={review.text} />
            </Form.Group>
          </Form>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
        }
      </div>
    </div>
  )

}

export default MovieRating;