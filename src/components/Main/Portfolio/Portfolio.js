import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__item">
        <p className="portfolio__item-name">Статичный сайт</p>
        <a className="portfolio__link" href="https://th3arsk.github.io/how-to-learn/" target="_blank" rel="noreferrer">↗</a>
      </div> 
      <div className="portfolio__item">
        <p className="portfolio__item-name">Адаптивный сайт</p>
        <a className="portfolio__link" href="https://th3arsk.github.io/russian-travel/" target="_blank" rel="noreferrer">↗</a>
      </div>
      <div className="portfolio__item">
        <p className="portfolio__item-name">Одностраничное приложение</p>
        <a className="portfolio__link" href="https://github.com/th3arsk/react-mesto-api-full-gha" target="_blank" rel="noreferrer">↗</a>
      </div>
    </section>
  );
}

export default Portfolio;