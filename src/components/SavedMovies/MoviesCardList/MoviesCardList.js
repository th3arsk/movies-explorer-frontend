import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import slova_o_dizaine from '../../../images/slova_o_dizaine.jpg';

function MoviesCardList() {
  return (
    <ul className="movie-list">
      <MoviesCard name="33 слова о дизайне" duration="1ч 17м" image={slova_o_dizaine} />
      <MoviesCard name="Киноальманах «100 лет дизайна»" duration="1ч 17м" image={slova_o_dizaine} />
    </ul>  
  );
}

export default MoviesCardList;