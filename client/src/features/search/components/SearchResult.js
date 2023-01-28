import React from "react";

export default function SearchResult({ result }) {
  
  const buyerPostings = result.postings.filter(
    (posting) => posting.posting_type === "Freelancer"
  );
  const freelancerPostings = result.postings.filter(
    (posting) => posting.posting_type === "Buyer"
  );
  let buyerCategories = [];
  let freelancerCategories = [];

  if (buyerPostings.length > 0) {
    buyerPostings.map((posting) => {
      return posting.categories.map((category) =>
        buyerCategories.push(category)
      );
    });
  }
  
  if (freelancerPostings.length > 0) {
    freelancerPostings.map((posting) => {
      return posting.categories.map((category) =>
        freelancerCategories.push(category)
      );
    });
  }
  
  return (
    <div className="result__div form-formatting">
      <div className="result__header">
        <h2 className="result__header__text">{result.username}</h2>
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