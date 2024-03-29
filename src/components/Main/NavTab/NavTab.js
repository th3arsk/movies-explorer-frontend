import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li>
          <a className="nav-tab__link" href="#project">О проекте</a>
        </li>
        <li>
          <a className="nav-tab__link" href="#techs">Технологии</a> 
        </li>
        <li>
          <a className="nav-tab__link" href="#about-me">Студент</a>
        </li>  
      </ul> 
    </nav>
  );
}

export default NavTab;