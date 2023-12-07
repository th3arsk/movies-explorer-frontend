import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
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
      <div className="profile__links">
        <p className="profile__edit">Редактировать</p>
        <p className="profile__sign-out">Выйти из аккаунта</p>
      </div>
    </section>
  );
}

export default Profile;