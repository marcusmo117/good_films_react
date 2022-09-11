import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import LikeButton from "./LikeButton";

function ReviewCard({ reviewDetails }) {
  return (
    <div className="review-card">
      <Card>
        <Card.Body>
          <Card.Title>{reviewDetails.movieTitle}</Card.Title>
          {/* {isCurrentUser && <Card.Link href="#">Edit Review</Card.Link>} */}
          <Card.Text>Review: {reviewDetails.reviewText}</Card.Text>
          <Card.Text>Rating: {reviewDetails.rating}</Card.Text>
          {/* to do: number of likes */}
          <LikeButton />
          <Card.Link>Comment</Card.Link>
          <Card.Link>See review</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewCard;
