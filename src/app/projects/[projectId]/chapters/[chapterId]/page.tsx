import { ParticipationProvider } from "@/context/ParticipationContext";
import Chapter from "@/components/editionpage/Chapter";
import Editor from "@/components/editor/Editor";
import Articles from "@/components/sections/Articles";
import type {
  Article,
  Chapter as ChapterType,
  Clause,
  Project,
  User,
} from "@prisma/client";

async function Page({
  params,
}: {
  params: {
    projectId: string;
    chapterId: string;
  };
}) {
  const chapter = await fetch(
    `http://localhost:3000/api/projects/${params.projectId}/chapters/${params.chapterId}`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
        "User-Agent": "BoardSphere-Client/1.0",
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.articles.length);
      return data;
    })
    .catch((err) => console.log(err));

  return (
    <div className="bg-gray-100 h-screen flex flex-col place-items-center">
      <div className="w-[8.5in] h-full bg-white shadow-md py-4 px-10 overflow-y-auto">
        <br />
        <Chapter title={chapter?.title} desc={chapter?.description} />
        {chapter?.project?.phase === 1 && (
          <Editor chapterId={chapter?.id} projectId={chapter?.project_id} />
        )}
        <Articles
          articles={chapter?.articles}
          phase={chapter?.project?.phase}
        />
      </div>
    </div>
  );
}

export default Page;
