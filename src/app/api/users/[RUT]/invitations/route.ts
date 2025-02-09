import {
  getUserInvitations,
  inviteToProject,
  updateInvitation,
} from "@/database/controllers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { RUT: string } }
) {
  return getUserInvitations(params.RUT)
    .then(
      (invitations) =>
        new Response(JSON.stringify(invitations), { status: 200 })
    )
    .catch((error) => {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { RUT: string } }
) {
  const { RUT } = params;
  const { projectId, status } = await request.json();

  if (!RUT || !projectId)
    return new Response("Missing RUT or projectId", { status: 400 });

  return updateInvitation(projectId, RUT, status)
    .then(
      (invitation) =>
        new Response(JSON.stringify(invitation), {
          status: 200,
        })
    )
    .catch((error) => new Response(error.message, { status: 500 }));
}
