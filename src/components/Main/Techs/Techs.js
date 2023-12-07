import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <p className="techs__title">Технологии</p>
      <p className="techs__heading">7 технологий</p>
      <p className="techs__caption">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__tech">HTML</li>
        <li className="techs__tech">CSS</li>
        <li className="techs__tech">JS</li>
        <li className="techs__tech">React</li>
        <li className="techs__tech">Git</li>
        <li className="techs__tech">Express.js</li>
        <li className="techs__tech">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;