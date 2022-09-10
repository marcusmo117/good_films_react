import React, { useEffect, useState } from "react";
import apis from "../../utils/backend/profile";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import ErrorPage from "../error-page/ErrorPage";

function ProfilePage() {
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState(null);
  const [profile, setProfile] = useState({});
  const token = "Bearer " + localStorage.getItem("user_token");

  useEffect(() => {
    const fetchProfile = async () => {
      let profileResult;
      try {
        profileResult = await apis.getProfile(params.username, token);
        setProfile(profileResult.data);
      } catch (err) {
        setErrorMsg(err.response.data.error);
        console.log("errormsg", errorMsg);
      }
    };

    fetchProfile();
  }, []);

  const handleFollow = () => {};

  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }
  return (
    <div className="profile-page">
      <Container>
        <h1>Profile</h1>
        <div className="profile mb-5">
          <h2>{profile.username}</h2>
          {!profile.isCurrentUser && (
            <button className="btn btn-success" type="button" onClick={handleFollow}>
              Follow
            </button>
          )}

          <h5 className="mt-5">xxx follower(s)</h5>
          <h5>{profile.reviews && profile.reviews.length} movie(s)</h5>
        </div>
        <div className="reviews">
          {profile.reviews &&
            profile.reviews.map((review) => <ReviewCard key={review._id} reviewDetails={review} />)}
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
