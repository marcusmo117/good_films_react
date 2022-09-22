import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MoviePage.scss";
import movieApis from "../../utils/movie";
import reviewApis from "../../utils/review";
import MovieReview from "./MovieReview";
import ReviewCard from "../profile-page/ReviewCard";
import ErrorPage from "../../components/error-page/ErrorPage";
import { CircularProgress, Tooltip } from "@mui/material";

function MoviePage() {
  const params = useParams();
  const token = "Bearer " + localStorage.getItem("user_token");
  const tokenExists = localStorage.getItem("user_token");
  // const [movieInViewApiId, setMovieInViewApiId] = useState(params.movieApiId);
  const [movie, setMovie] = useState({});
  const [existingReview, setExistingReview] = useState({});
  const [reviewDate, setReviewDate] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   setMovieInViewApiId(params.movieApiId);
  // }, [params.movieApiId]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResult = await movieApis.getMovie(params.movieApiId);
        const ourMovieResult = await movieApis.getOurMovie(params.movieApiId);
        console.log("our movie result", ourMovieResult);
        let averageRating = "No votes yet!";
        let reviewIdsWithRating = [];

        if (Object.keys(ourMovieResult.data).length) {
          averageRating = ourMovieResult.data.averageRating;
          if (averageRating === 0) {
            averageRating = "No votes yet!";
          }
          reviewIdsWithRating = ourMovieResult.data.reviewIds.filter((review) => review.rating);
        }

        setMovie({
          ...movieResult.data,
          averageRatingGF: averageRating,
          numRatings: reviewIdsWithRating.length,
        });
      } catch (err) {
        setErrorMsg(err.response.data.error);
      }
    };

    const fetchUserReviews = async () => {
      const ourMovieResult = await movieApis.getOurMovie(params.movieApiId);
      setUserReviews(ourMovieResult.data.reviewIds);
    };

    const fetchExistingReview = async () => {
      const reviewResults = await reviewApis.getReviewFromMovieAndUser(params.movieApiId, token);
      setExistingReview(reviewResults.data);
      setReviewDate([reviewResults.data.updatedAt.slice(0, 10)]);
    };

    fetchMovie();
    fetchExistingReview();
    fetchUserReviews();
  }, [params.movieApiId]);

  const {
    id,
    name,
    title,
    poster_path,
    popularity,
    release_date,
    runtime,
    overview,
    vote_average,
    vote_count,
    averageRatingGF,
    numRatings,
    tagline,
  } = movie;

  // console.log("Movie:", movie);
  // console.log("Review:", existingReview);
  // console.log("Date:", reviewDate);
  // console.log("MovieReviews:", userReviews);

  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }
  return (
    <div className="movie-page">
      { !poster_path ?
        (
          <CircularProgress />
        )
        :
        (
          <Container>
            <Row>
              <Col md={4}>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`}></img>
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
                <Row>
                  <Col md={8}>
                    <h5>{tagline}</h5>
                    <p>{overview}</p>
                  </Col>
                  <Col md={4}>
                    <div className="movie-page-movie-rating">
                      <h6>TMD</h6>
                      <p>Average Vote Score: {vote_average}</p>
                      <p>No. of Votes: {vote_count}</p>
                      <h6>Good Films</h6>
                      <p>Average Vote Score: {averageRatingGF}</p>
                      <p>No. of Votes: {numRatings}</p>
                    </div>
                  </Col>
                </Row>
                <div className="movie-page-reviews">
                  <h3>Your Review</h3>
                  {!tokenExists ? 
                  (
                    "Sign in to review and see reviews from other users."
                  )
                  :
                  ( 
                  <div className="movie-page-reviews">
                    <MovieReview token={token} existingReview={existingReview} reviewDate={reviewDate} />
                    <h3>User Reviews</h3>
                    <div>
                      {!userReviews? 
                      (
                        "There are no user reviews available for this movie."
                      )
                      :
                      (
                        userReviews.map((review) => (
                        <ReviewCard key={review._id} reviewId={review._id} page={"movie-page"} />
                        ))
                      )
                      }
                    </div>
                  </div>
                  )
                  }
                </div>
              </Col>
            </Row>
          </Container>
        )
      }
    </div>
  );
}

export default MoviePage;
