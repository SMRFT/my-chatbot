import React, { useState } from 'react';
import Message from './Message';
import { BiSend } from 'react-icons/bi';
import './AdminChat.css';

const AdminChat = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue, 'admin');
      setInputValue('');
    }
  };

  return (
    <div className="admin-chat-container">
      <div className="admin-chat-messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="admin-input">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
          />
          <button type="submit"><BiSend style={{ fontSize: '25px' }} /></button>
        </form>
      </div>
    </div>
  );
};

export default AdminChat;
