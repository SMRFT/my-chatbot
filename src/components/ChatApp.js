import React, { useState } from 'react';
import Chatbot from './Chatbot';
import AdminChat from './AdminChat';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [isChattingWithAdmin, setIsChattingWithAdmin] = useState(false);

  const handleSendMessage = (text, sender, isOption = false, optionType = null) => {
    const newMessage = { text, sender, isOption, optionType };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleAdminReply = (text, sender, isInitialMessage = false) => {
    const newMessage = { text, sender };
    setAdminMessages((prevMessages) => [...prevMessages, newMessage]);
    if (!isInitialMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <div className="chat-app-container">
      <Chatbot
        messages={messages}
        onSendMessage={handleSendMessage}
        onSendAdminMessage={handleAdminReply}
        adminMessages={adminMessages}
        isChattingWithAdmin={isChattingWithAdmin}
        setIsChattingWithAdmin={setIsChattingWithAdmin}
      />
      <AdminChat
        messages={messages.filter((msg) => msg.sender !== 'admin')}
        adminMessages={adminMessages}
        onSendMessage={handleAdminReply}
        isChattingWithAdmin={isChattingWithAdmin}
      />
    </div>
  );
};

export default ChatApp;
