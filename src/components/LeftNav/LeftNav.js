import React from 'react';
import './LeftNav.css';

const LeftNav = ({ sessions, createNewChat }) => {
  return (
    <div className="left-nav">
      <h2>Folders</h2>
      {/* Render folder components here */}
      <h2>Sessions</h2>
      {/* Render session components here */}
      <button onClick={createNewChat} className="new-chat-btn">
        New Chat
      </button>
    </div>
  );
};

export default LeftNav;
