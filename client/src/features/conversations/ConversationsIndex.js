import React, { useEffect, useState } from "react";
import ConversationList from "./components/ConversationList";
import { useSystemMode } from "../../SystemModeContext";
import MessageList from "./components/MessageList";
import "./assets/conversations.css"
import "./assets/messages.css"
import MessageBox from "./components/MessageBox";

export default function ConversationsIndex({ user }) {
  const [conversations, setConversations] = useState([])
  const [currentMessages, setCurrentMessages] = useState([])
  const [currentConversation, setCurrentConversation] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")

  const systemMode = useSystemMode()

  useEffect(() => {
    fetch("/conversations")
    .then((r) => {
      if (r.ok) {
        r.json().then(conversations => {
          setConversations(conversations)
          setCurrentMessages(conversations.messages)
        })
      }
    })
  }, [])

  function handleSelect(conversation) {
    setCurrentConversation(conversation)
    setCurrentMessages(conversation.messages)
  }

  function handleAddMessage(message) {
    setCurrentMessages([...currentMessages, message])
  }

  return (
    <>
      <h1 className="page-header">Your Conversations</h1>
      <div className="conversations__div">
        <div className="conversation__parent__div">
          <div className="conversation__element">
            <div className="conversation__element__action__buttons">
              <button className={`conversation-action-button colors-${systemMode.toLowerCase()}`}>New</button>
            </div>
            <ConversationList user={user} conversations={conversations} onSelect={handleSelect} />
          </div>
          <div className="message__element">
            <MessageList user={user} messages={currentMessages} />
            <MessageBox message={currentMessage}/>
          </div>
        </div>
      </div>
    </>
  );
}
