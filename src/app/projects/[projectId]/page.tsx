import Link from "next/link";
import Chapter from "@/components/editionpage/Chapter";
import type { Chapter as ChapterType, Project } from "@prisma/client";
import InviteToProjectForm from "@/components/projects/InviteToProjectForm";
import NextPhaseForm from "@/components/projects/NextPhaseForm";
import Button from "@/components/ui/Button";
import ForumLinkCard from "@/components/project_card/ForumLinkCard";

async function Page({ params }: { params: { projectId: string } }) {
  const project: Project & { chapters: ChapterType[] } = await fetch(
    `http://localhost:3000/api/projects/${params.projectId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((res) => {
      console.log(res);
      if (res.ok) return res.json();
      throw new Error("Error fetching project");
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="bg-gray-100 h-full flex flex-col place-items-center">
      <div className="w-[8.5in] h-[11in] bg-white shadow-md py-4 px-10 overflow-y-scroll">
        <br />
        <h1 className="italic font-bold text-center text-xl">
          {project.title}
        </h1>
        <br />
        {project.chapters?.map((chapter, index) => {
          return (
            <Link
              key={index}
              href={`/projects/${params.projectId}/chapters/${index + 1}`}
            >
              <div className="hover:bg-gray-900/10 rounded-lg">
                <Chapter title={chapter.title} desc={chapter.description} />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="absolute right-10 top-10">
        <InviteToProjectForm project={project} />
        <NextPhaseForm project={project} />
        <ForumLinkCard />
      </div>
    </div>
  );
}

export default Page;
