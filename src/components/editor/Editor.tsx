"use client";
import { useState, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSession } from "../../hooks/useSession";
import { useRouter } from "next/navigation";
import type { Article, Clause } from "@prisma/client";

function EditorInput({
  article,
  currentClause,
  setCurrentClause,
  textareaRef,
}: {
  article: Pick<Clause, "description">[];
  currentClause: Pick<Clause, "description">;
  setCurrentClause: React.Dispatch<Pick<Clause, "description">>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}) {
  return (
    <div className="flex">
      <label className="indent-4 font-semibold italic">
        {article.length + 1}.-
      </label>
      <textarea
        className="mt-1 w-full ml-1 max-w-lg resize-none italic px-3 border"
        ref={textareaRef}
        placeholder="Ingrese una descripción"
        value={currentClause.description}
        onChange={(e) => {
          setCurrentClause({ description: e.target.value });
        }}
      />
    </div>
  );
}

function EditorClauses({
  article,
  setArticle,
}: {
  article: Pick<Clause, "description">[];
  setArticle: React.Dispatch<
    React.SetStateAction<
      | Pick<Clause, "description">[]
      | ((prev: Pick<Clause, "description">[]) => void)
    >
  >;
}) {
  return (
    <>
      {article.length > 0 &&
        article.map(({ description }, index) => {
          return (
            <div
              key={index}
              className="py-2 group flex w-full place-items-center place-content-between"
            >
              <div className="flex">
                <h4 className="italic indent-4 flex">
                  <span className="font-semibold">{index + 1}.-</span>
                </h4>
                <p className="italic indent-1">{description}</p>
              </div>
              <button
                className="mr-5"
                onClick={() => {
                  setArticle((prev: Pick<Clause, "description">[]) => {
                    [...prev].filter((_, i) => i !== index);
                  });
                }}
              >
                <MdDeleteOutline className="scale-150 text-red-700" />
              </button>
            </div>
          );
        })}
    </>
  );
}

function Editor({
  chapterId,
  projectId,
}: {
  chapterId: number;
  projectId: string;
}) {
  const { session } = useSession();
  const [article, setArticle] = useState<Pick<Clause, "description">[]>([]);
  const [currentClause, setCurrentClause] = useState<
    Pick<Clause, "description">
  >({ description: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  return (
    <div className="border w-full max-h-80 overflow-x-hidden overflow-y-auto mb-10">
      <div className="w-full h-full">
        <header className="flex justify-between w-full min-h-[1.5rem] h-fit py-2 px-4 mb-2 text-white bg-gradient-to-r from-blue-950 to-blue-700">
          <h3 className="font-semibold italic">Nuevo artículo N°XXX</h3>
        </header>
        <EditorClauses
          article={article}
          setArticle={
            setArticle as React.Dispatch<
              React.SetStateAction<
                | Pick<Clause, "description">[]
                | ((prev: Pick<Clause, "description">[]) => void)
              >
            >
          }
        />
        <EditorInput
          currentClause={currentClause}
          article={article}
          setCurrentClause={setCurrentClause}
          textareaRef={textareaRef}
        />
      </div>
      <div className="flex my-2">
        <button
          className="px-4 py-1 border rounded-full ml-3 bg-blue-600 text-white hover:bg-blue-900 hover:text-white"
          onClick={() => {
            if (!currentClause) return;
            setArticle([...article, currentClause]);
            setCurrentClause({ description: "" });
            if (inputRef.current && textareaRef.current) {
              inputRef.current.value = "";
              textareaRef.current.value = "";
            }
          }}
        >
          Añadir clausula
        </button>
        <button
          className="px-4 py-1 border rounded-full ml-3 bg-blue-800 text-white hover:bg-blue-900 hover:text-white"
          onClick={() => {
            if (!session) {
              import("react-hot-toast").then((rht) => {
                const { toast } = rht;
                toast.error("Debes iniciar sesión para enviar una sección");
              });
              return;
            }
            if (article.length === 0) return;
            sendSection(projectId, chapterId, article, session.RUT).then(() => {
              router.refresh();
            });

            setArticle([]);
          }}
        >
          Enviar artículo
        </button>
      </div>
    </div>
  );
}

async function sendSection(
  projectId: string,
  chapterId: number,
  articles: Pick<Clause, "description">[],
  RUT: string
) {
  const articleToSend: Omit<Article, "id" | "createdAt"> = {
    project_id: projectId,
    chapter_id: chapterId,
    user_rut: RUT,
  };

  const clausesToSend: Omit<
    Clause,
    "id" | "article_id" | "status" | "createdAt" | "updatedAt"
  >[] = articles.map((article) => {
    return {
      description: article.description,
      project_id: projectId,
      chapter_id: chapterId,
    };
  });

  return fetch(
    `http://localhost:3000/api/projects/${projectId}/chapters/${chapterId}/articles`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: articleToSend, clauses: clausesToSend }),
    }
  )
    .then((res) => res.json())
    .then((resJSON) => {
      console.log(resJSON);
    })
    .catch((err) => console.log(err));
}

export default Editor;
