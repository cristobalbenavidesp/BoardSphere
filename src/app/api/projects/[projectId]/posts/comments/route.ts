import { getComment } from "@/database/controllers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const commentId = searchParams.get("commentId");
  if (commentId)
    return getComment(commentId)
      .then((comment) => new Response(JSON.stringify(comment), { status: 200 }))
      .catch((err) => new Response(err, { status: 500 }));
  return new Response(JSON.stringify({ message: "Comment ID not provided" }), {
    status: 400,
  });
}
