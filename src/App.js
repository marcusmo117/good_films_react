import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import TrendingMovies from "./components/movie/trending/TrendingMovies";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import AuthExample from "./components/Login/AuthExample";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/movies" element={<TrendingMovies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthExample />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
