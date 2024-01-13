import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      { props.isLoading ? <Preloader /> : 
      <MoviesCardList 
        movies={props.movies}
        savedMovies={props.savedMovies}
      />} 
    </main>
  );
}

export default Movies;