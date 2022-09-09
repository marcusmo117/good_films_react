import React, { useEffect, useState } from "react";
import apis from "../../utils/backend/profile";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const token = "Bearer " + localStorage.getItem("user_token");

  useEffect(() => {
    const fetchProfile = async () => {
      const profileResult = await apis.getProfile(params.username, token);
      setProfile(profileResult.data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile">
      <Container>
        <h1>Profile</h1>
        <h2 className="mb-5">{profile.username}</h2>
        {profile.reviews &&
          profile.reviews.map((review) => <ReviewCard key={review._id} data={review} />)}
      </Container>
    </div>
  );
}

export default ProfilePage;
