import './App.css'
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../contexts/ProtectedRoute';
import { signIn, signUp, checkToken, getUserInfo, editUserInfo } from '../../utils/MainApi';
import { getSavedMovies, getMovies } from '../../utils/MoviesApi';
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

function App() {
  const [ currentUser, setCurrentUser ] = React.useState({ });
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ movies, setMovies ] =  React.useState([]);
  const [ isLoading, setLoading ] = React.useState(false);
  const [ displayCount, setDisplayCount ] = React.useState(12);
  const [ addCount, setAddCount ] = React.useState(3);
  const result = localStorage.getItem("result")
  const filteredMovies = useFilter(movies, result);
  const navigate = useNavigate();

  React.useEffect(()=> { 
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }, [savedMovies])

  React.useEffect(()=>{
    setLoading(true)
    getMovies()
      .then((res) => {setMovies(res)})
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {setLoading(false)})
    }, [])

  React.useEffect(() => {
    const screenWidth = window.screen.width;

    if (screenWidth > 1000) {
      setDisplayCount(12);
      setAddCount(3);
    } else if (1000 < screenWidth < 800) {
      setDisplayCount(8);
      setAddCount(2);
    } else {
      setDisplayCount(5);
      setAddCount(1);
    }
  }, [])
  
  function handleMore() {
    setDisplayCount(displayCount + addCount);
  }

  React.useEffect(() => {  
    if (localStorage.getItem('jwt')) {
      checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true)
        } else {
          navigate("/signin")
        }
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    }
  }, []);

  React.useEffect(() => { 
    getUserInfo()
     .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    }, [ loggedIn === true ]);

  function login( email, password ) {
    signIn( email, password ) 
    .then((res) => {
      if (res.token) {
        localStorage.setItem("result", "")
        localStorage.setItem("checkbox", false)
        setLoggedIn(true)
        navigate("/movies")
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
    localStorage.removeItem('jwt');
    localStorage.removeItem("result");
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
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/signin' element={<Login onLogin={login} />}/>
          <Route path='/signup' element={<Register onAuth={auth} />}/>
          <Route path='/*' element={<Error />}/>
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
         <Route path='/movies' element={
           <ProtectedRoute loggedIn={loggedIn} element={
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
                  isLoading={isLoading}
                  count={displayCount}
                  onMore={handleMore}
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
                  movies={savedMovies}
                />
                <Footer />     
              </>
            }/>  
          }/> 
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
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;