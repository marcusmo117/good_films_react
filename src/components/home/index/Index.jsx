import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieSection from '../movie-section/MovieSection';
import styles from './Index.scss'

function Index() {
  const [popularMovies, setPopularMovies ] = useState({})
  const [topMovies, setTopMovies] = useState({})

  const fetchMovies = async () => {
    const popular = await axios.get('http://localhost:8000/api/v1/movies/popular')
    const top = await axios.get('http://localhost:8000/api/v1/movies/top_rated')
    setPopularMovies(popular)
    setTopMovies(top)
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return(
    <div className="section">
      <h1>Browse Movies</h1>
      <div className="popular">{
        popularMovies.data && (
          <MovieSection section={popularMovies.data.results} title="Popular" />
        )}
      </div>
      <div className="section">{
        topMovies.data && (
          <MovieSection section={topMovies.data.results} title="Top Rated" />
        )}
      </div>
    </div>
  )

}

export default Index;