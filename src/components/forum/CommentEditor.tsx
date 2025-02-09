"use client";
import { useSession } from "@/hooks/useSession";
import { Comment } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs";

function CommentEditor({
  postId,
  parentCommentId,
  setOpen,
}: {
  postId: string;
  parentCommentId?: string;
  setOpen: (open: boolean) => void;
}) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const { session } = useSession();
  const params = useParams();
  const router = useRouter();
  const toggleBold = () => setBold((prev) => !prev);
  const toggleItalic = () => setItalic((prev) => !prev);
  const toggleUnderline = () => setUnderline((prev) => !prev);

  return (
    <form
      className="w-full max-w-[30rem] border min-h-[10rem] p-2 mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const content = (target[0] as HTMLTextAreaElement).value;
        const commentToSend: Omit<Comment, "id" | "createdAt" | "updatedAt"> = {
          user_rut: session!.RUT,
          post_id: postId,
          parent_comment_id: parentCommentId ?? null,
          content,
        };

        fetch(`/api/projects/${params.projectId}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentToSend),
        }).then((res) => {
          if (!res.ok) throw new Error("Error posting comment");

          import("react-hot-toast")
            .then(({ toast }) => {
              toast.success("Comentario enviado con éxito");
              setOpen(false);
              router.refresh();
            })
            .catch((error) => {
              import("react-hot-toast").then(({ toast }) => {
                toast.error(error.message);
              });
            });
        });
      }}
    >
      <textarea className="w-full h-[7em] resize-none border" />
      <div className="text-lg flex gap-1 py-1">
        <button
          type="button"
          className={`aspect-square w-8 border grid place-items-center ${
            bold ? "bg-neutral-400/60" : "bg-neutral-200/30"
          } hover:bg-neutral-300/80`}
          onClick={toggleBold}
        >
          <BsTypeBold />
        </button>
        <button
          type="button"
          className={`aspect-square w-8 border grid place-items-center ${
            italic ? "bg-neutral-400/60" : "bg-neutral-200/30"
          } hover:bg-neutral-300/80`}
          onClick={toggleItalic}
        >
          <BsTypeItalic />
        </button>
        <button
          type="button"
          className={`aspect-square w-8 border grid place-items-center ${
            underline ? "bg-neutral-400/60" : "bg-neutral-200/30"
          } hover:bg-neutral-300/80`}
          onClick={toggleUnderline}
        >
          <BsTypeUnderline />
        </button>
        <button
          className="text-sm px-5 h-8 border rounded-full ml-5 hover:bg-secondary hover:text-white"
          type="submit"
        >
          Reply
        </button>
      </div>
    </form>
  );
}

export default CommentEditor;
