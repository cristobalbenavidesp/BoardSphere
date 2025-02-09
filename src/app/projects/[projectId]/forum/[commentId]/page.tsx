import CommentItem from "@/components/forum/CommentItem";
import { commentResponseType } from "@/components/forum/types";
import type { Comment, Post, User } from "@prisma/client";
import { useParams } from "next/navigation";

async function getComment(id: string, projectId: string) {
  return fetch(
    `http://localhost:3000/api/projects/${projectId}/posts/comments?commentId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data as commentResponseType;
    });
}
export default async function Forum({
  params,
}: {
  params: { projectId: string; commentId: string };
}) {
  const comment = await getComment(params.commentId, params.projectId);

  return (
    <div className="bg-gray-100 h-screen flex flex-col place-items-center">
      <section className="w-[8.5in] h-full bg-white shadow-md py-8 px-10 overflow-y-scroll">
        <h1 className="text-2xl font-semibold mb-2">
          Comentario de {comment.user!.first_name} {comment.user!.last_name}
        </h1>
        <CommentItem comment={comment} post={comment.post!} />
      </section>
    </div>
  );
}
