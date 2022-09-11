import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const LikeButton = () => {
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
            checkedIcon={<Favorite color="error" />}
            name="checkedH"
          />
        }
      />
    </div>
  );
};

export default LikeButton;
