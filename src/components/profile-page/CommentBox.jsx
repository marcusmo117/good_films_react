import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function CommentBox() {
  const handleSubmitComment = () => {};

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
                />{" "}
              </div>
              <div className="d-flex justify-content-end">
                <Button type="Submit" variant="primary" size="sm" onClick={handleSubmitComment}>
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
