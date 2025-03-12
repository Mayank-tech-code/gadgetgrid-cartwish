import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { getChatResponse } from "../../services/GeminiAiModal";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    { content: "Hello! How can I assist you today?", role: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { content: userMessage, role: "user" }]);

    setIsTyping(true);

    const aiResponse = await getChatResponse(userMessage);

    setIsTyping(false);
    setMessages((prev) => [...prev, { content: aiResponse, role: "bot" }]);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 400,
        height: 500,
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="Gemini AI is typing..." />
              ) : null
            }
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.content,
                  sentTime: "just now",
                  sender: msg.role,
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type a message..." onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatbotComponent;
