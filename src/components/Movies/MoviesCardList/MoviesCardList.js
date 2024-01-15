import "./MoviesCardList.css";
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import {
  BIG_LARGE_WIDTH,
  LARGE_WIDTH,
  MEDIUM_WIDTH,
  CARD_COUNT_MAX,
  CARD_COUNT_MEDIUM,
  CARD_COUNT_MIN,
  ADDED_COUNT_MAX,
  ADDED_COUNT_LARGE,
  ADDED_COUNT_MEDIUM,
  ADDED_COUNT_MIN,
} from "../../../utils/constants";

function MoviesCardList(props) {
  const moviesCount = props.movies.length;

  const [displayCount, setDisplayCount] = React.useState(CARD_COUNT_MAX);
  const [addCount, setAddCount] = React.useState(ADDED_COUNT_MAX);
  const [width, setWidth] = React.useState(window.innerWidth);

  setTimeout(() => {
    window.addEventListener("resize", setWidth(window.innerWidth));
  }, 500);

  React.useEffect(() => {
    if (width >= BIG_LARGE_WIDTH) {
      setDisplayCount(CARD_COUNT_MAX);
      setAddCount(ADDED_COUNT_MAX);
    } else if (width >= LARGE_WIDTH) {
      setDisplayCount(CARD_COUNT_MAX);
      setAddCount(ADDED_COUNT_LARGE);
    } else if (width >= MEDIUM_WIDTH) {
      setDisplayCount(CARD_COUNT_MEDIUM);
      setAddCount(ADDED_COUNT_MEDIUM);
    } else {
      setDisplayCount(CARD_COUNT_MIN);
      setAddCount(ADDED_COUNT_MIN);
    }
  }, [width]);

  const handleMore = () => {
    console.log(addCount);
    setDisplayCount(displayCount + addCount);
  };

  return (
    <section className="movies__container">
      <ul className="movies__list">
        {moviesCount === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          props.movies
            .slice(0, displayCount)
            .map((movie) => (
              <MoviesCard
                movie={movie}
                savedMovies={props.savedMovies}
                key={movie.id}
                onAddMovie={props.onAddMovie}
                onRemoveMovie={props.onRemoveMovie}
              />
            ))
        )}
      </ul>
      {displayCount >= moviesCount ? (
        ""
      ) : (
        <button className="movies__more" onClick={handleMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
