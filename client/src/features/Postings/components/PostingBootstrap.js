import React from "react";
import { useSystemMode } from "../../../SystemModeContext";

export default function PostingBootstrap({ posting, onEdit, onDelete }) {
  const systemMode = useSystemMode();

  return (
    <>
      <div class="card text-center w-50 d-flex justify-content-center">
        <div
          class={`card-header text-uppercase text-white colors-${systemMode.toLowerCase()}`}
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
        <div class="card-footer text-muted">
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

      {/* <div className="posting__div form-formatting">
        <h2 className="posting__header">{posting.title}</h2>
        <p className="posting__description">
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
          <button
            className="posting__delete-button delete"
            onClick={() => onDelete(posting)}
          >
            Delete
          </button>
        </div>
      </div> */}
    </>
  );
}
