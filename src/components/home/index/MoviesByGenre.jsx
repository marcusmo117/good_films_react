import React, { useEffect, useState } from "react";
import apis from "../../../utils/movie";
import MovieSection from "../movie-section/MovieSection";
import FilterDropdown from "../filter/FilterDropdown";
import styles from "./Index.scss";
import { useParams } from "react-router-dom";

function MoviesByGenre() {
  const params = useParams();
  const [genre, setGenre] = useState({});
  const [genreList, setGenreList] = useState({});

  const fetchGenre = async () => {
    const genreResults = await apis.getGenreResults(params.genreId);
    const allGenres = await apis.getListOfGenres();
    setGenre(genreResults);
    setGenreList(allGenres);
  };

  useEffect(() => {
    fetchGenre();
  });

  console.log(params.genre);
  return (
    <div className="section">
      <h1>Movies By Genre</h1>
      <div className="filter">
        { genreList.data? <FilterDropdown dropdownGenres={genreList} /> : "Unable to get list of genres" }
      </div>
      <div className="section">{genre.data ? <MovieSection section={genre.data} title={params.genre} /> : "No movies in this genre"}</div>
    </div>
  );
}

export default MoviesByGenre;
