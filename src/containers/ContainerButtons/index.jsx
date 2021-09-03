import { useDispatch, useSelector } from 'react-redux';
import GenericButton from '../../components/GenericButton';

const ContainerButtons = () => {
  const { students, staff } = useSelector(state => state.stateButtonsReducer);
  const dispatch = useDispatch();
  const showEstudents = () => {
    if (!students) {
      dispatch({ type: 'BTN__STATE', payload: { students: true } });
      const data = localStorage.getItem('dataStudents');
      if (data !== null) {
        dispatch({ type: 'ADD__DATA', payload: JSON.parse(data) });
      } else {
        fetch('http://localhost:3001/students')
          .then(dataStudents => dataStudents.json())
          .then(dataStudents => {
            dispatch({ type: 'ADD__DATA', payload: dataStudents });
            localStorage.setItem('dataStudents', JSON.stringify(dataStudents));
          })
          .catch(e => console.log(`ERROR: ${e}`));
      }
    } else {
      dispatch({ type: 'BTN__STATE', payload: { students: false } });
      dispatch({ type: 'STUDENTS__DATA-HIDD', payload: 'hogwartsStudent' });
    }
  };
  const showStaff = () => {
    if (!staff) {
      dispatch({ type: 'BTN__STATE', payload: { staff: true } });
      const data = localStorage.getItem('dataStaff');
      if (data !== null) {
        dispatch({ type: 'ADD__DATA', payload: JSON.parse(data) });
      } else {
        fetch('http://localhost:3001/staff')
          .then(dataStaff => dataStaff.json())
          .then(dataStaff => {
            dispatch({ type: 'ADD__DATA', payload: dataStaff });
            localStorage.setItem('dataStaff', JSON.stringify(dataStaff));
          })
          .catch(e => console.log(`ERROR: ${e}`));
      }
    } else {
      dispatch({ type: 'BTN__STATE', payload: { staff: false } });
      dispatch({ type: 'STAFF__DATA-HIDD', payload: 'hogwartsStaff' });
    }
  };
  return (
    <section className='containerButtons'>
      <GenericButton content={'ESTUDIANTES'} event={showEstudents} />
      <GenericButton content={'STAFF'} event={showStaff} />
    </section>
  );
};

export default ContainerButtons;
