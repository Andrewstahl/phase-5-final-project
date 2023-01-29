import React, { useState } from "react";

export default function MessageBox({ message }) {
  const [currentMessage, setCurrentMessage] = useState(message);

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
      <input type="submit" value="Send" className="message__box__submit" form="message-box"/>
    </div>
  );
}
