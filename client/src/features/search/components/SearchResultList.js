import React from "react";
import SearchResult from "./SearchResult";

export default function SearchResultList({ user, results }) {
  const searchResults = results.map((result) => {
    return <SearchResult key={result.id} result={result} />;
  });

  return <div className="result__list__div">{searchResults}</div>;
}
