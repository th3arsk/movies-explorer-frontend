import './MoviesCardList.css';
import React from 'react';
import { useStore } from 'react-admin';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

import { getMovies } from '../../../utils/MoviesApi'
import useFilter from '../../../utils/useFilter';

function MoviesCardList() {
  const [ movies, setMovies ] =  React.useState([]);
  const [ displayCount, setDisplayCount ] = React.useState(12);
  const [ addCount, setAddCount ] = React.useState(3);
  const [ isLoading, setLoading ] = React.useState(true);

  const result = localStorage.getItem("result")
  const filteredMovies = useFilter(movies, result);
  const moviesCount = filteredMovies.length;

  React.useEffect(()=>{
    setLoading(true)
    getMovies()
      .then((res) => {setMovies(res)})
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {setLoading(false)})
    }, [])

  React.useEffect(()=>{
    checkWindowWidth();
  })
 
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth > 1000) {
      setDisplayCount(12);
      setAddCount(3);
    } else if (1000 < screenWidth < 800) {
      setDisplayCount(8);
      setAddCount(2);
    } else {
      setDisplayCount(5);
      setAddCount(1);
    }
  }
  
  function handleMore() {
    setDisplayCount(displayCount + addCount);
  }

  return (
    <section className="movies__container">
      <ul className="movies__list">
      {
        ( moviesCount === 0 ) ? 
        (isLoading ? <Preloader /> : <p>Ничего не найдено</p>)
        :
        filteredMovies.slice(0, displayCount).map((movie) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))  
      }
      </ul> 
      { (displayCount >= moviesCount) ? "" : <button className="movies__more" onClick={handleMore}>Ещё</button> }
    </section>
    
  );
}

export default MoviesCardList;