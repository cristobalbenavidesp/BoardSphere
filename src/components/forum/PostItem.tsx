"use client";
import type { Comment, Post, User } from "@prisma/client";
import Button from "../ui/Button";
import dayjs from "dayjs";
import { useState } from "react";
import CommentEditor from "./CommentEditor";
import CommentItem from "./CommentItem";
import { commentResponseType, postItemType } from "./types";

function PostItem({ post }: { post: postItemType }) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <div>
      <article className="w-full border rounded p-5 relative">
        <h2 className="text-2xl font-bold text-wrap">{post.title}</h2>
        <p className="text-pretty">{post.content}</p>
        <small className="italic font-bold">
          {post.creator.first_name} {post.creator.last_name}
          <span className="ml-1">
            • {post.createdAt && dayjs(post.createdAt).format("DD MMMM YYYY")}
          </span>
        </small>
        <div className="flex gap-2">
          <Button
            className="bg-blue-800 text-white py-1 block mt-5"
            method={() => {
              setEditorOpen((prev) => !prev);
            }}
          >
            Comment
          </Button>
          {post.comments.length > 0 && (
            <Button
              className="bg-blue-800 text-white py-1 block mt-5"
              method={() => {
                setCommentsOpen((prev) => !prev);
              }}
            >
              {commentsOpen ? "Hide comments" : "Show comments"}
            </Button>
          )}
        </div>
      </article>
      {editorOpen && <CommentEditor postId={post.id} setOpen={setEditorOpen} />}
      {commentsOpen && (
        <ul className="mt-2 flex flex-col gap-2">
          {post.comments?.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                comment={comment as commentResponseType}
                post={post}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PostItem;
