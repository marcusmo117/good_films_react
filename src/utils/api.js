import axios from "axios";

const apis = {
  getMovies: async (type) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/${type}`);
    return response;
  },

  getMovie: async (movieApiId) => {
    const response = await axios.get(`http://localhost:8000/api/v1/movies/${movieApiId}`);
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
