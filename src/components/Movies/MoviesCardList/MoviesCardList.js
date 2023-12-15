import './MoviesCardList.css';
import React from 'react';
import { useStore } from 'react-admin';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

import { getMovies, saveMovie, getJson } from '../../../utils/MoviesApi'
import useFilter from '../../../utils/useFilter';

function MoviesCardList() {
  const [ movies, setMovies ] = useStore('movies', []);
  const [ moviesCount, setMoviesCount ] = React.useState(12);
  const [ addCount, setAddCount ] = React.useState(3);
  const [ preloader, setPreloader ] = React.useState(true);
 
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesCount(12);
      setAddCount(3);
    } else if (screenWidth >= 600) {
      setMoviesCount(8);
      setAddCount(2);
    } else {
      setMoviesCount(5);
      setAddCount(1);
    }
  }
  
  React.useEffect(()=>{
    getMovies()
      .then(setPreloader(true))
      .then((res) => getJson(res))
      .then((res) => {
        setMovies(res)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(setPreloader(false));

    checkWindowWidth();

  }, [])

  function handleMore() {
    setMoviesCount(moviesCount + addCount);
    console.log(moviesCount)
    console.log(window.screen.width)
  }

  return (
    <section className="movies__container">
      <ul className="movies__list">
      {
        useFilter(movies).slice(0, moviesCount).map((movie) => (
          <MoviesCard movie={movie} onSave={saveMovie} key={movie.id} />
        ))  
      }
      { preloader ? <Preloader />: '' }  
      </ul> 
      { (moviesCount >= 100) ? "" : <button className="movies__more" onClick={handleMore}>Ещё</button> }
    </section>
    
  );
}

export default MoviesCardList;