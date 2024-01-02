import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {
  const moviesCount = props.movies.length;

  return (
    <section className="movies__container">
      <ul className="movies__list">
      {
        (props.count === 0) ? 
        (props.isLoading ? <Preloader /> : <p>Ничего не найдено</p>)
        :
        props.movies.slice(0, props.count).map((movie) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))  
      }
      </ul> 
      {(props.count >= moviesCount) ? "" : <button className="movies__more" onClick={props.onMore}>Ещё</button>}
    </section> 
  );
}

export default MoviesCardList;