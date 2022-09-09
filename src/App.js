import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Index from "./components/home/index/Index";
import MoviePage from "./components/movie-page/MoviePage";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import AuthExample from "./components/login/AuthExample";
import FeAuthExample from "./components/auth/FeAuthExample";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/movies" element={<Index />} />
        <Route path="/movies/:movieApiId" element={<MoviePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthExample />} />
        <Route path="/auth-fe" element={<Auth component={FeAuthExample} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
