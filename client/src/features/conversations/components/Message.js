import React from "react";
import { useSystemMode } from "../../../SystemModeContext";
import moment from "moment";

export default function Message({ user, message }) {
  const systemMode = useSystemMode()

  return (
    <div className="message__container">
      <div
        className={`message message-${
          message.sender === user.username ? `sender colors-${systemMode.toLowerCase()}` : "receiver"
        }`}
      >
        <h4>{message.sender}</h4>
        <p className="message__body">{message.body}</p>
        <span className="message__time">{moment(message.updated_at).format("M/D/YY h:mm a")}</span>
        {/* Eventual functionality - actions for editing/deleting messages */}
        <div className="actions">
          <button>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
