import './App.css'
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../contexts/ProtectedRoute';
import { signIn, signUp, checkToken, getUserInfo, editUserInfo } from '../../utils/MainApi';
import { getSavedMovies } from '../../utils/MoviesApi'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';

import { useStore } from 'react-admin';

function App() {
  const [ currentUser, setCurrentUser ] = React.useState({ });
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const navigate = useNavigate();
  const [ savedMovies, setSavedMovies ] = useStore('saved-movies', []);

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

  React.useEffect(()=>{ 
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    }, [])

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
                <Movies />
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
                <SavedMovies />
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