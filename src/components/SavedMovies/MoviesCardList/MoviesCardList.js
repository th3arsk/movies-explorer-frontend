import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getSavedMovies, deleteMovie, getJson } from '../../../utils/MoviesApi'
import React from 'react';
import Preloader from '../../Preloader/Preloader';

import useFilter from '../../../utils/useFilter';

function MoviesCardList() {
  const [ movies, setMovies ] = React.useState([]);
  const [ preloader, setPreloader ] = React.useState(true);
  
  React.useEffect(()=>{
    getSavedMovies()
      .then(setPreloader(true))
      .then((res) => getJson(res))
      .then((res) => {
        setMovies(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(setPreloader(false))
  }, [])

  return (
    <ul className="movie-list">
      {
        useFilter(movies).map((movie) => (
          <MoviesCard movie={movie} onDelete={deleteMovie} key={movie.movieId} />
        ))
      }
      <div className={`movie-list__preloader ${ preloader ? "movie-list__preloader_visible" : ""}`}>
        <Preloader />
      </div>
    </ul>  
  );
}

export default MoviesCardList;