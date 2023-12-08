import './Profile.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Profile() {
  const [ edit, setEdit ] = React.useState(false);
  return (
    <main className="profile">
      <h1 className="profile__greeting">Привет, Виталий!</h1>
      { edit ?
        <form className="profile__info">
          <fieldset className="profile__fieldset">
            <div className="profile__row profile__name">
              <p className="profile__data">Имя</p>
              <input className="profile__input" placeholder="Имя"/>
            </div>
            <div className="profile__row">
              <p className="profile__data">E-mail</p>
              <input className="profile__input" placeholder="Почта"/>
            </div>
          </fieldset>
          
        </form>
        :
        <div className="profile__info">
          <div className="profile__row profile__name">
            <p className="profile__data">Имя</p>
            <p className="profile__data">Виталий</p>
          </div>
          <div className="profile__row">
            <p className="profile__data">E-mail</p>
            <p className="profile__data">pochta@yandex.ru</p>
          </div>
        </div>
      }
      <div className="profile__links">
        { edit ?
          <button className="profile__save" onClick={()=>{setEdit(false)}}>Сохранить</button>
          :
          <>
            <button className="profile__edit profile__bttn" type="button" onClick={()=>{setEdit(true)}}>Редактировать</button>
            <button className="profile__bttn" type="button">
              <Link className="profile__sign-out" to="/">Выйти из аккаунта</Link>
            </button> 
          </>
        }  
      </div>
    </main>
  );
}

export default Profile;