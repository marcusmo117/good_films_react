import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import datetimeToRelativeTime from "../../utils/datetime/relativeCalendar";
import { LinkContainer } from "react-router-bootstrap";

function Comment({ comment }) {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={12} lg={10} xl={8}>
          <Card>
            <Card.Footer className="py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <Card.Text>{datetimeToRelativeTime(comment.createdAt)}</Card.Text>
              <LinkContainer to={`/profiles/${comment.authorUserId.username}`}>
                <Card.Link>{comment.authorUserId.username}</Card.Link>
              </LinkContainer>
              <Card.Text>{comment.commentText}</Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Comment;
