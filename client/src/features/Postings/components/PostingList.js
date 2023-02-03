import React from "react";
import Posting from "./Posting";
import PostingBootstrap from "./PostingBootstrap";

export default function PostingList({ postings, onEdit, onDelete }) {
  const postingElements = postings.map((posting) => {
    return (
      <PostingBootstrap
        key={posting.id}
        posting={posting}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  });

  return <div className="posting-list__div">{postingElements}</div>;
}
