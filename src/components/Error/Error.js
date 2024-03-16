import './Error.css';
import { Link, useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

  return (
    <main className="error">
      <h1 className="error__number">404</h1>
      <p className="error__message">Страница не найдена</p>
      <Link className="error__back" onClick={back}>Назад</Link>
    </main>
  );
}

export default Error;