import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const moviesCount = props.movies.length;

  return (
    <section className="movies__container">
      <ul className="movies__list">
      {
        ( moviesCount === 0 ) ? 
        <p>Ничего не найдено</p>
        :
        props.movies.slice(0, props.count).map((movie) => (
          <MoviesCard
            movie={movie}
            savedMovies={props.savedMovies}
            onSave={props.onSave}
            key={movie.id} 
          />
        ))  
      }
      </ul> 
      {(props.count >= moviesCount ) ? "" : <button className="movies__more" onClick={props.onMore}>Ещё</button>}
    </section> 
  );
}

export default MoviesCardList;