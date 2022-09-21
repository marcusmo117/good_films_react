import React, { useState } from "react";

import Tooltip from '@mui/material/Tooltip';


const StarRating = ({ rateScore, ratingFunction, component = null }) => {
  const [hover, setHover] = useState(0);

  let starButtons;
  console.log("component", component);

  if (component === "review-card") {
    starButtons = [...Array(10)].map((star, index) => {
      index += 1;
      return (
        <button type="button" key={index} className={index <= rateScore ? "on" : "off"}>
          <span className="star">
            <i className="fa fa-star fa-2x"></i>
          </span>
        </button>
      );
    });
  } else {
    starButtons = [...Array(10)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (hover || rateScore) ? "on" : "off"}
          onClick={() => ratingFunction(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rateScore)}>
          <span className="star">
            <Tooltip title={index} placement="top"><i className="fa fa-star fa-2x"></i></Tooltip>
          </span>
        </button>
      );
    });
  }
  return <div className="star-rating">{starButtons}</div>;
};

export default StarRating;
