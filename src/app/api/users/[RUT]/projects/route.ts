import { getUserProjects } from "@/database/controllers";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { RUT: string } }
) {
  return getUserProjects(params.RUT as string)
    .then((projects) => {
      return new Response(JSON.stringify(projects), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}
