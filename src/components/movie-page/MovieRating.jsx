import React, { useState } from "react";
import Rating from "react-rating"; 
import apis from "../../utils/rating";
import { useParams } from "react-router-dom";

function MovieRating() {
  const params = useParams();
  const [rating, setRating] = useState("");
  const token = 'Bearer ' + localStorage.getItem('user_token')

  function handleRatingSubmit(e) {

    const movieApiId = params.movieApiId;

    // set the rating on click
    setRating(e)
    console.log("Movie Score:", rating)
    console.log("Movie ID:", movieApiId)
    console.log("Token:", token)

    // post the rating to backend
    try {
      apis.rating({rating}, token, movieApiId);
      return;
    } catch (error) {
      return(error.response.data)
    }

  }

  return(
    
    <div className="rating">
      <h3>Rate this movie</h3>
      <div>
          {!token ? 
          "You must be logged in to rate"
          :
          <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          stop={10}
          onHover={(rate) => document.getElementById('label-onrate').innerHTML = rate || ''}
          onClick={handleRatingSubmit}
        />
        }
          <div id='label-onrate'></div>
      </div>
    </div>
  )

}

export default MovieRating;