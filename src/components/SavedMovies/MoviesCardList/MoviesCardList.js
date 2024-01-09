import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';


function MoviesCardList(props) {
  const movieCount = props.movies.length ;
  
  return (
    <ul className="movie-list">
      { movieCount === 0 ?
      <p>Ничего не найдено</p>
       :
       props.movies.map((movie) => (
          <MoviesCard movie={movie} key={movie.movieId} />
        ))
      }
    </ul>  
  );
}

export default MoviesCardList;