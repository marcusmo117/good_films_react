import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function ReviewCard({ data }) {
  return (
    <div className="review-card">
      <Card>
        <h5>{data.movieId}</h5>
        <h5>{data.reviewText}</h5>
        <h5>{data.rating}</h5>
      </Card>
    </div>
  );
}

export default ReviewCard;
