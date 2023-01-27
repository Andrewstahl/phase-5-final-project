import React, { useState } from "react";
import PostingList from "./components/PostingList";
import PostingForm from "./components/PostingForm";
import "./assets/postings.css"

export default function PostingsIndex({ user }) {
  const [showPostingForm, setShowPostingForm] = useState(false);

  return (
    <>
      <h1 className="page-header">Postings</h1>
      <button onClick={() => setShowPostingForm(!showPostingForm)}>
        Show Posting Form
      </button>
      {showPostingForm ? <PostingForm /> : null}
      <PostingList user={user} />
    </>
  )
}