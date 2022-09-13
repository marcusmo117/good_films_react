import axios from "axios";

const apis = {
  updateLikes: async (reviewId, token, type) => {
    console.log("UPDATE LIKES");
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${type}`,
      { reviewId },
      {
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
      }
    );

    return response;
  },
};

export default apis;
