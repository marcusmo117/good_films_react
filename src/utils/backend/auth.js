import axios from "axios";

const apis = {
  auth: async (formData, type) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${type}`,
      formData,
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
