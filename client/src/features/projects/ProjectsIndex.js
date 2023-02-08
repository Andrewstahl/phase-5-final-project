import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../components/App";
import { useSystemMode } from "../../SystemModeContext";
import ProjectsList from "./components/ProjectsList";
import ProjectForm from "./components/ProjectForm";

export default function ProjectsIndex() {
  const user = useUser();
  const systemMode = useSystemMode();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [fetchMethod, setFetchMethod] = useState("");

  const [buyerProjects, setBuyerProjects] = useState(user.buyer.projects);
  const [freelancerProjects, setFreelancerProjects] = useState(
    user.freelancer.projects
  );

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
      body: JSON.stringify({ ...project }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          if (fetchMethod === "POST") {
            if (systemMode === "Freelancer") {
              setFreelancerProjects([...freelancerProjects, project]);
            } else {
              setBuyerProjects([...buyerProjects, project]);
            }
          } else if (fetchMethod === "PATCH") {
            if (systemMode === "Freelancer") {
              const updatedProjects = freelancerProjects.map(
                (selectedProject) => {
                  if (selectedProject.id === project.id) {
                    return project;
                  }
                  return selectedProject;
                }
              );
              setFreelancerProjects([...updatedProjects]);
            } else {
              const updatedProjects = buyerProjects.map((selectedProject) => {
                if (selectedProject.id === project.id) {
                  return project;
                }
                return selectedProject;
              });
              setBuyerProjects([...updatedProjects]);
            }
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
        if (systemMode === "Freelancer") {
          const filteredProjects = freelancerProjects.filter(project => project.id !== deletedProject)
          setFreelancerProjects(filteredProjects)
        } else {
          const filteredProjects = buyerProjects.filter(project => project.id !== deletedProject)
          setBuyerProjects(filteredProjects)
        }
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
      <ProjectsList
        projects={
          systemMode === "Freelancer" ? freelancerProjects : buyerProjects
        }
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </>
  );
}
