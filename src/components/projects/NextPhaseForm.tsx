"use client";

import { useSession } from "@/hooks/useSession";
import Button from "../ui/Button";
import { nextPhase } from "@/helpers/projects";
import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

function NextPhaseForm({ project }: { project: Project }) {
  const { session } = useSession();
  const router = useRouter();

  if (!session || session.RUT !== project.user_rut) return null;

  return (
    <div className="flex flex-col mt-5 rounded bg-white p-4 w-full max-w-xs shadow-lg">
      <h2 className="font-bold text-balance text-center">
        Avanza a la siguiente fase!
      </h2>
      <h3 className="font-semibold opacity-50 text-center">
        Fase actual: {project.phase}
      </h3>
      <Button
        className="mt-2 w-52 bg-blue-800 text-white font-semibold self-center"
        method={() => {
          if (project.phase === 4) {
            router.push(`/projects/${project.id}/report`);
          } else {
            nextPhase(project.id, project.phase)
              .then(() => {
                import("react-hot-toast").then(({ toast }) => {
                  toast.success("Fase avanzada con éxito");
                });
                router.refresh();
              })
              .catch((error) => {
                import("react-hot-toast").then(({ toast }) => {
                  toast.error(`Error al avanzar de fase: ${error?.message}`);
                });
              });
          }
        }}
      >
        {project.phase === 4 ? "Generar reporte" : "Siguiente fase"}
      </Button>
    </div>
  );
}

export default NextPhaseForm;
