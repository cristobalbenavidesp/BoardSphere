import { NextRequest } from "next/server";
import { getChapter } from "@/database/controllers";
export const dynamic = "force-dynamic";

export function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
      chapterId: string;
    };
  }
) {
  return getChapter(params.projectId, Number(params.chapterId))
    .then((chapter) => {
      return new Response(JSON.stringify(chapter), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify({ error }), { status: 500 });
    });
}
