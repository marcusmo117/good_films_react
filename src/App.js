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
import MoviesByGenre from "./components/home/index/MoviesByGenre";
import Logout from "./components/logout/Logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/movies" element={<Index />} />
        <Route path="/movies/:movieApiId" element={<MoviePage />} />
        <Route path="/movies/:genre/:genreId" element={<MoviesByGenre />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles/:username" element={<Auth component={ProfilePage} />} />
        <Route path="/auth" element={<AuthExample />} />
        <Route path="/auth-fe" element={<Auth component={FeAuthExample} />} />
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
