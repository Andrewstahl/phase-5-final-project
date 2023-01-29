import React from "react";

export default function Conversation({ user, conversation, onSelect }) {
  const conversationUsers = conversation.users
    .filter((conversationUser) => conversationUser !== user.username)
    .join(", ");

  let lastMessage;

  if (conversation.messages.length > 0) {
    lastMessage = conversation.messages[conversation.messages.length - 1].body;
    if (lastMessage.length > 30) {
      lastMessage = lastMessage.slice(0, 27) + "...";
    }
  }

  return (
    <div className="conversation__single__element" onClick={() => onSelect(conversation)}>
      <p className="conversation__user__header">{conversationUsers}</p>
      <span>{lastMessage}</span>
    </div>
  );
}
