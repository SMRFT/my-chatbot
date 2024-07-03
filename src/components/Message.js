import React from 'react';
import './Message.css';

const Message = ({ text, sender, isOption, handleOptionClick, optionType }) => {
  console.log(`Rendering message: ${text} from ${sender}`);
  return (
    <div className={`message ${sender}`}>
      {isOption ? (
        <button className="option-button" onClick={() => handleOptionClick(text, optionType)}>
          {text}
        </button>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default Message;
