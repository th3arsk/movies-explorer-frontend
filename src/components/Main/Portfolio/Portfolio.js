import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li>
          <a className="portfolio__item" href="https://th3arsk.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <p className="portfolio__item-name">Статичный сайт</p>
            <p className="portfolio__link">↗</p>
          </a> 
        </li>
        <li>
          <a className="portfolio__item" href="https://th3arsk.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <p className="portfolio__item-name">Адаптивный сайт</p>
            <p className="portfolio__link">↗</p>
          </a>
        </li>
        <li>
          <a className="portfolio__item" href="https://github.com/th3arsk/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            <p className="portfolio__item-name">Одностраничное приложение</p>
            <p className="portfolio__link">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;