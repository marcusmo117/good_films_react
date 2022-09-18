import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Comment from "./Comment";
import Collapse from "react-bootstrap/Collapse";
import styles from "./LikesAndCommentsCounter.scss";

const LikesAndCommentsCounter = ({ review }) => {
  const [comments, setComments] = useState([]);
  const [likers, setLikers] = useState([]);
  const [showLikes, setShowLikes] = useState(false);
  const [openCommentThread, setOpenCommentThread] = useState(true);

  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = () => setShowLikes(true);

  useEffect(() => {
    if (Object.keys(review).length) {
      const usernamesWhoLiked = review.userIdsWhoLiked.map((user) => user.username);
      setLikers(usernamesWhoLiked);
      const updatedComments = review.commentIds.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ));
      setComments(updatedComments);
    }
  }, [review]);

  return (
    <>
      <div>
        <span className="counter" onClick={handleShowLikes}>
          {likers.length} like(s),
        </span>{" "}
        <span className="counter" onClick={() => setOpenCommentThread(!openCommentThread)}>
          {comments.length} comment(s)
        </span>
      </div>
      <Modal show={showLikes} onHide={handleCloseLikes}>
        <Modal.Header closeButton>
          <Modal.Title>Likes by</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {likers.map((username) => (
              <li key={username}>
                <Link to={"/profiles/" + username}>{username}</Link>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLikes}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Collapse in={openCommentThread}>
        <div className="comments">{comments}</div>
      </Collapse>
    </>
  );
};

export default LikesAndCommentsCounter;
