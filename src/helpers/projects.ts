export async function nextPhase(projectId: string, currentPhase: number) {
  await fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phase: currentPhase + 1 }),
  });
}
