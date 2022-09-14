import axios from "axios";

const apis = {
  rating: async (userReview, token, movieApiId) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/rating/${movieApiId}`,
      userReview,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
  },
};

export default apis;
