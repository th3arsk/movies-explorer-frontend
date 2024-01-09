import './App.css'
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../utils/ProtectedRoute';

import { signIn, signUp, checkToken, getUserInfo, editUserInfo } from '../../utils/MainApi';
import { getSavedMovies, getMovies, saveMovie } from '../../utils/MoviesApi';
import useFilter from '../../utils/useFilter';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';

import { 
  LARGE_WIDTH,
  MEDIUM_WIDTH,
  CARD_COUNT_MAX,
  CARD_COUNT_MEDIUM,
  CARD_COUNT_MIN,
  ADDED_COUNT_MAX,
  ADDED_COUNT_MEDIUM,
  ADDED_COUNT_MIN,
} from '../../utils/constants';

function App() {
  const [ currentUser, setCurrentUser ] = React.useState({ });
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ movies, setMovies ] =  React.useState([]);
  const [ isLoading, setLoading ] = React.useState(false);
  const [ displayCount, setDisplayCount ] = React.useState(CARD_COUNT_MAX);
  const [ addCount, setAddCount ] = React.useState(ADDED_COUNT_MAX);

  const navigate = useNavigate();
  const filteredMovies = useFilter(movies, localStorage.getItem("moviesSearch"), localStorage.getItem("moviesCheckbox"));
  const filteredSavedMovies = useFilter(savedMovies, localStorage.getItem("savedMoviesSearch"), localStorage.getItem("savedMoviesCheckbox"));

  React.useEffect(()=>{
    console.log(movies)
  }, [movies])
  
  React.useEffect(()=> { 
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
       // localStorage.setItem("savedMovies", JSON.stringify(res));
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }, [savedMovies])

  React.useEffect(()=>{
    setLoading(true)
    getMovies()
      .then((res) => {
        setMovies(res)
        //localStorage.setItem("movies", JSON.stringify(res));
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {setLoading(false)})
    }, [loggedIn])

  React.useEffect(() => {
    const screenWidth = window.screen.width;

    if (screenWidth > LARGE_WIDTH) {
      setDisplayCount(CARD_COUNT_MAX);
      setAddCount(ADDED_COUNT_MAX);
    } else if (LARGE_WIDTH < screenWidth < MEDIUM_WIDTH) {
      setDisplayCount(CARD_COUNT_MEDIUM);
      setAddCount(ADDED_COUNT_MEDIUM);
    } else {
      setDisplayCount(CARD_COUNT_MIN);
      setAddCount(ADDED_COUNT_MIN);
    }
  }, [])
  
  function handleMore() {
    setDisplayCount(displayCount + addCount);
  }

  function handleSave(movie) {
    saveMovie(movie)
    .catch(err => console.log(`Ошибка.....: ${err}`)) 
  }

  React.useEffect(() => {  
    if (localStorage.getItem('jwt')) {
      checkToken()
      .then((res) => {
        if (res._id) {
          setLoggedIn(true)
        } else {
          navigate("/signin", { replace: true })
          setLoggedIn(false)
        }
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    }
  });

  React.useEffect(() => { 
    getUserInfo()
     .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    }, []);

  function login( email, password ) {
    signIn( email, password ) 
    .then((res) => {
      if (res.token) {
        localStorage.setItem("moviesSearch", "")
        localStorage.setItem("savedMoviesSearch", "")
        localStorage.setItem("moviesCheckbox", false)
        localStorage.setItem("savedMoviesCheckbox", false)
        setLoggedIn(true)
        navigate("/movies", { replace: true })
      } else {
        Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function auth(name, email, password) {
    signUp(name, email, password )
    .then((res) => {
      if (res.name) {  
        login( email, password )
      } else {
        Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function logout() {
    setLoggedIn(false);
    window.location.reload();
    localStorage.clear();
  }

  function edit( name, email ) {
    editUserInfo(name, email)
    .then((res) => {
      setCurrentUser(res);
      alert("Сохранено");
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser} >
        <Routes >
          <Route path='/signin' element={<Login onLogin={login} />}/>
          <Route path='/signup' element={<Register onAuth={auth} />}/>
          <Route path='*' element={<Error />}/>
          <Route path='/' element={ 
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
          }/>
         <Route path="/movies" element={
           <ProtectedRoute 
              loggedIn={loggedIn} 
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
                  count={displayCount}
                  onMore={handleMore}
                  onSave={handleSave}
                />
                <Footer />     
              </>
            }/>  
          }/> 
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn} element={
              <>
                <Header 
                  isLoggedIn={loggedIn} 
                  light={true} 
                  moviesOpened={false}
                  savedMoviesOpened={true} 
                  mainOpened={false}
                />
                <SavedMovies
                  movies={filteredSavedMovies}
                />
                <Footer />     
              </>
            } />  
          } /> 
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn} element={
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
                  email={currentUser.email}
                  name={currentUser.name}
                />
              </>
            }/>  
          }/> 
        </Routes >
      </CurrentUserContext.Provider >
    </div>
  );
}

export default App;