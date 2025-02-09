import { getReport } from "@/database/controllers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  return getReport(params.projectId)
    .then((report) => new Response(JSON.stringify(report), { status: 200 }))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
