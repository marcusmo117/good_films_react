import React from "react";
import Card from "../movie-card/MovieCard";
import styles from "./MovieSection.scss";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function MovieSection(props) {
  const getMovie = props.section;

  const listMovies = getMovie.slice(0, 8).map((movie) => <Card key={movie.id} movieDetails={movie} />);

  return (
    <div className="section-container">
      <h3>{props.title}</h3>
      <div className="movie-container">
          {listMovies}
      </div>
    <Link to="test">See more movies</Link>
    </div>
  );
}

export default MovieSection;
