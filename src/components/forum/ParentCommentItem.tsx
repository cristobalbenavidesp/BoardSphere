"use client";
import type { Comment, Post, User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { postItemType } from "./types";

function ParentCommentItem({
  comment,
  post,
}: {
  comment: Comment & {
    user: Omit<User, "password">;
    parent_comment?: Comment & { user: Omit<User, "password"> };
  };
  post: postItemType;
}) {
  return (
    <article>
      <small className="font-bold text-neutral-600">Respondiendo a...</small>
      <Link href={`/projects/${post.project_id}/forum/${comment.id}`}>
        <div className="p-4 mb-2 border w-full max-w-[35rem] hover:bg-slate-400/10">
          <p className="italic">{comment.content}</p>
          <small>
            <span className="font-semibold">
              {comment.user.first_name} {comment.user.last_name}
            </span>
            <span className="mx-1">•</span>
            <span className="font-semibold">
              {dayjs(comment.createdAt).format("DD MMMM YYYY")}
            </span>
          </small>
        </div>
      </Link>
    </article>
  );
}

export default ParentCommentItem;
