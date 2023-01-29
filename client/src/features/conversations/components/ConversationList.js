import React from "react";
import Conversation from "./Conversation";

export default function ConversationList({ user, conversations, onSelect }) {
  const conversationElements = conversations.map((conversation) => {
    return (
      <Conversation
        key={conversation.id}
        user={user}
        conversation={conversation}
        onSelect={onSelect}
      />
    );
  });

  return <div className="conversation__list__div">{conversationElements}</div>;
}