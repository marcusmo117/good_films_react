import React, { useEffect, useState } from "react";
import apis from "../../utils/profile";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import ErrorPage from "../error-page/ErrorPage";
import FollowUnfollowButton from "./FollowUnfollowButton";
import jwt_decode from "jwt-decode";

function ProfilePage() {
  const params = useParams();
  const profileInViewUsername = params.username;

  const [errorMsg, setErrorMsg] = useState(null);
  const [profile, setProfile] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const token = "Bearer " + localStorage.getItem("user_token");
  const currentUserUsername = jwt_decode(token).data.username;

  useEffect(() => {
    const fetchProfile = async (type, username) => {
      let profileResult;
      try {
        profileResult = await apis.getProfile(username, token);
        if (type === "profileInView") {
          setProfile(profileResult.data);
        } else {
          setCurrentUserProfile(profileResult.data);
        }
      } catch (err) {
        setErrorMsg(err.response.data.error);
        console.log("errormsg", errorMsg);
      }
    };
    fetchProfile("profileInView", profileInViewUsername);
    fetchProfile("currentUser", currentUserUsername);
  }, []);

  useEffect(() => {
    if (Object.keys(profile).length && Object.keys(currentUserProfile).length) {
      if (currentUserProfile.followees.includes(profile.username)) {
        setIsFollowing(true);
      }
    }
  }, [profile, currentUserProfile]);

  const updateFollowing = async (type) => {
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
      updateFollowing("follow");
      setIsFollowing(true);
      return;
    }
    if (e.target.innerText === "Unfollow") {
      updateFollowing("unfollow");
      setIsFollowing(false);
      return;
    }
  };

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
            <FollowUnfollowButton
              isFollowing={isFollowing}
              updateFollowStatus={updateFollowStatus}
            />
          )}
          <h5 className="mt-5">
            Following {profile.followees && profile.followees.length} user(s)
          </h5>
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
