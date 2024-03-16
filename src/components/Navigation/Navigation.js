import './Navigation.css';
import { Link } from "react-router-dom";
import React from 'react';

function Navigation(props) {
  const [ opened, setOpened ] = React.useState(false)

  return (
    <section className="navigation">
      <div className="navigation__container">
        <Link className={`navigation__link ${ props.moviesOpened ? "navigation__link_active" : "navigation__link_inactive"}`} to="/movies">Фильмы</Link>
        <Link className={`navigation__link ${ props.savedMoviesOpened ? "navigation__link_active" : "navigation__link_inactive"}`} to="/saved-movies">Сохранённые фильмы</Link>
        <Link className="navigation__profile navigation__link" to="/profile">
          <p className="">Аккаунт</p>
          <div className={`navigation__profile-logo ${ props.light ? "navigation__profile-logo_light" : "navigation__profile-logo_dark"}`}>
            {
            props.light ? 
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43004 7.96749C8.79146 7.40521 9.74951 6.06449 9.74951 4.5C9.74951 2.42893 8.07058 0.75 5.99951 0.75C3.92844 0.75 2.24951 2.42893 2.24951 4.5C2.24951 6.06451 3.20759 7.40525 4.56904 7.96751C3.17474 8.19979 1.89215 8.76573 0.808105 9.58019L2.18966 11.419C3.25095 10.6217 4.56849 10.1496 5.99961 10.1496C7.43073 10.1496 8.74828 10.6217 9.80957 11.419L11.1911 9.58019C10.107 8.7657 8.82439 8.19975 7.43004 7.96749Z" fill="black"/>
            </svg>
            :
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43053 7.96749C8.79195 7.40521 9.75 6.06449 9.75 4.5C9.75 2.42893 8.07107 0.75 6 0.75C3.92893 0.75 2.25 2.42893 2.25 4.5C2.25 6.06451 3.20808 7.40525 4.56953 7.96751C3.17523 8.19979 1.89263 8.76573 0.808594 9.58019L2.19015 11.419C3.25143 10.6217 4.56898 10.1496 6.0001 10.1496C7.43122 10.1496 8.74877 10.6217 9.81006 11.419L11.1916 9.58019C10.1075 8.7657 8.82488 8.19975 7.43053 7.96749Z" fill="#F3C1F8"/>
            </svg>
            }  
          </div>
        </Link>  
      </div>
      <div className="navigation__popup-container">
        <button className="navigation__bttn" onClick={()=>{setOpened(true)}} type="button">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 14L8 14V11L36 11V14Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 24L8 24V21L36 21V24Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 34L8 34V31L36 31V34Z" fill="black"/>
          </svg>
        </button>
        <div className={`navigation__popup ${ opened ? "navigation__popup_opened" : "" }`}>
          <button className="navigation__close navigation__bttn" onClick={()=>{setOpened(false)}} type="button">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7.16064" y="9.28247" width="3" height="22" transform="rotate(-45 7.16064 9.28247)" fill="black"/>
            <rect x="22.7173" y="7.16113" width="3" height="22" transform="rotate(45 22.7173 7.16113)" fill="black"/>
           </svg>
          </button>
            <div className="navigation__links">
              <Link className={`navigation__link ${ props.mainOpened ? "navigation__link_active" : "navigation__link_inactive"}`} to="/">Главная</Link>
              <Link className={`navigation__link ${ props.moviesOpened ? "navigation__link_active" : "navigation__link_inactive"}`} to="/movies">Фильмы</Link>
              <Link className={`navigation__link ${ props.savedMoviesOpened ? "navigation__link_active" : "navigation__link_inactive"}`} to="/saved-movies">Сохранённые фильмы</Link>
            </div>
          <Link className="navigation__profile navigation__link" to="/profile">
          <p className="">Аккаунт</p>
          <div className="navigation__profile-logo navigation__profile-logo_light">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43004 7.96749C8.79146 7.40521 9.74951 6.06449 9.74951 4.5C9.74951 2.42893 8.07058 0.75 5.99951 0.75C3.92844 0.75 2.24951 2.42893 2.24951 4.5C2.24951 6.06451 3.20759 7.40525 4.56904 7.96751C3.17474 8.19979 1.89215 8.76573 0.808105 9.58019L2.18966 11.419C3.25095 10.6217 4.56849 10.1496 5.99961 10.1496C7.43073 10.1496 8.74828 10.6217 9.80957 11.419L11.1911 9.58019C10.107 8.7657 8.82439 8.19975 7.43004 7.96749Z" fill="black"/>
            </svg>
          </div>
        </Link>  
        </div>
      </div>
    </section>
  );
}

export default Navigation;    