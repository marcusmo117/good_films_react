import React, { useEffect, useState } from "react";
import FilterDropdown from "../filter/FilterDropdown";
import MovieSection from "../movie-section/MovieSection";
import styles from "./Index.scss";
import apis from "../../../utils/movie";

function Index() {
  const [popularMovies, setPopularMovies] = useState({});
  const [topMovies, setTopMovies] = useState({});

  const fetchMovies = async () => {
    const popular = await apis.getMovies("popular");
    const top = await apis.getMovies("top_rated");
    setPopularMovies(popular);
    setTopMovies(top);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="section">
      <h1>Browse Movies</h1>
      <div>
        <FilterDropdown />
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
