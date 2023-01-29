import React from "react";
import ConversationsIndex from "../features/conversations/ConversationsIndex";

export default function Conversations({ user }) {
  return <ConversationsIndex user={user} />;
}
