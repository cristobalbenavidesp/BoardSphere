"use client";
import type { Article, Clause, Project, User } from "@prisma/client";
import { useSession } from "../../hooks/useSession";
import ClauseItem from "./ClauseItem";

interface extendedArticle extends Article {
  creator: Partial<User>;
  clauses: Clause[];
  project?: Project;
}

const clauseStatuses = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

function Articles({
  articles,
  phase,
}: {
  articles: extendedArticle[];
  phase: number;
}) {
  const { session } = useSession();

  if (!session) return null;

  return (
    <ul>
      {articles &&
        articles?.map((article, index) => {
          return (
            <li key={article.id} className="border pb-5 p-3 mb-10">
              <header>
                <span className="font-semibold italic">
                  Articulo N°{article.id}
                </span>
              </header>
              <ul className="w-full">
                {article.clauses?.map((clause) => {
                  return (
                    <li key={clause.id}>
                      <ClauseItem clause={clause} article={article} />
                    </li>
                  );
                })}
              </ul>
              <footer>
                <small className="italic">
                  Creado por{" "}
                  <span className="underline font-semibold">
                    {article.creator?.first_name} {article.creator?.last_name}
                  </span>
                  , {article.creator?.profession}
                </small>
              </footer>
            </li>
          );
        })}
    </ul>
  );
}

export default Articles;
