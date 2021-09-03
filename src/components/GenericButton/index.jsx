import React, { useRef } from 'react';
import { toggleClass } from '../../utils/selectors';

const GenericButton = ({ event, content, className, active }) => {
  const ref = useRef(null);
  const activeButton = () => {
    toggleClass(ref, 'button--active');
  };
  return (
    <button
      onClick={() => {
        activeButton();
        event();
      }}
      className={`button ${className}`}
      ref={ref}
    >
      {content}
    </button>
  );
};

export default GenericButton;
