import React from 'react';
import Logo from '../../components/Logo';

const ContainerTitle = () => {
  return (
    <section className='containerTiltle'>
      <Logo />
      <h2 className='containerTiltle__instructions'>SELECCIONA TU FILTRO</h2>
    </section>
  );
};

export default ContainerTitle;
