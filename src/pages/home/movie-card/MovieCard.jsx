import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "./MovieCard.scss";
import { BorderClear } from "@mui/icons-material";

function MovieCard(props) {
  const { id, poster_path } = props.movieDetails;

  return (
    <div>
      <Link to={`/movies/${id}`}>
        <Card className="movie-card">
          <Card.Img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie poster" />
        </Card>
      </Link>
    </div>
  );
}

export default MovieCard;
