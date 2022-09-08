import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Col} from 'react-bootstrap';

function MovieCard(props) {

  const { id, name, title, poster_path, vote_average } = props.movieDetails;

  return (
    <Col md={4}>
      <Link to={`/movies/${id}`}>
        <Card style={{ width: '12rem' }}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
          <Card.Body>
            <Card.Title>{name ? (name) : (title)}</Card.Title>
            <Card.Text>Average Score: {vote_average}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default MovieCard;