import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
  return (
    <div className='App'>
      <Routes>
      <Route path='/signin' element={<Login />}/>
        <Route path='/signup' element={<Register />}/>
        <Route path='/' element={
          <>
          <Header 
              isLoggedIn={true} 
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
          <>
            <Header 
              isLoggedIn={true} 
              light={true} 
              moviesOpened={true}
              savedMoviesOpened={false} 
              mainOpened={false}
            />
            <Movies />
            <Footer />
          </>
        }/> 
        <Route path='/saved-movies' element={
          <>
            <Header 
              isLoggedIn={true} 
              light={true}
              moviesOpened={false}
              savedMoviesOpened={true}  
              mainOpened={false}
            />
            <SavedMovies />
            <Footer />
          </>
        }/> 
        <Route path='/profile' element={
          <>
            <Header 
              isLoggedIn={true} 
              light={true}
              moviesOpened={false}
              savedMoviesOpened={false} 
              mainOpened={false}
            />
            <Profile />
          </>
        }/> 
        <Route path='/*' element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;