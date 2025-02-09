"use client";
import ProjectCard from "../project_card/ProjectCard";
import { useState, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import type { Project, ProjectInvitation } from "@prisma/client";
export default function InscribedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    if (!session) return;
    const abortController = new AbortController();

    fetch(`api/users/${session.RUT}/invitations`, {
      method: "GET",
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((invitations: (ProjectInvitation & { project: Project })[]) => {
        const inscriptions = invitations.filter(
          (invitation) => invitation.status === "accepted"
        );
        if (inscriptions.length === 0) {
          setLoading(false);
          return;
        }
        setProjects(inscriptions.map((inscription) => inscription.project));
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
      });

    return () => abortController.abort();
  }, [session]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="w-full h-full px-2 py-4">
      {projects.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <ProjectCard project={project} letInscribe={false} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No hay proyectos inscritos</h1>
      )}
    </div>
  );
}
