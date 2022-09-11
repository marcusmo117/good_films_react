import React, { useState } from "react";
import Rating from "react-rating"; 
import apis from "../../utils/rating";

function MovieRating() {
  const [rating, setRating] = useState(0);

  function handleRatingSubmit(e) {

    // set the rating on click
    setRating(e)
    console.log(rating)

    // post the rating to backend
    try {
      apis.rating(rating, "rating");
      return;
    } catch (err) {
      return(err)
    }

  }

  return(
    <div className="rating">
      <h3>Rate this movie</h3>
      <div>
        <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          stop={10}
          onHover={(rate) => document.getElementById('label-onrate').innerHTML = rate || ''}
          onClick={handleRatingSubmit}
        />
      </div>
      <div id='label-onrate'></div>
    </div>
  )

}

export default MovieRating;