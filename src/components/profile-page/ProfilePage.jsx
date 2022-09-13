import React, { useEffect, useState } from "react";
import apis from "../../utils/profile";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import ErrorPage from "../error-page/ErrorPage";
import FollowingModal from "./FollowingModal";
import FollowUnfollowButton from "./FollowUnfollowButton";
import SearchUsers from "./SearchUsers";
import jwt_decode from "jwt-decode";

function ProfilePage() {
  const params = useParams();
  const [profileInViewUsername, setProfileInViewUsername] = useState(params.username);
  const [errorMsg, setErrorMsg] = useState(null);
  const [profile, setProfile] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [followeeOptions, setFolloweeOptions] = useState([]);

  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  useEffect(() => {
    setProfileInViewUsername(params.username);
  }, [params.username]);

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
    fetchProfile("profileInView", profileInViewUsername);
    fetchProfile("currentUser", currentUserUsername);
    fetchAllUsers();
  }, [profileInViewUsername]);

  useEffect(() => {
    if (Object.keys(profile).length && Object.keys(currentUserProfile).length) {
      if (currentUserProfile.followees.includes(profile.username)) {
        setIsFollowing(true);
      }
    }
  }, [profile, currentUserProfile]);

  const updateFollowingBackend = async (type) => {
    try {
      const followee = profileInViewUsername;
      await apis.updateFollowing(followee, token, type);
      toast.success(`${type} ${followee} successful!`);
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };

  const updateFollowStatus = (e) => {
    if (e.target.innerText === "Follow") {
      updateFollowingBackend("follow");
      setIsFollowing(true);
      return;
    }
    updateFollowingBackend("unfollow");
    setIsFollowing(false);
    return;
  };

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
              profileInViewUsername={profileInViewUsername}
            />
          </Col>
        </Row>

        <div className="profile mt-5">
          <h2>{profile.username}</h2>
          {!profile.isCurrentUser && (
            <FollowUnfollowButton
              profileInViewUsername={profileInViewUsername}
              isFollowing={isFollowing}
              updateFollowStatus={updateFollowStatus}
            />
          )}
          <FollowingModal
            followees={profile.followees}
            profileInViewUsername={profileInViewUsername}
          />
          <h5>Watched {profile.reviews && profile.reviews.length} film(s)</h5>
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
