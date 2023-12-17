import './Profile.css';
import React from 'react';
import { useInput } from '../../utils/Validation';

function Profile(props) {
  const [ edit, setEdit ] = React.useState(false);

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value
    }
    
    setEdit(false);
    props.onEdit(user.name, user.email)
  }

  const name = useInput( props.name, { minLength: 2, isSame: true } );
  const email = useInput( props.email, { isEmail: true, isSame: true } );

  return (
    <main className="profile">
      <h1 className="profile__greeting">{`Привет, ${props.name}!`}</h1>
      { edit ?
        <form className="profile__info" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__row profile__name">
              <p className="profile__data">Имя</p>
              <input 
                className={`profile__input ${(name.isDirty && (name.minLength || name.isSame)) ? "profile__input_incorrect" : " "}`}
                ref={nameRef}
                placeholder="Имя"
                name="name"
                type="text"
                value={name.value}
                onBlur={name.onBlur}
                onChange={name.onChange}
              />
              <label className={`profile__error ${(name.isDirty && (name.minLength || name.isSame)) ? "profile__error_active" : " "}`} for="name">{name.message}</label> 
            </div>
            <div className="profile__row">
              <p className="profile__data">E-mail</p>
              <input 
                className={`profile__input ${(email.isDirty && (email.isEmail || email.isSame)) ? "profile__input_incorrect" : " "}`}
                ref={emailRef}
                placeholder="Электронная почта"
                name="email"
                type="email"
                value={email.value}
                onBlur={email.onBlur}
                onChange={email.onChange}
              />
              <label className={`profile__error ${(email.isDirty && (email.isEmail || email.isSame)) ? "profile__error_active" : " "}`} for="email">{email.message}</label>
            </div> 
            <button 
              className={`profile__save ${(email.isEmail || name.minLength || name.isSame || email.isSame ) ? "profile__save_disabled" : " "}`}
              type="submit"
              disabled={(email.isEmail || name.minLength || name.isSame || email.isSame )}
            >Сохранить</button>
          </fieldset> 
        </form>
        :
        <div className="profile__info">
          <div className="profile__row profile__name">
            <p className="profile__data">Имя</p>
            <p className="profile__data">{props.name}</p>
          </div>
          <div className="profile__row">
            <p className="profile__data">E-mail</p>
            <p className="profile__data">{props.email}</p>
          </div>
        </div>
      }
      <div className="profile__links">
        { edit ?
           ""
          :
          <>
            <button className="profile__edit profile__bttn" type="button" onClick={()=>{setEdit(true)}}>Редактировать</button>
            <button className="profile__sign-out profile__bttn" onClick={props.onExit}>Выйти из аккаунта</button>
          </>
        }  
      </div>
    </main>
  );
}

export default Profile;