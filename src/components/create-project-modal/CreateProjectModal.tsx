"use client";
import Modal from "../modal/Modal";
import CreateProjectForm from "../form/CreateProjectForm";
import Button from "../ui/Button";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import useCreateProject from "@/hooks/useCreateProject";

function CreateProjectModal() {
  const { session } = useSession();
  const router = useRouter();

  const {
    modalStatus: status,
    pageIndex: modalPageIndex,
    newChapter,
    resetModal,
    changeProjectData,
    nextPage,
    createProject,
    changeNewChapter,
    prevPage,
  } = useCreateProject();
  return (
    <Modal showModal={status}>
      {modalPageIndex === 1 && (
        <article className="w-fit bg-white p-4 rounded-lg mx-auto relative">
          <button className="absolute top-2 right-4" onClick={resetModal}>
            X
          </button>
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Crear Proyecto
          </h1>
          <CreateProjectForm
            onSubmit={({
              title,
              description,
              organization,
              imageUrl,
              invitationType,
            }) => {
              changeProjectData({
                title,
                description,
                organization,
                invitation_type: invitationType,
              });
              nextPage({ title: "", description: "" });
            }}
          />
        </article>
      )}
      {modalPageIndex > 1 && (
        <article className="w-[30rem] bg-white p-4 rounded-lg mx-auto relative">
          <button
            className="absolute top-2 right-4"
            onClick={(event) => {
              event.preventDefault();
              resetModal();
            }}
          >
            X
          </button>
          {modalPageIndex === 2 && (
            <>
              <h1 className="text-2xl font-bold">Crear formato</h1>
              <p className="mt-2 mb-4">
                En este paso deberás especificar los puntos a tratar en tu
                proyecto en forma de capítulos, entregando para cada uno un
                titulo y una descripción que sirva como guía para proponer los
                artículos
              </p>
            </>
          )}
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              session && createProject({ session });
            }}
          >
            <label className="font-semibold">
              Titulo del capitulo
              <input
                onChange={(event) => {
                  changeNewChapter({ title: event.target.value });
                }}
                value={newChapter?.title || ""}
                type="text"
                className="border rounded-xl p-2 mb-2"
                placeholder="Titulo"
              />
            </label>
            <label className="font-semibold">
              Descripción del capitulo
              <textarea
                onChange={(event) => {
                  changeNewChapter({ description: event.target.value });
                }}
                value={newChapter?.description || ""}
                className="border rounded-xl p-2 mb-2 resize-none"
                placeholder="Descripción"
              />
            </label>
            <div className="flex gap-3">
              {modalPageIndex > 2 && (
                <Button
                  type="button"
                  method={(event) => {
                    event.preventDefault();
                    prevPage();
                  }}
                >
                  Anterior
                </Button>
              )}
              <Button
                method={(event) => {
                  event.preventDefault();
                  if (!newChapter.title || !newChapter.description) return;
                  nextPage(newChapter);
                }}
                type="button"
              >
                Siguiente capitulo
              </Button>
              <Button type="submit">Crear proyecto</Button>
            </div>
          </form>
        </article>
      )}
    </Modal>
  );
}

export default CreateProjectModal;
