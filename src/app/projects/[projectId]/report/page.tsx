import { getProjectData, getReportData } from "@/helpers/apiFunctions";
import { Article, Clause, Comment, Post, User } from "@prisma/client";
import Image from "next/image";

type UserWithoutPassword = Omit<User, "password">;
type ClauseWithCreator = Clause & { creator: UserWithoutPassword };
type FormattedArticle = Article & { clauses: Clause[] } & {
  creator: UserWithoutPassword;
};

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const report = await getReportData(params.projectId);

  return (
    <div className="bg-gray-100 h-screen flex flex-col place-items-center">
      <article className="w-[8.5in] h-full bg-white shadow-md py-8 px-10 overflow-y-scroll flex flex-col gap-5">
        <section className="flex gap-10 py-5">
          <Image src="" alt="project image" className="bg-black h-52 w-44" />
          <div className="my-auto">
            <h1 className="text-2xl font-bold text-balance">
              Reporte: {report.project?.title}
            </h1>
            <p>
              <b>Fecha de creación</b>: {report.project?.createdAt}
            </p>
            <p>
              <b>Fecha de cierre</b>: {report.project?.updatedAt}
            </p>
            <p>
              <b>Cantidad de participantes</b>:{" "}
              {report.users ? report.users.length : 0}
            </p>
            <p>
              <b>Cantidad total de cláusulas</b>:{" "}
              {report.agreements?.length + report.rejectedClauses?.length}
            </p>
            <p>
              <b>Cantidad total de participaciones</b>: {report.participations}
            </p>
            <p>
              <b>Cantidad de acuerdos</b>: {report.agreements?.length}
            </p>
            <p>
              <b>Cantidad de comentarios en el foro</b>:{" "}
              {report.posts.reduce(
                (count: number, post: Post & { comments: Comment[] }) =>
                  post.comments.length + count,
                0
              )}
            </p>
          </div>
        </section>
        <section>
          <h2 className="font-bold text-2xl">Asistencia</h2>
          <ol>
            {report.users.map((user: UserWithoutPassword) => (
              <li key={user.RUT} className="flex gap-5">
                <p>
                  {user.first_name} {user.last_name} - {user.email}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="font-bold text-2xl mb-3">Acuerdos logrados</h2>
          <ol className="flex flex-col gap-3">
            {report.agreements?.length > 0 ? (
              report.agreements?.map((clause: ClauseWithCreator) => (
                <li
                  key={clause.id}
                  className="p-4 rounded-md border-2 border-primary shadow-sm"
                >
                  <h3 className="text-sm font-bold">
                    artículo {clause.article_id}, cláusula {clause.id}
                  </h3>
                  <p>{clause.description}</p>
                  <small>
                    {clause.creator?.first_name} {clause.creator?.last_name}
                  </small>
                </li>
              ))
            ) : (
              <li>No hay acuerdos logrados</li>
            )}
          </ol>
        </section>
        <section>
          <h2 className="font-bold text-2xl">Cláusulas rechazadas</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {report.rejectedClauses?.length > 0 ? (
              report.rejectedClauses.map((clause: ClauseWithCreator) => (
                <li
                  key={clause.id}
                  className="p-4 rounded-md border-2 border-primary shadow-sm"
                >
                  <h3 className="text-sm font-bold">
                    artículo {clause.article_id}, cláusula {clause.id}
                  </h3>
                  <p>{clause.description}</p>
                  <small>
                    {clause.creator?.first_name} {clause.creator?.last_name}
                  </small>
                </li>
              ))
            ) : (
              <li>No hay cláusulas rechazadas</li>
            )}
          </ol>
        </section>
        <section>
          <h2 className="font-bold text-2xl">Foro de discusión</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {report.posts.length > 0 ? (
              report.posts.map(
                (
                  post: Post & {
                    comments: (Comment & { user: UserWithoutPassword })[];
                  } & {
                    creator: UserWithoutPassword;
                  }
                ) => (
                  <li key={post.id} className="">
                    <article className="p-4 rounded-md border-2 border-primary shadow-sm">
                      <h3 className="text-sm font-bold">{post.title}</h3>
                      <p>{post.content}</p>
                      <small>
                        {post.creator?.first_name} {post.creator?.last_name}
                      </small>
                    </article>
                    <ul className="flex flex-col gap-5 mt-5">
                      {post.comments.map(
                        (comment: Comment & { user: UserWithoutPassword }) => (
                          <li
                            key={comment.id}
                            className="p-4 border rounded-md ml-10 bg-blue-900 text-neutral-50"
                          >
                            <p>{comment.content}</p>
                            <small>
                              {comment.user?.first_name}{" "}
                              {comment.user?.last_name}
                            </small>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )
              )
            ) : (
              <li>No hay cláusulas rechazadas</li>
            )}
          </ol>
        </section>
      </article>
    </div>
  );
}
