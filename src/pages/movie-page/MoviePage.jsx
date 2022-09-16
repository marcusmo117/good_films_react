import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MoviePage.scss";
import apis from "../../utils/movie";
import MovieReview from "./MovieReview";

function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const movieResult = await apis.getMovie(params.movieApiId);
      setMovie(movieResult.data);
    };

    fetchMovie();
  }, []);

  const {
    id,
    name,
    title,
    poster_path,
    release_date,
    runtime,
    overview,
    vote_average,
    vote_count,
  } = movie;
 
  return (
    <div className="movie">
      <Container>
        <h1>{name ? name : title}</h1>
        <Row>
          <Col md={3}>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie-poster"></img>
          </Col>
          <Col md={9}>
            <p>Overview: {overview}</p>
            <p>Release Date: {release_date}</p>
            <p>Duration: {runtime} mins</p>
            <p>Average Vote Score: {vote_average}</p>
            <p>No. of Votes: {vote_count}</p>
            <div><MovieReview /></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MoviePage;
