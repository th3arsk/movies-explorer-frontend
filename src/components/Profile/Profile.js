import "./Profile.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
  const [edit, setEdit] = React.useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [isChanged, setIsChanged] = React.useState(false);
  const [name, setName] = React.useState(currentUser.name || "");
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [email, setEmail] = React.useState(currentUser.email || "");
  const [emailValidationMessage, setEmailValidationMessage] =
    React.useState("");
  const nameRef = React.useRef();
  const emailRef = React.useRef();

  React.useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [name, email]);

  React.useEffect(() => {
    setEmail(currentUser.email);
    setName(currentUser.name);
  }, [currentUser.name, currentUser.email]);

  function handleSubmit(e) {
    e.preventDefault();
    setEdit(false);
    props.onEdit(name, email);
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
      if (e.target.validationMessage) {
        setNameValidationMessage(e.target.validationMessage);
      } else {
        setNameValidationMessage(e.target.validationMessage);
      }
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (e.target.validationMessage) {
        setEmailValidationMessage(e.target.validationMessage);
      } else {
        setEmailValidationMessage(e.target.validationMessage);
      }
    }
  }

  return (
    <main className="profile">
      <h1 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h1>
      {edit ? (
        <form className="profile__info" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__row profile__name">
              <p className="profile__data">Имя</p>
              <input
                className={`profile__input ${
                  name.isDirty && (name.minLength || name.isSame)
                    ? "profile__input_incorrect"
                    : " "
                }`}
                ref={nameRef}
                placeholder="Имя"
                name="name"
                type="text"
                value={name}
                onBlur={name.onBlur}
                onChange={handleChange}
                minLength={2}
                maxLength={99}
              />
              <label
                className={`profile__error ${
                  nameValidationMessage ? "profile__error_active" : " "
                }`}
                for="name"
              >
                {nameValidationMessage}
              </label>
            </div>
            <div className="profile__row">
              <p className="profile__data">E-mail</p>
              <input
                className={`profile__input ${
                  email.isDirty && (email.isEmail || email.isSame)
                    ? "profile__input_incorrect"
                    : " "
                }`}
                ref={emailRef}
                placeholder="Электронная почта"
                name="email"
                type="email"
                value={email}
                onBlur={email.onBlur}
                onChange={handleChange}
                minLength={6}
                maxLength={99}
              />
              <label
                className={`profile__error ${
                  emailValidationMessage ? "profile__error_active" : " "
                }`}
                for="email"
              >
                {emailValidationMessage}
              </label>
            </div>
            <label
              className={`profile__error ${
                !isChanged ? "profile__error_active" : " "
              }`}
            >
              Введите новые данные
            </label>
            <button
              className={`profile__save ${
                nameValidationMessage ||
                emailValidationMessage ||
                !isChanged ||
                props.isLoading
                  ? "profile__save_disabled"
                  : " "
              }`}
              type="submit"
              disabled={
                nameValidationMessage ||
                emailValidationMessage ||
                !isChanged ||
                props.isLoading
              }
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      ) : (
        <div className="profile__info">
          <div className="profile__row profile__name">
            <p className="profile__data">Имя</p>
            <p className="profile__data">{currentUser.name}</p>
          </div>
          <div className="profile__row">
            <p className="profile__data">E-mail</p>
            <p className="profile__data">{currentUser.email}</p>
          </div>
        </div>
      )}
      <div className="profile__links">
        {edit ? (
          ""
        ) : (
          <>
            <button
              className="profile__edit profile__bttn"
              type="button"
              onClick={() => {
                setEdit(true);
              }}
            >
              Редактировать
            </button>
            <button
              className="profile__sign-out profile__bttn"
              onClick={props.onExit}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
