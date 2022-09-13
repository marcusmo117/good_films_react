import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const LikeButton = ({ reviewIsLiked, updateLikes }) => {
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
            checked={reviewIsLiked}
            checkedIcon={<Favorite color="error" />}
            name="checkedH"
          />
        }
      />
    </div>
  );
};

export default LikeButton;
