import type { Comment, User } from "@prisma/client";

function Comments({
  comments,
}: {
  comments: (Comment & { user: Omit<User, "password"> })[];
}) {
  return comments.length > 0 ? (
    <ul className="w-full mt-2 flex flex-col gap-3">
      {comments.map((comment) => (
        <li className="w-full p-4 border" key={comment.id}>
          <h1 className="text-xl italic">&ldquo;{comment.content}&rdquo;</h1>
          <p className="text-gray-500 text-sm">
            {comment.user?.first_name} {comment.user?.last_name},{" "}
            {comment.user?.profession}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <h2 className="w-full m-2">No hay comentarios por el momento</h2>
  );
}

export default Comments;
