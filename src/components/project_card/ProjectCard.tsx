"use client";
import Image from "next/image";

import Button from "../ui/Button";
import { useSession } from "../../hooks/useSession";
import Link from "next/link";
import type { Project } from "@prisma/client";

function joinProject(project: Project, RUT: string) {
  if (!RUT) return;

  if (project.invitation_type === "open") {
    fetch(`/api/projects/${project.id}/invitations`, {
      method: "POST",
      body: JSON.stringify({
        RUT,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      import("react-hot-toast").then(({ toast }) => {
        response.status === 200
          ? toast.success("Te has unido al proyecto")
          : toast.error("No se ha podido unir al proyecto");
      });
    });
  } else {
    fetch(`/api/users/${RUT}/invitations/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        import("react-hot-toast").then(({ toast }) => {
          response.status === 200
            ? toast.success("Te has unido al proyecto")
            : toast.error("No se ha podido unir al proyecto");
        });
      })
      .catch((err) => {
        import("react-hot-toast").then(({ toast }) => {
          toast.error("No se ha podido unir al proyecto");
        });
      });
  }
}

function ProjectCard({
  project,
  letInscribe = false,
}: {
  project: Project;
  letInscribe?: boolean;
}) {
  const { session } = useSession();
  return !letInscribe ? (
    <Link href={`/projects/${project.id}`}>
      <article className="relative h-[10rem] w-full overflow-hidden rounded-xl shadow-lg flex">
        <Image
          className="object-cover aspect-auto w-[18rem]"
          alt="Project image"
          src="https://lyon.palmaresdudroit.fr/images/joomlart/demo/default.jpg"
          width={500}
          height={500}
        />
        <div className="w-full h-full flex flex-col p-4">
          <h1 className="text-lg font-bold">
            {project.title || "Nombre del proyecto"}
          </h1>
          <p className="text-sm">
            {project.description || "Descripción del proyecto"}
          </p>
          <small className="mt-5 font-bold italic">
            {project.organization} {project.official ? null : "(No oficial)"}
          </small>
        </div>
      </article>
    </Link>
  ) : (
    <article className="relative h-[10rem] w-full overflow-hidden rounded-xl shadow-lg flex">
      <Image
        className="object-cover aspect-auto w-[18rem]"
        alt="Project image"
        src="https://lyon.palmaresdudroit.fr/images/joomlart/demo/default.jpg"
        width={500}
        height={500}
      />
      <div className="w-full h-full flex flex-col p-4">
        <h1 className="text-lg font-bold">
          {project.title || "Nombre del proyecto"}
        </h1>
        <p className="text-sm">
          {project.description || "Descripción del proyecto"}
        </p>
        <small className="mt-5 font-bold italic">
          {project.organization} {project.official ? null : "(No oficial)"}
        </small>
      </div>
      {letInscribe && (
        <Button
          className="absolute bottom-4 right-4 bg-blue-800 text-white"
          method={() => {
            if (!session) return;
            fetch(`/api/projects/${project.id}/invitations`, {
              method: "POST",
              body: JSON.stringify({
                RUT: session.RUT,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              import("react-hot-toast").then(({ toast }) => {
                response.status === 200
                  ? toast.success("Te has unido al proyecto")
                  : toast.error("No se ha podido unir al proyecto");
              });
            });
          }}
        >
          Unirse
        </Button>
      )}
    </article>
  );
}

export default ProjectCard;
