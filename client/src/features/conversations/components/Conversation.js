import React from "react";
import moment from "moment";

export default function Conversation({ user, conversation, onSelect }) {
  const conversationUsers = conversation.users
    .filter((conversationUser) => conversationUser !== user.username)
    .join(", ");

  let lastMessage, lastMessageBody, lastMessageTime;

  if (conversation.messages.length > 0) {
    lastMessage = conversation.messages[conversation.messages.length - 1];
    lastMessageTime = lastMessage.updated_at;
    lastMessageBody = lastMessage.body;

    if (lastMessageBody.length > 80) {
      lastMessageBody = lastMessageBody.slice(0, 77) + "...";
    }

    if (
      moment(lastMessageTime).format("M/D/YY") === moment().format("M/D/YY")
    ) {
      lastMessageTime = moment(lastMessageTime).fromNow();
    } else {
      lastMessageTime = moment(lastMessageTime).format("M/D/YY");
    }
  }

  return (
    <div
      className="conversation__single__element"
      onClick={() => onSelect(conversation)}
    >
      <div className="conversation__header__details">
        <div className="conversation__header conversation-user">
          <p>{conversationUsers}</p>
        </div>
        <div className="conversation__header conversation-time">
          <span>{lastMessageTime}</span>
        </div>
      </div>
      <div className="conversation__last_message_details">
        <span>{lastMessageBody}</span>
      </div>
    </div>
  );
}
