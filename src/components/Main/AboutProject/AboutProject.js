import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__schema">
          <div className="about-project__schema-backend">
            <p className="about-project__backend-week">1 неделя</p>
            <p className="about-project__caption">Back-end</p>
          </div>
          <div className="about-project__schema-frontend">
            <p className="about-project__frontend-week">4 недели</p>
            <p className="about-project__caption">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;