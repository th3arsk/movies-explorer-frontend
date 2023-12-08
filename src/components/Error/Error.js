import './Error.css';
import { Link } from "react-router-dom";

function Error() {
  return (
    <main className="error">
      <h1 className="error__number">404</h1>
      <p className="error__message">Страница не найдена</p>
      <Link className="error__back" to="/">Назад</Link>
    </main>
  );
}

export default Error;