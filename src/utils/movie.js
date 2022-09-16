import axios from "axios";

const apis = {
  getMovie: async (movieApiId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/${movieApiId}`
    );
    return response;
  },

  getListOfGenres: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/listofgenres`
    );
    return response;
  },

  getGenreResults: async (genreId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/genre/${genreId}`
    );
    return response;
  },
};

export default apis;
