import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList 
        movies={props.movies}
        isLoading={props.isLoading}
        count={props.count}
        onMore={props.onMore}
      />
    </main>
  );
}

export default Movies;