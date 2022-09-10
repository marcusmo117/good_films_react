import axios from "axios";

const apis = {
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

  updateFollow: async (follower, followee) => {},
};

export default apis;
