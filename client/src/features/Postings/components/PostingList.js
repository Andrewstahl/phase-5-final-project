import React from "react";
import Posting from "./Posting";

export default function PostingList({ user, onEdit }) {
  const postingElements = user.postings.map((posting) => {
    return <Posting key={posting.id} posting={posting} onEdit={onEdit}/>;
  });

  return postingElements;
}
