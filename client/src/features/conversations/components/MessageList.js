import React from "react";
import Message from "./Message";

export default function MessageList({ user, messages }) {
  // console.log(messages)
  if (messages) {
    let messageElements = messages.map((message) => {
      return <Message key={message.id} user={user} message={message} />;
    });
    if (messageElements.length === 0) {
      messageElements = <h2 className="message__placeholder__header">There are No Messages for This Conversation</h2>
    }
    return (
      <div className="message__element__messages__list">{messageElements}</div>
    );
  }
  
  // This is the placeholder if we don't have any conversations selected
  return (
    <div className="message__element__messages__list">
      <h2 className="message__placeholder__header">Please Select a Conversation To See Messages</h2>
    </div>
  );
}
