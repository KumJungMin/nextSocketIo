import React from "react";

interface IProps {
  isUser?: boolean;
  message?: string;
}

function MessageItem({ isUser, message }: IProps) {
  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble ${
          isUser ? "chat-bubble" : "chat-bubble-primary"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageItem;
