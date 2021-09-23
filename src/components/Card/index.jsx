import React, { useEffect, useState } from 'react';
import addFavoriteSVG from '../../assets/addFavoriteSVG.svg';
import removeFavorite from '../../assets/removeFavorite.svg';
import { useSelector, useDispatch } from 'react-redux';

const Card = ({ character }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(state => state.favoritesReducer);
  const {
    image,
    alive,
    hogwartsStudent,
    name,
    dateOfBirth,
    gender,
    eyeColour,
    hairColour,
    house,
  } = character;
  const selectHouse = () => {
    switch (house) {
      case 'Gryffindor':
        return 'card__theme card__theme--gryffindor';
      case 'Slytherin':
        return 'card__theme card__theme--slytherin';
      case 'Hufflepuff':
        return 'card__theme card__theme--hufflepuff';
      case 'Ravenclaw':
        return 'card__theme card__theme--ravenclaw';
      case '':
        return 'card__theme card__theme--staff';
      default:
        break;
    }
  };
  const [showInfo, setShowInfo] = useState(() =>
    window.innerWidth > 800 ? true : false
  );
  const addRemoveFavorites = character => {
    if (favoriteList.find(el => el.name === character.name)) {
      dispatch({ type: 'REMOVE__ITEM', payload: name });
      localStorage.setItem(
        'favorites',
        JSON.stringify(favoriteList.filter(el => el.name !== character.name))
      );
    } else {
      if (favoriteList.length < 5) {
        dispatch({ type: 'ADD__ITEM', payload: character });
        localStorage.setItem(
          'favorites',
          JSON.stringify([...favoriteList, character])
        );
      } else {
        alert('SOLO SE PUEDEN AGREGAR 5 ITEMS');
      }
    }
  };
  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 800) setShowInfo(true);
      else setShowInfo(false);
    };
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [showInfo]);
  return (
    <div className='wrapperCard'>
      {!showInfo && (
        <article className='card'>
          <section className={selectHouse()}>
            <div className='card__containerImg'>
              <img src={image} alt={name} className='card__img' />
            </div>
          </section>
          <section className='card__content'>
            <h2 className='card__nameCharacter'>
              {alive ? '' : '+'}
              {name}
            </h2>
            <div className='card__info'>
              <p className='card__stateCharacter'>
                {alive ? 'VIVO' : 'FINADO'} <br />
                {hogwartsStudent === true ? 'ESTUDIANTE' : 'STAFF'}
              </p>
              <img
                src={
                  favoriteList.find(el => el.name === character.name)
                    ? removeFavorite
                    : addFavoriteSVG
                }
                alt='ADD'
                onClick={() => addRemoveFavorites(character)}
              />
            </div>
          </section>
        </article>
      )}
      {showInfo && (
        <article className='card'>
          <section className={selectHouse()}>
            <div className='card__containerImg'>
              <img src={image} alt={name} className='card__img' />
            </div>
          </section>
          <section className='card__content'>
            <div className='card__content-header'>
              <p className='card__stateCharacter'>
                {alive ? 'VIVO' : 'FINADO'}
                {' / '}
                {hogwartsStudent === true ? 'ESTUDIANTE' : 'STAFF'}
              </p>
              <img
                src={
                  favoriteList.find(el => el.name === character.name)
                    ? removeFavorite
                    : addFavoriteSVG
                }
                alt='ADD'
                onClick={() => addRemoveFavorites(character)}
                className='card__icon'
                aria-label='save card'
              />
            </div>
            <h2 className='card__nameCharacter'>
              {alive ? '' : '+'}
              {name}
            </h2>
            <div className='card__content-features'>
              <p className='card__p'>
                Cumpleaños: <span className='capitalize'> {dateOfBirth}</span>
              </p>
              <p className='card__p'>
                Genero:
                <span className='capitalize'> {gender}</span>
              </p>
              <p className='card__p'>
                Color de ojos:
                <span className='capitalize'> {eyeColour}</span>
              </p>
              <p className='card__p'>
                Color de pelo:
                <span className='capitalize'> {hairColour}</span>
              </p>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};

export default Card;
