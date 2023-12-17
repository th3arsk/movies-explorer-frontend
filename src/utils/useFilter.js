import { useStore } from 'react-admin';

function useFilter(movies, result) {
  const [isShort, setShort] = useStore('short-film', false);
 // const [result, setResult] = useStore('result', '');

  const filterByShorts = (movies) => {
    const filteredMovies = movies.filter((m) => m.duration <= 40);
    return filteredMovies
   }

  const filterByName = (movies) => {
    const filteredMovies = movies.filter((m) =>
       m.nameRU.toLowerCase().includes(result.toLowerCase()) || m.nameEN.toLowerCase().includes(result.toLowerCase())
    );

    return filteredMovies
  }

  const filtered = filterByName(movies)
  const shortMovies = filterByShorts(filtered) 

  if(isShort) {
    return shortMovies
  } else {
    return filtered
  }
}

export default useFilter;