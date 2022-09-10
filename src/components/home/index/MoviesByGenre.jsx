import React, { useEffect, useState } from "react";
import apis from "../../../utils/movie";
import MovieSection from "../movie-section/MovieSection";
import FilterDropdown from "../filter/FilterDropdown";
import styles from "./Index.scss";
import { useParams } from "react-router-dom";

function MoviesByGenre() {
  const params = useParams();
  const [genre, setGenre] = useState({});

  const fetchGenre = async () => {
    const genreResults = await apis.getGenreResults(params.genreId);
    setGenre(genreResults);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  console.log(params.genre);
  return (
    <div className="section">
      <h1>Movies By Genre</h1>
      <div>
        <FilterDropdown />
      </div>
      <div>{genre.data ? <MovieSection section={genre.data} title={params.genre} /> : ""}</div>
    </div>
  );
}

export default MoviesByGenre;
