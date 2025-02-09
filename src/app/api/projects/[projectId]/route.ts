import { getProject, updateProject } from "../../../../database/controllers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { projectId: string };
  }
) {
  return getProject(params.projectId)
    .then((project) => new Response(JSON.stringify(project), { status: 200 }))
    .catch(
      (error) =>
        new Response(JSON.stringify({ message: error.message }), {
          status: 500,
        })
    );
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  const update = await req.json();
  return updateProject(params.projectId, update)
    .then((project) => new Response(JSON.stringify(project), { status: 200 }))
    .catch(
      (error) =>
        new Response(JSON.stringify(error), {
          status: 500,
        })
    );
}
