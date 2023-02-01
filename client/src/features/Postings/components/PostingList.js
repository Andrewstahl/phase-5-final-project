import React from "react";
import Posting from "./Posting";

export default function PostingList({ user, postings, onEdit }) {
  const postingElements = postings.map((posting) => {
    return <Posting key={posting.id} posting={posting} onEdit={onEdit} />;
  });

  return <div className="posting__list__div">{postingElements}</div>;
}
