import Comment from "./Comment";
import { useEffect, useState } from "react";

function CommentThread({ review }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (Object.keys(review).length) {
      const updatedComments = review.commentIds.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ));
      setComments(updatedComments);
    }
  }, [review]);

  return <div className="comments">{comments}</div>;
}

export default CommentThread;
