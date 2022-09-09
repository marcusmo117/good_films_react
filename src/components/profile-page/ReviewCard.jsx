import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function ReviewCard({ data }) {
  return (
    <div className="review-card">
      <Card>
        <Card.Title>{data.movieTitle}</Card.Title>
        <Card.Text>Review: {data.reviewText}</Card.Text>
        <Card.Text>Rating: {data.rating}</Card.Text>
        {/* to do: number of likes */}
        <a>like</a>
        <a>comment</a>
        <a>see review</a>
      </Card>
    </div>
  );
}

export default ReviewCard;
