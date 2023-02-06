import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../components/App";
import { useSystemMode } from "../../SystemModeContext";
import ActiveProjectsList from "./components/ActiveProjectsList";
import PreviousProjectsList from "./components/PreviousProjectsList";
import ProjectsForm from "./components/ProjectsForm";

export default function ProjectsIndex() {

  const user = useUser();
  const systemMode = useSystemMode();

  console.log(user)
  return (
    <>
      <h1 className="page-header">Your {systemMode} Projects</h1>
      <ProjectsForm />
      <ActiveProjectsList projects={""} />
      <PreviousProjectsList projects={""} />
    </>
  )
}
