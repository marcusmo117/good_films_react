import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './TrendingMovies.css'

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies ] = useState({})

  const fetchTrendingMovies = async () => {
    const results = await axios.get('http://localhost:8000/api/v1/movies')
    setTrendingMovies(results)
  }
  console.log(trendingMovies.data)

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return(
    <div className='movieindex'>
      <h3>Trending</h3>
      <div>
      {trendingMovies.data?.map(movie => 
      <div className='trendingmovie'>
        {movie.name ? (movie.name) : (movie.title)}
      </div>)
      }
      </div>

    </div>
  )
}

export default TrendingMovies