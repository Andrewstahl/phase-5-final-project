import React from "react";
import { useSystemMode } from "../../../SystemModeContext";
import moment from "moment";
export default function Project({ project, onEdit, onDelete }) {
  
  const systemMode = useSystemMode();
  return(
    <div class="card text-center w-50 d-flex mx-auto mb-4">
      <div
        class={`card-header fw-bold text-uppercase text-white colors-${systemMode.toLowerCase()}`}
      >
        {Date.parse(project.due_date) < Date.parse(new Date()) ? "Completed" : "In Progress"}
      </div>
      <div class="card-body d-flex flex-column">
        <p class="card-text">
          Working with {systemMode === "Freelancer" ? project.buyer_username : project.freelancer_username}
        </p>
        <p class="card-text">
          {systemMode === "Freelancer" ? "Price" : "Cost"} - ${project.cost.toLocaleString("en-US")}
        </p>
        <p class="card-text">
          {Date.parse(project.due_date) < Date.parse(new Date()) ? "Finished" : "Due"}: {moment(project.due_date).format("MM/DD/YYYY HH:MM")}
        </p>
      </div>
      <div class="btn-group card-footer text-muted">
        <form class="container-fluid justify-content-start">
          <button onClick={() => onEdit(project)} class="btn btn-primary me-3" type="button">
            Edit
          </button>
          <button class="btn btn-danger" type="button" onClick={() => onDelete(project)}>
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}