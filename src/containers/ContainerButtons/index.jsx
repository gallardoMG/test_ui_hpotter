import { useDispatch, useSelector } from 'react-redux';
import GenericButton from '../../components/GenericButton';
import { apiShowStudents } from '../../utils/APIs';

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
        apiShowStudents();
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
        apiShowStaff();
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
