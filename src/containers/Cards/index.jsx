import { useSelector } from 'react-redux';
import Card from '../../components/Card';

const Cards = () => {
  const characters = useSelector(state => state.getDataReducer);
  const mapData = () =>
    characters.map(el => <Card character={el} key={el.name} />);
  return (
    <section className='containerCards'>
      {mapData()}
      {characters.length === 0 && (
        <p className='containerCards__info'>
          PRESIONA UN FILRO PARA MOSTRAR RESULTADOS
        </p>
      )}
    </section>
  );
};

export default Cards;
