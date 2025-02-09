import { inviteToProject } from "@/database/controllers";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  const { projectId } = params;
  const { RUT } = await request.json();

  if (!projectId || !RUT)
    return new Response("Missing projectId or RUT", { status: 400 });
  return inviteToProject(projectId, RUT)
    .then(
      (invitation) =>
        new Response(JSON.stringify(invitation), {
          status: 200,
        })
    )
    .catch((error) => new Response(error.message, { status: 500 }));
}
