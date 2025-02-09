import { createParticipation, getParticipations } from "@/database/controllers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
      chapterId: string;
      articleId: string;
      clauseId: string;
    };
  }
) {
  return getParticipations(
    params.projectId,
    Number(params.chapterId),
    Number(params.articleId),
    Number(params.clauseId)
  )
    .then(
      (participations) =>
        new Response(JSON.stringify(participations), {
          status: 200,
        })
    )
    .catch(
      (error) =>
        new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        })
    );
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  const participation = await req.json();
  if (
    !participation.clause_id ||
    !participation.article_id ||
    !participation.chapter_id
  )
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });

  return createParticipation(
    params.projectId,
    Number(participation.chapter_id),
    Number(participation.article_id),
    Number(participation.clause_id),
    participation
  )
    .then(
      (participation) =>
        new Response(JSON.stringify(participation), { status: 200 })
    )
    .catch(
      (error) =>
        new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        })
    );
}
