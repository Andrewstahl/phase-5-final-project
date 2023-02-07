import React, { useState } from "react";
import { useUser } from "../../../components/App";
import Error from "../../../components/Error";
import { useSystemMode } from "../../../SystemModeContext";
import usePostings from "../../../utils/usePostings";
import useUsers from "../../../utils/useUsers";

export default function ProjectForm({ project, onSubmit, onCancel, errors }) {
  
  const user = useUser()
  const users = useUsers()
  const postings = usePostings()
  const systemMode = useSystemMode();

  const [currentProject, setCurrentProject] = useState(() => {
    if (project) {
      return {
        id: project.id,
        freelancer_id: project.freelancer_id,
        buyer_id: project.buyer_id,
        posting_id: project.posting_id,
        cost: project.cost,
      };
    } else {
      return {
        freelancer_id: systemMode === "Freelancer" ? user.id : null,
        buyer_id: systemMode === "Buyer" ? user.id : null,
        posting_id: null,
        cost: 0,
      }
    }
  })

  function handleChange(e) {
    const name = e.target.name.replace("-", "_");
    let value = e.target.value;

    setCurrentProject({
      ...currentProject,
      [name]: value,
    });
  }

  function handleSubmit(e) {

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
            {postings.map((posting) => {
              return <option value={posting.title.replace(" ", "-").toLowerCase()}>{posting.title}</option>
            })}
          </select>
          <label
            class={`text-colors-${systemMode.toLowerCase()}`}
            for="floating-posting-form-postings"
          >
            Select Your Posting
          </label>
          { postings.length === 0 ?  <p class="text-muted fst-italic text-center" >No Postings Available ... Please Go to the Postings Section to Create a Posting</p> : null }
        </div>
        <div class="form-floating mb-3">
          <select
            id="floating-project-form-buyer"
            name="buyer"
            class="form-select"
            onChange={(e) => handleChange(e)}
          >
            {users.map((user) => {
              return <option value={user.username}>{user.username}</option>
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
              value={currentProject.cost}
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
        <div class="text-center">
          <div class="btn-group card-footer text-muted">
            <form class="container-fluid justify-content-start">
              <button onClick={(e) => handleSubmit(e)} class="btn btn-primary me-3" type="button">
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
  )
}