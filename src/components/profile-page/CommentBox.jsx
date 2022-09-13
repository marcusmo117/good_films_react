import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import Card from "react-bootstrap/Card";
import apis from "../../utils/review";

function CommentBox({ reviewId, fetchProfile }) {
  const commentInput = useRef();
  const token = "Bearer " + localStorage.getItem("user_token");

  const handleSubmitComment = async () => {
    const commentText = commentInput.current.value;
    await apis.createComment(reviewId, commentText, token);
  };

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={12} lg={10} xl={8}>
          <Card>
            <Card.Footer className="py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="d-flex justify-content-start w-100">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  ref={commentInput}
                />{" "}
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="primary" size="sm" onClick={handleSubmitComment}>
                  Post comment
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CommentBox;
