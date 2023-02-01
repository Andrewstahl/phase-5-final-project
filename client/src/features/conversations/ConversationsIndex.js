import React, { useEffect, useState } from "react";
import ConversationList from "./components/ConversationList";
import { useSystemMode } from "../../SystemModeContext";
import MessageList from "./components/MessageList";
import "./assets/conversations.css";
import "./assets/messages.css";
import MessageBox from "./components/MessageBox";
import { useUser } from "../../components/App";
import toast, { Toaster } from "react-hot-toast";

export default function ConversationsIndex() {
  const [conversations, setConversations] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [fetchMethod, setFetchMethod] = useState("POST");

  const user = useUser();
  const systemMode = useSystemMode();

  const failureNotify = () => toast.error("Message Not Sent! Please include a message before sending.");

  useEffect(() => {
    fetch("/conversations").then((r) => {
      if (r.ok) {
        r.json().then((conversations) => {
          setConversations(conversations);
          setCurrentMessages(conversations.messages);
        });
      }
    });
  }, []);

  function handleSelect(conversation) {
    setCurrentConversation(conversation);
    setCurrentMessages(conversation.messages);
  }

  function handleSubmit(updatedMessage) {
    setCurrentMessage("")

    let fetchPathEnding = "";

    if (fetchMethod === "PATCH") {
      fetchPathEnding = `/${currentMessage.id}`;
    }

    fetch(`/messages${fetchPathEnding}`, {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        body: updatedMessage,
        sender: user.username,
        conversation_id: currentConversation.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          if (fetchMethod === "POST") {
            setCurrentMessages([...currentMessages, data]);
          } else if (fetchMethod === "PATCH") {
            setCurrentMessages([
              ...currentMessages.map((message) => {
                if (message.id === updatedMessage.id) {
                  return updatedMessage;
                }
                return message;
              }),
            ]);
          }
        });
      } else {
        failureNotify();
      }
    });
  }

  function handleDelete(deletedMessage) {
    fetch(`/postings/${deletedMessage.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        setCurrentMessages(
          currentMessages.filter((message) => message.id !== deletedMessage.id)
        );
      }
    });
  }

  return (
    <>
      <h1 className="page-header">Your Conversations</h1>
      <Toaster />
      <div className="conversations__div">
        <div className="conversation__parent__div">
          <div className="conversation__element">
            <div className="conversation__element__action__buttons">
              <button
                className={`conversation-action-button colors-${systemMode.toLowerCase()}`}
              >
                New
              </button>
            </div>
            <ConversationList
              user={user}
              conversations={conversations}
              onSelect={handleSelect}
            />
          </div>
          <div className="message__element">
            <MessageList user={user} messages={currentMessages} />
            <MessageBox message={currentMessage} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
