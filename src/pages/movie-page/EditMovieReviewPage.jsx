import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MoviePage.scss";
import movieApis from "../../utils/movie";
import reviewApis from "../../utils/review";
import EditMovieReview from "./EditMovieReview";
import { Tooltip } from "@mui/material";


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
      tagline,
      averageRatingGF,
      numRatings,
    } = movie;
    console.log(movie);
  
    return (
      <div className="movie-page">
        <Container>
          <Row>
            <Col md={4}>
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie-poster"></img>
            </Col>
            <Col md={8}>
              <div className="movie-page-title">
                <h1>{name ? name : title}</h1>
                <Tooltip title="Release date" placement="top">
                  <span><i class="fa-regular fa-calendar"></i>{release_date}</span>
                </Tooltip>
                <Tooltip title="Duration" placement="top">
                  <span><i class="fa-regular fa-clock"></i>{runtime} mins</span>
                </Tooltip>
              </div>
                <h5>{tagline}</h5>
                <p>{overview}</p>
              <div><EditMovieReview review = {review} /></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}
  
export default EditMovieReviewPage;