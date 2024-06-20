import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Chatbot from './components/Chatbot';
import AdminChat from './components/AdminChat';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [chatVisible, setChatVisible] = useState(false);

  const handleSendMessage = (text, sender, optionType = null) => {
    const newMessage = { text, sender, isOption: !!optionType, optionType };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendAdminMessage = (text, sender) => {
    const newMessage = { text, sender };
    setAdminMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleAdminReply = (text, sender) => {
    const newMessage = { text, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="App">
      <h1>Welcome to Shanmuga Hospital</h1>
      <div className="chat-icon" onClick={() => setChatVisible(!chatVisible)}>
        <i className="bi bi-chat-dots-fill" style={{ color: 'white', fontSize: '30px' }}></i>
      </div>
      {chatVisible && (
        <div className="user-chat">
          <Chatbot
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendAdminMessage={handleSendAdminMessage}
            adminMessages={adminMessages}
          />
        </div>
      )}
      <div className="admin-chat">
        <AdminChat
          messages={adminMessages}
          onSendMessage={handleAdminReply}
        />
      </div>
    </div>
  );
};

export default App;
