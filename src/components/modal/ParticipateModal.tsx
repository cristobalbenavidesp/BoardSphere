import { useState } from "react";
import Modal from "@/components/modal/Modal";
import SpinnerInput from "../input/Spinner";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useSession } from "@/hooks/useSession";
import {
  participationTypes,
  participationTypeOptions,
} from "../../constants/democratic";
import type { Clause, Participation } from "@prisma/client";

function ParticipateModal({
  showModal,
  setShowModal,
  clause,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  clause: Clause;
}) {
  const { session } = useSession();
  const [participation, setParticipation] = useState<Participation>({
    type: participationTypes.APPROVE,
    observation: null,
    user_rut: session!.RUT,
    clause_id: clause.id,
    article_id: clause.article_id,
    project_id: clause.project_id,
    chapter_id: clause.chapter_id,
    createdAt: new Date(),
    updatedAt: null,
  } as Participation);
  return (
    <Modal showModal={showModal}>
      <form
        className="w-3/12 h-fit relative bg-white rounded-xl border shadow-md mx-auto p-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(participation);
        }}
      >
        <h2 className="text-xl font-bold mb-2">Participar</h2>
        <label className="block text-sm font-semibold">Tipo</label>
        <SpinnerInput
          options={participationTypeOptions}
          getSelected={(selected: string) => {
            selected === participationTypes.APPROVE &&
              setParticipation((prev) => {
                return { ...prev, type: participationTypes.APPROVE };
              });
            selected === participationTypes.REJECT &&
              setParticipation((prev) => {
                return { ...prev, type: participationTypes.REJECT };
              });
          }}
          className={`rounded border-2 ${
            participation.type === participationTypes.APPROVE
              ? "border-green-700"
              : ""
          } ${
            participation.type === participationTypes.REJECT
              ? "border-red-700"
              : ""
          } `}
        />
        <label className="block text-sm font-semibold mt-2">
          Observaciones &#40;opcional&#41;
          <textarea
            className="p-2 h-20 w-full resize-none border"
            placeholder="Observaciones (opcional)"
            onChange={(e) => {
              setParticipation((prev) => {
                return {
                  ...prev,
                  observation: e.target.value,
                };
              });
            }}
          />
        </label>
        <button
          type="submit"
          className=" bg-blue-800 text-white font-semibold rounded-xl mt-2 p-2"
        >
          Enviar Participación
        </button>
        <button
          type="button"
          className="absolute top-2 right-2"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <IoClose />
        </button>
      </form>
    </Modal>
  );

  function handleSubmit(participationToSend: Participation) {
    fetch(`/api/projects/${participationToSend.project_id}/participations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participationToSend),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Participación enviada con éxito");
        }
        setShowModal(false);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default ParticipateModal;
