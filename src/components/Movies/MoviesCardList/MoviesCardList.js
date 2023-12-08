import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import slova_o_dizaine from '../../../images/slova_o_dizaine.jpg';

function MoviesCardList() {
  return (
    <section className="movies__container">
      <ul className="movies__list">
        <MoviesCard name="33 слова о дизайне" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Киноальманах «100 лет дизайна»" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="В погоне за Бенкси" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Баския: Взрыв реальности" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Бег это свобода" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Книготорговцы" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Когда я думаю о Германии ночью" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Gimme Danger: История Игги и The Stooges" duration="1ч 17м" image={slova_o_dizaine} />
        <MoviesCard name="Дженис: Маленькая девочка грустит" duration="1ч 17м" image={slova_o_dizaine} />
      </ul> 
      <button className="movies__more">Ещё</button>
    </section>
    
  );
}

export default MoviesCardList;