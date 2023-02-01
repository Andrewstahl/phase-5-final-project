import React from "react";

export default function SearchResult({ result }) {
  let freelancerCategories = [];
  let freelancerPostings = [];
  let buyerCategories = [];
  let buyerPostings = [];

  result.postings.forEach((posting) => {
    if (posting.posting_type === "Freelancer") {
      freelancerPostings.push(posting);
      freelancerCategories.push(...posting.categories);
    } else {
      buyerPostings.push(posting);
      buyerCategories.push(...posting.categories);
    }
  });

  return (
    <div className="result__div form-formatting">
      <div>
        <h2 className="result__header-text">{result.username}</h2>
      </div>
      <div className="result__body">
        <h4>
          {buyerPostings.length}
          {" Buyer "}
          {buyerPostings.length === 1 ? "Posting" : "Postings"}
          {" • "}
          {freelancerPostings.length}
          {" Freelancer "}
          {freelancerPostings.length === 1 ? "Posting" : "Postings"}
        </h4>
        {freelancerCategories.length > 0 ? (
          <div className="result__categories">
            <p>Freelancing Specialties</p>
            <span>{freelancerCategories.join(" • ")}</span>
          </div>
        ) : null}
        {buyerCategories.length > 0 ? (
          <div className="result__categories">
            <p>Buyer Needs</p>
            <span>{buyerCategories.join(" • ")}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
