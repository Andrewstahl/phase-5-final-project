import React from "react";

export default function SearchFilter({ onSearch }) {
  return (
    <div className="search-filter__div">
      <form>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Enter a search here"
        />
      </form>
    </div>
  );
}
