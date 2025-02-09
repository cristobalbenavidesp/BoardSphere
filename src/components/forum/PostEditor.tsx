"use client";
import { useSession } from "@/hooks/useSession";
import type { Post } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs";
import Button from "../ui/Button";

function PostEditor() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const toggleBold = () => setBold((prev) => !prev);
  const toggleItalic = () => setItalic((prev) => !prev);
  const toggleUnderline = () => setUnderline((prev) => !prev);
  const params = useParams();
  const router = useRouter();
  const { session } = useSession();

  if (!session) return null;

  return (
    <form
      className="w-full border min-h-[10em] p-2 mt-2 flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const titleInput = target[0] as HTMLInputElement;
        const contentInput = target[1] as HTMLTextAreaElement;
        const post: Omit<Post, "id" | "createdAt" | "updatedAt"> = {
          title: titleInput.value,
          content: contentInput.value,
          project_id: params.projectId as string,
          user_rut: session.RUT,
        };

        fetch(`/api/projects/${params.projectId}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => {
            if (res.ok) {
              titleInput.value = "";
              contentInput.value = "";
              import("react-hot-toast").then(({ toast }) => {
                toast.success("Post created successfully");
                router.refresh();
              });
            } else {
              throw new Error("Error creating post");
            }
          })
          .catch((error) => {
            import("react-hot-toast").then(({ toast }) => {
              toast.error(error.message);
              router.refresh();
            });
          });
      }}
    >
      <label>
        <span className="text-sm font-semibold text-blue-900">Title</span>
        <input type="text" className="w-full border" />
      </label>
      <label>
        <span className="text-sm font-semibold text-blue-900">Content</span>
        <textarea className="w-full h-[7em] resize-none border" />
      </label>
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
        <Button
          className="text-sm bg-blue-800 text-white ml-auto"
          type="submit"
        >
          Post
        </Button>
      </div>
    </form>
  );
}

export default PostEditor;
