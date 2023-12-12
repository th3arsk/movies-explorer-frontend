import './Login.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useInput } from '../../utils/Validation';

function Login(props) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  
  React.useEffect(() => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }, [])
  
  function handleSubmit(e) {
    e.preventDefault();
  
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
      
    props.onLogin(user.email, user.password)
  }

  const email = useInput("", { isEmpty: true, isEmail: false } );
  const password = useInput( "", { isEmpty: true, minLength: 2 } );

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <Link className="login__logo" to="/">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="black"/>
          </svg>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <fieldset className="login__fieldset">
          <div className="login__label">E-mail
            <input 
              className={`login__input ${(email.isDirty && (email.isEmpty || email.isEmail))? "login__input_incorrect" : " "} `}
              ref={emailRef}
              placeholder="Электронная почта"
              type="email"
              name="email"
              id="email"
              value={email.value}
              onBlur={e => email.onBlur(e)}
              onChange={e => email.onChange(e)}
            />
            <label className={`login__error ${(email.isDirty && (email.isEmpty || email.isEmail))? "login__error_active" : " "}`} for="email">{email.message}</label> 
          </div>
          <div className="login__label">Пароль
            <input 
              className={`login__input ${(password.isDirty && (password.isEmpty || password.minLength))? "login__input_incorrect" : " "} `}
              ref={passwordRef}
              placeholder="Пароль"
              name="password"
              id="password"
              type="password"
              onBlur={e => password.onBlur(e)}
              value={password.value}
              onChange={e => password.onChange(e)}
            />
            <label className={`login__error ${(password.isDirty && (password.isEmpty || password.minLength))? "login__error_active" : " "}`} for="email">{password.message}</label>
          </div>
          <button 
            className={`login__bttn ${(!email.isValid || !password.isValid) ? "login__bttn_disabled" : " "} `}
            type="submit"
            disabled={(!email.isValid || !password.isValid)}
          >Войти</button>
          <p className="login__question">Ещё не зарегистрированы? 
           <Link className="login__span" to="/signup"> Регистрация</Link>
          </p>
        </fieldset> 
      </form>
    </main>
  );
}

export default Login;