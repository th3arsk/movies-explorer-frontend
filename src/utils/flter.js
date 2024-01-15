import { SHORT_DURATION } from "./constants";

function filter(movies, query, checkbox) {
  const result = query || "";

  const filterByShorts = (movies) => {
    const filteredMovies = movies.filter((m) => m.duration <= SHORT_DURATION);
    return filteredMovies;
  };

  const filterByName = (movies) => {
    const filteredMovies = movies.filter(
      (m) =>
        m.nameRU.toLowerCase().includes(result.toLowerCase()) ||
        m.nameEN.toLowerCase().includes(result.toLowerCase())
    );
    return filteredMovies;
  };

  const filtered = filterByName(movies);
  const shortMovies = filterByShorts(filtered);

  if (checkbox) {
    return shortMovies;
  } else {
    return filtered;
  }
}

export default filter;
