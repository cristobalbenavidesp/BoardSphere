import { newProjectContext } from "@/context/NewProjectContext";
import { useContext } from "react";

function useCreateProject() {
  const data = useContext(newProjectContext);

  return data;
}

export default useCreateProject;
