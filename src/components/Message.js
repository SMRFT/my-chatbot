import React from 'react';
import './Message.css';

const Message = ({ text, sender, isOption, handleOptionClick, optionType }) => {
  return (
    <div className={`message ${sender}`}>
      {isOption ? (
        <button className="option-button" onClick={() => handleOptionClick(text, optionType)}>
          {text}
        </button>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default Message;
