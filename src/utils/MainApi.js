const BASE_URL = "https://api.th3arsk.diploma.nomoredomainsmonster.ru"
   
const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export function signUp(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  })
  .then((res) => getJson(res))
}

export function signIn( email, password ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then(((res) => getJson(res)))
  .then((res) => {
    localStorage.setItem('jwt', res.token);
    return res
  })
}

export function checkToken() {
  const token = localStorage.getItem('jwt');
  
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => getJson(res))
}

const getHeader = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
  }
}

export function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: getHeader()
  })
  .then((res) => getJson(res));
}

export function editUserInfo(name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: getHeader(),
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then((res) => getJson(res));
 }