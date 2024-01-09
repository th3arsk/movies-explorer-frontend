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
        count={props.count}
        onMore={props.onMore}
        onSave={props.onSave}
      />} 
    </main>
  );
}

export default Movies;