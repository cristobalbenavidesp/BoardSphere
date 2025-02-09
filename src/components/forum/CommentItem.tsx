"use client";
import dayjs from "dayjs";
import Button from "../ui/Button";
import { useState } from "react";
import CommentEditor from "./CommentEditor";
import ParentCommentItem from "./ParentCommentItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { commentResponseType, postItemType } from "./types";

export default function CommentItem({
  comment,
  post,
}: {
  comment: commentResponseType;
  post: postItemType;
}) {
  const [editorOpen, setEditorOpen] = useState(false);
  const pathName = usePathname();
  const commentPath = `/projects/${post.project_id}/forum/${comment.id}`;
  return (
    <>
      <article
        className={`p-4 w-full h-fit ${
          pathName !== commentPath
            ? "max-w-[40rem] border"
            : "bg-slate-50 rounded-md text-lg"
        }`}
      >
        {comment.parent_comment && (
          <ParentCommentItem comment={comment.parent_comment} post={post} />
        )}
        <p>{comment.content}</p>
        <small className="font-semibold">
          {comment.user!.first_name} {comment.user!.last_name}
        </small>
        <span className="mx-1">•</span>
        <small className="font-semibold">
          {dayjs(comment.createdAt).format("DD MMMM YYYY")}
        </small>
        <div>
          {editorOpen ? (
            <CommentEditor
              postId={comment.post_id}
              parentCommentId={comment.id}
              setOpen={setEditorOpen}
            />
          ) : (
            <Button
              className="text-sm bg-sky-500 text-white mt-2"
              method={() => {
                setEditorOpen((prev) => !prev);
              }}
            >
              Reply
            </Button>
          )}
          {pathName !== `/projects/${post.project_id}/forum/${comment.id}` && (
            <Link href={`/projects/${post.project_id}/forum/${comment.id}`}>
              <span className="p-2 text-sm rounded-xl bg-blue-800 text-white ml-2">
                See replies
              </span>
            </Link>
          )}
        </div>
      </article>
    </>
  );
}
