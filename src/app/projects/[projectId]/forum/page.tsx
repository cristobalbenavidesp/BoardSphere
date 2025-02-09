import PostEditor from "@/components/forum/PostEditor";
import PostItem from "@/components/forum/PostItem";
import type { Comment, Post, User } from "@prisma/client";

type fetchedPost = Omit<Post, "createdAt"> & {
  creator: Omit<User, "password">;
  createdAt: string;
  comments: (Comment & {
    user: Omit<User, "password">;
    parent_comment?: Comment & { user: Omit<User, "password"> };
  })[];
};

function getPosts(projectId: string) {
  return fetch(`http://localhost:3000/api/projects/${projectId}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  })
    .then((res) => {
      console.log(res);
      if (res.ok) return res.json();
      throw new Error("Error fetching project posts");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const posts = (await getPosts(params.projectId)) as fetchedPost[] | undefined;
  return (
    <div className="bg-gray-100 h-screen flex flex-col place-items-center">
      <section className="w-[8.5in] h-full bg-white shadow-md py-8 px-10 overflow-y-scroll">
        <h1 className="text-2xl font-semibold">
          Welcome to the discussion forum!
        </h1>
        <p className="mt-2 text-pretty text-lg">
          In this section you can freely discuss the topics relevant to the
          project.
          <strong className="font-semibold text-blue-900 ml-1">
            The messages you write in this discussion forum will be backed up in
            the report generated at the end of the project.
          </strong>
        </p>
        {posts?.length === 0 && (
          <p className="text-pretty text-lg mt-4">
            There are no posts in this project yet.
            <strong className="inline ml-1 font-semibold text-blue-800">
              Be the first to post something!
            </strong>
          </p>
        )}
        <PostEditor />
        <ul className="py-4 flex flex-col gap-2">
          {posts?.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
}
