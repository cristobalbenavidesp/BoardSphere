import { createArticle, getArticles } from "@/database/controllers";
import { NextRequest } from "next/server";

type ParamsType = {
  params: {
    projectId: string;
    chapterId: string;
  };
};
export async function GET(request: NextRequest, { params }: ParamsType) {
  return getArticles(params.projectId, Number(params.chapterId))
    .then((articles) => {
      return new Response(JSON.stringify(articles), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify({ error }), { status: 500 });
    });
}

export async function POST(request: NextRequest, { params }: ParamsType) {
  const body = await request.json();
  const { article, clauses } = body;
  console.log(article, clauses);
  return createArticle(article, clauses)
    .then((article) => new Response(JSON.stringify(article), { status: 200 }))
    .catch((error) => {
      return new Response(error.message, { status: 500 });
    });
}
