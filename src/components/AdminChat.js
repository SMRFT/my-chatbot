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

  // Messages to exclude from displaying in admin chat
  const excludedMessages = [
    'Hi! Welcome to Shanmuga Hospital',
    'Please fill in the below form so that we may assist you better',
    'Name:', 'Phone:', 'Email:', 'Address:',
    'Please select one of these options:',
    'General Enquiry', 'Please choose an option:',
    'Chat Now', 'Call Us',
    'Please call us at :telephone_receiver: 0427-2706666',
    'How can we assist you today?'
  ];

  const filteredMessages = messages.filter(message => {
    // Check if message text contains any of the excluded messages
    return !excludedMessages.some(excludedText => message.text.includes(excludedText));
  });

  return (
    <div className="admin-chat-container">
      <div className="admin-chat-messages">
        {filteredMessages.map((message, index) => (
          <div key={index} className={message.sender === 'admin' ? 'sent-message' : 'received-message'}>
            <Message text={message.text} sender={message.sender} />
          </div>
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
          <button type="submit">
            <BiSend style={{ fontSize: '25px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChat;
