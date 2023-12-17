import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import React from 'react';
import Preloader from '../../Preloader/Preloader';

import useFilter from '../../../utils/useFilter';
import { useStore } from 'react-admin';

function MoviesCardList() {
  const [ savedMovies, setSavedMovies ] = useStore('saved-movies', []);
  const [ preloader, setPreloader ] = React.useState(true);
  const [result, setResult] = useStore('result', '');
  const filteredMovies = useFilter(savedMovies, result)
  
  return (
    <ul className="movie-list">
      {
        filteredMovies.map((movie) => (
          <MoviesCard movie={movie} key={movie.movieId} />
        ))
      }
      <div className={`movie-list__preloader ${ preloader ? "movie-list__preloader_visible" : ""}`}>
        <Preloader />
      </div>
    </ul>  
  );
}

export default MoviesCardList;