import React from 'react';
import './Folder.css';

const Folder = ({ folder }) => {
  return (
    <div className="folder">
      <h3>{folder.title}</h3>
    </div>
  );
};

export default Folder;
