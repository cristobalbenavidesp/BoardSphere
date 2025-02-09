"use server";

import PublicProjects from "@/components/projects/PublicProjects";
import TabView from "@/components/tabView/TabView";
import CreatedProjects from "@/components/projects/CreatedProjects";
import InscribedProjects from "@/components/projects/InscribedProjects";
import type { Project } from "@prisma/client";
import { Suspense } from "react";
import { NewProjectContextProvider } from "@/context/NewProjectContext";

async function getPublicProjects(): Promise<Project[]> {
  return await fetch("http://localhost:3000/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch public projects");
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

async function Page() {
  const publicProjects = await getPublicProjects().then((res) => {
    return res;
  });

  return (
    <div className="w-full h-screen overflow-hidden flex place-content-center bg-gray-300">
      <section className="w-[50rem] h-full border shadow-lg bg-white px-8 py-10 flex flex-col gap-5 overflow-y-auto">
        <TabView
          views={[
            {
              name: "public",
              component: (
                <Suspense fallback="Loading...">
                  <NewProjectContextProvider>
                    <PublicProjects projects={publicProjects} />
                  </NewProjectContextProvider>
                </Suspense>
              ),
            },
            {
              name: "inscribed",
              component: (
                <Suspense fallback="Loading...">
                  <InscribedProjects />
                </Suspense>
              ),
            },
            {
              name: "created",
              component: (
                <Suspense fallback="Loading...">
                  <CreatedProjects />
                </Suspense>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}

export default Page;
