import "./SavedMovies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <main className="saved-movies">
      <SearchForm
        search={props.search}
        setSearch={props.setSearch}
        checkbox={props.checkbox}
        setCheckbox={props.setCheckbox}
        isSavedMovies={true}
        isLoading={props.isLoading}
      />
      <MoviesCardList
        onRemoveMovie={props.onRemoveMovie}
        movies={props.movies || []}
      />
    </main>
  );
}

export default SavedMovies;
