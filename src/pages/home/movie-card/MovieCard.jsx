import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import styles from './MovieCard.scss'
import { BorderClear } from '@mui/icons-material';

function MovieCard(props) {

  const { id, poster_path, vote_average } = props.movieDetails;
 
  return (
      <Link to={`/movies/${id}`}>
        <Card className="bg-dark text-white" style={{ margin: '0.5rem', width: "10rem" }}>
          <Card.Img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="movie poster" />
          <Card.ImgOverlay>
            <Card.Text>Average Score: {vote_average}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Link>
  );
}

export default MovieCard;