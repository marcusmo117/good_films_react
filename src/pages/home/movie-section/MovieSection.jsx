import React from "react";
import Card from "../movie-card/MovieCard";
import styles from "./MovieSection.scss";

function MovieSection(props) {
  const getMovie = props.section;
  const listMovies = getMovie.map((movie) => <Card key={movie.id} movieDetails={movie} />);
  //const listMovies = getMovie.slice(0, 8).map((movie) => <Card key={movie.id} movieDetails={movie} />);
  
  return (
    <div className="section-container">
      <h3>{props.title}</h3>
      <div className="movie-container">
          {listMovies}
      </div>
    </div>
  );
}

export default MovieSection;
