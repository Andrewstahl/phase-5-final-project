import React from "react";
import SearchResult from "./SearchResult";

export default function SearchResultList({ results }) {
  const searchResults = results.map((result) => {
    return <SearchResult key={result.id} result={result} />;
  });

  return <div className="search-results-list__div">{searchResults}</div>;
}
