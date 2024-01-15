import "./App.css";
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";

import { signIn, signUp, getUserInfo, editUserInfo } from "../../utils/MainApi";
import {
  getSavedMovies,
  getMovies,
  saveMovie,
  deleteMovie,
} from "../../utils/MoviesApi";

import filter from "../../utils/flter";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";
import Popup from "../Popup/Popup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [searchQueryAllMovies, setSearchQueryAllMovies] = React.useState(
    localStorage.getItem("moviesSearch") ?? ""
  );
  const [searchQuerySavedMovies, setSearchQuerySavedMovies] = React.useState(
    localStorage.getItem("savedMoviesSearch") ?? ""
  );
  const [checkboxAllMovies, setCheckboxAllMovies] = React.useState(
    JSON.parse(localStorage.getItem("moviesCheckbox")) ?? false
  );
  const [checkboxSavedMovies, setCheckboxSavedMovies] = React.useState(
    JSON.parse(localStorage.getItem("savedMoviesCheckbox")) ?? false
  );
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [textNotify, setTextNotify] = React.useState("");
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (searchQueryAllMovies && movies.length === 0) {
      setLoading(true);
      getMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem("movies", JSON.stringify(res));
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`))
        .finally(() => setLoading(false));
    }
  }, [searchQueryAllMovies]);

  React.useEffect(() => {
    if (movies.length) {
      const filtered = filter(movies, searchQueryAllMovies, checkboxAllMovies);
      setFilteredMovies(filtered);
    }
  }, [movies, searchQueryAllMovies, checkboxAllMovies]);

  React.useEffect(() => {
    if (savedMovies.length) {
      const filtered = filter(
        savedMovies,
        searchQuerySavedMovies,
        checkboxSavedMovies
      );
      setFilteredSavedMovies(filtered);
    }
  }, [savedMovies, searchQuerySavedMovies, checkboxSavedMovies]);
  const token = localStorage.getItem("jwt");

  React.useEffect(() => {
    setLoading(true);
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [loggedIn]);

  React.useEffect(() => {
    setLoading(true);
    getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [loggedIn]);

  function login(email, password) {
    setLoading(true);
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("moviesSearch", "");
          localStorage.setItem("savedMoviesSearch", "");
          localStorage.setItem("moviesCheckbox", false);
          localStorage.setItem("savedMoviesCheckbox", false);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(() => {
        setTextNotify("Произошла ошибка при авторизации");
        setIsOpenPopup(true);
      })
      .finally(() => setLoading(false));
  }

  function auth(name, email, password) {
    setLoading(true);
    signUp(name, email, password)
      .then((res) => {
        if (res.name) {
          login(email, password);
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(() => {
        setTextNotify("Произошла ошибка при авторизации");
        setIsOpenPopup(true);
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    setLoggedIn(false);
    window.location.reload();
    localStorage.clear();
  }

  function edit(name, email) {
    setLoading(true);
    editUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        alert("Сохранено");
      })
      .catch(() => {
        setTextNotify("Произошла ошибка при обновлении профиля");
        setIsOpenPopup(true);
      })
      .finally(() => setLoading(false));
  }

  function handleAddMovie(movie) {
    if (savedMovies.find((m) => m.movieId === movie.id)) {
      return;
    }
    setLoading(true);
    saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(() => {
        setTextNotify("Произошла ошибка при добавлении фильма");
        setIsOpenPopup(true);
      })
      .finally(() => setLoading(false));
  }

  function handleRemoveSavedMovie(movieId) {
    setLoading(true);
    deleteMovie(movieId)
      .then((removedMovie) => {
        const newSaveMovieList = savedMovies.filter(
          (card) => card._id !== removedMovie._id
        );
        setSavedMovies(newSaveMovieList);
      })
      .catch(() => {
        setTextNotify("Произошла ошибка при удалении фильма");
        setIsOpenPopup(true);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="App">
      {isLoading && <Preloader />}

      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signin"
            element={loggedIn ? <Navigate to="/" /> : <Login onLogin={login} />}
          />
          <Route
            path="/signup"
            element={
              loggedIn ? <Navigate to="/" /> : <Register onAuth={auth} />
            }
          />
          <Route path="*" element={<Error />} />
          <Route
            path="/"
            element={
              <>
                <Header
                  isLoggedIn={loggedIn}
                  light={false}
                  moviesOpened={false}
                  savedMoviesOpened={false}
                  mainOpened={true}
                />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                token={token}
                element={
                  <>
                    <Header
                      isLoggedIn={loggedIn}
                      light={true}
                      moviesOpened={true}
                      savedMoviesOpened={false}
                      mainOpened={false}
                    />
                    <Movies
                      movies={filteredMovies}
                      savedMovies={savedMovies}
                      isLoading={isLoading}
                      search={searchQueryAllMovies}
                      setSearch={setSearchQueryAllMovies}
                      checkbox={checkboxAllMovies}
                      setCheckbox={setCheckboxAllMovies}
                      onAddMovie={handleAddMovie}
                      onRemoveMovie={handleRemoveSavedMovie}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                token={token}
                element={
                  <>
                    <Header
                      isLoggedIn={loggedIn}
                      light={true}
                      moviesOpened={false}
                      savedMoviesOpened={true}
                      mainOpened={false}
                    />
                    <SavedMovies
                      isLoading={isLoading}
                      movies={filteredSavedMovies}
                      search={searchQuerySavedMovies}
                      setSearch={setSearchQuerySavedMovies}
                      checkbox={checkboxSavedMovies}
                      setCheckbox={setCheckboxSavedMovies}
                      onRemoveMovie={handleRemoveSavedMovie}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                token={token}
                element={
                  <>
                    <Header
                      isLoggedIn={loggedIn}
                      light={true}
                      moviesOpened={false}
                      savedMoviesOpened={false}
                      mainOpened={false}
                    />
                    <Profile
                      onExit={logout}
                      onEdit={edit}
                      isLoading={isLoading}
                    />
                  </>
                }
              />
            }
          />
        </Routes>
        <Popup
          isOpen={isOpenPopup}
          setPopupOpened={setIsOpenPopup}
          textNotify={textNotify}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
