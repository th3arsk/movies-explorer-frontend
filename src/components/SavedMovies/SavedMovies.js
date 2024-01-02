import './SavedMovies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm'

function SavedMovies(props) {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={props.movies} />
    </main>
  );
}

export default SavedMovies;