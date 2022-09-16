import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import apis from "../../utils/review";

const LikeButton = ({ review, setReview, currentUserUsername }) => {
  const [isLiked, setIsLiked] = useState(false);
  const token = "Bearer " + localStorage.getItem("user_token");
  const updateLikesBackend = async (type) => {
    try {
      const response = await apis.updateLikes(review._id, token, type);
      const updatedReview = {
        ...review,
        userIdsWhoLiked: response.data.userIdsWhoLiked,
      };
      setReview(updatedReview);
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };
  const updateLikes = (ev) => {
    if (ev.target.checked) {
      updateLikesBackend("like");
    } else {
      updateLikesBackend("unlike");
    }
  };

  useEffect(() => {
    if (Object.keys(review).length) {
      const usernamesWhoLiked = review.userIdsWhoLiked.map((user) => user.username);
      setIsLiked(usernamesWhoLiked.includes(currentUserUsername));
    }
  }, [review]);

  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "fit-content",
      }}>
      <FormControlLabel
        style={{ margin: "0" }}
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            onChange={updateLikes}
            checked={isLiked}
            checkedIcon={<Favorite color="error" />}
            name="checkedH"
          />
        }
      />
    </div>
  );
};

export default LikeButton;
