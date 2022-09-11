import axios from "axios";

const apis = {
  rating: async (rating, type) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews/${type}`,
      rating,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return response;
  },
};

export default apis;
