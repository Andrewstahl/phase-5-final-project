import React, { useEffect, useState } from "react";
import SearchFilter from "./components/SearchFilter";
import SearchResultList from "./components/SearchResultList";
import "./assets/search.css"

export default function SearchIndex({ user }) {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/users").then((r) => {
      if (r.ok) {
        r.json().then((results) => setResults(results));
      }
    });
  }, []);

  function handleSearch(searchInput) {
    setSearch(searchInput)
  }
  const filteredResults = results.filter((result) => result.username.includes(search))

  return (
    <>
      <h1 className="page-header">Search</h1>
      <div className="search-filter">
        <SearchFilter onSearch={handleSearch}/>
      </div>
      <div className="search-results">
        <SearchResultList user={user} results={filteredResults}/>
      </div>
    </>
  );
}
