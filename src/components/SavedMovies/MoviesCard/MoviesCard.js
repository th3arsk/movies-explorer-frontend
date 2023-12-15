import './MoviesCard.css';

function MoviesCard(props) {
  const hours = Math.floor(props.movie.duration / 60);
  const minutes = props.movie.duration % 60;

  function handleDelete(e) {
    props.onDelete(props.movie._id)
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }

  return (
    <li className="movie-card">
      <button className="movie-card__close" onClick={e => handleDelete(e)}>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="21" height="21" rx="10.5" fill="#F9F9F9"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 11.4429L12.857 13.7999L13.9177 12.7393L11.5607 10.3822L13.7999 8.14295L12.7393 7.08229L10.5 9.32155L8.26086 7.08241L7.2002 8.14307L9.43934 10.3822L7.08241 12.7391L8.14307 13.7998L10.5 11.4429Z" fill="black"/>
        </svg>
      </button>
      <a 
        href={props.movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img className="movie-card__image" src={props.movie.image} alt={`Обложка ${props.movie.image}`}/>
      </a>
      <div className="movie-card__info">
        <h2 className="movie-card__name">{props.movie.nameRU}</h2>
        <p className="movie-card__duration">{`${hours}ч ${minutes}м`}</p>
      </div>
    </li>
  );
}

export default MoviesCard;