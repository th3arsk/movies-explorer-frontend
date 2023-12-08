import './Register.css';
import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="register">
      <form className="register__form">
        <Link className="register__logo" to="/">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="black"/>
          </svg>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <fieldset className="register__fieldset">
          <div className="register__label">Имя
            <input className="register__input" name="name" id="name" />
            <label className="register__error" for="name">Что-то пошло не так...</label>
          </div>
          <div className="register__label">E-mail
            <input className="register__input" name="email" id="email" />
            <label className="register__error" for="email">Что-то пошло не так...</label>
          </div>
          <div className="register__label">Пароль
            <input className="register__input register__input_incorrect" name="password" id="password" type="password"/>
            <label className="register__error register__error_active" for="password">Что-то пошло не так...</label>
          </div>
          <button className="register__bttn" type="submit">Зарегистрироваться</button>
          <p className="register__question">Уже зарегистрированы?
           <Link className="register__span" to="/signin"> Войти</Link>
          </p>
        </fieldset> 
      </form>
    </main>
  );
}

export default Register;