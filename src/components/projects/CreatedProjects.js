"use client";
import { useState, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import ProjectCard from "../project_card/ProjectCard";

export default function CreatedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    if (!session) return;

    const abortController = new AbortController();
    fetch(`api/users/${session.RUT}/projects`, {
      method: "GET",
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((projects) => {
        setProjects(projects);
        setLoading(false);
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.log(error);
        }
      });

    return () => abortController.abort();
  }, [session]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {projects.length > 0 ? (
        <ul className="flex flex-col gap-4 py-4 px-2">
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <ProjectCard
                  project={project}
                  RUT={session?.RUT}
                  letInscribe={false}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="mx-2 my-4">No has creado ningún proyecto</h1>
      )}
    </>
  );
}
