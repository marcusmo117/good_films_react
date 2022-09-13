import axios from "axios";

const apis = {
  getProfiles: async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/profiles/`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  },
  getProfile: async (username, token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/profiles/${username}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  },

  updateFollowing: async (followee, token, type) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/profiles/${followee}/${type}`,
      { followee },
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
