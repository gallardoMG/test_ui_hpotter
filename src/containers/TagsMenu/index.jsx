import React, { useRef } from 'react';
import TagsActions from '../../components/TagsActions/index';
import { toggleClass, removeClass } from '../../utils/selectors';
import trash from '../../assets/trash.svg';
import addCharacter from '../../assets/addCharacter.svg';
import favorites_icon from '../../assets/favorites_icon.svg';
import { useDispatch, useSelector } from 'react-redux';

const TagsMenu = ({ form, focus }) => {
  const favoritesList = useSelector(state => state.favoritesReducer);
  const dispatch = useDispatch();
  const favorites = useRef(null);
  const listFavorites = useRef(null);
  const showFavorites = () => {
    toggleClass(favorites, 'tagsMenu--active');
    toggleClass(listFavorites, 'wrapperTags__favorites--show');
  };
  const showForm = () => {
    removeClass(favorites, 'tagsMenu--active');
    removeClass(listFavorites, 'wrapperTags__favorites--show');
    removeClass(form, 'form--displayNone');
    setTimeout(() => {
      removeClass(form, 'form--hidde');
      focus.current.focus();
    }, 100);
  };
  const deletCharacter = character => {
    dispatch({ type: 'REMOVE__ITEM', payload: character.name });
    localStorage.setItem(
      'favorites',
      JSON.stringify(favoritesList.filter(el => el.name !== character.name))
    );
  };
  return (
    <>
      <section className='tagsMenu' ref={favorites}>
        <TagsActions
          event={showFavorites}
          content={'FAVORITOS'}
          className='tagAction'
          icon={
            <img src={favorites_icon} alt='Favorites' className='favoritIcon' />
          }
        />
        <TagsActions
          event={showForm}
          content={'AGREGAR'}
          className='tagAction'
          icon={<img src={addCharacter} alt='ADD' className='addIcon' />}
        />
      </section>
      <section className='wrapperTags__favorites' ref={listFavorites}>
        <table className='tableFavorites'>
          <tbody>
            {favoritesList.map(el => (
              <tr key={el.name}>
                <td className='tableFavorites__character'>
                  <img
                    src={el.image}
                    alt={el.name}
                    className='tableFavorites__img'
                  />
                  {el.name}
                </td>
                <td>
                  <img
                    className='tableFavorites__icon'
                    src={trash}
                    alt='delet'
                    aria-label='delete favorite'
                    onClick={() => deletCharacter(el)}
                  />
                </td>
              </tr>
            ))}
            {favoritesList.length === 0 && (
              <tr>
                <td className='tableFavorites__empty'>SIN FAVORITOS</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TagsMenu;
