import React from "react";
import SearchFilter from "./components/SearchFilter";
import SearchResultList from "./components/SearchResultList";

export default function SearchIndex({ user }) {
  return (
    <>
      <h1 className="page-header">Search</h1>
      <div className="search-filter">
        <SearchFilter />
      </div>
      <div className="search-results">
        <SearchResultList user={user} />
      </div>
    </>
  );
}
