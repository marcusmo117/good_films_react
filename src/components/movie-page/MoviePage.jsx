import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './MoviePage.scss'

function MoviePage() {
  const params = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const fetchMovie = async () => {
      const movieResult = await axios.get(`http://localhost:8000/api/v1/movies/${params.movieApiId}`)
      setMovie(movieResult.data)
    }

    fetchMovie();
  }, []);

  const { id, name, title, poster_path, popularity, release_date, runtime, overview, vote_average, vote_count } = movie;
  console.log(movie)

  return (
    <div className='movie'>
      <Container>
      <h1>{name ? (name) : (title)}</h1>
        <Row>
          <Col md={3}>
          <img src={`https://image.tmdb.org/t/p/original${poster_path}`}></img>
          </Col>
          <Col md={9}>
            <p>Overview: {overview}</p>
            <p>Release Date: {release_date}</p>
            <p>Duration: {runtime}</p>
            <p>Average Vote Score: {vote_average}</p>
            <p>No. of Votes: {vote_count}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MoviePage;
