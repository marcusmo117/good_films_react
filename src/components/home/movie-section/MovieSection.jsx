import React from 'react';
import Card from '../movie-card/MovieCard';
import styles from './MovieSection.scss'

function MovieSection(props) {

  const getMovie = props.section;
  
  const listMovies = getMovie.map((movie)=> (<Card key={movie.id} movieDetails={movie}/>));

  return(
    <div className={styles['movie-section']}>
      <h3>{props.title}</h3>
        <div className='d-flex flex-row justify-content-left'>{listMovies}</div>
    </div>
  )

}

export default MovieSection;