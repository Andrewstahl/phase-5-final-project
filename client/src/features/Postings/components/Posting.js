import React from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function Posting({ posting, onEdit, onDelete }) {
  const systemMode = useSystemMode();

  return (
    <>
      <div className="posting__div form-formatting">
        <h2 className="posting__header">{posting.title}</h2>
        <p className="posting__description">
          {/* Only show the first 30 words of the description if there
          are more than 30 words */}
          {posting.description.split(" ").length > 30
            ? posting.description.split(" ").slice(0, 30).join(" ") + "..."
            : posting.description}
        </p>
        <div className="posting__price-info">
          <p>
            ${posting.price} • {posting.price_unit}
          </p>
        </div>
        <div className="posting__categories">
          {posting.categories.map((category) => {
            return (
              <span
                key={category.index}
                className={`posting__category colors-${
                  posting.posting_type ? posting.posting_type.toLowerCase() : ""
                }`}
              >
                {category}
              </span>
            );
          })}
        </div>
        <hr></hr>
        <div className="posting__action-buttons-div">
          <button
            className={`posting__edit-button colors-${systemMode.toLowerCase()}`}
            onClick={() => onEdit(posting)}
          >
            Edit
          </button>
          <button className="posting__delete-button delete" onClick={() => onDelete(posting)}>Delete</button>
        </div>
      </div>
    </>
  );
}
