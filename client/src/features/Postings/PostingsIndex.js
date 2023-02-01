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
  const [errors, setErrors] = useState([]);

  const systemMode = useSystemMode();

  function togglePostingForm() {
    setShowPostingForm(!showPostingForm);
    setCurrentPosting(null);
    setErrors([])
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
    setErrors([]);
    let fetchPathEnding = "";

    if (fetchMethod === "PATCH") {
      fetchPathEnding = `/${currentPosting.id}`;
    }

    fetch(`/postings${fetchPathEnding}`, {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        ...posting,
        user_id: user.id,
        posting_type: systemMode,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          if (fetchMethod === "POST") {
            setPostings([...postings, data]);
          } else if (fetchMethod === "PATCH") {
            setPostings([
              ...postings.filter(
                (postingItem) => postingItem.id !== posting.id
              ),
              posting,
            ]);
          }
          togglePostingForm();
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete(deletedPosting) {
    fetch(`/postings/${deletedPosting.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json"
      }
    }).then((r) => {
      if (r.ok) {
        setPostings(postings.filter((posting) => posting.id !== deletedPosting.id))
      }
    })
  }

  const filteredPostsBySiteMode = postings.filter((posting) => posting.posting_type === systemMode)

  return (
    <>
      <h1 className="page-header">Your {systemMode} Postings</h1>
      <div className="posting-form-button__div">
        <button
          className={`posting-form-button colors-${systemMode.toLowerCase()}`}
          onClick={togglePostingForm}
        >
          Show Posting Form
        </button>
      </div>
      {showPostingForm ? (
        <PostingForm
          posting={currentPosting}
          onCancel={handleCancel}
          onSubmit={handleFormSubmission}
          onDelete={handleDelete}
          errors={errors}
        />
      ) : null}
      <PostingList postings={filteredPostsBySiteMode} onEdit={handleEditClick} onDelete={handleDelete} />
    </>
  );
}
