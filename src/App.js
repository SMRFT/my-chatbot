import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import AdminChat from './components/AdminChat';
import UserReport from './components/UserReport';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [showInitialMessages, setShowInitialMessages] = useState(false);

  useEffect(() => {
    if (isChatbotVisible && !showInitialMessages) {
      handleSendMessage('Hi! Welcome to Shanmuga Hospital', 'admin', false);
      handleSendMessage('Please fill in the below form so that we may assist you better', 'admin', false);
      setShowInitialMessages(true);
    }
  }, [isChatbotVisible, showInitialMessages]);

  const handleSendMessage = (text, sender, optionType = null) => {
    const newMessage = { text, sender, isOption: !!optionType, optionType };
    if (!messages.some(message => message.text === newMessage.text && message.sender === newMessage.sender)) {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  const handleAdminReply = (text, sender) => {
    const newMessage = { text, sender };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleChatIconClick = () => {
    setIsChatbotVisible(!isChatbotVisible);
    if (!isChatbotVisible) {
      setShowInitialMessages(false);
    }
  };

  return (
    <div className="App">
      <br/>
      <div className="chat-icon" onClick={handleChatIconClick}>
        <i className="bi bi-chat-dots-fill" style={{ color: 'white', fontSize: '30px' }}></i>
      </div>
      {isChatbotVisible && (
        <div className="user-chat">
          <Chatbot
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendAdminMessage={handleAdminReply}
            isVisible={isChatbotVisible}
            onClose={handleChatIconClick}
            showInitialMessages={showInitialMessages}
          />
        </div>
      )}
      <div className="admin-chat">
        <AdminChat messages={messages} onSendMessage={handleSendMessage} />
      </div>
      <div>
        <UserReport />
      </div>
    </div>
  );
};

export default App;
