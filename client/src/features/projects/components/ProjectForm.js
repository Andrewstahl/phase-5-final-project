import React, { useState } from "react";
import { useUser } from "../../../components/App";
import Error from "../../../components/Error";
import { useSystemMode } from "../../../SystemModeContext";
import useUsers from "../../../utils/useUsers";

export default function ProjectForm({ project, onSubmit, onCancel, errors }) {
  const user = useUser();
  const users = useUsers();
  const systemMode = useSystemMode();

  const [projectData, setProjectData] = useState(() => {
    if (project) {
      return {
        freelancer_id: project.freelancer_id,
        buyer_id: project.buyer_id,
        posting_id: project.posting_id,
        cost: project.cost,
        due_date: project.due_date,
      };
    } else {
      return {
        freelancer_id: systemMode === "Freelancer" ? user.id : null,
        buyer_id: systemMode === "Buyer" ? user.id : null,
        posting_id: null,
        cost: 0,
        due_date: null,
      };
    }
  });

  function handleChange(e) {
    const name = e.target.name;
    switch (name) {
      case "user-id":
        const selectedUserId = parseInt(
          e.target.childNodes[e.target.selectedIndex]
            .getAttribute("id")
            .replace("user-", "")
        );
        // If we're currently using the freelancer system mode, that means that we
        // need to attach the selected user to the buyer of the project. That is because
        // the current user will match the system mode (e.g. current user will be the freelancer
        // on the project if the system mode is set to Freelancer)
        const keyName =
          systemMode === "Freelancer" ? "buyer_id" : "freelancer_id";
        setProjectData({
          ...projectData,
          [keyName]: selectedUserId,
        });
        break;
      case "project-id":
        const selectedProjectId = parseInt(
          e.target.childNodes[e.target.selectedIndex]
            .getAttribute("id")
            .replace("project-", "")
        );
        setProjectData({
          ...projectData,
          project_id: selectedProjectId,
        });
        break;
      case "cost":
        setProjectData({
          ...projectData,
          cost: parseFloat(e.target.value),
        });
        break;
      case "date":
        setProjectData({
          ...projectData,
          due_date: e.target.value,
        });
        break;
      default:
        return null;
    }
  }

  function handleSubmit() {
    onSubmit({ ...projectData });
  }

  return (
    <div>
      <form class="form-formatting mt-3">
        <div class="form-floating mb-3">
          <select
            id="floating-project-form-postings"
            name="posting-id"
            class="form-select"
            onChange={(e) => handleChange(e)}
          >
            <option value="default-posting-select" selected disabled>
              --Select a Posting--
            </option>
            {user.postings
              .filter((posting) => posting.posting_type === systemMode)
              .map((posting) => {
                return (
                  <option
                    id={`posting-${posting.id}`}
                    value={posting.title.replace(" ", "-").toLowerCase()}
                  >
                    {posting.title}
                  </option>
                );
              })}
          </select>
          <label
            class={`text-colors-${systemMode.toLowerCase()}`}
            for="floating-posting-form-postings"
          >
            Select Your Posting
          </label>
          {/* {postings.length === 0 ? (
            <p class="text-muted fst-italic text-center">
              No Postings Available ... Please Go to the Postings Section to
              Create a Posting
            </p>
          ) : null} */}
        </div>
        <div class="form-floating mb-3">
          <select
            id="floating-project-form-buyer"
            name="user-id"
            class="form-select"
            onChange={(e) => handleChange(e)}
          >
            <option value="default-posting-select" selected disabled>
              --Select a {systemMode === "Freelancer" ? "Buyer" : "Freelancer"}
              --
            </option>
            {users
              .filter((selectedUser) => selectedUser.username !== user.username)
              .map((selectedUser) => {
                return (
                  <option
                    value={selectedUser.username}
                    id={`user-${selectedUser.id}`}
                  >
                    {selectedUser.username}
                  </option>
                );
              })}
          </select>
          <label
            class={`text-colors-${systemMode.toLowerCase()}`}
            for="floating-posting-form-categories"
          >
            Select Your {systemMode === "Freelancer" ? "Buyer" : "Freelancer"}
          </label>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="floating-posting-form-cost"
              name="cost"
              onChange={(e) => handleChange(e)}
              placeholder="Enter your cost here"
            />
            <label
              class={`text-colors-${systemMode.toLowerCase()}`}
              for="floating-posting-form-cost"
            >
              Cost
            </label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              type="datetime-local"
              class="form-control"
              id="floating-posting-form-date"
              name="date"
              onChange={(e) => handleChange(e)}
              placeholder="Enter your due date here"
            />
            <label
              class={`text-colors-${systemMode.toLowerCase()}`}
              for="floating-posting-form-date"
            >
              Due Date
            </label>
          </div>
        </div>
        <div class="text-center">
          <div class="btn-group card-footer text-muted">
            <form class="container-fluid justify-content-start">
              <button
                onClick={(e) => handleSubmit(e)}
                class="btn btn-primary me-3"
                type="button"
              >
                Submit
              </button>
              <button class="btn btn-danger" type="button" onClick={onCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
        {errors.map((error) => {
          return <Error key={error} error={error} />;
        })}
      </form>
    </div>
  );
}
