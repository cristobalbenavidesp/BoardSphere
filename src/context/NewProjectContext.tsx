"use client";
import { useNewProjectReducer } from "@/reducers/newProjectReducer";
import type { Project, User } from "@prisma/client";
import { ReactNode, createContext } from "react";

type ProjectDataType = Pick<
  Project,
  "title" | "organization" | "description" | "invitation_type"
>;

type ContextType = {
  modalStatus: boolean;
  chapters: { title: string; description: string }[];
  pageIndex: number;
  projectData: ProjectDataType;
  newChapter: { title: string; description: string };
  resetModal: () => void;
  toggleModal: (payload: boolean) => void;
  nextPage: (payload: { title: string; description: string }) => void;
  prevPage: () => void;
  changeNewChapter: (payload: { title?: string; description?: string }) => void;
  changeProjectData: (payload: ProjectDataType) => void;
  createProject: (payload: { session: Omit<User, "password"> }) => void;
};

export const newProjectContext = createContext<ContextType>({} as ContextType);

export const NewProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    modalStatus,
    chapters,
    dispatch,
    pageIndex,
    project: projectData,
    newChapter,
  } = useNewProjectReducer();

  function resetModal() {
    dispatch({ type: "RESET" });
  }

  function nextPage(payload: { title: string; description: string }) {
    dispatch({ type: "NEXT_PAGE", payload: payload });
  }

  function prevPage() {
    dispatch({ type: "PREV_PAGE" });
  }

  function toggleModal(payload: boolean) {
    dispatch({ type: "TOGGLE", payload: payload });
  }

  function changeProjectData(
    payload: Pick<
      Project,
      "title" | "organization" | "description" | "invitation_type"
    >
  ) {
    dispatch({ type: "CHANGE_PROJECT_DATA", payload: payload });
  }

  function changeNewChapter(payload: { title?: string; description?: string }) {
    dispatch({ type: "CHANGE_NEW_CHAPTER", payload: payload });
  }

  function createProject(payload: { session: Omit<User, "password"> }) {
    dispatch({ type: "CREATE_PROJECT", payload: payload });
  }

  return (
    <newProjectContext.Provider
      value={{
        modalStatus,
        chapters,
        pageIndex,
        projectData,
        newChapter,
        resetModal,
        toggleModal,
        nextPage,
        prevPage,
        changeNewChapter,
        changeProjectData,
        createProject,
      }}
    >
      {children}
    </newProjectContext.Provider>
  );
};
