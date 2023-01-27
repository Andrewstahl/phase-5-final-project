import React, { useState } from "react";
import PostingList from "./components/PostingList";
import PostingForm from "./components/PostingForm";
import "./assets/postings.css";

export default function PostingsIndex({ user }) {
  const [showPostingForm, setShowPostingForm] = useState(false);
  const [currentPosting, setCurrentPosting] = useState(null);

  function handleEditClick(selectedPosting) {
    setShowPostingForm(true);
    setCurrentPosting(selectedPosting);
  }

  function togglePostingForm() {
    setShowPostingForm(!showPostingForm);
    setCurrentPosting(null);
  }

  function handleCancel() {
    setShowPostingForm(false)
    setCurrentPosting(null)
  }

  return (
    <>
      <h1 className="page-header">Postings</h1>
      <button className="posting-form-button" onClick={togglePostingForm}>
        Show Posting Form
      </button>
      {showPostingForm ? <PostingForm posting={currentPosting} onCancel={handleCancel} /> : null}
      <PostingList user={user} onEdit={handleEditClick} />
    </>
  );
}
