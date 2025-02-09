import { getUser, createUser } from "@/database/controllers";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { RUT: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const RUT = params.RUT;
  const password = searchParams.get("password");
  if (!password)
    return new Response("Missing Password", {
      status: 400,
    });

  return getUser(RUT as string, password as string)
    .then((user) => {
      return new Response(JSON.stringify(user), { status: 200 });
    })
    .catch((error) => {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body)
    return new Response("Bad Request", {
      status: 400,
    });
  return createUser(body as User)
    .then((user) => {
      return new Response(JSON.stringify(user), { status: 201 });
    })
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}
