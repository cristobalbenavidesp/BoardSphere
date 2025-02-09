import { createComment, getComments } from "@/database/controllers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      postId: string;
      projectId: string;
    };
  }
) {
  return getComments(params.postId)
    .then(
      (comments) =>
        new Response(JSON.stringify(comments), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
    )
    .catch((error) => new Response(error.message, { status: 500 }));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return createComment(body)
    .then(
      (res) =>
        new Response(JSON.stringify(res), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
    )
    .catch((error) => new Response(error.message, { status: 500 }));
}
