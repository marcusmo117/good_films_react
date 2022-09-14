import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewCard from "../profile-page/ReviewCard";

function ReviewPage() {
  const params = useParams();
  const [reviewId, setReviewId] = useState(params.reviewId);

  useEffect(() => {
    setReviewId(params.reviewId);
  }, [params.reviewId]);

  return (
    <div className="profile-page">
      <Container>
        <ReviewCard key={reviewId} reviewId={reviewId} />
      </Container>
    </div>
  );
}

export default ReviewPage;
