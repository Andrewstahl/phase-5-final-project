import React from "react";
import Posting from "./Posting";

export default function PostingList({ user }) {
  const postingElements = user.postings.map((posting) => {
    return <Posting key={posting.id} posting={posting} />;
  });

  return postingElements;
}
