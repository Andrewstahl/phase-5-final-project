import React, { useState } from "react";
import PostingForm from "../features/Postings/components/PostingForm";

export default function Postings() {
  const [showPostingForm, setShowPostingForm] = useState(false);

  return (
    <>
      <h1>Postings</h1>
      <button onClick={() => setShowPostingForm(!showPostingForm)}>
        Show Posting Form
      </button>
      {showPostingForm ? <PostingForm /> : null}
    </>
  );
}
