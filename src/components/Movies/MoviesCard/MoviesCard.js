import './MoviesCard.css';
import React from 'react';
import { useStore } from 'react-admin';
import { deleteMovie, saveMovie } from '../../../utils/MoviesApi';

function MoviesCard(props) {
  const [ savedMovies, setSavedMovies ] = useStore('saved-movies', []);
  const hours = Math.floor(props.movie.duration / 60);
  const minutes = props.movie.duration % 60;
  const url = `https://api.nomoreparties.co` + props.movie.image.url;
  const findedMovie = savedMovies.find((movie) => movie.movieId === props.movie.id)

  function handleSave() {
    saveMovie(props.movie)
    .catch(err => console.log(`Ошибка.....: ${err}`)) 
  }
  
  function handleDelete() {
    const id = findedMovie._id
    deleteMovie(id)
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }   
 
  return (
    <li className="movie-card">{
      findedMovie ? 
        <button className="movie-card__saved-logo" onClick={handleDelete}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="21" rx="10.5" fill="#FF4062"/>
            <path d="M6.5 10.35L9.31905 12.6L14.5 8.09998" stroke="white" stroke-width="1.3"/>
          </svg>  
        </button>
        :
        <button className="movie-card__save">
          <svg className="movie-card__save-logo" onClick={handleSave} width="72" height="21" viewBox="0 0 72 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="72" height="21" rx="10.5" fill="#F9F9F9"/>
            <path d="M16.5415 9H15.6609C15.6088 8.74669 15.5176 8.52415 15.3874 8.33239C15.2596 8.14062 15.1033 7.97964 14.9187 7.84943C14.7364 7.71686 14.534 7.61742 14.3114 7.55114C14.0889 7.48485 13.8569 7.4517 13.6154 7.4517C13.1751 7.4517 12.7762 7.56297 12.4187 7.78551C12.0636 8.00805 11.7807 8.33594 11.57 8.76918C11.3616 9.20241 11.2575 9.7339 11.2575 10.3636C11.2575 10.9934 11.3616 11.5249 11.57 11.9581C11.7807 12.3913 12.0636 12.7192 12.4187 12.9418C12.7762 13.1643 13.1751 13.2756 13.6154 13.2756C13.8569 13.2756 14.0889 13.2424 14.3114 13.1761C14.534 13.1098 14.7364 13.0116 14.9187 12.8814C15.1033 12.7488 15.2596 12.5866 15.3874 12.3949C15.5176 12.2008 15.6088 11.9782 15.6609 11.7273H16.5415C16.4753 12.099 16.3545 12.4316 16.1793 12.7251C16.0041 13.0187 15.7863 13.2685 15.5259 13.4744C15.2655 13.678 14.9731 13.8331 14.6488 13.9396C14.3268 14.0462 13.9824 14.0994 13.6154 14.0994C12.9951 14.0994 12.4435 13.9479 11.9606 13.6449C11.4776 13.3419 11.0977 12.911 10.8207 12.3523C10.5437 11.7936 10.4052 11.1307 10.4052 10.3636C10.4052 9.59659 10.5437 8.93371 10.8207 8.375C11.0977 7.81629 11.4776 7.38542 11.9606 7.08239C12.4435 6.77936 12.9951 6.62784 13.6154 6.62784C13.9824 6.62784 14.3268 6.68111 14.6488 6.78764C14.9731 6.89418 15.2655 7.05043 15.5259 7.25639C15.7863 7.45999 16.0041 7.70857 16.1793 8.00213C16.3545 8.29332 16.4753 8.62595 16.5415 9ZM20.0669 14.1136C19.5745 14.1136 19.1425 13.9964 18.7708 13.7621C18.4015 13.5277 18.1126 13.1998 17.9043 12.7784C17.6983 12.357 17.5953 11.8646 17.5953 11.3011C17.5953 10.733 17.6983 10.237 17.9043 9.81321C18.1126 9.38944 18.4015 9.06037 18.7708 8.82599C19.1425 8.59162 19.5745 8.47443 20.0669 8.47443C20.5594 8.47443 20.9902 8.59162 21.3596 8.82599C21.7312 9.06037 22.0201 9.38944 22.226 9.81321C22.4344 10.237 22.5385 10.733 22.5385 11.3011C22.5385 11.8646 22.4344 12.357 22.226 12.7784C22.0201 13.1998 21.7312 13.5277 21.3596 13.7621C20.9902 13.9964 20.5594 14.1136 20.0669 14.1136ZM20.0669 13.3608C20.441 13.3608 20.7488 13.2649 20.9902 13.0732C21.2317 12.8814 21.4105 12.6293 21.5265 12.3168C21.6425 12.0043 21.7005 11.6657 21.7005 11.3011C21.7005 10.9366 21.6425 10.5968 21.5265 10.282C21.4105 9.96709 21.2317 9.71259 20.9902 9.51847C20.7488 9.32434 20.441 9.22727 20.0669 9.22727C19.6929 9.22727 19.3851 9.32434 19.1436 9.51847C18.9022 9.71259 18.7234 9.96709 18.6074 10.282C18.4914 10.5968 18.4334 10.9366 18.4334 11.3011C18.4334 11.6657 18.4914 12.0043 18.6074 12.3168C18.7234 12.6293 18.9022 12.8814 19.1436 13.0732C19.3851 13.2649 19.6929 13.3608 20.0669 13.3608ZM24.2182 8.54545L25.525 10.7756L26.8319 8.54545H27.7978L26.0364 11.2727L27.7978 14H26.8319L25.525 11.8835L24.2182 14H23.2523L24.9853 11.2727L23.2523 8.54545H24.2182ZM28.9936 16.0455V8.54545H29.8033V9.41193H29.9027C29.9643 9.31723 30.0495 9.1965 30.1584 9.04972C30.2696 8.90057 30.4283 8.76799 30.6342 8.65199C30.8426 8.53362 31.1243 8.47443 31.4794 8.47443C31.9387 8.47443 32.3435 8.58925 32.6939 8.81889C33.0443 9.04853 33.3177 9.37405 33.5142 9.79545C33.7107 10.2169 33.8089 10.714 33.8089 11.2869C33.8089 11.8646 33.7107 12.3653 33.5142 12.7891C33.3177 13.2105 33.0455 13.5372 32.6974 13.7692C32.3494 13.9988 31.9482 14.1136 31.4936 14.1136C31.1432 14.1136 30.8627 14.0556 30.652 13.9396C30.4413 13.8213 30.2791 13.6875 30.1655 13.5384C30.0518 13.3868 29.9643 13.2614 29.9027 13.1619H29.8317V16.0455H28.9936ZM29.8175 11.2727C29.8175 11.6847 29.8778 12.0481 29.9986 12.3629C30.1193 12.6754 30.2957 12.9205 30.5277 13.098C30.7597 13.2732 31.0438 13.3608 31.38 13.3608C31.7304 13.3608 32.0227 13.2685 32.2571 13.0838C32.4938 12.8968 32.6714 12.6458 32.7898 12.331C32.9105 12.0137 32.9709 11.661 32.9709 11.2727C32.9709 10.8892 32.9117 10.5436 32.7933 10.2358C32.6773 9.92566 32.5009 9.68063 32.2642 9.50071C32.0298 9.31842 31.7351 9.22727 31.38 9.22727C31.0391 9.22727 30.7526 9.31368 30.5206 9.48651C30.2886 9.65696 30.1134 9.89607 29.995 10.2038C29.8767 10.5092 29.8175 10.8655 29.8175 11.2727ZM36.6925 14.1278C36.3468 14.1278 36.0331 14.0627 35.7514 13.9325C35.4697 13.8 35.246 13.6094 35.0803 13.3608C34.9145 13.1098 34.8317 12.8068 34.8317 12.4517C34.8317 12.1392 34.8932 11.8859 35.0163 11.6918C35.1394 11.4953 35.304 11.3414 35.5099 11.2301C35.7159 11.1188 35.9432 11.036 36.1918 10.9815C36.4427 10.9247 36.6948 10.8797 36.9482 10.8466C37.2796 10.804 37.5483 10.772 37.7543 10.7507C37.9626 10.727 38.1141 10.688 38.2088 10.6335C38.3059 10.5791 38.3544 10.4844 38.3544 10.3494V10.321C38.3544 9.97064 38.2585 9.69839 38.0668 9.50426C37.8774 9.31013 37.5897 9.21307 37.2038 9.21307C36.8037 9.21307 36.4901 9.30066 36.2628 9.47585C36.0355 9.65104 35.8757 9.83807 35.7834 10.0369L34.9879 9.75284C35.13 9.4214 35.3194 9.16335 35.5561 8.97869C35.7952 8.79167 36.0556 8.66146 36.3374 8.58807C36.6214 8.51231 36.9008 8.47443 37.1754 8.47443C37.3506 8.47443 37.5518 8.49574 37.7791 8.53835C38.0088 8.5786 38.2301 8.66264 38.4432 8.79048C38.6586 8.91832 38.8374 9.11127 38.9794 9.36932C39.1214 9.62737 39.1925 9.97301 39.1925 10.4062V14H38.3544V13.2614H38.3118C38.255 13.3797 38.1603 13.5064 38.0277 13.6413C37.8951 13.7763 37.7188 13.8911 37.4986 13.9858C37.2784 14.0805 37.0097 14.1278 36.6925 14.1278ZM36.8203 13.375C37.1518 13.375 37.4311 13.3099 37.6584 13.1797C37.888 13.0495 38.0608 12.8814 38.1768 12.6754C38.2952 12.4695 38.3544 12.2528 38.3544 12.0256V11.2585C38.3189 11.3011 38.2408 11.3402 38.12 11.3757C38.0017 11.4089 37.8643 11.4384 37.7081 11.4645C37.5542 11.4882 37.4039 11.5095 37.2571 11.5284C37.1127 11.545 36.9955 11.5592 36.9055 11.571C36.6877 11.5994 36.4841 11.6456 36.2947 11.7095C36.1077 11.7711 35.9562 11.8646 35.8402 11.9901C35.7266 12.1132 35.6697 12.2812 35.6697 12.4943C35.6697 12.7855 35.7775 13.0057 35.9929 13.1548C36.2107 13.3016 36.4865 13.375 36.8203 13.375ZM44.3727 10.8892V11.6705H41.3613V10.8892H44.3727ZM41.5602 8.54545V14H40.7221V8.54545H41.5602ZM45.0119 8.54545V14H44.1738V8.54545H45.0119ZM47.3805 12.7642L50.0083 8.54545H50.9743V14H50.1362V9.78125L47.5225 14H46.5424V8.54545H47.3805V12.7642ZM51.767 9.3267V8.54545H56.1989V9.3267H54.4091V14H53.571V9.3267H51.767ZM58.1458 10.5199H59.7083C60.3475 10.5199 60.8364 10.6821 61.1749 11.0064C61.5134 11.3307 61.6827 11.7415 61.6827 12.2386C61.6827 12.5653 61.6069 12.8625 61.4554 13.13C61.3039 13.3951 61.0814 13.607 60.7878 13.7656C60.4943 13.9219 60.1344 14 59.7083 14H57.4213V8.54545H58.2594V13.2188H59.7083C60.0397 13.2188 60.312 13.1312 60.525 12.956C60.7381 12.7808 60.8446 12.5559 60.8446 12.2812C60.8446 11.9924 60.7381 11.7569 60.525 11.5746C60.312 11.3923 60.0397 11.3011 59.7083 11.3011H58.1458V10.5199Z" fill="black"/>
          </svg>
      </button>
      }
      <a 
        href={props.movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img className="movie-card__image" src={url} alt={`Обложка ${props.movie.nameRU}`}/>
      </a>
      <div className="movie-card__info">
        <h2 className="movie-card__name">{props.movie.nameRU}</h2>
        <p className="movie-card__duration">{`${hours}ч ${minutes}м`}</p>
      </div>
    </li>
  );
}

export default MoviesCard;

