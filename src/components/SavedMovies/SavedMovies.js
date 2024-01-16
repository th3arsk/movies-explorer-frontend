import React from "react";

import "./SavedMovies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import filter from "../../utils/flter";

function SavedMovies(props) {
  const [checkboxSavedMovies, setCheckboxSavedMovies] = React.useState(false);
  const [searchQuerySavedMovies, setSearchQuerySavedMovies] =
    React.useState("");
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  React.useEffect(() => {
    if (props.savedMovies.length) {
      const filtered = filter(
        props.savedMovies,
        searchQuerySavedMovies,
        checkboxSavedMovies
      );
      setFilteredSavedMovies(filtered);
    }
  }, [props.savedMovies, searchQuerySavedMovies, checkboxSavedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        search={searchQuerySavedMovies}
        setSearch={setSearchQuerySavedMovies}
        checkbox={checkboxSavedMovies}
        setCheckbox={setCheckboxSavedMovies}
        isSavedMovies={true}
        isLoading={props.isLoading}
      />
      <MoviesCardList
        onRemoveMovie={props.onRemoveMovie}
        movies={filteredSavedMovies}
      />
    </main>
  );
}

export default SavedMovies;
