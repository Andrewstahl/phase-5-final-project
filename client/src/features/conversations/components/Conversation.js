import React from "react";
import moment from "moment";

export default function Conversation({ user, conversation, onSelect }) {
  const conversationUsers = conversation.users
    .filter((conversationUser) => conversationUser !== user.username)
    .join(", ");

  let lastMessage, lastMessageBody, lastMessageTime;

  if (conversation.messages.length > 0) {
    lastMessage = conversation.messages[conversation.messages.length - 1]
    lastMessageTime = lastMessage.updated_at
    lastMessageBody = lastMessage.body;

    if (lastMessageBody.length > 30) {
      lastMessageBody = lastMessageBody.slice(0, 27) + "...";
    }

    if (moment(lastMessageTime).format("M/D/YY") === moment().format("M/D/YY")) {
      lastMessageTime = moment(lastMessageTime).fromNow()
    } else {
      lastMessageTime = moment(lastMessageTime).format("M/D/YY")
    }
  }

  return (
    <div className="conversation__single__element" onClick={() => onSelect(conversation)}>
      <div className="conversation__header__details">
        <p className="conversation__header__user">{conversationUsers}</p>
        <span className="conversation__header__time">{lastMessageTime}</span>
      </div>
      <div className="conversation__last_message_details">
        <span>{lastMessageBody}</span>
      </div>
    </div>
  );
}
