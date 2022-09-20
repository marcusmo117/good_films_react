import React, { useEffect, useState } from "react";
import apis from "../../utils/profile";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "../profile-page/ReviewCard";
import ErrorPage from "../../components/error-page/ErrorPage";
import jwt_decode from "jwt-decode";

function UserFeedPage() {
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [userFeedReviewIds, setUserFeedReviewIds] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  useEffect(() => {
    const fetchCurrentUserProfile = async (username) => {
      try {
        const profileResult = await apis.getProfile(username, token);
        setUserFeedReviewIds(profileResult.data.reviews);
        setCurrentUserProfile(profileResult.data);
      } catch (err) {
        setErrorMsg(err.response.data.error);
      }
    };

    fetchCurrentUserProfile(currentUserUsername);
  }, []);

  useEffect(() => {
    const fetchFolloweeReviewIds = async () => {
      const followeeReviewIds = await Promise.all(
        currentUserProfile.followees.map(async (followee) => {
          try {
            const profileResult = await apis.getProfile(followee, token);
            return profileResult.data.reviews;
          } catch (err) {
            toast.error(err.response.data.error);
          }
        })
      );
      setUserFeedReviewIds([...userFeedReviewIds, ...followeeReviewIds].flat());
    };

    if (Object.keys(currentUserProfile).length) {
      if (currentUserProfile.followees) {
        fetchFolloweeReviewIds();
      }
    }
  }, [currentUserProfile]);

  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }

  return (
    <div className="user-feed-page">
      <Container>
        <div className="reviews">
          {userFeedReviewIds &&
            userFeedReviewIds
              .sort((reviewA, reviewB) => {
                return new Date(reviewB.createdAt) - new Date(reviewA.createdAt);
              })
              .map((review) => (
                <ReviewCard key={review._id} reviewId={review._id} page={"user-feed-page"} />
              ))}
        </div>
      </Container>
    </div>
  );
}

export default UserFeedPage;
