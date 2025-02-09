import { createProject, getOpenProjects } from "@/database/controllers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return getOpenProjects()
    .then((projects) => {
      return new Response(JSON.stringify(projects), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body)
    return new Response("Bad Request", {
      status: 400,
    });

  const { chapters, project } = body;
  return createProject(project, chapters)
    .then((project) => {
      return new Response(JSON.stringify(project), { status: 201 });
    })
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}
