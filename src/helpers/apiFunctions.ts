export async function getReportData(projectId: string) {
  return fetch(`${process.env.HOST}/api/projects/${projectId}/report`, {
    headers: {
      // Common headers
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}

export async function getProjectData(projectId: string) {
  return fetch(`${process.env.HOST}/api/projects/${projectId}`, {
    headers: {
      // Common headers
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}
