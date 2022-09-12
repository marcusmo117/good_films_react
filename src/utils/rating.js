import axios from "axios";

const apis = {
  rating: async (rating, token, movieApiId) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/${movieApiId}`,
      rating,
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
