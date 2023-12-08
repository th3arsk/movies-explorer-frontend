import './AboutMe.css';
import author from '../../../images/author.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__text">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__caption">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" href="https://github.com/th3arsk" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__image" src={author} alt="Фото студента"/>
      </div>  
    </section>
  );
}

export default AboutMe;