import React, { useEffect, useState } from "react";
import ConversationList from "./components/ConversationList";
import { useSystemMode } from "../../SystemModeContext";
import MessageList from "./components/MessageList";
import "./assets/conversations.css";
import "./assets/messages.css";
import MessageBox from "./components/MessageBox";
import { useUser } from "../../components/App";
import toast, { Toaster } from "react-hot-toast";
import NewConversationModal from "./components/NewConversationModal";

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

  function handleSelectConversation(conversation) {
    setCurrentConversation(conversation);
    setCurrentMessages(conversation.messages);
  }

  function handleSubmitMessage(updatedMessage) {
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

  function handleDeleteMessage(deletedMessage) {
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

  function handleNewConversation(newUsername) {
    fetch("/conversations", {
      method: "POST", 
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({
        users: [user.username, newUsername]
      })
    }).then(r => {
      if (r.ok) {
        r.json().then(newConversation => {
          setCurrentConversation(newConversation)
          setConversations([...conversations, newConversation])
          setCurrentMessage("")
          setCurrentMessages([])
        })
      }
    })
  }

  return (
    <>
      <h1 className="page-header">Your Conversations</h1>
      <Toaster />
      <div className={`conversations__div background-colors-${systemMode.toLowerCase()}`}>
        <div className="conversation__section-div">
          <div className="conversation__element">
            <NewConversationModal onSubmit={handleNewConversation} />
            <ConversationList
              user={user}
              conversations={conversations}
              onSelect={handleSelectConversation}
            />
          </div>
          <div className="message__section-div">
            <MessageList user={user} conversation={currentConversation} messages={currentMessages} />
            <MessageBox message={currentMessage} onSubmit={handleSubmitMessage} />
          </div>
        </div>
      </div>
    </>
  );
}
