import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm
        search={props.search}
        setSearch={props.setSearch}
        checkbox={props.checkbox}
        setCheckbox={props.setCheckbox}
        isSavedMovies={false}
        isLoading={props.isLoading}
      />

      <MoviesCardList
        onAddMovie={props.onAddMovie}
        onRemoveMovie={props.onRemoveMovie}
        movies={props.movies}
        savedMovies={props.savedMovies}
        isLoadedAllMovies={props.isLoadedAllMovies}
        search={props.search}
      />
    </main>
  );
}

export default Movies;
