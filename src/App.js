import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import TrendingMovies from "./components/movie/trending/TrendingMovies";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/movies" element={<TrendingMovies />} />
      </Routes>
    </div>
  );
}

export default App;
