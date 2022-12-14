import axios from "axios";

const movieApis = {
  searchMovies: async (query, page) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/search/${query}/${page}`
    );
    return response;
  },
  getMovie: async (movieApiId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/${movieApiId}`
    );
    return response;
  },

  getOurMovie: async (movieApiId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/our-movies/${movieApiId}`
    );
    return response;
  },
  getListOfGenres: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/listofgenres`
    );
    return response;
  },

  getGenreResults: async (genreId, page) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/genre/${genreId}/${page}`
    );
    return response;
  },
};

export default movieApis;
