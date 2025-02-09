import type { Comment, Post, User } from "@prisma/client";

export type commentResponseType = Comment & {
  post: postItemType;
  user: Omit<User, "password">;
  parent_comment?: Comment & { user: Omit<User, "password"> };
  comments?: commentResponseType[];
};

export type postItemType = Omit<Post, "createdAt"> & {
  creator: Omit<User, "password">;
  createdAt: string;
  comments: (Comment & {
    user: Omit<User, "password">;
    parent_comment?: Comment & { user: Omit<User, "password"> };
  })[];
};
