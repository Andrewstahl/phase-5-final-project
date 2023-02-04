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

export default function ConversationsIndexBootstrap() {
  const [conversations, setConversations] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [fetchMethod, setFetchMethod] = useState("POST");

  const user = useUser();
  const systemMode = useSystemMode();

  const failureNotify = () =>
    toast.error("Message Not Sent! Please include a message before sending.");

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
    setCurrentMessage("");

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
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        users: [user.username, newUsername],
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newConversation) => {
          setCurrentConversation(newConversation);
          setConversations([...conversations, newConversation]);
          setCurrentMessage("");
          setCurrentMessages([]);
        });
      }
    });
  }

  return (
    <>
      {/* <h1  className="page-header">Your Conversations</h1> */}
      <h1 class="fst-italic text-center m-4">Your Conversations</h1>
      <Toaster />
      <div id="another-parent-div" class="container-fluid">
        <div id="conversation-page-parent-div" class="row my-4 justify-content-center h-100">
          <div id="conversation-list-div" class="col-md-4 col-xl-3 chat">
            <div id="conversation-list-card" class="card mb-sm-3 mb-md-0 contacts_card">
              <div class="card-header colors-freelancer">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Type your search here..."
                    // value={searchValue}
                    // onChange={(e) => {onSearch(e.target.value)}}
                  />
                  <label
                    for="floatingInput"
                    className={`text-colors-${systemMode.toLowerCase()}`}
                  >
                    Search
                  </label>
                </div>
              </div>
              {/* This is where each conversation would go */}
              <div class="card-body flex-fill">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Khalid</li>
                </ul>
              </div>
              <div class="card-footer"></div>
            </div>
          </div>
          <div class="col-md-8 col-xl-6 chat">
            <div class="card">
              <div class="card-header colors-freelancer text-white font-weight-bold">
                <div class="d-flex">
                  {/* Add in usernames and number of messages */}
                  <div id="selected-conversation-information">
                    <span class="fs-3 fw-bold w-100 text-right">
                      Chat with Khalid
                    </span>
                    <p class="fst-italic">1767 Messages</p>
                  </div>
                </div>
              </div>
              <div class="card-body msg_card_body overflow-auto">
                <div class="message-container d-flex justify-content-start mb-4">
                  <div class="msg_cotainer">
                    <p class="fw-bold">Andrew</p>
                    <p class="medium p-2 me-1 rounded-4 color-grey text-black">
                      Hello, how are you samim?
                    </p>
                    <span class="small mt-0 fst-italic text-muted msg_time">
                      8:40 AM, Today
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-end mb-4 text-end">
                  <div class="msg_cotainer">
                    <p class="fw-bold">Khalid</p>
                    <p
                      class={`medium p-2 me-1 rounded-4 colors-${systemMode.toLowerCase()} text-white`}
                    >
                      Hi Khalid i am good tnx how about you?
                    </p>
                    <span class="msg_time">8:55 AM, Today</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end mb-4 text-end">
                  <div class="msg_cotainer">
                    <p class="fw-bold">Khalid</p>
                    <p
                      class={`medium p-2 me-1 rounded-4 colors-${systemMode.toLowerCase()} text-white`}
                    >
                      Hi Khalid i am good tnx how about you?
                    </p>
                    <span class="msg_time">8:55 AM, Today</span>
                  </div>
                </div>
                <div class="d-flex justify-content-end mb-4 text-end">
                  <div class="msg_cotainer">
                    <p class="fw-bold">Khalid</p>
                    <p
                      class={`medium p-2 me-1 rounded-4 colors-${systemMode.toLowerCase()} text-white`}
                    >
                      Hi Khalid i am good tnx how about you?
                    </p>
                    <span class="msg_time">8:55 AM, Today</span>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div name="message-input-box-actions" class="input-group mb-3">
                  <textarea
                    name="message-input-box"
                    class="form-control type_msg"
                    rows="3"
                    style={{ resize: "none" }}
                    placeholder="Type your message..."
                  />
                  <button
                    class={`btn colors-${systemMode.toLowerCase()} text-white fw-bold`}
                    type="button"
                    id="button-addon1"
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
