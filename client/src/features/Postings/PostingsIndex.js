import React, { useState } from "react";
import PostingList from "./components/PostingList";
import PostingForm from "./components/PostingForm";
import { useSystemMode } from "../../SystemModeContext";
import "./assets/postings.css";

export default function PostingsIndex({ user }) {
  const [showPostingForm, setShowPostingForm] = useState(false);
  const [currentPosting, setCurrentPosting] = useState(null);
  const [fetchMethod, setFetchMethod] = useState("");
  const [postings, setPostings] = useState(user.postings);

  const systemMode = useSystemMode();

  function togglePostingForm() {
    setShowPostingForm(!showPostingForm);
    setCurrentPosting(null);
    setFetchMethod("POST");
  }

  function handleEditClick(selectedPosting) {
    setShowPostingForm(true);
    setCurrentPosting(selectedPosting);
    setFetchMethod("PATCH");
  }

  function handleCancel() {
    setShowPostingForm(false);
    setCurrentPosting(null);
  }

  function handleFormSubmission(posting) {
    // First add in the path ending if we're editing
    // a posting
    let fetchPathEnding;

    if (fetchMethod === "POST") {
      fetchPathEnding = `/${currentPosting.id}`;
    }

    console.log({
      ...posting,
      user: user,
      posting_type: systemMode,
    });

    // fetch(`/postings${fetchPathEnding}`, {
    //   method: fetchMethod,
    //   headers: {
    //     "CONTENT-TYPE": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...posting,
    //     user: user,
    //     posting_type: systemMode,
    //   }),
    // }).then((r) => {
    //   if (r.ok) {
    //     r.json().then((data) => {
    //       if (fetchMethod === "POST") {
    //         setPostings(...postings, data);
    //       } else if (fetchMethod === "PATCH") {
    //         setPostings(
    //           postings.filter((postingItem) => postingItem.id !== posting.id)
    //         );
    //       }
    //     });
    //   }
    // });
  }

  return (
    <>
      <h1 className="page-header">Postings</h1>
      <div className="posting-form-button-div">
        <button
          className={`posting-form-button colors-${systemMode.toLowerCase()}`}
          onClick={togglePostingForm}
        >
          Show Posting Form
        </button>
      </div>
      {showPostingForm ? (
        <PostingForm posting={currentPosting} onCancel={handleCancel} onSubmit={handleFormSubmission}/>
      ) : null}
      <PostingList user={user} postings={postings} onEdit={handleEditClick} />
    </>
  );
}
