import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Comment({ commentDetails }) {
  const date = new Date(commentDetails.createdAt).toLocaleString("en-UK").substring(0, 17);
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={12} lg={10} xl={8}>
          <Card>
            <Card.Footer className="py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <Card.Text>{date}</Card.Text>
              <Card.Text>{commentDetails.authorUserId.username}</Card.Text>
              <Card.Text>{commentDetails.commentText}</Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Comment;
