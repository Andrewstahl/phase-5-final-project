import React, { useState } from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function MessageBox({ message }) {
  const [currentMessage, setCurrentMessage] = useState(message);
  const systemMode = useSystemMode();

  return (
    <div className="message__element__chatbox">
      <form id="message-box" className="message__box__form">
        <textarea
          className="message__element__box"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
      </form>
      <input
        type="submit"
        value="Send"
        className={`message__box__submit colors-${systemMode.toLowerCase()}`}
        form="message-box"
      />
    </div>
  );
}
