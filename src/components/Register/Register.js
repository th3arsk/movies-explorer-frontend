import './Register.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useInput } from '../../utils/Validation';

function Register(props) {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    
    props.onAuth(user.name, user.email, user.password)
  }

  const name = useInput( "", { isEmpty: true, minLength: 2 } );
  const email = useInput("", { isEmpty: true, isEmail: false } );
  const password = useInput( "", { isEmpty: true, minLength: 2 } );

  return (
    <main className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <Link className="register__logo" to="/">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="black"/>
          </svg>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <fieldset className="register__fieldset">
          <div className="register__label">Имя
            <input 
              className={`register__input ${(name.isDirty && (name.isEmpty || name.minLength)) ? "register__input_incorrect" : " "}`}
              ref={nameRef}
              placeholder="Имя"
              name="name"
              id="name" 
              type="text"
              value={name.value}
              onChange={e => name.onChange(e)}
              onBlur={e => name.onBlur(e)}
            />
            <label className={`register__error ${(name.isDirty && (name.isEmpty || name.minLength)) ? "register__error_active" : " "}`} for="name">{name.message}</label> 
          </div>
          <div className="register__label">E-mail
            <input 
              className={`register__input ${(email.isDirty && (email.isEmpty || email.isEmail)) ? "register__input_incorrect" : " "}`}
              ref={emailRef}
              placeholder="Электронная почта"
              name="email"
              id="email"
              type="email"
              value={email.value}
              onChange={e => email.onChange(e)}
              onBlur={e => email.onBlur(e)}
            />
            <label className={`register__error ${(email.isDirty && (email.isEmpty || email.isEmail)) ? "register__error_active" : " "}`} for="email">{email.message}</label>
          </div>
          <div className="register__label">Пароль
            <input 
              className={`register__input ${(password.isDirty && (password.isEmpty || password.minLength)) ? "register__input_incorrect" : " "}`}
              ref={passwordRef}
              placeholder="Пароль"
              name="password"
              id="password"
              type="password"
              value={password.value}
              onChange={e => password.onChange(e)}
              onBlur={e => password.onBlur(e)}
            />
            <label className={`register__error ${(password.isDirty && (password.isEmpty || password.minLength)) ? "register__error_active" : " "}`} for="password">{password.message}</label>
          </div>
          <button 
            className={`register__bttn ${(!email.isValid || !password.isValid || !name.isValid) ? "register__bttn_disabled" : " "} `}
            type="submit"
            disabled={(!email.isValid || !password.isValid || !name.isValid)}
            >Зарегистрироваться</button>
          <p className="register__question">Уже зарегистрированы?
           <Link className="register__span" to="/signin"> Войти</Link>
          </p>
        </fieldset> 
      </form>
    </main>
  );
}

export default Register;