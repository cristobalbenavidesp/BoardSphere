import { createPost, getPosts } from "@/database/controllers";
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
  return getPosts(params.projectId)
    .then((posts) => new Response(JSON.stringify(posts), { status: 200 }))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function POST(req: NextRequest) {
  const post = await req.json();

  if (!post.project_id || !post.user_rut || !post.title || !post.content)
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });

  return createPost(post)
    .then((post) => new Response(JSON.stringify(post), { status: 200 }))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
