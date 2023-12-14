import './App.css'
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../contexts/ProtectedRoute';
import { signIn, signUp, checkToken, getUserInfo, editUserInfo } from '../../utils/MainApi';

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
  const navigate = useNavigate();

  React.useEffect(() => { handleTokenCheck() }, []);

  React.useEffect(() => {
    getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    }, 
  );

  function auth(name, email, password) {
    signUp(name, email, password )
    .then((res) => {
       if (res) {  
        navigate("/signin") 
      } else {
        Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          navigate("/movies")
        } else {
          navigate("/signin")
        }
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));;
    }
  }

  function login( email, password ) {
    console.log( email, password )
    signIn( email, password ) 
    .then(() => {
      navigate("/movies")
      setLoggedIn(true)
    })
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  function logout() {
    setLoggedIn(false);
    window.location.reload();
    localStorage.removeItem('jwt');
  }

  function edit( name, email ) {
    editUserInfo(name, email)
    .then(res => {
      setCurrentUser(res);
      console.log(res);
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
                  name={currentUser.name} 
                  email={currentUser.email}
                  onExit={logout}
                  onEdit={edit}
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