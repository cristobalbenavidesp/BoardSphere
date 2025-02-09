"use client";
import { useState } from "react";
import Button from "../ui/Button";
import SpinnerInput from "../input/Spinner";
import { projectInvitationTypeOptions } from "../../constants/democratic";

type RequestBody = {
  title: string;
  description: string;
  organization: string;
  imageUrl: string;
  invitationType: string;
};

function CreateProjectForm({
  onSubmit,
}: {
  onSubmit: (data: RequestBody) => void;
}) {
  const [projectData, setProjectData] = useState<RequestBody>({
    title: "",
    description: "",
    organization: "",
    imageUrl: "",
    invitationType: "",
  });

  return (
    <form
      className="text-lg grid grid-flow-row grid-cols-2 col-auto gap-x-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (
          Object.entries(projectData).some(
            ([key, value]) => key !== "imageUrl" && value === ""
          )
        )
          return;
        onSubmit({ ...projectData });
      }}
    >
      <div className="flex flex-col w-80">
        <label
          className="cursor-pointer font-bold text-gray-700/80"
          htmlFor="project-name-input"
        >
          Nombre del proyecto
        </label>
        <input
          id="project-name-input"
          type="text"
          className="border rounded-xl p-2"
          required
          placeholder="Nombre del proyecto"
          onChange={(event) => {
            setProjectData({ ...projectData, title: event.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-80 row-span-2">
        <label
          className="cursor-pointer font-bold mt-2 text-gray-700/80"
          htmlFor="project-description-input"
        >
          Descripción del proyecto
        </label>
        <textarea
          id="project-description-input"
          className="border rounded-xl p-2 resize-none h-full overflow-y-auto overflow-x-hidden"
          required
          placeholder="Descripción del proyecto"
          onChange={(event) => {
            setProjectData({ ...projectData, description: event.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <label
          className="cursor-pointer font-bold mt-2 text-gray-700/80"
          htmlFor="project-organization-input"
        >
          Organización
        </label>
        <input
          type="text"
          id="project-organization-input"
          className="border rounded-xl p-2"
          placeholder="Organización"
          required
          onChange={(event) => {
            setProjectData({
              ...projectData,
              organization: event.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col w-80">
        <label
          className="cursor-pointer font-bold mt-2 text-gray-700/80"
          htmlFor="project-image-input"
        >
          Imagen del proyecto &#40;URL&#41;
        </label>
        <input
          type="text"
          id="project-image-input"
          className="border rounded-xl p-2"
          placeholder="Url de imagen"
          onChange={(event) => {
            setProjectData({ ...projectData, imageUrl: event.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-80">
        <label
          className="cursor-pointer font-bold mt-2 text-gray-700/80"
          htmlFor="invitation-type-input"
        >
          Tipo de invitación
        </label>
        <SpinnerInput
          options={projectInvitationTypeOptions}
          getSelected={(option: string) => {
            setProjectData({ ...projectData, invitationType: option });
          }}
        />
      </div>
      <Button className="bg-blue-800 text-white mt-10" type="submit">
        Siguiente
      </Button>
    </form>
  );
}

export default CreateProjectForm;
