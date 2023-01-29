import React from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function Message({ user, message }) {
  const systemMode = useSystemMode()

  return (
    <div
      className={`message message-${
        message.sender === user.username ? `sender colors-${systemMode.toLowerCase()}` : "receiver"
      }`}
    >
      <h4>{message.sender}</h4>
      <p>{message.body}</p>
    </div>
  );
}
