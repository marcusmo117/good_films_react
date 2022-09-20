import React, { useEffect, useState } from "react";
import apis from "../../../utils/movie";
import MovieSection from "../movie-section/MovieSection";
import FilterDropdown from "../filter/FilterDropdown";
import styles from "./Index.scss";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";

const MoviesByGenre = () => {
  const params = useParams();
  const [genre, setGenre] = useState({});
  const [genreList, setGenreList] = useState({});
  const [page, setPage] = useState(1);

  // Fetch list of genres and movies by genres
  const fetchGenre = async () => {
    const genreResults = await apis.getGenreResults(params.genreId, page);
    const allGenres = await apis.getListOfGenres();
    setGenre(genreResults);
    setGenreList(allGenres);
  };

  useEffect(() => {
    fetchGenre();
  });

  // Change page
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="section">
      <h1>Movies By Genre</h1>
      {
        !genreList.data ? 
        ( < CircularProgress /> )
        :
        (
          <div>
            <div className="filter"> { genreList.data? <FilterDropdown dropdownGenres={genreList} /> : "Unable to get list of genres" }</div>
            <div className="section">{genre.data ? <MovieSection section={genre.data} title={params.genre} /> : "No movies in this genre"}</div>
          </div>
        )
      }  
      <div className="pagination">
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          />
      </div>
    </div>
  );
}

export default MoviesByGenre;
