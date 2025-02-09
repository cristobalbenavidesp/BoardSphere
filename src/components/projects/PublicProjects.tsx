"use client";
import Button from "../ui/Button";
import SearchBar from "../searchbar/SearchBar";
import ProjectCard from "../project_card/ProjectCard";
import { useSession } from "@/hooks/useSession";
import { Project, ProjectInvitation } from "@prisma/client";
import { useEffect, useState } from "react";
import { useNewProjectReducer } from "@/reducers/newProjectReducer";
import CreateProjectModal from "../create-project-modal/CreateProjectModal";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { NewProjectContextProvider } from "@/context/NewProjectContext";
import useCreateProject from "@/hooks/useCreateProject";

export default function PublicProjects({ projects }: { projects: Project[] }) {
  const { session } = useSession();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects || []
  );
  const [userInscriptions, setUserInscriptions] = useState<Project[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const query = useSearchParams().get("query") || "";

  const { toggleModal } = useCreateProject();

  useEffect(() => {
    if (!session) return;

    const abortController = new AbortController();
    fetch(`api/users/${session?.RUT}/invitations`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data: (ProjectInvitation & { project: Project })[]) =>
        data.filter((p) => p.status === "accepted")
      )
      .then((data: (ProjectInvitation & { project: Project })[]) =>
        data.map((p) => p.project as Project)
      )
      .then((data: Project[]) => {
        setUserInscriptions(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
      });

    return () => {
      abortController.abort();
    };
  }, [session]);

  useEffect(() => {
    if (!query) {
      router.replace(`${pathname}`);
    }

    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, projects, pathname, router]);

  const onSearch = (search: string) => {
    if (!search) {
      setFilteredProjects(projects || []);
      router.replace(`${pathname}`);
    }
    router.replace(`${pathname}?query=${search}`);
  };

  return (
    <article className="h-full p-2">
      <div className="flex gap-5">
        <Button
          className="hover:bg-blue-800 hover:text-white"
          method={(event) => {
            event.preventDefault();
            if (!session) {
              import("react-hot-toast").then(({ toast }) => {
                toast.error("Debes iniciar sesión para crear un proyecto");
              });
              return false;
            }

            toggleModal(true);
          }}
        >
          Crear Proyecto
        </Button>
        <SearchBar onSearch={onSearch} />
      </div>
      <ul className="flex flex-col gap-4 py-4">
        {filteredProjects.map((project) => {
          return (
            <li key={project.id}>
              <ProjectCard
                project={project}
                letInscribe={
                  project.user_rut !== session?.RUT &&
                  userInscriptions.every((p) => p.id !== project.id)
                }
              />
            </li>
          );
        })}
      </ul>
      <CreateProjectModal />
    </article>
  );
}
