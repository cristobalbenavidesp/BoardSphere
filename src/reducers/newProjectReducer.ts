import { useReducer } from "react";
import type { Project, User } from "@prisma/client";

interface PayloadTypes {
  TOGGLE: boolean;
  RESET: null;
  NEXT_PAGE: { title: string; description: string };
  PREV_PAGE: null;
  CHANGE_NEW_CHAPTER: { title?: string; description?: string };
  CHANGE_PROJECT_DATA: Pick<
    Project,
    "title" | "organization" | "description" | "invitation_type"
  >;
  CREATE_PROJECT: { session: Omit<User, "password"> };
}

export type Payload = PayloadTypes[keyof PayloadTypes];

export interface NewProjectPageState {
  pageIndex: number;
  chapters: { title: string; description: string }[];
  project: Pick<
    Project,
    "description" | "organization" | "title" | "invitation_type"
  >;
  modalStatus: boolean;
  newChapter: { title: string; description: string };
}

const MODAL_PAGE_ACTIONS: { [action: string]: any } = {
  TOGGLE: (
    state: NewProjectPageState,
    action: { type: string; payload: PayloadTypes["TOGGLE"] }
  ) => {
    const { modalStatus } = state;
    const { payload: newState } = action;
    return newState
      ? { ...state, modalStatus: newState }
      : { ...state, modalStatus: !modalStatus };
  },
  RESET: (state: NewProjectPageState) => {
    return {
      ...state,
      pageIndex: 1,
      chapters: [],
      project: {},
      modalStatus: false,
      newChapter: { title: "", description: "" },
    };
  },
  NEXT_PAGE: (
    state: NewProjectPageState,
    action: { type: string; payload: PayloadTypes["NEXT_PAGE"] }
  ) => {
    const { payload } = action;
    const newState = structuredClone(state);
    const { chapters, pageIndex } = newState;
    const currentChapter = chapters[pageIndex - 2];
    const nextChapter = chapters[pageIndex - 1];

    nextChapter
      ? (newState.newChapter = nextChapter)
      : (newState.newChapter = { title: "", description: "" });

    if (!payload || !payload.title || !payload.description) {
      newState.pageIndex = pageIndex + 1;
      return newState;
    }

    if (
      currentChapter &&
      (payload.title !== currentChapter.title ||
        payload.description !== currentChapter.description)
    ) {
      newState.chapters[pageIndex - 2] = payload;
    } else if (!chapters[pageIndex - 2]) {
      newState.chapters = [...chapters, payload];
    }

    newState.pageIndex = newState.pageIndex + 1;
    return newState;
  },
  PREV_PAGE: (state: NewProjectPageState) => {
    const newState = structuredClone(state);
    const newPageIndex = newState.pageIndex - 1;
    const newChapter = newState.chapters[newPageIndex - 2];

    newState.pageIndex = newPageIndex;
    newState.newChapter = newChapter;
    return newState;
  },

  CHANGE_NEW_CHAPTER: (
    state: NewProjectPageState,
    action: { type: string; payload: PayloadTypes["CHANGE_NEW_CHAPTER"] }
  ) => {
    const { payload } = action;
    const newChapter = structuredClone(state.newChapter);
    const newState = structuredClone(state);
    newState.newChapter = { ...newChapter, ...payload };
    return newState;
  },
  CHANGE_PROJECT_DATA: (
    state: NewProjectPageState,
    action: { type: string; payload: PayloadTypes["CHANGE_PROJECT_DATA"] }
  ) => {
    const { payload } = action;
    const newState = structuredClone(state);
    if (
      !payload ||
      !payload?.title ||
      !payload?.description ||
      !payload.organization
    ) {
      return newState;
    }

    newState.project = { ...payload };
    return newState;
  },
  CREATE_PROJECT: (
    state: NewProjectPageState,
    action: { type: string; payload: PayloadTypes["CREATE_PROJECT"] }
  ) => {
    const { session } = action.payload;
    const project = {
      ...state.project,
      official: false,
      user_rut: session.RUT,
    };
    const chapters =
      state.newChapter.title && state.newChapter.description
        ? [...state.chapters, state.newChapter]
        : state.chapters;

    const controller = new AbortController();
    fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project, chapters }),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("failed to create new project");
        import("react-hot-toast").then(({ toast }) => {
          toast.success("Proyecto creado con éxito");
        });
        MODAL_PAGE_ACTIONS["RESET"]();
      })
      .catch((err) => {
        import("react-hot-toast").then(({ toast }) => {
          toast.error("Error al crear el proyecto");
        });
        console.log(err.message);
      });
  },
};

const newProjectPageReducer = (
  state: NewProjectPageState,
  action: { type: string; payload: PayloadTypes }
) => {
  const updateState = MODAL_PAGE_ACTIONS[action.type];
  return updateState ? updateState(state, action) : state;
};

const initialState = {
  pageIndex: 1,
  chapters: [],
  project: {
    title: "",
    description: "",
    organization: "",
    invitation_type: "",
  },
  modalStatus: false,
  newChapter: { title: "", description: "" },
} as NewProjectPageState;

export function useNewProjectReducer() {
  const [modalData, dispatch] = useReducer(newProjectPageReducer, initialState);

  return { ...modalData, dispatch } as {
    pageIndex: number;
    chapters: { title: string; description: string }[];
    project: Pick<
      Project,
      "description" | "organization" | "title" | "invitation_type"
    >;
    modalStatus: boolean;
    newChapter: { title: string; description: string };
    dispatch: (arg0: { type: string; payload?: Payload }) => void;
  };
}
