import './Login.css';
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="login">
      <form className="login__form">
        <Link className="login__logo" to="/">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="black"/>
          </svg>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <fieldset className="login__fieldset">
          <label className="login__label" for="email">E-mail
            <input className="login__input login__input_incorrect" name="email" />
            <p className="login__error login__error_active">Что-то пошло не так...</p>
          </label>
          <label className="login__label" for="password">Пароль
            <input className="login__input" name="password" type="password"/>
            <p className="login__error">Что-то пошло не так...</p>
          </label>
          <button className="login__bttn" type="submit">Войти</button>
          <p className="login__question">Ещё не зарегистрированы? 
           <Link className="login__span" to="/signup"> Регистрация</Link>
          </p>
        </fieldset> 
      </form>
    </main>
  );
}

export default Login;