import React from "react";
import Message from "./Message";

export default function MessageList({ user, messages }) {
  console.log(messages)
  if (messages) {
    const messageElements = messages.map((message) => {
      return <Message key={message.id} user={user} message={message} />;
    });
    return (
      <div className="message__element__messages__list">{messageElements}</div>
    );
  }
  
  // This is the placeholder if we don't have any conversations selected
  return (
    <div className="message__element__messages__list">
      <h2 className="message__placeholder__header">Select a Conversation To See Messages</h2>
    </div>
  );
}
