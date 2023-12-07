import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <p className="about-me__title">Студент</p>
      <div className="about-me__info">
        <div className="about-me__text">
          <p className="about-me__name">Виталий</p>
          <p className="about-me__caption">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" href="https://github.com/th3arsk" target="_blank" rel="noreferrer">Github</a>
        </div>
        <div className="about-me__image"></div>
      </div>  
    </section>
  );
}

export default AboutMe;