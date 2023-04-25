import React from 'react';
import './ChatSession.css';

const ChatSession = ({ session, onSelect }) => {
  return (
    <div className="chat-session" onClick={() => onSelect(session)}>
      <h3>{session.title}</h3>
    </div>
  );
};

export default ChatSession;
