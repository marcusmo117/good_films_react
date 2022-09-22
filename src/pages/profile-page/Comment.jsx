import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import profileApis from "../../utils/profile";
import Card from "react-bootstrap/Card";
import datetimeToRelativeTime from "../../utils/datetime/relativeCalendar";
import { LinkContainer } from "react-router-bootstrap";

function Comment({ comment }) {
  // const [userHairLength, setUserHairLength] = useState(null);

  // useEffect(() => {
  //   const fetchUserGender = async () => {
  //     try {
  //       const response = await profileApis.getGender(comment.authorUserId.username);
  //       setUserHairLength(response.data.gender === "female" ? "longHair" : "shortHair");
  //     } catch (err) {
  //       setUserHairLength("shortHair")

  //     }
  //   };
  //   fetchUserGender();
  // }, []);
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={12} lg={10} xl={8}>
          <Card>
            <Card.Body className="py-3 border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <Row className="header">
                <Col md="auto pe-1">
                  {/* {userHairLength ? (
                    <img
                      className="review-card-avatar"
                      src={`https://avatars.dicebear.com/api/avataaars/${comment.authorUserId.username}.svg?top=${userHairLength}&facialHairChance=0&size=40&radius=50`}></img>
                  ) : (
                    <></>
                  )}{" "} */}

                  <img
                    className="review-card-avatar"
                    src={`https://avatars.dicebear.com/api/avataaars/${comment.authorUserId.username}.svg?size=40&radius=50`}></img>
                </Col>
                <Col md="auto" className="align-self-center ps-0">
                  <LinkContainer to={`/profiles/${comment.authorUserId.username}`}>
                    <Card.Link className="review-card-username">
                      {comment.authorUserId.username}
                    </Card.Link>
                  </LinkContainer>
                </Col>
                <Col className="align-self-center">
                  <Card.Text className="text-end">
                    {datetimeToRelativeTime(comment.createdAt)}
                  </Card.Text>
                </Col>
              </Row>
              {/* <Card.Text>{datetimeToRelativeTime(comment.createdAt)}</Card.Text>
              <LinkContainer to={`/profiles/${comment.authorUserId.username}`}>
                <Card.Link>{comment.authorUserId.username}</Card.Link>
              </LinkContainer> */}
              <Card.Text className="text-start">{comment.commentText}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Comment;
