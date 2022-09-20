import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

// Pages
import Index from "./pages/home/index/Index";
import MoviePage from "./pages/movie-page/MoviePage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import ReviewPage from "./pages/review-page/ReviewPage";
import EditMovieReviewPage from "./pages/movie-page/EditMovieReviewPage";
import MoviesByGenre from "./pages/home/index/MoviesByGenre";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import UserFeedPage from "./pages/user-feed-page/UserFeedPage";

// Components
import ErrorPage from "./components/error-page/ErrorPage";
import Auth from "./components/auth/Auth";
import Guest from "./components/auth/Guest";
import Landing from "./components/auth/Landing";
import Navibar from "./components/navbar/Navbar";

function App() {
  const [tokenState, setTokenState] = useState();
  const [user, setUser] = useState();

  const getToken = async () => {
    const token = await localStorage.getItem("user_token");
    setTokenState(token);
    if (tokenState) {
      setUser(jwt_decode(tokenState).data.username);
    }
  };

  useEffect(() => {
    getToken();
  }, [tokenState]);

  return (
    <div className="App">
      {/* lifting state */}
      <Navibar tokenState={tokenState} user={user} setTokenState={setTokenState} />
      <Routes>
        {/* 
        Guest: user logged in, redirect to /
              user logged out, show component
        
        Auth: user logged in, show component
              user logged out, redirect to /login
        
        Neither: show component regardless 
        */}
        {/* TODO:
        Landing: user logged in, redirect to /userfeed
                 user logged out, redirect to /movies */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<UserFeedPage />} />
        <Route path="/movies" element={<Index />} />
        <Route path="/movies/:movieApiId" element={<MoviePage />} />
        <Route path="/movies/:genre/:genreId" element={<MoviesByGenre />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route
          path="/login"
          element={<Guest component={Login} setTokenState={setTokenState} user={user} />}
        />
        <Route path="/profiles/:username" element={<Auth component={ProfilePage} />} />
        <Route path="/reviews/:reviewId" element={<Auth component={ReviewPage} />} />
        <Route path="/reviews/:reviewId/edit" element={<Auth component={EditMovieReviewPage} />} />
        {/* <Route path="/auth" element={<Auth component={AuthExample} />} /> */}
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
