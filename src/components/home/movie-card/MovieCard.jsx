import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import styles from './MovieCard.scss'

function MovieCard(props) {

  const { id, poster_path, vote_average } = props.movieDetails;

  return (
    <div className='movie-card'>
      <Link to={`/movies/${id}`}>
        {/* <Card style={{ width: '12rem' }}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
          <Card.Body>
            <Card.Text>Average Score: {vote_average}</Card.Text>
          </Card.Body>
        </Card> */}
        <Card style={{ width: '12rem' }} className="bg-dark text-white">
          <Card.Img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" />
          <Card.ImgOverlay>
            <Card.Text>Average Score: {vote_average}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Link>

    </div>
  );
}

export default MovieCard;