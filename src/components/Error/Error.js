import './Error.css';
import { Link } from "react-router-dom";

function Error() {
  return (
    <section className="error">
      <p className="error__number">404</p>
      <p className="error__message">Страница не найдена</p>
      <Link className="error__back" to="/">Назад</Link>
    </section>
  );
}

export default Error;