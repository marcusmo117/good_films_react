import React from 'react';
import Card from '../movie-card/MovieCard';
import { Container, Row } from 'react-bootstrap';
import styles from './MovieSection.css'

function MovieSection(props) {

  const getMovie = props.section;
  
  const listMovies = getMovie.map((movie)=> (<Card key={movie.id} movieDetails={movie}/>));

  return(
    <div className="movie-section">
      <Container>
        <Row>
          <h3>{props.title}</h3>
          <div>{listMovies}</div>
        </Row>
      </Container>
    </div>
  )

}

export default MovieSection;