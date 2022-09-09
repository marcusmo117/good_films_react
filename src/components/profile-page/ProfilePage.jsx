import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const token = "Bearer " + localStorage.getItem("user_token");

  useEffect(() => {
    const fetchProfile = async () => {
      const profileResult = await axios.get(
        `http://localhost:8000/api/v1/profiles/${params.username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProfile(profileResult.data);
    };

    fetchProfile();
  }, []);

  const reviews =
    profile.reviews &&
    profile.reviews.map((review) => <ReviewCard key={review._id} data={review} />);

  return (
    <div className="profile">
      <Container>
        <h1>Profile</h1>
        <h2 className="mb-5">{profile.username}</h2>
        {reviews}
      </Container>
    </div>
  );
}

export default ProfilePage;
