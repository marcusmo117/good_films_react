import React, { useEffect, useState } from "react";
import FilterDropdown from "../filter/FilterDropdown";
import MovieSection from "../movie-section/MovieSection";
import styles from "./Index.scss";
import apis from "../../../utils/movie";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function Index() {
  const [popularMovies, setPopularMovies] = useState({});
  const [topMovies, setTopMovies] = useState({});
  const [genreList, setGenreList] = useState({});

  const fetchMovies = async () => {
    const popular = await apis.getMovies("popular");
    const top = await apis.getMovies("top_rated");
    const allGenres = await apis.getListOfGenres();
    setPopularMovies(popular);
    setTopMovies(top);
    setGenreList(allGenres);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="section">
      <h1>Browse Movies</h1>
      <div className="filter">
        {genreList.data && (
          <FilterDropdown dropdownGenres={genreList}/>
        )}
      </div>

      <div className="section">
        {popularMovies.data && (
          <MovieSection section={popularMovies.data.results} title="Popular" />
        )}
      </div>
      <div className="section">
        {topMovies.data && <MovieSection section={topMovies.data.results} title="Top Rated" />}
      </div>
    </div>
  );
}

export default Index;
