import React, { useEffect } from "react";
import { useRef } from "react";
import Message from "./Message";

export default function MessageList({ user, conversation, messages }) {
  const lastMessageRef = useRef();

  function scrollToBottom() {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  scrollToBottom();

  if (messages) {
    let messageElements = messages.map((message) => {
      return <Message key={message.id} user={user} message={message} />;
    });
    if (messageElements.length === 0) {
      messageElements = (
        <h2 className="message__placeholder__header">
          {
            Object.keys(conversation).length !== 0
              ? `Type a Message to Begin Chatting With ${conversation.users
                  .filter((selectedUser) => selectedUser !== user.username)
                  .join(", ")}`
              : "Type a Message to Begin Chatting"
          }
        </h2>
      );
    }

    console.log(user)
    return (
      <div className="message-list__div">
        <div className="message-list__header-username">
          {Object.keys(conversation).length !== 0 ? (
            <h4>
              {conversation.users.filter(
                (selectedUser) => selectedUser !== user.username
              )}
            </h4>
          ) : null}
        </div>
        {messageElements}
        <div ref={lastMessageRef} />
      </div>
    );
  }

  // This is the placeholder if we don't have any conversations selected
  return (
    <div id="message-list__div" className="message-list__div">
      <h2 className="message__placeholder__header">
        Please Select a Conversation To See Messages
      </h2>
    </div>
  );
}
