import { BASE_URL, MOVIES_URL } from "./constants";

export function getJson(res) {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`)
}

const getHeader = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
  }
}

export function getMovies() {
  return fetch(MOVIES_URL, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
  })
  .then((res) => getJson(res))
}

export function getSavedMovies() {
  return fetch(BASE_URL + "/movies", {
  method: 'GET',
  headers: getHeader()
  })
  .then((res) => getJson(res))
}

export function saveMovie(movie) {
  return fetch(BASE_URL + "/movies", {
  method: 'POST',
  headers: getHeader(),
  body: JSON.stringify({ 
    "nameRU": movie.nameRU,
    "nameEN": movie.nameEN,
    "country": movie.country,
    "director": movie.director,
    "duration": movie.duration,
    "year": movie.year,
    "description": movie.description,
    "image": `https://api.nomoreparties.co${movie.image.url}`,
    "trailerLink": movie.trailerLink,
    "thumbnail": `https://api.nomoreparties.co${movie.image.previewUrl}`,
    "movieId": movie.id
    })
  }) 
  .then((res) => getJson(res))
}

export function deleteMovie(id) {
  return fetch(BASE_URL + "/movies/" + id, {
    method: 'DELETE',
    headers: getHeader(),
  })
  .then(res => getJson(res));
}



