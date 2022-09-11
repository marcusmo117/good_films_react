import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoutComp from "../logout/Logout";

function AuthExample() {
  const [data, setData] = useState({});
  const token = "Bearer " + localStorage.getItem("user_token");
  const navigate = useNavigate();

  const fetchData = async () => {
    const results = await axios.get("http://localhost:8000/api/v1/users/auth", {
      headers: {
        Authorization: token,
      },
    });
    setData(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="auth-example">
      <h3>authorised</h3>
      <h3>account email: {data.data && data.data.data.email}</h3>
      <h3>account username: {data.data && data.data.data.username}</h3>
      <LogoutComp />
    </div>
  );
}

export default AuthExample;
