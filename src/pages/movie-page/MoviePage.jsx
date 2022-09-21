import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./MoviePage.scss";
import movieApis from "../../utils/movie";
import reviewApis from "../../utils/review";
import MovieReview from "./MovieReview";
import ReviewCard from "../profile-page/ReviewCard";
import ErrorPage from "../../components/error-page/ErrorPage";
import { CircularProgress } from "@mui/material";

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
  } = movie;

  console.log("Movie:", movie);
  console.log("Review:", existingReview);
  console.log("Date:", reviewDate);
  console.log("MovieReviews:", userReviews);
  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }
  return (
    <div className="movie">
      { !poster_path ?
        (
          <CircularProgress />
        )
        :
        (
          <Container>
            <h1>{name ? name : title}</h1>
            <Row>
              <Col md={3}>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`}></img>
              </Col>
              <Col md={9}>
                <p>Overview: {overview}</p>
                <p>Release Date: {release_date}</p>
                <p>Duration: {runtime}</p>
                <p>TMD Average Vote Score: {vote_average}</p>
                <p>TMD No. of Votes: {vote_count}</p>
                <p>Good Films Average Vote Score: {averageRatingGF}</p>
                <p>Good Films No. of Votes: {numRatings}</p>

                <div>
                  <h5>Rate and review this movie</h5>
                  {!tokenExists ? 
                  (
                    "Sign in to rate and review movie."
                  ) :
                  (
                    <MovieReview token={token} existingReview={existingReview} reviewDate={reviewDate} />
                  )
                  }
                </div>

                <div className="user-reviews">
                  { userReviews === undefined ? (
                    "There are no user reviews available for this movie."
                  ) : (
                    userReviews.map((review) => (
                    <ReviewCard key={review._id} reviewId={review._id} page={"movie-page"} />
                    ))
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
