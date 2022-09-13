import axios from "axios";

const apis = {
  updateLikes: async (reviewId, token, type) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${reviewId}/${type}`,
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

  createComment: async (reviewId, commentText, token) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${reviewId}/comments`,
      { commentText },
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
