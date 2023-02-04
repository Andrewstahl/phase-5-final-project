import React from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function Posting({ posting, onEdit, onDelete }) {
  const systemMode = useSystemMode();

  return (
    <>
      <div class="card text-center w-50 d-flex mx-auto">
        <div
          class={`card-header fw-bold text-uppercase text-white colors-${systemMode.toLowerCase()}`}
        >
          {posting.title}
        </div>
        <div class="card-body d-flex flex-column">
          <p class="card-text">
            {posting.description.split(" ").length > 30
              ? posting.description.split(" ").slice(0, 30).join(" ") + "..."
              : posting.description}
          </p>
          <p class="card-text">
            ${posting.price} • {posting.price_unit}
          </p>
          <p class="card-text">
            {posting.categories.map((category) => {
              return (
                <span
                  key={category.index}
                  className={`posting__category colors-${
                    posting.posting_type
                      ? posting.posting_type.toLowerCase()
                      : ""
                  }`}
                >
                  {category}
                </span>
              );
            })}
          </p>
        </div>
        <div class="btn-group card-footer text-muted">
          <form class="container-fluid justify-content-start">
            <button class="btn btn-primary me-3" type="button">
              Edit
            </button>
            <button
              class="btn btn-danger"
              type="button"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
