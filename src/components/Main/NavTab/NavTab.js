import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <div className="nav-tab__links">
        <a className="nav-tab__link" href="#project">О проекте</a>
        <a className="nav-tab__link" href="#techs">Технологии</a>
        <a className="nav-tab__link" href="#about-me">Студент</a>
      </div> 
    </section>
  );
}

export default NavTab;