import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../components/App";
import { useSystemMode } from "../../SystemModeContext";
import ActiveProjectsList from "./components/ActiveProjectsList";
import PreviousProjectsList from "./components/PreviousProjectsList";
import ProjectForm from "./components/ProjectForm";

export default function ProjectsIndex() {

  const [showProjectForm, setShowProjectForm] = useState(false)
  const [errors, setErrors] = useState([])
  const [currentProject, setCurrentProject] = useState(null);
  const [fetchMethod, setFetchMethod] = useState("");
  // Figure out how to grab projects - maybe we allow for nested data
  // const [projects, setProjects] = useState(user.projects);

  const user = useUser();
  const systemMode = useSystemMode();

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
    setCurrentProject(null);
    setErrors([]);
    setFetchMethod("POST");
  }

  function handleEditClick(selectedProject) {
    setShowProjectForm(true);
    setCurrentProject(selectedProject);
    setFetchMethod("PATCH");
  }

  function handleCancel() {
    setShowProjectForm(false);
    setCurrentProject(null);
  }

  function handleFormSubmission(project) {
    setErrors([]);
    let fetchPathEnding = "";

    if (fetchMethod === "PATCH") {
      fetchPathEnding = `/${currentProject.id}`;
    }

    fetch(`/projects${fetchPathEnding}`, {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        ...project,
        user_id: user.id,
        project_type: systemMode,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          if (fetchMethod === "POST") {
            // setProjects([...projects, data]);
          } else if (fetchMethod === "PATCH") {
            // setProjects([
            //   ...projects.filter(
            //     (projectItem) => projectItem.id !== project.id
            //   ),
            //   project,
            // ]);
          }
          toggleProjectForm();
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete(deletedProject) {
    fetch(`/projects/${deletedProject.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        // setProjects(
        //   projects.filter((project) => project.id !== deletedProject.id)
        // );
      }
    });
  }

  return (
    <>
      <h1 className="page-header">Your {systemMode} Projects</h1>
      <div class="text-center">
        <button
          type="button"
          onClick={toggleProjectForm}
          class={`btn fs-4 inverse-button-colors-${systemMode.toLowerCase()} ${systemMode.toLowerCase()}- colors-${systemMode.toLowerCase()}`}
        >
          Show Projects Form
        </button>
      </div>
      {showProjectForm ? (
        <ProjectForm
          project={currentProject}
          onSubmit={handleFormSubmission}
          onCancel={handleCancel}
          errors={errors}
        />
      ) : null}
      <ActiveProjectsList projects={""} />
      <PreviousProjectsList projects={""} />
    </>
  )
}
