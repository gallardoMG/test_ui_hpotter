import React, { useEffect, useRef } from 'react';
import TagsMenu from '../../containers/TagsMenu';
import ContainerButtons from '../../containers/ContainerButtons';
import ContainerTitle from '../../containers/ContainerTitle';
import Cards from '../../containers/Cards';
import FormAddCharacter from '../../containers/FormAddCharacter';
import Background from '../../components/Background';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const form = useRef(null);
  const focus = useRef(null);
  const dataCharacters = useSelector(state => state.getDataReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://server-json-hp.herokuapp.com/students')
      .then(dataStudents => dataStudents.json())
      .then(dataStudents => {
        localStorage.setItem('dataStudents', JSON.stringify(dataStudents));
      });

    fetch('https://server-json-hp.herokuapp.com/staff')
      .then(dataStaff => dataStaff.json())
      .then(dataStaff => {
        localStorage.setItem('dataStaff', JSON.stringify(dataStaff));
      })
      .catch(e => console.log(`ERROR: ${e}`));
  }, [dataCharacters]);

  useEffect(() => {
    const data = localStorage.getItem('favorites');
    if (data !== null) {
      dispatch({ type: 'ADD__ITEMS', payload: JSON.parse(data) });
    }
  }, []);
  return (
    <div className='mainContainer'>
      <ContainerTitle />
      <FormAddCharacter form={form} focus={focus} />
      <ContainerButtons />
      <Cards />
      <TagsMenu focus={focus} form={form} />
      <Background />
    </div>
  );
}

export default App;
