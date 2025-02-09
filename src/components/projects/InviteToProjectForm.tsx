"use client";
import type { Project, ProjectInvitation } from "@prisma/client";
import Button from "../ui/Button";
import { projectInvitationTypes } from "@/constants/democratic";
import { useSession } from "@/hooks/useSession";

function sendInvite(
  projectId: string,
  rut: string,
  handleSuccess: (invitation: ProjectInvitation) => void,
  handleError: (error: string) => void
) {
  fetch(`http://localhost:3000/api/projects/${projectId}/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rut }),
  })
    .then((response) => response.json())
    .then((invitation) => {
      handleSuccess(invitation);
    })
    .catch((error: Error) => {
      handleError(error.message);
    });
}

export default function InviteToProjectForm({ project }: { project: Project }) {
  const { session } = useSession();
  if (
    project.invitation_type === projectInvitationTypes.ONLY_CREATOR &&
    session?.RUT !== project.user_rut
  )
    return null;

  return (
    <form
      className=" flex flex-col  rounded bg-white p-4 max-w-xs shadow-lg"
      onSubmit={(event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const rut = (target[0] as HTMLInputElement).value;
        sendInvite(
          project.id,
          rut,
          () => {
            import("react-hot-toast").then(({ toast }) => {
              toast.success("Invitación enviada");
            });
          },
          (error) => {
            import("react-hot-toast").then(({ toast }) => {
              toast.error(error);
            });
          }
        );
      }}
    >
      <h2 className="font-bold text-center">
        Invita gente a participar de este proyecto!
      </h2>
      <label htmlFor={"rut-input"} className="font-semibold">
        RUT
      </label>
      <input
        className="p-2 border rounded shadow-sm"
        placeholder="RUT del invitado"
        id={"rut-input"}
      />
      <Button className="mt-2 bg-blue-800 text-white self-center" type="submit">
        Invitar al proyecto
      </Button>
    </form>
  );
}
