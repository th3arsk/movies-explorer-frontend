import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

import useFilter from '../../../utils/useFilter';
import { useStore } from 'react-admin';

function MoviesCardList() {
  const [ savedMovies, setSavedMovies ] = useStore('saved-movies', []);
  const [result, setResult] = useStore('result', '');
  const filteredMovies = useFilter(savedMovies, result)
  const movieCount = filteredMovies.length;
  
  return (
    <ul className="movie-list">
      { movieCount === 0 ?
      <p>Ничего не найдено</p>
       :
        filteredMovies.map((movie) => (
          <MoviesCard movie={movie} key={movie.movieId} />
        ))
      }
    </ul>  
  );
}

export default MoviesCardList;