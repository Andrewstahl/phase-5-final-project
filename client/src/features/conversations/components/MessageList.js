import React, { useEffect } from "react";
import { useRef } from "react";
import Message from "./Message";

export default function MessageList({ user, messages }) {
  
  const lastMessageRef = useRef()
  
  function scrollToBottom () {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  scrollToBottom();

  if (messages) {
    let messageElements = messages.map((message) => {
      return <Message key={message.id} user={user} message={message} />;
    });
    if (messageElements.length === 0) {
      messageElements = <h2 className="message__placeholder__header">There are No Messages for This Conversation</h2>
    }
    return (
      <div className="message-list__div">
        {messageElements}
        <div ref={lastMessageRef} />
      </div>
    );
  }
  
  // This is the placeholder if we don't have any conversations selected
  return (
    <div id="message-list__div" className="message-list__div">
      <h2 className="message__placeholder__header">Please Select a Conversation To See Messages</h2>
    </div>
  );
}
