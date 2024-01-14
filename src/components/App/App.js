import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";

import { signIn, signUp, getUserInfo, editUserInfo } from "../../utils/MainApi";
import { getSavedMovies, getMovies } from "../../utils/MoviesApi";
import useFilter from "../../utils/useFilter";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const filteredMovies = useFilter(
    movies,
    localStorage.getItem("moviesSearch"),
    localStorage.getItem("moviesCheckbox")
  );
  const filteredSavedMovies = useFilter(
    savedMovies,
    localStorage.getItem("savedMoviesSearch"),
    localStorage.getItem("savedMoviesCheckbox")
  );

  const token = localStorage.getItem("jwt");

  React.useEffect(() => {
    console.log(loggedIn);
    // if (token) {
    //   setLoggedIn(true);
    // } else {
    //   navigate("/signin", { replace: true });
    //   setLoggedIn(false);
    // }
  }, [loggedIn]);

  React.useEffect(() => {
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, [loggedIn]);

  React.useEffect(() => {
    setLoading(true);
    getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, [loggedIn]);

  function login(email, password) {
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
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function auth(name, email, password) {
    signUp(name, email, password)
      .then((res) => {
        if (res.name) {
          login(email, password);
        } else {
          Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function logout() {
    setLoggedIn(false);
    window.location.reload();
    localStorage.clear();
  }

  function edit(name, email) {
    editUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        alert("Сохранено");
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/signin" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Register onAuth={auth} />} />
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
                    <SavedMovies movies={filteredSavedMovies} />
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
                    <Profile onExit={logout} onEdit={edit} />
                  </>
                }
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
