import React from 'react';
import background from '../../assets/background.png';

const Background = () => {
  return (
    <div className='mainContainer__background'>
      <img src={background} alt='' className='mainContainer__background-img' />
    </div>
  );
};

export default Background;
