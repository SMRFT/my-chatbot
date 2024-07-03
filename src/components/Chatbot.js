import React, { useState, useEffect } from 'react';
import Message from './Message';
import UserForm from './UserForm';
import CareerForm from './CareerForm';
import { BiSend } from 'react-icons/bi';
import { IoIosArrowDropdownCircle, IoMdChatboxes } from 'react-icons/io';
import './Chatbot.css';
import robot from './Images/robot-icon.png';

const Chatbot = ({ messages, onSendMessage, isVisible, onClose, showInitialMessages }) => {
  const [showForm, setShowForm] = useState(false);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [isChattingWithAdmin, setIsChattingWithAdmin] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (isVisible && showInitialMessages) {
      setShowForm(true); // Show the user form after initial messages
    }
  }, [isVisible, showInitialMessages]);

  const handleUserMessage = (text, sender) => {
    onSendMessage(text, sender);
  };

  const handleFormSubmit = (formData) => {
    setShowForm(false);
    setShowCareerForm(false);
    onSendMessage(`Name: ${formData.name}`, 'user');
    onSendMessage(`Phone: ${formData.phone}`, 'user');
    onSendMessage(`Email: ${formData.email}`, 'user');
    onSendMessage(`Address: ${formData.address}`, 'user');
    displayOptions();
  };

  const handleCareerFormSubmit = (formData) => {
    setShowCareerForm(false);
    onSendMessage(`Name: ${formData.name}`, 'user');
    onSendMessage(`Phone: ${formData.phone}`, 'user');
    onSendMessage(`Email: ${formData.email}`, 'user');
    onSendMessage(`Position: ${formData.position}`, 'user');
    displayOptions();
  };

  const displayOptions = () => {
    setTimeout(() => {
      onSendMessage('Please select one of these options:', 'admin');
      onSendMessage('General Enquiry', 'admin', 'main');
      setShowOptions(true);
    }, 1000);
  };

  const handleOptionClick = (text, optionType) => {
    onSendMessage(`You selected: ${text}`, 'user');

    if (optionType === 'main') {
      setShowOptions(false);
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
      setShowOptions(false);
      if (text === 'Chat Now') {
        onSendMessage('How can we assist you today?', 'admin');
        setIsChattingWithAdmin(true);
      } else if (text === 'Call Us') {
        onSendMessage('Please call us at :telephone_receiver: 0427-2706666', 'admin');
      }
    }
  };

  return (
    <div className="chatbot-wrapper">
      {!isVisible ? (
        <IoMdChatboxes
          className="chat-icon"
          onClick={onClose}
        />
      ) : (
        <IoIosArrowDropdownCircle
          className="close-icon"
          onClick={onClose}
        />
      )}
      {isVisible && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-header-title">
                <img src={robot} className="chatbot-icon" alt="Chatbot Icon" />
                <div>
                  <h2>Conversation</h2>
                  <h5>I am here to help you!</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="chatbot-messages">
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
                <button type="submit"><BiSend style={{ fontSize: '25px', color:'#007bff;' }} /></button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
