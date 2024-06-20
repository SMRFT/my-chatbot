import React, { useState, useEffect } from 'react';
import Message from './Message';
import UserForm from './UserForm';
import CareerForm from './CareerForm';
import '@fortawesome/fontawesome-free/css/all.css';
import { BiSend } from 'react-icons/bi';
import './Chatbot.css';

const Chatbot = ({ messages, onSendMessage, onSendAdminMessage, adminMessages }) => {
  const [initialMessageShown, setInitialMessageShown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [isChattingWithAdmin, setIsChattingWithAdmin] = useState(false);

  useEffect(() => {
    if (isChattingWithAdmin) {
      adminMessages.forEach((message) => {
        if (!messages.includes(message)) {
          onSendMessage(message.text, 'admin');
        }
      });
    }
  }, [adminMessages]);

  const handleUserMessage = (text, sender) => {
    onSendMessage(text, sender);

    if (isChattingWithAdmin) {
      onSendAdminMessage(text, sender);
    }

    if (!initialMessageShown) {
      setTimeout(() => {
        onSendMessage('Hi! Welcome to Shanmuga Hospital', 'admin');
        onSendMessage('Please fill in the below form so that we may assist you better', 'admin');
        setInitialMessageShown(true);
        setShowForm(true);
      }, 1000);
    } else {
      handleOtherMessages();
    }
  };

  const handleFormSubmit = (formData) => {
    setShowForm(false);
    setShowCareerForm(false);

    onSendMessage(`Name: ${formData.name}`, 'user');
    onSendMessage(`Phone: ${formData.phone}`, 'user');
    onSendMessage(`Email: ${formData.email}`, 'user');
    onSendMessage(`Address: ${formData.address}`, 'user');

    showOptions();
  };

  const handleCareerFormSubmit = (formData) => {
    setShowCareerForm(false);
    onSendMessage(`Name: ${formData.name}`, 'user');
    onSendMessage(`Phone: ${formData.phone}`, 'user');
    onSendMessage(`Email: ${formData.email}`, 'user');
    onSendMessage(`Position: ${formData.position}`, 'user');
    showOptions();
  };

  const showOptions = () => {
    setTimeout(() => {
      onSendMessage('Please select one of these options:', 'admin');
      onSendMessage('General Enquiry', 'admin', 'main');
    }, 1000);
  };

  const handleOptionClick = (text, optionType) => {
    onSendMessage(`You selected: ${text}`, 'user');

    if (optionType === 'main') {
      switch (text) {
        case 'General Enquiry':
          onSendMessage('Please choose an option:', 'admin');
          onSendMessage('Chat Now', 'admin', 'generalEnquiry');
          onSendMessage('Call Us', 'admin', 'generalEnquiry');
          break;
        default:
          onSendMessage('Unknown option selected.', 'admin');
      }
    } else if (optionType === 'generalEnquiry') {
      if (text === 'Chat Now') {
        onSendMessage('How can we assist you today?', 'admin');
        onSendAdminMessage('User initiated chat.', 'user');
        setIsChattingWithAdmin(true);
      } else if (text === 'Call Us') {
        onSendMessage('Please call us at 📞 0427-2706666', 'admin');
      }
    }
  };

  const handleOtherMessages = () => {
    setTimeout(() => {
      onSendMessage('Please select one of these options:', 'admin');
      onSendMessage('General Enquiry', 'admin', 'main');
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        <div className="options-container">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              sender={message.sender}
              isOption={message.isOption}
              handleOptionClick={handleOptionClick}
              optionType={message.optionType}
            />
          ))}
          {showForm && <UserForm onSubmit={handleFormSubmit} />}
          {showCareerForm && <CareerForm onSubmit={handleCareerFormSubmit} />}
        </div>
      </div>
      <div className="user-input">
        {!showForm && !showCareerForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserMessage(e.target.message.value, 'user');
              e.target.message.value = '';
            }}
          >
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              autoComplete="off"
              autoFocus
            />
            <button type="submit"><BiSend style={{ fontSize: '25px' }} /></button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
