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

  updateFollowing: async (followee, token, type) => {
    console.log("UPDATE FOLLOWING");
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/profiles/${type}`,
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
