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
      </Card>
    </div>
  );
}

export default ReviewCard;
