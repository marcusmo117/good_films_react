import React, { useEffect, useState } from "react";
import apis from "../../utils/profile";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import ErrorPage from "../../components/error-page/ErrorPage";
import FollowingModal from "./FollowingModal";
import FollowUnfollowButton from "./FollowUnfollowButton";
import SearchUsers from "./SearchUsers";
import jwt_decode from "jwt-decode";
import { CircularProgress } from "@mui/material";

function ProfilePage() {
  const params = useParams();
  // const [profileInViewUsername, setProfileInViewUsername] = useState(params.username);
  const [profile, setProfile] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [followeeOptions, setFolloweeOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  // useEffect(() => {
  //   setProfileInViewUsername(params.username);
  // }, [params.username]);

  useEffect(() => {
    const fetchProfile = async (type, username) => {
      try {
        const profileResult = await apis.getProfile(username, token);
        if (type === "profileInView") {
          setProfile(profileResult.data);
        } else {
          setCurrentUserProfile(profileResult.data);
        }
      } catch (err) {
        setErrorMsg(err.response.data.error);
      }
    };
    const fetchAllUsers = async () => {
      try {
        const profilesResult = await apis.getProfiles(token);
        setFolloweeOptions(profilesResult.data.map((profile) => profile.username));
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    // setIsFollowing(false);
    fetchProfile("profileInView", params.username);
    fetchProfile("currentUser", currentUserUsername);
    fetchAllUsers();
  }, [params.username]);

  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }

  return (
    <div className="profile-page">
      <Container>
        <h1>Profile</h1>
        <Row className="d-flex justify-content-center mb-5">
          <Col xs={3}>
            <SearchUsers
              followeeOptions={followeeOptions}
              profileInViewUsername={params.username}
            />
          </Col>
        </Row>

        <div className="profile mt-5">
          <img src={`https://avatars.dicebear.com/api/avataaars/${profile.username}.svg?size=80&radius=50`}></img>
          <h2>{profile.username}</h2>
          {!profile.isCurrentUser && (
            <FollowUnfollowButton
              profileInViewUsername={params.username}
              currentUserProfile={currentUserProfile}
              setCurrentUserProfile={setCurrentUserProfile}
            />
          )}
          <FollowingModal followees={profile.followees} profileInViewUsername={params.username} page={"profile-page"} />
          <h5>Watched {profile.reviews && profile.reviews.length} film(s)</h5>
        </div>
        { !profile.reviews ? 
          (
            <CircularProgress />
          )
          :
          (
            <div className="reviews">
              {profile.reviews &&
                profile.reviews.map((review) => (
                  <ReviewCard key={review._id} reviewId={review._id} page={"profile-page"} />
                ))}
            </div>
          )
        }
        {/* <div className="reviews">
          {profile.reviews &&
            profile.reviews.map((review) => (
              <ReviewCard key={review._id} reviewId={review._id} page={"profile-page"} />
            ))}
        </div> */}
      </Container>
    </div>
  );
}

export default ProfilePage;
