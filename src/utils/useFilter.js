import { SHORT_DURATION } from './constants';

function useFilter(movies, result, checkbox, isLoggedIn) {
  const filterByShorts = (movies) => {
    if( isLoggedIn ) {
      const filteredMovies = movies.filter((m) => m.duration <= SHORT_DURATION);
      return filteredMovies
    }
  }

  const filterByName = (movies) => {
    if( isLoggedIn ) {
      const filteredMovies = movies.filter((m) =>
      m.nameRU.toLowerCase().includes(result.toLowerCase()) || m.nameEN.toLowerCase().includes(result.toLowerCase())
      );
      return filteredMovies
    }
  }

  const filtered = filterByName(movies)
  const shortMovies = filterByShorts(filtered) 

  if(checkbox === "true") {
    return shortMovies
  } else {
    return filtered
  }
}

export default useFilter;