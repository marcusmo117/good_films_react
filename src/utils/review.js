import axios from "axios";

const apis = {
  getReview: async (reviewId, token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${reviewId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  deleteReview: async (reviewId, token) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${reviewId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  },

  updateReview: async (userReview, token, reviewId) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${reviewId}`,
      userReview,
      {
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
      }
    );
    return response;
  },

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

  createReview: async (userReview, token, movieApiId) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${movieApiId}`,
      userReview,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    return response;
  },
};

export default apis;
