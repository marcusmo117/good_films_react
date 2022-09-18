import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MoviePage.scss";
import movieApis from "../../utils/movie";
import reviewApis from "../../utils/review";
import EditMovieReview from "./EditMovieReview";

function EditMovieReviewPage() {
    const token = "Bearer " + localStorage.getItem("user_token")
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [review, setReview] = useState({});

  
    useEffect(() => {
        const fetchReview = async () => {
            const reviewResult = await reviewApis.getReview(params.reviewId, token);
            setReview(reviewResult.data);
          };

  
        fetchReview()
    }, []);


    useEffect(() => {
        const fetchMovie = async () => {
            const movieResult = await movieApis.getMovie(review.movieId.movieApiId);
            setMovie(movieResult.data);
        };

        fetchMovie();
    }, [review])

    console.log("Review:", review)
  
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
    console.log(movie);
  
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
              <div><EditMovieReview review = {review} /></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}
  
export default EditMovieReviewPage;