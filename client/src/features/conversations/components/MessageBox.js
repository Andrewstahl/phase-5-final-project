import React, { useState } from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function MessageBox({ message, onSubmit }) {
  const [currentMessage, setCurrentMessage] = useState(message);
  const systemMode = useSystemMode();

  return (
    <div className="message__element__chatbox">
      <form
        id="message-box"
        className="message-chatbox__form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(currentMessage);
        }}
      >
        <textarea
          className="message-chatbox__input"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
      </form>
      <input
        type="submit"
        value="Send"
        className={`message-chatbox__submit-button colors-${systemMode.toLowerCase()}`}
        form="message-box"
      />
    </div>
  );
}
