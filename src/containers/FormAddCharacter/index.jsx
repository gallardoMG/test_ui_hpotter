import React, { useState } from 'react';
import GenericButton from '../../components/GenericButton';
import { addClass } from '../../utils/selectors';
import quit from '../../assets/quit.svg';
import { useDispatch, useSelector } from 'react-redux';

const FormAddCharacter = ({ form, focus }) => {
  const { students, staff } = useSelector(state => state.stateButtonsReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [eyeColour, setEyeColour] = useState('');
  const [hairColour, setHairColour] = useState('');
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [house, setHouse] = useState('');
  const [img, setImg] = useState('');
  const submit = e => {
    e.preventDefault();
    const dataPost = {
      id: name,
      name: name,
      gender: gender,
      house: house,
      dateOfBirth: dateOfBirth,
      eyeColour: eyeColour,
      hairColour: hairColour,
      hogwartsStudent: position === 'hogwartsStudent' ? true : false,
      hogwartsStaff: position === 'hogwartsStaff' ? true : false,
      image: img,
    };
    if (position === 'hogwartsStudent') {
      fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dataPost),
      })
        .then(res => {
          alert('GUARDADO CON ÉXITO');
          setName('');
          setHairColour('');
          setEyeColour('');
          setDateOfBirth('');
          addClass(form, 'form--hidde');
          setTimeout(() => addClass(form, 'form--displayNone'), 1100);
          if (students) dispatch({ type: 'ADD__CHAR', payload: dataPost });
          else dispatch({ type: 'ADD__CHAR__AFTER' });
        })
        .catch(e =>
          alert('Ocurrio un error, o el personaje ya esta registrado.')
        );
    } else {
      fetch('http://localhost:3001/staff', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dataPost),
      })
        .then(res => {
          alert('GUARDADO CON ÉXITO');
          setName('');
          setHairColour('');
          setEyeColour('');
          setDateOfBirth('');
          addClass(form, 'form--hidde');
          setTimeout(() => addClass(form, 'form--displayNone'), 1100);
          if (staff) dispatch({ type: 'ADD__CHAR', payload: dataPost });
          else dispatch({ type: 'ADD__CHAR__AFTER' });
        })
        .catch(e =>
          alert('Ocurrio un error, o el personaje ya esta registrado.')
        );
    }
  };

  const handleChangeFile = file => {
    if (file.files[0] !== undefined) {
      if (file.files[0].size > 200000) {
        alert('El achivo no debe superar los 200kb');
        file.value = '';
      } else {
        let fileData = new FileReader();
        fileData.onloadend = e => {
          const content = e.target.result;
          setImg(content);
        };
        fileData.readAsDataURL(file.files[0]);
      }
    }
  };
  const close = () => {
    addClass(form, 'form--hidde');
    setTimeout(() => addClass(form, 'form--displayNone'), 1100);
  };
  return (
    <div className='wrapperForm form--hidde form--displayNone' ref={form}>
      <form onSubmit={submit} className='formAdd'>
        <img
          src={quit}
          alt='CERRAR'
          onClick={close}
          className='formAdd__quit'
        />
        <fieldset className='formAdd__fieldset'>
          <legend className='formAdd__title'>Agrega un personaje</legend>
          <label className='formAdd__label'>
            NOMBRE
            <input
              ref={focus}
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              className='formAdd__input'
              required
            />
          </label>
          <label className='formAdd__label'>
            CUMPLEAÑOS
            <input
              type='date'
              className='formAdd__input'
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              required
            />
          </label>
          <label className='formAdd__label'>
            COLOR OJOS
            <input
              value={eyeColour}
              onChange={e => setEyeColour(e.target.value)}
              type='text'
              className='formAdd__input'
              required
            />
          </label>
          <label className='formAdd__label'>
            COLOR PELO
            <input
              value={hairColour}
              onChange={e => setHairColour(e.target.value)}
              type='text'
              className='formAdd__input'
              required
            />
          </label>
          <legend className='formAdd__legend'>
            GÉNERO
            <div className='formAdd__radios'>
              <label className='formAdd__radio'>
                <input
                  value='female'
                  onChange={e => setGender(e.target.value)}
                  type='radio'
                  name='gender'
                  required
                />
                <span>Mujer</span>
              </label>
              <label className='formAdd__radio'>
                <input
                  value='male'
                  onChange={e => setGender(e.target.value)}
                  type='radio'
                  name='gender'
                  required
                />
                <span>Hombre</span>
              </label>
            </div>
          </legend>
          <legend className='formAdd__legend'>
            POSICIÓN
            <div className='formAdd__radios'>
              <label className='formAdd__radio'>
                <input
                  value={'hogwartsStudent'}
                  onChange={e => setPosition(e.target.value)}
                  type='radio'
                  name='position'
                  required
                />
                <span>Estudiante</span>
              </label>
              <label className='formAdd__radio'>
                <input
                  value={'hogwartsStaff'}
                  onChange={e => setPosition(e.target.value)}
                  type='radio'
                  name='position'
                  required
                />
                <span>Staff</span>
              </label>
            </div>
          </legend>
          <legend className='formAdd__legend-house'>
            CASA
            <div className='formAdd__radios'>
              <div className='formAdd__houses'>
                <label className='formAdd__radio'>
                  <input
                    value='Gryffindor'
                    onChange={e => setHouse(e.target.value)}
                    type='radio'
                    name='house'
                    required
                  />
                  <span>Gryffindor</span>
                </label>
                <label className='formAdd__radio'>
                  <input
                    value='Slytherin'
                    onChange={e => setHouse(e.target.value)}
                    type='radio'
                    name='house'
                    required
                  />
                  <span>Slytherin</span>
                </label>
                <label className='formAdd__radio'>
                  <input
                    value='Ravenclaw'
                    onChange={e => setHouse(e.target.value)}
                    type='radio'
                    name='house'
                    required
                  />
                  <span>Ravenclaw</span>
                </label>
                <label className='formAdd__radio'>
                  <input
                    value='Hufflepuff'
                    onChange={e => setHouse(e.target.value)}
                    type='radio'
                    name='house'
                    required
                  />
                  <span>Hufflepuff</span>
                </label>
                <label className='formAdd__radio'>
                  <input
                    value=''
                    onChange={e => setHouse(e.target.value)}
                    type='radio'
                    name='house'
                    required
                  />
                  <span>Ninguna</span>
                </label>
              </div>
            </div>
          </legend>
          <label className='formAdd__file-wrapper'>
            FOTOGRAFÍA (max 200kb)
            <div className='formAdd__file'>
              <input
                className='formAdd__input-file'
                onChange={e => handleChangeFile(e.target)}
                type='file'
                accept='image/jpg, image/png'
                required
              />
            </div>
          </label>
          <GenericButton
            type='submit'
            event={() => {}}
            content='GUARDAR'
            className='button--form'
          />
        </fieldset>
      </form>
    </div>
  );
};

export default FormAddCharacter;
