import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Index from "./components/home/index/Index";
import ErrorPage from "./components/error-page/ErrorPage";
import MoviePage from "./components/movie-page/MoviePage";
import ProfilePage from "./components/profile-page/ProfilePage";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import AuthExample from "./components/login/AuthExample";
import FeAuthExample from "./components/auth/FeAuthExample";
import Auth from "./components/auth/Auth";
import Guest from "./components/auth/Guest";
import MoviesByGenre from "./components/home/index/MoviesByGenre";
import Logout from "./components/logout/Logout";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 
        Guest:user logged in, redirect to /
              user logged out, show component
        
        Auth: user logged in, show component
              user logged out, redirect to /login
        
        Neither: show component regardless 
        */}
        {/* TODO:
        Landing: user logged in, redirect to /userfeed
                 user logged out, redirect to /movies */}
        <Route path="/" element={<Index />} />
        <Route path="/movies" element={<Index />} />
        <Route path="/movies/:movieApiId" element={<MoviePage />} />
        <Route path="/movies/:genre/:genreId" element={<MoviesByGenre />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
        <Route path="/profiles/:username" element={<Auth component={ProfilePage} />} />
        <Route path="/auth" element={<Auth component={AuthExample} />} />
        {/* <Route path="/auth-fe" element={<Auth component={FeAuthExample} />} /> */}
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
