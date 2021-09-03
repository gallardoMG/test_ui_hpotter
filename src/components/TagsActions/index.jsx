import React from 'react';

const TagsActions = ({ event, content, className, icon }) => {
  return (
    <div onClick={event} className={className}>
      {content}
      {icon}
    </div>
  );
};

export default TagsActions;
