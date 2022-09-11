import React from "react";
import Form from 'react-bootstrap/Form';

function MovieReview() {

  return (
    <div>
      <h3>Review this movie</h3>
      <Form>
        <Form.Group className="mb-3" controlId="review">
          <Form.Control as="textarea" rows={3} placeholder="Leave a review" />
        </Form.Group>
      </Form>
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );

}

export default MovieReview;